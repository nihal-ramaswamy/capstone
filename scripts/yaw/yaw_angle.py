import cv2
import numpy as np
import dlib
from imutils import face_utils
from numpy import asarray


FACE_3D_MATRIX = [
    (0.0, 0.0, 0.0),             # Nose tip
    (0.0, -330.0, -65.0),        # Chin
    (-225.0, 170.0, -135.0),     # Left eye left corner
    # Right eye right corne
    (225.0, 170.0, -135.0),
    (-150.0, -150.0, -125.0),    # Left Mouth corner
    (150.0, -150.0, -125.0)      # Right mouth corner
]

IDENTITY_3x3_MATRIX_SCALE_500 = [
    [500.0, 0.0, 0.0],
    [0.0, 500.0, 0.0],
    [0.0, 0.0, 500.0]
]


def face_orientation(frame, landmarks):
    size = frame.shape  # (height, width, color_channel)

    image_points = np.array([
                            landmarks[30],     # Nose tip
                            landmarks[8],   # Chin
                            landmarks[36],     # Left eye left corner
                            landmarks[45],     # Right eye right corne
                            landmarks[48],      # Left Mouth corner
                            landmarks[54],  # Right mouth corner
                            ], dtype="double")

    model_points = np.array(FACE_3D_MATRIX)

    center = (size[1]/2, size[0]/2)
    focal_length = center[0] / np.tan(60/2 * np.pi / 180)
    camera_matrix = np.array(
        [[focal_length, 0, center[0]],
         [0, focal_length, center[1]],
         [0, 0, 1]], dtype="double"
    )

    dist_coeffs = np.zeros((4, 1))  # Assuming no lens distortion
    (_, rotation_vector, translation_vector) = cv2.solvePnP(
        model_points, image_points, camera_matrix, dist_coeffs)

    (nose_end_point2D, _) = cv2.projectPoints(np.array(
        [(0.0, 0.0, 1000.0)]), rotation_vector, translation_vector, camera_matrix, dist_coeffs)

    for p in image_points:
        cv2.circle(frame, (int(p[0]), int(p[1])), 3, (0, 0, 255), -1)

    p1 = (int(image_points[0][0]), int(image_points[0][1]))
    p2 = (int(nose_end_point2D[0][0][0]), int(nose_end_point2D[0][0][1]))

    cv2.line(frame, p1, p2, (255, 0, 0), 2)

    # Display image
    cv2.imshow("Output", frame)
    cv2.waitKey(0)

    axis = np.array(IDENTITY_3x3_MATRIX_SCALE_500, dtype=np.float32)

    imgpts, _ = cv2.projectPoints(
        axis, rotation_vector, translation_vector, camera_matrix, dist_coeffs)
    modelpts, _ = cv2.projectPoints(
        model_points, rotation_vector, translation_vector, camera_matrix, dist_coeffs)
    rvec_matrix = cv2.Rodrigues(rotation_vector)[0]

    proj_matrix = np.hstack((rvec_matrix, translation_vector))
    eulerAngles = cv2.decomposeProjectionMatrix(proj_matrix)[6]

    pitch, yaw, roll = [x[0] for x in eulerAngles]

    return imgpts, modelpts, roll, pitch, yaw, landmarks[30]


def getYawAngle(image):
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor("scripts/yaw/shape_predictor_68_face_landmarks.dat")
    npimage = asarray(image)
    gray = cv2.cvtColor(npimage, cv2.COLOR_BGR2GRAY)

    # detect faces in the grayscale image
    rects = detector(gray, 1)
    no_of_faces = 0
    roll, pitch, yaw = 'NaN', 'NaN', 'NaN'

    # loop over the face detections
    for (_, rect) in enumerate(rects):
        # determine the facial landmarks for the face region, then
        # convert the facial landmark (x, y)-coordinates to a NumPy
        # array
        no_of_faces += 1
        shape = predictor(gray, rect)
        landmarks = face_utils.shape_to_np(shape)
        _, _, roll, pitch, yaw, _ = face_orientation(
            image, landmarks)

    return [roll, pitch, yaw, no_of_faces]

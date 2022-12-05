from audio import proctor
from faceRecognition import faceRecognition
from utils.preProcess import preprocess
from yaw import yaw_angle


def generate_data(img, audioString, time):
    """
    Generate data for the model
    """
    audioResult = proctor.audio_analysis(audioString)
    mfccFeatures = audioResult[0]
    speech = audioResult[1]
    imgResult = yaw_angle.getYawAngle(img)
    # assuming face_orientation returns roll, pitch, yaw, no. of Faces
    roll = imgResult[0]
    pitch = imgResult[1]
    yaw = imgResult[2]
    no_of_faces = imgResult[3]
    face_recognition_result = faceRecognition.face_detect(img)
    data = []

    data.append(time)
    data.append(mfccFeatures)
    data.append(speech)
    data.append(roll)
    data.append(pitch)
    data.append(yaw)
    data.append(no_of_faces)
    data.append(face_recognition_result[0])
    modelData = preprocess(data)
    # print(mfccFeatures)
    return modelData

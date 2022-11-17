import face_recognition
import cv2
from numpy import asarray


def face_detect(img):

    #To be pulled form db
    original = asarray(img)
    original = cv2.cvtColor(original, cv2.COLOR_BGR2RGB)
    # cv2.waitKey(0)

    train_encode = face_recognition.api.face_encodings(original)
    test = asarray(img)
    test = cv2.cvtColor(test, cv2.COLOR_BGR2RGB)
    try:
        test_encode = face_recognition.face_encodings(test)
        result = face_recognition.compare_faces([train_encode], test_encode)
    except:
        result = [False]
    return result

import numpy as np


def preprocess(data):
    # preprocess the data
    time = data[0]
    mfccFeatures = data[1]

    speech = data[2]
    if data[3] < 0:
        roll = data[3]*-1
    else:
        roll = data[3]
    roll = roll/180

    if data[4] < 0:
        pitch = data[4]*-1
    else:
        pitch = data[4]
    pitch = 180 - pitch
    pitch = pitch/180

    if data[5] < 0:
        yaw = data[5]*-1
    else:
        yaw = data[5]
    yaw = yaw/180

    no_of_faces = data[6]
    face_recognition_result = data[7]

    mfccFeatures.insert(0, no_of_faces)
    mfccFeatures.insert(0, yaw)
    mfccFeatures.insert(0, pitch)
    mfccFeatures.insert(0, roll)
    mfccFeatures.insert(0, speech)
    mfccFeatures.insert(0, face_recognition_result)

    data = np.array(mfccFeatures)

    return data

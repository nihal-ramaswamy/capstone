import numpy as np


def preprocess(data):
    # preprocess the data
    time = data[0]
    mfccFeatures = data[1]

    speech = data[2]
    if data[3]!='NaN':
        if data[3] < 0:
            roll = data[3]*-1
        else:
            roll = data[3]
        roll = roll/180
    else:
        roll = 0

    if data[4]!='NaN':
        if data[4] < 0:
            pitch = data[4]*-1
        else:
            pitch = data[4]
        pitch = 180 - pitch
        pitch = pitch/180
    else:
        pitch = 0
    
    if data[4]!='NaN':
        if  data[5] < 0:
            yaw = data[5]*-1
        else:
            yaw = data[5]
        yaw = yaw/180
    else:
        yaw = 0

    no_of_faces = data[6]
    face_recognition_result = data[7]

    arr1 = np.array([face_recognition_result, speech, roll, pitch, yaw, no_of_faces])
    arr2 = np.concatenate((arr1,mfccFeatures), axis = None)
    
    data = arr2.reshape(1,-1)
    
    return data

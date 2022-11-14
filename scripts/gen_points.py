import audio_proctor
from movement import yaw_angle 
import numpy as np
import face_recognition1
import argparse
import pyrebase
import config
import json
import pickle
import io, base64
from PIL import Image
import cStringIO


parser = argparse.ArgumentParser()
parser.add_argument("-u", "--userID", type=str,
                    help="user id's whose values must be fetched")
parser.add_argument("-e", "--email", type=str,
                    help="user's email whose values must be fetched")
parser.add_argument("-l", "--logID", type=str,
                    help="record for which given user id's value must be fetched")
args = parser.parse_args()

userID = args.userID
email = args.email
logID = args.logID

firebase = pyrebase.initialize_app(config.firebaseConfig)
storage = firebase.database()
MODEL = "./model"

def generate_data(img, audioString,time):
    """
    Generate data for the model
    """
    audioResult = audio_proctor.audio_analysis(audioString)
    mfccFeatures = audioResult[0]
    speech = audioResult[1]
    imgResult = yaw_angle.main(img)
    #assuming face_orientation returns roll, pitch, yaw, no. of Faces
    roll = imgResult[0]
    pitch = imgResult[1]
    yaw = imgResult[2]
    no_of_faces = imgResult[3]
    face_recognition_result = face_recognition1.face_detect(img)
    data = []

    data.append(time)
    data.append(mfccFeatures)
    data.append(speech)
    data.append(roll)
    data.append(pitch)
    data.append(yaw)
    data.append(no_of_faces)
    data.append(face_recognition_result[0])    
    #run the model here and append the result to data
    #If result is true, save the img and audio to the database

    modelData = preprocess(data)
    return modelData


def preprocess(data):
    #preprocess the data
    time = data[0]
    mfccFeatures = data[1]

    speech = data[2]
    if data[3] < 0: roll = data[3]*-1 
    else: roll = data[3]
    roll= roll/180

    if data[4] < 0: pitch = data[4]*-1
    else: pitch = data[4]
    pitch = 180 - pitch 
    pitch = pitch/180

    if data[5] < 0: yaw = data[5]*-1
    else: yaw = data[5]
    yaw = yaw/180

    no_of_faces = data[6]
    face_recognition_result = data[7]

    mfccFeatures.insert(0,no_of_faces)
    mfccFeatures.insert(0,yaw)
    mfccFeatures.insert(0,pitch)
    mfccFeatures.insert(0,roll)
    mfccFeatures.insert(0,speech)
    mfccFeatures.insert(0,face_recognition_result)

    data = np.array(mfccFeatures)

    return data

def selectValuesFromUsersWhereUserID(userID: str) -> json:
    val = (storage.child("users").child(userID).get()).val()
    print(val)
    img = val['snapshot']
    

# Assuming base64_str is the string value without 'data:image/jpeg;base64,'
    # img = Image.open(io.BytesIO(base64.decodebytes(bytes(base64_str, "utf-8"))))
    # img.save('my-image.jpeg')
    image_output = cStringIO.StringIO()
    image_output.write(img.decode('base64'))   # Write decoded image to buffer
    img = image_output.seek(0) 
    
    audioString = val['voice']
    time = val['timestamp']
    modelData = generate_data(img,audioString,time)
    return modelData


def validate(dbValue) -> int:
    model = pickle.load(model)
    score = model.predict(dbValue)
    return score

if __name__ == "__main__":
    features = selectValuesFromUsersWhereUserID(userID)
    print(selectValuesFromUsersWhereUserID(userID))
    res = validate(features)
    print(res)



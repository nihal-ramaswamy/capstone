import audio_proctor
from movement import yaw_angle 
import face_recognition1
import argparse
import pyrebase
import config
import json
import pickle


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

def generate_data(img, audio,time):
    """
    Generate data for the model
    """
    audio_result = audio_proctor.audio_analysis(audio)
    volume = audio_result[0]
    speech = audio_result[1]
    img_result = yaw_angle.main(img)
    #assuming face_orientation returns roll, pitch, yaw, no. of Faces
    roll = img_result[0]
    pitch = img_result[1]
    yaw = img_result[2]
    no_of_faces = img_result[3]
    face_recognition_result = face_recognition1.face_detect(img)
    data = []

    data.append(time)
    data.append(volume)
    data.append(speech)
    data.append(roll)
    data.append(pitch)
    data.append(yaw)
    data.append(no_of_faces)
    data.append(face_recognition_result[0])    
    #run the model here and append the result to data
    #If result is true, save the img and audio to the database
    return data

# answer = generate_data('anisha2.jpg', 'male.wav', 0)
# print(answer)

def preprocess(data):
    #preprocess the data
    time = data[0]
    volume = data[1]

    speech = data[2]
    if data[3] < 0: roll = data[3]*-1 
    else: roll = data[3]

    if data[4] < 0: pitch = data[4]*-1
    else: pitch = data[4]
    pitch = 180 - pitch 

    if data[5] < 0: yaw = data[5]*-1
    else: yaw = data[5]

    no_of_faces = data[6]
    face_recognition_result = data[7]

    volume.insert(0,no_of_faces)
    volume.insert(0,yaw)
    volume.insert(0,pitch)
    volume.insert(0,roll)
    volume.insert(0,speech)
    volume.insert(0,face_recognition_result)

    data = np.array(volume)
    

    return data

def selectValuesFromUsersWhereUserID(userID: str) -> json:
    val = (storage.child("users").child(userID).get()).val()
    print(val)
    img = val['snapshot']
    audio = val['voice']
    time = val['timestamp']
    modelData = generate_data(img,audio,time)
    return modelData


def validate(dbValue) -> int:
    model = pickle.load(model)
    score = model.predict(dbValue)
    return score

if __name__ == "__main__":
    print(selectValuesFromUsersWhereUserID(userID))


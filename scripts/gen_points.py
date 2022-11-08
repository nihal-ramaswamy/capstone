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
    noOfFaces = img_result[3]
    face_recognition_result = face_recognition1.face_detect(img)
    data = []

    data.append(img)
    data.append(time)
    data.append(volume)
    data.append(speech)
    data.append(roll)
    data.append(pitch)
    data.append(yaw)
    data.append(noOfFaces)
    data.append(face_recognition_result[0])    
    #run the model here and append the result to data
    #If result is true, save the img and audio to the database
    return data

# answer = generate_data('anisha2.jpg', 'male.wav', 0)
# print(answer)
def selectValuesFromUsersWhereUserID(userID: str) -> json:
    val = (storage.child("users").child(userID).get()).val()
    print(val)
    img = val['snapshot']
    audio = val['voice']
    time = val['timestamp']
    generate_data(img,audio,time)
    return val


def validate(dbValue) -> int:
    model = pickle.load(model)


if __name__ == "__main__":
    print(selectValuesFromUsersWhereUserID(userID))


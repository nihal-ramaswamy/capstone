import argparse
import pyrebase
import config
import json

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


def selectValuesFromUsersWhereUserID(userID: str) -> json:
    val = (storage.child("users").child(userID).get()).val()
    return val


if __name__ == "__main__":
    print(selectValuesFromUsersWhereUserID(userID))

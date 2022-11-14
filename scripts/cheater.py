import argparse

import dotenv

from scripts.db import firebase_db
from scripts.db import redis_db

ENV_FILE = "../.env"


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

config = dotenv.dotenv_values(ENV_FILE)

firebase = firebase_db.Firebase(config)
redis = redis_db.Redis(config)


if __name__ == "__main__":
    print(firebase.selectValuesFromUsersWhereUserID(userID))

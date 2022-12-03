import argparse

import dotenv
import pickle
from pipeline import pipeline

ENV_FILE = "../.env"
MODEL_PATH = "scripts/randomForestFinalModel.pkl"

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


def get_score(userId, model, config=config):
    return pipeline.Pipeline(model, config, 12).get_score(userId)


if __name__ == "__main__":
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
        print(get_score(userID, model)[0])

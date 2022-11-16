from db import firebase_db, redis_db
import pickle

from utils.base64ToImage import base64ToImage
from utils.generateData import generate_data


class Pipeline:
    def __init__(self, model, db_config):
        self._firebase = firebase_db.Firebase(db_config)
        # self._redis = redis_db.Redis(db_config)
        self._model = model

    def _predict(self, features):
        return self._model.predict(features)

    def get_score(self, userId):
        dbData = self._firebase.selectValuesFromUsersWhereUserID(userId)
        print(len(dbData['snapshot']))
        img = base64ToImage("".join(dbData['snapshot']))
        audio = "".join(dbData['voice'])
        timeStamp = dbData['timestamp']

        features = generate_data(img, audio, timeStamp)

        return self._predict(features)

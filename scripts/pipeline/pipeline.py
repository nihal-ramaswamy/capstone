from scripts.db import firebase_db, redis_db
import pickle

from scripts.utils.base64ToImage import base64ToImage
from scripts.utils.generateData import generate_data


class Pipeline:
    def __init__(self, model, db_config):
        self._firebase = firebase_db.Firebase(db_config)
        self._redis = redis_db.Redis(db_config)
        self._model = pickle.load(model)

    def _predict(self, features):
        return self._model.predict(features)

    def get_score(self, userId):
        dbData = self._firebase.selectValuesFromUsersWhereUserID(userId)

        img = base64ToImage(dbData['snapshot'])
        audio = dbData['voice']
        timeStamp = dbData['timestamp']

        features = generate_data(img, audio, timeStamp)

        return self._predict(features)

from db import firebase_db, redis_db
import pickle
import numpy as np

from utils.base64ToImage import base64ToImage
from utils.generateData import generate_data
from warningType.warningType import gen_warning


class Pipeline:
    def __init__(self, model, db_config, warningScore):
        self._firebase = firebase_db.Firebase(db_config)
        # self._redis = redis_db.Redis(db_config)
        self._warningScore = warningScore
        self._model = model

    def _predict(self, features):
        score = 9
        if(np.isnan(features[0][2]) and np.isnan(features[0][3])  and np.isnan(features[0][4]) ):
            return np.array(["5"])
        score = self._model.predict(features)
        # warningType, self._warningScore = gen_warning(score, self._warningScore)
        # print(warningType, self._warningScore)
        return score 

    def get_score(self, userId):
        dbData = self._firebase.selectValuesFromUsersWhereUserID(userId)
        img = base64ToImage("".join(dbData['snapshot']))
        audio = "".join(dbData['voice'])
        timeStamp = dbData['timestamp']

        features = generate_data(img, audio, timeStamp)
        # print("Features:", features)
        return self._predict(features)

from db import firebase_db, redis_db
import pickle

from utils.base64ToImage import base64ToImage
from utils.generateData import generate_data
from utils.warningType import gen_warning


class Pipeline:
    def __init__(self, model, db_config, warningScore):
        self._firebase = firebase_db.Firebase(db_config)
        # self._redis = redis_db.Redis(db_config)
        self._warningScore = warningScore
        self._model = model

    def _predict(self, features):
        if(features[0]==0 and features[2]==0 and features[3]==0 and features[4]==0):
            return 5
        score = self._model.predict(features)
        warningType, _warningScore = gen_warning(score, _warningScore)
        return warningType

    def get_score(self, userId):
        dbData = self._firebase.selectValuesFromUsersWhereUserID(userId)
        img = base64ToImage("".join(dbData['snapshot']))
        audio = "".join(dbData['voice'])
        timeStamp = dbData['timestamp']

        features = generate_data(img, audio, timeStamp)
        print("Features:", features)
        return self._predict(features)

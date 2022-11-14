from typing import Dict

import pyrebase


class Firebase:
    def __init__(self, config: Dict) -> None:
        self._firebaseConfig = {
            "apiKey": config["API_KEY"],
            "authDomain": config["AUTH_DOMAIN"],
            "databaseURL": config["DATABASE_URL"],
            "projectId": config["PROJECT_ID"],
            "storageBucket": config["STORAGE_BUCKET"],
            "messagingSenderId": config["MESSAGING_SENDER_ID"],
            "appId": config["APP_ID"],
            "measurementId": config["MEASUREMENT_ID"]
        }
        self._firebase = pyrebase.initialize_app(self._firebaseConfig)
        self._storage = self._firebase.database()

    def selectValuesFromUsersWhereUserID(self, userID: str):
        return (self._storage.child("users").child(userID).get()).val()

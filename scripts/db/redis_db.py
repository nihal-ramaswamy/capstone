from typing import Dict

import redis


class Redis:
    def __init__(self, config: Dict) -> None:
        if (config["REDIS_HOST"] == None):
            raise Exception("REDIS_HOST is of type None")
        if (config["REDIS_PORT"] == None):
            raise Exception("REDIS_PORT is of type None")

        self._redis = redis.Redis(host=config["REDIS_HOST"],
                                  port=config["REDIS_PORT"], password=config["REDIS_PASSWORD"])

    def set(self, key: str, value: str) -> None:
        self._redis.set(key, value)

    def get(self, key: str) -> bytes | None:
        return self._redis.get(key)

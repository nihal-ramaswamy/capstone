import io
import json
import base64
from PIL import Image


with open("capstone-4d7fd-default-rtdb-AAAA-export.json", "r") as read_content:
    img_json = json.load(read_content)['snapshot']
    base = img_json.split(",")[1]
    img = Image.open(io.BytesIO(base64.decodebytes(bytes(base, "utf-8"))))
    img.save('test-image.jpeg')

    audio_json = json.load(read_content)['voice']
    wavFile = open("audioFile.wav", "wb")
    decodeString = base64.b64decode(audio_json[20:])
    wavFile.write(decodeString)

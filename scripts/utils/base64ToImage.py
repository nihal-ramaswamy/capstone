import io
import base64
from PIL import Image


def base64ToImage(base64Img):
    base = base64Img.split(",")[1]
    img = Image.open(io.BytesIO(base64.decodebytes(bytes(base, "utf-8"))))
    # img.save('my-image.jpeg')
    return img

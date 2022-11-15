from io import StringIO
import json
import base64

with open("capstone-4d7fd-default-rtdb-AAAA-export.json", "r") as read_content:
    temp = json.load(read_content)['snapshot']
    base = temp.split(",")[1]
    data = base64.b64encode(base.encode())

    # img = Image.open(io.BytesIO(base64.decodebytes(bytes(base, "utf-8"))))
    # img.save('my-image.jpeg')
    image_output = StringIO()
    image_output.write(data.decode('base64'))   # Write decoded image to buffer
    image_output.seek(0)
    image_output.read()
    # image = Image.open(img)

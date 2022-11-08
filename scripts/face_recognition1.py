import face_recognition
import cv2 

def face_detect(img):

    #to be pulled from db later 
    original = face_recognition.load_image_file('anisha.jpg')
    original = cv2.cvtColor(original,cv2.COLOR_BGR2RGB) 
    cv2.waitKey(0)

    train_encode = face_recognition.api.face_encodings(original)[0]
    test = face_recognition.load_image_file(img)
    test = cv2.cvtColor(test, cv2.COLOR_BGR2RGB)
    try:
        test_encode = face_recognition.face_encodings(test)[0]
        result = face_recognition.compare_faces([train_encode],test_encode)
    except:
        result = [False]
    # print(result)
    return result


# result = face_detect('anisha2.jpg')








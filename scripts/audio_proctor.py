import numpy as np
import webrtcvad
import base64
import librosa 

def audio_analysis(audioString):

    wavFile = open("audioFile.wav", "wb")
    decodeString = base64.b64decode(audioString)
    wavFile.write(decodeString)
    wavFile.close()

    #MFCC Features 
    audioWave, sampleRate = librosa.load('audioFile.wav')
    features = librosa.feature.mfcc(y=audioWave, sr=sampleRate, n_mfcc=40)
    features = np.mean(features.T,axis=0) 

    #Speech Detection
    counter=0
    totalCount=0
    audioFrames = audioWave.readframes(800)#arg here divides the audio file into atmost arg number of frames
    vad = webrtcvad.Vad() # Now Run the VAD on 10 ms of silence and 16000 sampling rate 
    frameDuration = 10  # in ms
    for audioFrame in audioFrames : # Detecting speech

        finalFrame = audioFrame.to_bytes(2,"big")* int(sampleRate * frameDuration / 1000) #multiplying by sample rate and frame duration because the vad requires a particular data format
        totalCount=totalCount+1

        if(vad.is_speech(finalFrame, sampleRate)):
            counter=counter+1
          
    if len(volume) > 6400:
        volume = volume[:6400]
        
    if((counter/totalCount)>=0.5):
        return features, True
    return features , False


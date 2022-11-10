import wave
import numpy as np
from math import log10 
from scipy.io import wavfile
import webrtcvad
import base64

def audio_analysis(audioString):
    sampleRate = 16000
    wavFile = open("audioFile.wav", "wb")
    decodeString = base64.b64decode(audioString)
    wavFile.write(decodeString)
    audioWave = wave.open("audioFile.wav")
    volume = []
    counter=0
    totalCount=0
    audioFrames = audioWave.readframes(800)#arg here divides the audio file into atmost arg number of frames
    vad = webrtcvad.Vad() # Now Run the VAD on 10 ms of silence and 16000 sampling rate 
    frameDuration = 10  # in ms
    for audioFrame in audioFrames : # Detecting speech

        finalFrame = audioFrame.to_bytes(2,"big")* int(sampleRate * frameDuration / 1000) #multiplying by sample rate and frame duration because the vad requires a particular data format
        totalCount=totalCount+1
        d = np.frombuffer(finalFrame, np.int16).astype(np.float)
        rms=np.sqrt((d*d).sum()/len(d))
        try:
            db = 20 * log10(rms)
        except:
            db=0
        volume.append(db)
        if(vad.is_speech(finalFrame, sampleRate)):
            counter=counter+1
          
    if len(volume) > 6400:
        volume = volume[:6400]
        
    if((counter/totalCount)>=0.5):
        return volume, True
    return volume , False


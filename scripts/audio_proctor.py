import wave
import webrtcvad
import numpy as np
import noisereduce as nr
from math import log10 
from scipy.io import wavfile
import os
import pandas as pd
import matplotlib.pyplot as plt

def audio_analysis(aud, path=''):
    sample_rate = 16000
    rate,audio1 = wavfile.read(path)
    # audio1 = wave.open(path)
    # audio1=nr.reduce_noise(y=audio2, sr=rate)
    wavfile.write("mywav_reduced_noise.wav", rate, audio1)
    audio1 = wave.open("mywav_reduced_noise.wav")
    volume = []
    counter=0
    total_count=0
    fraud = audio1.readframes(800)#arg here divides the audio file into atmost arg number of frames
    vad = webrtcvad.Vad() # Now Run the VAD on 10 ms of silence and 16000 sampling rate 
    frame_duration = 10  # in ms
    for frau1 in fraud : # Detecting speech

        final_frame = frau1.to_bytes(2,"big")* int(sample_rate * frame_duration / 1000) #multiplying by sample rate and frame duration because the vad requires a particular data format
        total_count=total_count+1
        d = np.frombuffer(final_frame, np.int16).astype(np.float)
        rms=np.sqrt((d*d).sum()/len(d))
        try:
            db = 20 * log10(rms)
        except:
            db=0
        volume.append(db)
        if(vad.is_speech(final_frame, sample_rate)):
            counter=counter+1
          
    plt.show(volume)
    if((counter/total_count)>=0.5):
        return aud, len(volume), True
    return aud, len(volume) , False

audio_data = os.listdir('./Dataset_audio/')
csv_data = []

for audio in audio_data:
    answer = audio_analysis(audio, './Dataset_audio/' + audio)
    print(answer)
    csv_data.append(answer)

array = np.array(csv_data, dtype=object)
column_names = ['name','volume','speech']
df = pd.DataFrame(array, columns=column_names)
df.to_csv('./data.csv',index=False)

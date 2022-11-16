import numpy as np
import base64
import torch
import librosa
import os

torch.set_num_threads(1)


def audio_analysis(audioString):

    wavFile = open("audioFile.wav", "wb")
    decodeString = base64.b64decode(audioString[20:])
    wavFile.write(decodeString)
    print(os.listdir())
    # MFCC Features
    audioWave, sampleRate = librosa.load("audioFile.wav")
    features = librosa.feature.mfcc(y=audioWave, sr=sampleRate, n_mfcc=40)
    features = np.mean(features.T, axis=0)

    # Speech Detection
    model, utils = torch.hub.load(repo_or_dir='snakers4/silero-vad',
                                  model='silero_vad',
                                  force_reload=True)

    (get_speech_timestamps,
     _,
     _,
     _,
     _) = utils

    # full audio
    # get speech timestamps from full audio file
    speech_timestamps = get_speech_timestamps(
        audioWave, model, sampling_rate=16000)
    if len(speech_timestamps) >= 4:
        return features, True
    else:
        return features, False


# f = open('C:/Users/anish/Downloads/capstone-4d7fd-default-rtdb-AAAA-export.json')
# data = json.load(f)['voice']
# audio_analysis(data)

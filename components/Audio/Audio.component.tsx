import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMediaState, setMediaState } from "../../store/mediaSlice";
import { Dispatch, SetStateAction } from "react";
import { timerSlice } from "../../store/timer";

const audioType = 'audio/*';

interface AudioProps {
  setAudio: Dispatch<SetStateAction<string | null>>;
  mimeTypeToUseWhenRecording?: string;
};


const milisecondsToTime = (milisecs: number) => {
  let secs = milisecs / 1000;
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);


  let obj = {
    h: hours,
    m: minutes,
    s: seconds,
    ms: milisecs
  };
  return obj;
};

const Audio = (props: AudioProps) => {
  const [time, setTime] = useState({h: 0, m: 0, s: 0, ms: 0});
  const [miliseconds, setMiliseconds] = useState<number>(0);
  const [recording, setRecording] = useState<boolean>(false);
  const [mediaNotFound, setMediaNotFound] = useState<boolean>(false);
  const [pauseRecord, setPauseRecord] = useState<boolean>(false);
  const [audios, setAudios] = useState<string[]>([]);
  const [audioBlob, setAudioBlob] = useState(null);
  const [stream, setStream] = useState<MediaStream | undefined>();
  const [chunks, setChunks] = useState<Blob[]>([]);

  const dispatch = useDispatch();
  const mediaState = useSelector(selectMediaState);

  useEffect(() => {
    console.log("Audio component media state", mediaState);
    if (!mediaState) {
      return;
    }
    startRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaState]);

  useEffect(() => {
    console.log(time);
    if (time.s < 5) {
      return;
    }
    // if (miliseconds >= 5000) {
      saveAudio();
      handleReset();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  let timer:NodeJS.Timer;
  let mediaRecorder:MediaRecorder;

  const startTimer = () => {
    timer = setInterval(countDown, 5000);
  };

  const countDown = () => {
    // const ms = miliseconds;
    // console.log(ms);
    // setMiliseconds(ms + 1000);
    // const temp = milisecondsToTime(ms + 1000);
    // const sec = time.s + temp.s;
    // const min = time.m + temp.m;
    // const h = time.h + temp.h;
    // const mils = time.ms + ms + 1000;
    // setTime({h: h, m: min, s: sec, ms: mils});
    saveAudio();
    handleReset();
  };

  const initRecording = async () => {
    navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
    if (navigator.mediaDevices) {
      const stream_local = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (props.mimeTypeToUseWhenRecording) {
        mediaRecorder = new MediaRecorder(stream_local, { mimeType: props.mimeTypeToUseWhenRecording });
      } else {
        mediaRecorder = new MediaRecorder(stream_local);
      }
      mediaRecorder.ondataavailable = e => {
        if (e.data && e.data.size > 0) {
          let chunks_local:Blob[] = chunks;
          chunks_local.push(e.data);
          setChunks(chunks_local);
        }
      };

      setStream(stream_local);
    } else {
      setMediaNotFound(true);
      console.log('Media Decives will work only with SSL.....');
    }
  };

  const startRecording = async () => {
    // event.preventDefault();
    setChunks([]);
    await initRecording();
    mediaRecorder.start(10);
    startTimer();
    setRecording(true);
  };

  const stopRecording = () => {
    if (!mediaRecorder) {
      return;
    }
    clearInterval(timer);
    setTime({h: 0, m: 0, s: 0, ms: 0});
    // e.preventDefault();

    if (stream?.getAudioTracks) {
      const tracks = stream.getAudioTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    } else {
      console.log("No Tracks Found");
    }
    mediaRecorder.stop();
    setRecording(false);
    setPauseRecord(false);
    saveAudio();
  };

  const handleReset = () => {
    if (recording) {
      stopRecording();
    }
    setTime({h: 0, m: 0, s: 0, ms: 0});
    setMiliseconds(0);
    setRecording(false);
    setMediaNotFound(false);
    setAudios([]);
    setAudioBlob(null);
  };

  const saveAudio = () => {
    const blob = new Blob(chunks, { type: audioType });
    const audioURL = window.URL.createObjectURL(blob);
    const audios = [audioURL];

    setAudios(audios);
    setAudioBlob(audioBlob);

    props.setAudio(audioURL);
  };

  return (
    null
  );
};

export default Audio;

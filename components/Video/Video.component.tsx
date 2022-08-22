import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMediaState, setMediaState } from "../../store/mediaSlice";

interface VideoProps {
  setImage: Dispatch<SetStateAction<string | null>>;
};

const Video = (props: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const mediaState = useSelector(selectMediaState);


  useEffect(() => {
    getVideo();
  }, [videoRef]);


  useEffect(() => {
    if (mediaState) {
      takePhoto();
      props.setImage(image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaState]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current;
        if (!video) {
            return;
        }
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  const paintToCanvas = () => {
    let video = videoRef.current;
    let photo = photoRef.current;

    if (!photo || !video) {
        return;
    }

    let ctx = photo.getContext("2d");

    const width = 320;
    const height = 240;
    photo.width = width;
    photo.height = height;

    return setInterval(() => {
        if (!video || !ctx) {
            return;
        }
        ctx.drawImage(video, 0, 0, width, height);
    }, 200);
  };

  const takePhoto = () => {
    let photo = photoRef.current;
    let strip = stripRef.current;

    console.warn(strip);

    if (!photo || !strip) {
        return;
    }

    const data = photo.toDataURL("image/jpeg");
    setImage(data);

    console.warn(data);
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "myWebcam");
    link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
    strip.insertBefore(link, strip.firstChild);
  };

  return (
    <div>
      <video onCanPlay={() => paintToCanvas()} ref={videoRef} />
      <canvas ref={photoRef} />
      <div>
        <div ref={stripRef} />
      </div>
    </div>
  );
};

export default Video;

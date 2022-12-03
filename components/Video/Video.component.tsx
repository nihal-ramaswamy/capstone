import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { useSelector } from "react-redux";
import { selectMediaState } from "../../store/mediaSlice";

interface VideoProps {
  setImage: Dispatch<SetStateAction<string | null>>;
}

const Video = (props: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const mediaState = useSelector(selectMediaState);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  useEffect(() => {
    if (mediaState) {
      takePhoto();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaState]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        if (!video) {
          return;
        }
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
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

    if (!photo || !strip) {
      return;
    }

    const data = photo.toDataURL("image/jpeg");
    props.setImage(data);
  };

  return (
    <div>
      <video onCanPlay={() => paintToCanvas()} ref={videoRef} />
      <canvas className="hidden" ref={photoRef} />
      <div className="hidden">
        <div ref={stripRef} />
      </div>
    </div>
  );
};

export default Video;

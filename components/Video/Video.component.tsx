import React, { useEffect, useRef } from "react";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

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

    console.warn(data);
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "myWebcam");
    link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
    strip.insertBefore(link, strip.firstChild);
  };

  return (
    <div>
      <button onClick={() => takePhoto()}>Take a photo</button>
      <video onCanPlay={() => paintToCanvas()} ref={videoRef} />
      <canvas ref={photoRef} />
      <div>
        <div ref={stripRef} />
      </div>
    </div>
  );
};

export default Video;

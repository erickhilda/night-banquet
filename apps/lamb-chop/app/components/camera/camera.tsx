import { useRef, useState } from "react";

export const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [image, setImage] = useState("");
  const [isCameraRunning, setIsCameraRunning] = useState(false);

  const startCamera = async () => {
    if (isCameraRunning) {
      return;
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setIsCameraRunning(true);

      // Return a function that stops the camera
      return () => {
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
        setIsCameraRunning(false);
      };
    } else {
      console.error("MediaDevices API not supported by this browser.");
      return () => {};
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      if (!stream) {
        return;
      }
      // @ts-ignore
      const tracks = stream.getTracks();

      // @ts-ignore
      tracks.forEach(function (track) {
        track.stop();
      });

      videoRef.current.srcObject = null;
      setIsCameraRunning(false);
    }
  };

  const captureImage = () => {
    const context = canvasRef.current.getContext("2d");
    if (!context) {
      console.error("Canvas context not supported by this browser.");
      return;
    }
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const dataUrl = canvasRef.current.toDataURL("image/png");
    if (!dataUrl) {
      console.error("Unable to capture image");
      return;
    }
    setImage(dataUrl);
  };

  return (
    <div>
      <video ref={videoRef} width="640" height="480" autoPlay></video>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={stopCamera}>Stop Camera</button>
      <button onClick={captureImage}>Capture Image</button>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      ></canvas>
      {image && <img src={image} alt="Captured" />}
    </div>
  );
};

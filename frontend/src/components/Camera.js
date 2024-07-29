import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import "../styles/Camera.css";

const videoConstraints = {
  width: 540,
  facingMode: "environment"
};

const Camera = (props) => {
  const [isVisible, setIsVisible] = useState(true);
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    props.callback(imageSrc);
    setIsVisible(false);
    setUrl(imageSrc);
  }, [webcamRef, props]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  return (
    <div className="camera-container">
      {isVisible && (
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={onUserMedia}
          className="webcam"
        />
      )}
      <div className="button-container">
        <button onClick={capturePhoto} className="camera-button">Capture</button>
        <button
          onClick={() => {
            setIsVisible(true);
            setUrl(null);
          }}
          className="camera-button"
        >
          Refresh
        </button>
      </div>
      {url && (
        <div>
          <img src={url} alt="Screenshot" className="screenshot" />
        </div>
      )}
    </div>
  );
};

export default Camera;

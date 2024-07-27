
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 540,
  facingMode: "environment"
};

const Camera = (props) => {
    console.log(props)
  const [isVisible, setIsVisible] = useState(true);
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const capturePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    props.callback(imageSrc)
    setIsVisible(false);
    setUrl(imageSrc);
  }, [webcamRef, props]);

  const onUserMedia = (e) => {
    console.log(e);
  };


  return (
    <>
    <div>
		{isVisible && <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
      />}
      
	</div>
      <button onClick={capturePhoto}>Capture</button>
      <button onClick={() => {
        setIsVisible(true)
        setUrl(null); }}>Refresh</button>
      {url && (
        <div>
          <img src={url} alt="Screenshot" />
        </div>
      )}
    </>
  );
};

export default Camera;

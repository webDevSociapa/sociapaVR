import React, { useState, useEffect, useRef } from "react";
import { QrReader } from "react-qr-reader";

const QRScanner = () => {
  const [videoURL, setVideoURL] = useState(""); // Video URL
  const [showVideoInFrame, setShowVideoInFrame] = useState(false); // Newspaper frame video
  const [showVideoInBackground, setShowVideoInBackground] = useState(false); // Background video
  const cameraRef = useRef(null);

  useEffect(() => {
    const handleDeviceMotion = (event) => {
      const { accelerationIncludingGravity } = event;

      // Detect significant movement
      if (
        Math.abs(accelerationIncludingGravity.x) > 5 ||
        Math.abs(accelerationIncludingGravity.y) > 5 ||
        Math.abs(accelerationIncludingGravity.z) > 5
      ) {
        setShowVideoInFrame(false);
        setShowVideoInBackground(true);
      }
    };

    // Add device motion listener
    window.addEventListener("devicemotion", handleDeviceMotion);

    return () => {
      // Cleanup listener on unmount
      window.removeEventListener("devicemotion", handleDeviceMotion);
    };
  }, []);

  const startCameraFeed = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (cameraRef.current) {
          cameraRef.current.srcObject = stream;
          cameraRef.current.play();
        }
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  };

  useEffect(() => {
    startCameraFeed();
  }, []);

  const handleQRDetected = () => {
    setVideoURL(
      "https://apisindia.s3.ap-south-1.amazonaws.com/newwVideo/bonn+sp+2.mp4"
    );
    setShowVideoInFrame(true);
    setShowVideoInBackground(false);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundImage: showVideoInBackground
          ? "none"
          : "url('./new111.png')", // Show background image if not showing video
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            handleQRDetected();
          }
          if (!!error) {
            console.error(error);
          }
        }}
        style={{ width: "100%" }}
      />

      {showVideoInFrame && (
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "80%",
            height: "80%",
            border: "10px solid #000",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
            backgroundColor: "#fff",
          }}
        >
          <video
            src={videoURL}
            autoPlay
            muted
            controls
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}

      {showVideoInBackground && (
        <video
          src={videoURL}
          autoPlay
          muted
          loop
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        />
      )}

      <video
        ref={cameraRef}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "150px",
          height: "100px",
          zIndex: 10,
          border: "2px solid #fff",
        }}
        muted
      />
    </div>
  );
};

export default QRScanner;

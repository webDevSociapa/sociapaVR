import React, { useState, useEffect } from "react";
import SwipeableEdgeDrawer from "@/components/drawer";

const QRScanner = () => {
  const [videoURL, setVideoURL] = useState(""); // Video URL
  const [showVideo, setShowVideo] = useState(false); // Toggle video mode
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 }); // Device orientation state

  const handlePlayWithSociapa = () => {
    setVideoURL(
      "https://apisindia.s3.ap-south-1.amazonaws.com/newwVideo/bonn+sp+2.mp4"
    );
    setShowVideo(true);
  };

  useEffect(() => {
    // Device motion or orientation listener
    const handleOrientation = (event) => {
      const { alpha, beta, gamma } = event;
      setOrientation({ alpha, beta, gamma });
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    // Cleanup event listener
    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundImage: "url('./new111.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${50 + orientation.gamma / 10}% ${50 + orientation.beta / 10}%`, // Adjust background position with device orientation
        transition: "background-position 0.1s ease-out", // Smooth transition for background movement
      }}
    >
      {!showVideo ? (
        <SwipeableEdgeDrawer onPlayWithSociapa={handlePlayWithSociapa} />
      ) : (
        <div className="video-container">
          <video
            src={videoURL}
            autoPlay
            muted
            controls
            className="animated-video"
            style={{
              transform: `rotate(${orientation.alpha}deg)`, // Rotate video according to the device's rotation
              position: "absolute",
              top: "50%",
              left: "50%",
              transformOrigin: "center",
              width: "80%",
              height: "auto",
              transition: "transform 0.1s ease-out", // Smooth transition for video rotation
              objectFit: "cover", // Ensure the video covers the area well
            }}
          />
        </div>
      )}
    </div>
  );
};

export default QRScanner;

import React, { useState } from "react";
import SwipeableEdgeDrawer from "@/components/drawer";

const QRScanner = () => {
  const [videoURL, setVideoURL] = useState(""); // Video URL
  const [showVideo, setShowVideo] = useState(false); // Toggle video mode

  const handlePlayWithSociapa = () => {
    setVideoURL(
      "https://apisindia.s3.ap-south-1.amazonaws.com/newwVideo/bonn+sp+2.mp4"
    );
    setShowVideo(true);
  };
  

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundImage: "url('./new111.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
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
          />
        </div>
      )}
    </div>
  );
};

export default QRScanner;

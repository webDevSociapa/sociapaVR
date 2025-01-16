import React, { useState } from "react";
import SwipeableEdgeDrawer from "@/components/drawer";

const QRScanner = () => {
  const [videoURL, setVideoURL] = useState(""); // Video URL
  const [showVideo, setShowVideo] = useState(false); // Toggle video mode

  const handlePlayWithSociapa = () => {
    setVideoURL(
      "https://apisindia.s3.ap-south-1.amazonaws.com/homeBanner/638993b4-7545-496d-815c-5d7d81c22ea4_Main+Banner+Video+02.mp4"
    );
    setShowVideo(true);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundImage: "url('./new12.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {!showVideo ? (
        <SwipeableEdgeDrawer onPlayWithSociapa={handlePlayWithSociapa} />
      ) : (
        <video
          src={videoURL}
          autoPlay
          muted
          controls
          style={{
            position: "absolute",
            top: "28%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height:"100vh",
            border: "2px solid #fff",
            borderRadius: "10px",
          }}
        />
      )}
    </div>
  );
};

export default QRScanner;

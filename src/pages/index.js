import React, { useState } from "react";
import SwipeableEdgeDrawer from "@/components/drawer";

const QRScanner = () => {
  const [videoURL, setVideoURL] = useState(""); // Video URL
  const [showVideo, setShowVideo] = useState(false); // Toggle video mode

  const handlePlayWithSociapa = () => {
    setVideoURL(
      "https://apisindia.s3.ap-south-1.amazonaws.com/homeBanner/f70925c7-972d-4c27-83bf-d82477e3202e_Jam+1440-698.mp4"
    );
    setShowVideo(true);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundImage: "url('./neww.jpg')",
        backgroundSize: "cover",
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
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "85%",
            height: "50%",
            border: "2px solid #fff",
            borderRadius: "10px",
          }}
        />
      )}
    </div>
  );
};

export default QRScanner;

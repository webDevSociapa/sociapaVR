import React, { useState, useEffect } from "react";
import SwipeableEdgeDrawer from "@/components/drawer";

const QRScanner = () => {
  const [videoURL, setVideoURL] = useState(""); // Video URL
  const [showVideo, setShowVideo] = useState(false); // Toggle video mode
  const [isDeviceMoving, setIsDeviceMoving] = useState(false); // Device movement detection

  useEffect(() => {
    const handleDeviceMotion = (event) => {
      const { accelerationIncludingGravity } = event;

      // Detect significant movement
      if (
        Math.abs(accelerationIncludingGravity.x) > 5 ||
        Math.abs(accelerationIncludingGravity.y) > 5 ||
        Math.abs(accelerationIncludingGravity.z) > 5
      ) {
        setIsDeviceMoving(true);
        setShowVideo(false); // Stop video and show background
      }
    };

    // Add device motion listener
    window.addEventListener("devicemotion", handleDeviceMotion);

    return () => {
      // Cleanup listener on unmount
      window.removeEventListener("devicemotion", handleDeviceMotion);
    };
  }, []);

  const handlePlayWithSociapa = () => {
    setVideoURL(
      "https://apisindia.s3.ap-south-1.amazonaws.com/newwVideo/bonn+sp+2.mp4"
    );
    setShowVideo(true);
    setIsDeviceMoving(false); // Reset device movement
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundImage: isDeviceMoving
          ? "url('./new111.png')"
          : "none", // Show background if device moves
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {!showVideo ? (
        <SwipeableEdgeDrawer onPlayWithSociapa={handlePlayWithSociapa} />
      ) : (
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "80%",
            height: "80%",
            border: "10px solid #000", // Newspaper-like frame
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
    </div>
  );
};

export default QRScanner;

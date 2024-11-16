"use client";
import YouTube from "react-youtube";

interface YouTubeVideoProps {
  videoId: string;
}

export const YouTubeVideo = ({ videoId }: YouTubeVideoProps) => {
  const opts = {
    height: "600",
    width: "80%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <YouTube
      className={`container flex justify-center items-center mx-auto`}
      videoId={videoId}
      opts={opts}
    />
  );
};

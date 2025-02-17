"use client";

import { Button } from "@/components/ui/button";
import { makeApiCall } from "@/hooks/api-call";
import { useAuth } from "@/hooks/auth-provider";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const page = () => {
  const { id } = useParams();

  const { accessToken } = useAuth();
  const [masterVideo, setMasterVideo] = useState({});
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [startTrimTime, setStartTrimTime] = useState(null);
  const [endTrimTime, setEndTrimTime] = useState(null);
  const [timestamps, setTimestamps] = useState([]);

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const seekBarRef = useRef(null);

  const handleSendTests = async () => {
    console.log("timestamps==>", timestamps);
    const timestampsFormated = timestamps.map((item) => {
      const start = new Date(item.start * 1000)
        .toISOString()
        .substr(11, 8)
        .replace(
          /(\d{2}):(\d{2}):(\d{2})/,
          (match, hours, minutes, seconds) =>
            `${hours.padStart(2, "0")}:${minutes.padStart(
              2,
              "0"
            )}:${seconds.padStart(2, "0")}`
        );
      const stop = new Date(item.end * 1000)
        .toISOString()
        .substr(11, 8)
        .replace(
          /(\d{2}):(\d{2}):(\d{2})/,
          (match, hours, minutes, seconds) =>
            `${hours.padStart(2, "0")}:${minutes.padStart(
              2,
              "0"
            )}:${seconds.padStart(2, "0")}`
        );
      return { start, stop };
    });

    try {
      await makeApiCall(
        `videourl/update-snip/${masterVideo?.videoURLArray[0]?._id}`,
        "POST",
        { videoSnipTimeStamp: timestampsFormated },
        {},
        accessToken
      );
    } catch (error) {}
  };

  // Handle play button
  const handlePlay = () => {
    if (videoRef1.current && videoRef2.current) {
      videoRef1.current.play();
      videoRef2.current.play();
    }
  };

  // Handle pause button
  const handlePause = () => {
    if (videoRef1.current && videoRef2.current) {
      videoRef1.current.pause();
      videoRef2.current.pause();
    }
  };

  // Update current time for both videos
  const handleTimeUpdate = () => {
    if (videoRef1.current) {
      setCurrentTime(videoRef1.current.currentTime);
      seekBarRef.current.value =
        (videoRef1.current.currentTime / duration) * 100;
    }
  };

  const handleSeek = (event) => {
    const newTime = (event.target.value / 100) * duration;
    videoRef1.current.currentTime = newTime;
    videoRef2.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Set total duration when video is loaded (assuming both videos have the same duration)
  const handleLoadedMetadata = () => {
    if (videoRef1.current) {
      setDuration(videoRef1.current.duration); // Use duration from the first video
    }
  };

  // Format time in MM:SS format
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${sec < 10 ? "0" + sec : sec}`;
  };

  // Handle start trim
  const handleStartTrim = () => {
    if (videoRef1.current) {
      setStartTrimTime(videoRef1.current.currentTime);
    }
  };

  // Handle end trim
  const handleEndTrim = () => {
    if (videoRef1.current && startTrimTime !== null) {
      setEndTrimTime(videoRef1.current.currentTime);
      handleSaveTrim(videoRef1.current.currentTime);
    }
  };

  // Save the trim range
  const handleSaveTrim = (endTrim) => {
    if (startTrimTime !== null && endTrim !== null && startTrimTime < endTrim) {
      setTimestamps([...timestamps, { start: startTrimTime, end: endTrim }]);
      setStartTrimTime(null);
      setEndTrimTime(null);
    }
  };

  const handleRemoveTimestamp = (index) => {
    setTimestamps(timestamps.filter((_, idx) => idx !== index));
  };

  // Effect to initialize duration
  useEffect(() => {
    if (videoRef1.current) {
      setDuration(videoRef1.current.duration);
    }
  }, [videoRef1.current, masterVideo]);

  const convertTimeToSeconds = (timeString: string) => {
    const parts = timeString.split(":");
    let seconds = parts[2];

    if (!seconds.includes(".")) {
      seconds += ".000";
    }

    const hours = parseInt(parts[0], 10) * 3600;
    const minutes = parseInt(parts[1], 10) * 60;
    const secondsFloat = parseFloat(seconds);

    return hours + minutes + secondsFloat;
  };

  const transformData = (data) => {
    return data?.map(({ start, stop }) => ({
      start: convertTimeToSeconds(start),
      end: convertTimeToSeconds(stop),
    }));
  };

  const getContractorById = async () => {
    try {
      const masterVideo = await makeApiCall(
        `master/${id}`,
        "GET",
        null,
        {},
        accessToken
      );
      setMasterVideo(masterVideo?.data);
      if (masterVideo?.data?.videoURLArray[0]?.videoSnipTimeStamp?.length > 0) {
        const transformedData = transformData(
          masterVideo?.data?.videoURLArray[0]?.videoSnipTimeStamp
        );

        setTimestamps((prevTimestamps) => [
          ...prevTimestamps,
          ...transformedData,
        ]);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getContractorById();
    }
  }, [accessToken]);

  return isLoading ? (
    <>Loading...</>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 50px",
      }}
    >
      <div>
        <div style={{ textAlign: "center", marginBottom: 15 }}>
          {masterVideo?.title}
        </div>
        <div className="flex gap-4 bg-gray-300 p-4">
          {masterVideo?.videoURLArray[0]?.videoURL1 && (
            <video
              ref={videoRef1}
              width="300"
              height="200"
              muted
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            >
              <source
                src={masterVideo?.videoURLArray[0]?.videoURL1}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
          {masterVideo?.videoURLArray[0]?.videoURL2 && (
            <video
              ref={videoRef2}
              width="300"
              height="200"
              muted
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            >
              <source
                src={masterVideo?.videoURLArray[0]?.videoURL2}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Seek Bar */}
        <div className="flex flex-col items-center mt-4 w-full">
          <input
            ref={seekBarRef}
            type="range"
            min="0"
            max="100"
            step="0.1"
            defaultValue="0"
            className="w-full"
            onChange={handleSeek}
          />
          <p className="mt-2">
            {currentTime.toFixed(2)}s / {duration.toFixed(2)}s
          </p>
        </div>
        {duration ? (
          <div
            style={{ marginTop: "10px", fontSize: "18px", color: "#212121" }}
          >
            {formatTime(currentTime)} /{" "}
            {duration ? formatTime(duration) : "00:00"}
          </div>
        ) : (
          <div
            style={{ marginTop: "10px", fontSize: "18px", color: "#212121" }}
          >
            Loading...
          </div>
        )}
      </div>

      <div style={{ marginRight: 20 }}>
        <div className="flex lg:flex-row flex-col items-center w-full justify-center gap-5">
          <button
            onClick={handlePlay}
            className="rounded-md bg-[#FF7645] text-white text-center py-3 lg:py-2 text-lg w-40"
          >
            Play
          </button>
          <button
            onClick={handlePause}
            className="border rounded-md border-[#474040] py-2 text-lg lg:py-1 w-40"
          >
            Pause
          </button>
        </div>
        {/* Display all trim ranges */}
        <div style={{ marginTop: "30px", display: "flex", gap: 25 }}>
          <h3>Trim Ranges:</h3>
          <ul>
            {timestamps.map((timestamp, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <span>
                  {formatTime(timestamp.start)} - {formatTime(timestamp.end)}
                </span>
                <button
                  onClick={() => handleRemoveTimestamp(index)}
                  style={{
                    marginLeft: 10,
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    color: "#FF0000",
                  }}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center w-full justify-center gap-5 mt-20">
          <button
            onClick={handleStartTrim}
            disabled={videoRef1.current?.paused}
            className="rounded-md bg-[#FF7645] text-white text-center py-3 lg:py-2 text-lg w-full"
          >
            Start Trim
          </button>
          <button
            onClick={handleEndTrim}
            disabled={videoRef1.current?.paused}
            className="border rounded-md border-[#474040] py-2 text-lg lg:py-1 w-full"
          >
            End Trim
          </button>
          <Button onClick={handleSendTests} className="bg-[#FF7645]">
            End Tests
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;

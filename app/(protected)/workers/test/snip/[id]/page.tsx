"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { makeApiCall } from "@/hooks/api-call";
import { useAuth } from "@/hooks/auth-provider";
import { Button } from "@/components/ui/button";
import TimeRanges from "@/components/core/time-ranges";
import LoadingVideoTrimmer from "@/components/skletons/loading-video-trimmer";
import { useToast } from "@/hooks/use-toast";

const SnippingDashboard = () => {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const { toast } = useToast();

  const [certificate, setCertificate] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTrimTime, setStartTrimTime] = useState<number | null>(null);
  const [endTrimTime, setEndTrimTime] = useState<number | null>(null);
  const [timestampsWithIndex, setTimestampsWithIndex] = useState<any[]>([]);
  const [showSteps, setShowSteps] = useState(false);

  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const seekBarRef = useRef<HTMLInputElement>(null);

  const formatTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const convertTimeToSeconds = (time: string) => {
    const [h, m, s] = time.split(":" ).map(Number);
    return h * 3600 + m * 60 + s;
  };

  const transformData = (data: any[]) => {
    return data.map(({ start, stop }) => ({
      start: convertTimeToSeconds(start),
      end: convertTimeToSeconds(stop),
    }));
  };

  const fetchCertificate = async () => {
    setIsLoading(true);
    try {
      const res = await makeApiCall(`certificate/${id}`, "GET", null, {}, accessToken);
      setCertificate(res?.data);

      const snips = res?.data?.videoSnipTimeStamp || [];
      const transformed = transformData(snips);
      setTimestampsWithIndex(
        transformed.map((item, idx) => ({ ...item, id: idx.toString() }))
      );
    } catch (err) {
      console.error("Failed to load certificate", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeUpdate = () => {
    const t = videoRef1.current?.currentTime || 0;
    setCurrentTime(t);
    if (seekBarRef.current) seekBarRef.current.value = String((t / duration) * 100);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef1.current?.duration || 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (videoRef1.current) videoRef1.current.currentTime = newTime;
    if (videoRef2.current) videoRef2.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handlePlayPause = () => {
    if (!videoRef1.current || !videoRef2.current) return;
    if (videoRef1.current.paused) {
      videoRef1.current.play();
      videoRef2.current.play();
    } else {
      videoRef1.current.pause();
      videoRef2.current.pause();
    }
  };

  const handleStartTrim = () => {
    if (videoRef1.current) {
      setStartTrimTime(videoRef1.current.currentTime);
      toast({ title: "Trimming Started", description: `Started at ${formatTime(videoRef1.current.currentTime)}` });
    }
  };

  const handleEndTrim = () => {
    if (videoRef1.current && startTrimTime !== null) {
      const end = videoRef1.current.currentTime;
      setEndTrimTime(end);
      if (startTrimTime < end) {
        setTimestampsWithIndex(prev => [
          ...prev,
          { start: startTrimTime, end, id: prev.length.toString() },
        ]);
        toast({ title: "Trim Saved", description: `From ${formatTime(startTrimTime)} to ${formatTime(end)}` });
      }
      setStartTrimTime(null);
      setEndTrimTime(null);
    }
  };

  const formatToHHMMSS = (t: number) => formatTime(t);

  const handleSendTimestamps = async () => {
    const formatted = timestampsWithIndex.map(({ id, start, end }) => ({
      start: formatToHHMMSS(start),
      stop: formatToHHMMSS(end),
    }));

    try {
      const res = await makeApiCall(
        `save-and-send-timestamp-to-ai/${id}`,
        "POST",
        { videoSnipTimeStamp: formatted },
        {},
        accessToken
      );
      if (res?.success) {
        toast({ title: "Success", description: "Timestamps saved and sent to AI successfully." });
        setCertificate(res.data);
      }
    } catch (err) {
      console.error("Failed to save timestamps", err);
    }
  };

  useEffect(() => {
    fetchCertificate();
  }, []);

  if (isLoading || !certificate) return <LoadingVideoTrimmer />;

  const { workerId, testId, videoAngle1, videoAngle2, isVideoSnipped } = certificate;

  return (
    <div className="container mx-auto px-4 py-6 overflow-hidden">
      <h1 className="text-xl mb-4">Snipping Dashboard of {testId?.TestTitle} - {workerId?.name}</h1>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-medium mb-1">Test Info</h2>
          <p><strong>Title:</strong> {testId?.TestTitle}</p>
        </div>

        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-medium mb-1">Worker Info</h2>
          <p><strong>Name:</strong> {workerId?.name}</p>
          <p><strong>Phone:</strong> {workerId?.phoneNumber}</p>
        </div>
      </div> */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="flex flex-col space-y-4 col-span-2">
          <div className="flex gap-4">
            {videoAngle1 && (
              <video
                ref={videoRef1}
                className="w-1/2 rounded"
                muted
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              >
                <source src={videoAngle1} type="video/mp4" />
              </video>
            )}
            {videoAngle2 && (
              <video
                ref={videoRef2}
                className="w-1/2 rounded"
                muted
              >
                <source src={videoAngle2} type="video/mp4" />
              </video>
            )}
          </div>

          <div>
            <input
              ref={seekBarRef}
              type="range"
              min="0"
              max="100"
              step="0.1"
              defaultValue="0"
              className="w-full mt-2"
              onChange={handleSeek}
            />
            <p className="text-sm mt-1">{formatTime(currentTime)} / {formatTime(duration)}</p>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-md p-4 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={handlePlayPause} className="bg-blue-600 text-white">Play / Pause</Button>
            {!isVideoSnipped && (
              <>
                <Button onClick={handleStartTrim} className="bg-orange-500 text-white">Start Trim</Button>
                <Button onClick={handleEndTrim} variant="outline">End Trim</Button>
              </>
            )}
            {!isVideoSnipped && (
              <Button onClick={handleSendTimestamps} className="bg-green-600 text-white">Save and Send to AI</Button>
            )}
            <Button onClick={() => setShowSteps(!showSteps)} variant="secondary">
              {showSteps ? "Hide Steps" : "Show Steps"}
            </Button>
          </div>

          {showSteps && (
            <div className="text-sm bg-gray-100 p-3 rounded border">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Sr. No.</th>
                    <th className="p-2 border">Step</th>
                  </tr>
                </thead>
                <tbody>
                  {testId?.steps?.map((step: string, idx: number) => (
                    <tr key={idx}>
                      <td className="p-2 border">{idx + 1}</td>
                      <td className="p-2 border">{step}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div>
            <h2 className="text-md font-medium mb-2">Trim Ranges</h2>
            <TimeRanges
              timestampsWithIndex={timestampsWithIndex}
              setTimestampsWithIndex={setTimestampsWithIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippingDashboard;

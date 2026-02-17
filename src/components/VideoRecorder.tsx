import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { createPostRecording } from "@/api/api";
import { useNavigate, useLocation } from "react-router-dom";
import RecordingInstructions from "@/pages/RecordingInstructions";

const MAX_DURATION = 30 * 60; // 30 minutes

const QUESTIONS = [
  "Please introduce yourself.",
  "What challenge did you face before using our platform?",
  "How has this platform helped you?",
  "What advice would you give to others?",
];

const VideoRecorder = () => {
  const [state, setState] = useState<"start" | "recording" | "preview">(
    "start"
  );
  const [time, setTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestionIndex] = useState(0); // dummy (future me change hoga)

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const [postText, setPostText] = useState("");

  const qrCodeId = location.state?.qrCodeId || null;
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // =========================
  // Camera
  // =========================
  useEffect(() => {
    startCamera();
    return stopMedia;
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      toast.error("Camera permission denied");
    }
  };

  const stopMedia = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
  };

  // =========================
  // AI Speak
  // =========================
  const speakQuestion = (text: string) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  // =========================
  // Recording
  // =========================
  const startRecording = () => {
    if (!streamRef.current) return;

    speakQuestion(QUESTIONS[currentQuestionIndex]);

    setState("recording");
    setIsRecording(true);
    setTime(0);
    chunks.current = [];

    const recorder = new MediaRecorder(streamRef.current, {
      mimeType: "video/webm",
    });

    recorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: "video/webm" });
      setVideoBlob(blob);
      setVideoURL(URL.createObjectURL(blob));
    };

    recorder.start();

    timerRef.current = window.setInterval(() => {
      setTime((prev) => {
        if (prev + 1 >= MAX_DURATION) {
          stopRecording();
          return MAX_DURATION;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const pauseRecording = () => {
    recorderRef.current?.pause();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resumeRecording = () => {
    recorderRef.current?.resume();
    setIsRecording(true);
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setState("preview");
  };

  const retry = () => {
    setVideoBlob(null);
    setVideoURL(null);
    setTime(0);
    setState("start");
    startCamera();
  };

  // =========================
  // Submit
  // =========================
  const submitVideo = async () => {
    if (!videoBlob) return toast.error("No video recorded");

    try {
      const file = new File([videoBlob], "recording.webm", {
        type: "video/webm",
      });

      const postDto = {
        text: postText,
        userId,
        qrCodeId,
        userConsent: "Public",
      };

      const formData = new FormData();
      formData.append("post", JSON.stringify(postDto));
      formData.append("mediaFiles", file);

      await createPostRecording(formData, token);
      toast.success("Video uploaded successfully!");
      navigate("/thank-you");
    } catch {
      toast.error("Upload failed");
    }
  };

  const format = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* LEFT */}
      <RecordingInstructions activeIndex={currentQuestionIndex} />

      {/* RIGHT */}
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-center">Record Your Video</h1>
           <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                  Add your message
                </label>
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Write something about your experience..."
                  className="w-full border rounded-md p-2"
                  rows={3}
                />
              </div>

          {state === "preview" && (
            <>
              {videoURL && (
                <video
                  src={videoURL}
                  controls
                  className="w-full h-[450px] bg-black rounded-lg"
                />
              )}

              {/* 👇 USER TEXT INPUT */}
             
              <div className="flex justify-center gap-4 mt-4">
                <Button variant="outline" onClick={retry}>
                  Try Again
                </Button>
                <Button className="bg-green-600" onClick={submitVideo}>
                  Submit Video
                </Button>
              </div>
            </>
          )}

          {state !== "preview" && (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-[450px] bg-black rounded-lg object-cover"
            />
          )}

          {state === "start" && (
            <div className="text-center">
              <Button onClick={startRecording}>Start Recording</Button>
            </div>
          )}

          {state === "recording" && (
            <>
              <p className="text-center text-blue-600 font-medium">
                AI Question: {QUESTIONS[currentQuestionIndex]}
              </p>

              <p className="text-center text-lg font-semibold">
                {format(time)} / 30:00
              </p>

              <div className="flex justify-center gap-4">
                {isRecording ? (
                  <Button variant="outline" onClick={pauseRecording}>
                    <Pause /> Pause
                  </Button>
                ) : (
                  <Button variant="outline" onClick={resumeRecording}>
                    <Play /> Resume
                  </Button>
                )}

                <Button variant="outline" onClick={retry}>
                  <RotateCcw /> Retry
                </Button>

                <Button onClick={stopRecording}>Next →</Button>
              </div>
            </>
          )}

          {state === "preview" && (
            <>
              {videoURL && (
                <video
                  src={videoURL}
                  controls
                  className="w-full h-[450px] bg-black rounded-lg"
                />
              )}

              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={retry}>
                  Try Again
                </Button>
                <Button className="bg-green-600" onClick={submitVideo}>
                  Submit Video
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoRecorder;

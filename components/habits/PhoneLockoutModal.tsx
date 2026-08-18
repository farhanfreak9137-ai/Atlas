"use client";

import { useState, useEffect, useRef } from "react";
import { usePhoneControlStore } from "@/stores/phone-control.store";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Lock,
  CheckCircle2,
  AlertOctagon,
  BookOpen,
  Timer,
  Flame,
  Camera,
  Video,
  VideoOff,
  Sparkles,
  Zap,
} from "lucide-react";

export function PhoneLockoutModal() {
  const { settings, unlockTemporary, setLockState } = usePhoneControlStore();

  // Active workout challenge state
  const [repsDone, setRepsDone] = useState(0);
  const targetReps = settings.workoutTargetReps || 20;

  // AI Camera State
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [motionPhase, setMotionPhase] = useState<"UP" | "DOWN" | "READY">("READY");
  const [aiFeedback, setAiFeedback] = useState("Position front camera facing your chest");

  // Video & Canvas Refs for Real-Time Motion Tracking
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Motion Detection Memory
  const prevLuminanceRef = useRef<number[] | null>(null);
  const statePhaseRef = useRef<"UP" | "DOWN" | "READY">("READY");

  // Reflection State
  const [reflectionText, setReflectionText] = useState("");

  // Cooldown timer state
  const [cooldownSeconds, setCooldownSeconds] = useState(300);

  useEffect(() => {
    if (settings.isPhoneLocked) {
      setRepsDone(0);
      setCameraActive(false);
      setCameraError(null);
      setMotionPhase("READY");
      setAiFeedback("Position phone facing your chest & start camera");
      setCooldownSeconds(300);
      setReflectionText("");
    }
  }, [settings.isPhoneLocked]);

  // Start Camera Stream
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
        setAiFeedback("AI Pose Tracking Active — Get into position!");
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("Camera permission denied or unavailable.");
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setCameraActive(false);
  };

  // Motion Detection Loop (Analyze Frame-by-Frame)
  useEffect(() => {
    if (!cameraActive || !videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const video = videoRef.current;

    const processFrame = () => {
      if (!video || video.paused || video.ended || !ctx) return;

      canvas.width = 160;
      canvas.height = 120;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;

      // Sample upper 40% vertical region (head & shoulders) for pushup/squat movement
      let topRegionLuminance = 0;
      let sampleCount = 0;

      for (let y = 0; y < canvas.height * 0.4; y += 4) {
        for (let x = 0; x < canvas.width; x += 4) {
          const idx = (y * canvas.width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          topRegionLuminance += (r + g + b) / 3;
          sampleCount++;
        }
      }

      const currentAvgLuminance = topRegionLuminance / (sampleCount || 1);

      if (prevLuminanceRef.current !== null) {
        const delta = currentAvgLuminance - prevLuminanceRef.current[0];

        // Motion Thresholds for Body Motion (Lowering & Rising)
        if (delta > 8 && statePhaseRef.current !== "DOWN") {
          statePhaseRef.current = "DOWN";
          setMotionPhase("DOWN");
          setAiFeedback("Body Lowered — Push back up!");
        } else if (delta < -8 && statePhaseRef.current === "DOWN") {
          statePhaseRef.current = "UP";
          setMotionPhase("UP");
          setAiFeedback("Rep Completed! Good form!");

          setRepsDone((prevReps) => {
            const nextReps = prevReps + 1;
            if (nextReps >= targetReps) {
              stopCamera();
              unlockTemporary(15);
            }
            return nextReps;
          });
        }
      }

      prevLuminanceRef.current = [currentAvgLuminance];
      animFrameRef.current = requestAnimationFrame(processFrame);
    };

    animFrameRef.current = requestAnimationFrame(processFrame);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [cameraActive, targetReps]);

  // Clean up camera on unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

  // Cooldown countdown tick
  useEffect(() => {
    if (!settings.isPhoneLocked || settings.activeUnlockCondition !== "cooldown_timer") return;

    const timer = setInterval(() => {
      setCooldownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [settings.isPhoneLocked, settings.activeUnlockCondition]);

  if (!settings.isPhoneLocked) return null;

  const workoutName =
    settings.selectedWorkoutType === "pushups"
      ? "Pushups"
      : settings.selectedWorkoutType === "burpees"
      ? "Chest-to-Floor Burpees"
      : settings.selectedWorkoutType === "squats"
      ? "Explosive Squats"
      : "Bodyweight Plank";

  const condition = settings.activeUnlockCondition || "hard_workout";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-6 animate-in fade-in duration-300">
      <GlassCard className="w-full max-w-lg p-6 sm:p-8 space-y-6 border-rose-500/40 shadow-2xl shadow-rose-950/50 relative">
        {/* Top Lock Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative">
            <div className="p-4 rounded-3xl bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
              <Lock size={36} />
            </div>
            <div className="absolute -top-1 -right-1 p-1.5 rounded-full bg-rose-600 text-white">
              <AlertOctagon size={14} />
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-rose-400 font-bold">
              Limit Exceeded ({settings.dailyLimitMinutes}m Daily Max)
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
              Phone Usage Locked
            </h2>
            <p className="text-xs text-[var(--text-secondary)] max-w-xs">
              Complete your single assigned AI camera workout challenge to grant 15 minutes of emergency phone time.
            </p>
          </div>
        </div>

        {/* SINGLE ACTIVE AI CAMERA WORKOUT CHALLENGE */}
        {condition === "hard_workout" && (
          <div className="rounded-2xl border border-rose-500/30 bg-[var(--surface-2,rgba(255,255,255,0.03))] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold">
                <Flame size={16} />
                Assigned Workout: <span className="text-white font-bold">{workoutName}</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded-md border border-rose-500/30 flex items-center gap-1">
                <Camera size={12} /> AI Motion Tracking
              </span>
            </div>

            {/* Rep Counter Banner */}
            <div className="flex items-center justify-between p-4 bg-black/60 rounded-xl border border-rose-500/30">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-semibold">
                  Repetitions Completed
                </span>
                <div className="text-3xl font-extrabold text-white font-mono tracking-wider">
                  {repsDone} <span className="text-lg text-rose-400">/ {targetReps}</span>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-md border ${
                    motionPhase === "DOWN"
                      ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                      : motionPhase === "UP"
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : "bg-white/10 text-white/60 border-white/10"
                  }`}
                >
                  {motionPhase === "DOWN" ? "LOWERING" : motionPhase === "UP" ? "PUSHING UP" : "POSITION CAMERA"}
                </span>
              </div>
            </div>

            {/* Camera Viewport & Real-Time Tracking Grid */}
            <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10 aspect-video flex items-center justify-center">
              <video
                ref={videoRef}
                playsInline
                muted
                className={`w-full h-full object-cover ${cameraActive ? "block" : "hidden"}`}
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* AI Skeleton Grid Overlay when camera is active */}
              {cameraActive && (
                <div className="absolute inset-0 pointer-events-none border-2 border-rose-500/40 rounded-2xl flex flex-col justify-between p-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-rose-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-rose-500/30">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" /> AI MOTION ACTIVE
                    </span>
                    <span>TARGET: {targetReps} REPS</span>
                  </div>

                  {/* Pose Box Guide */}
                  <div className="self-center w-48 h-32 border-2 border-dashed border-cyan-400/60 rounded-xl flex items-center justify-center">
                    <span className="text-[10px] text-cyan-300 font-mono bg-black/60 px-2 py-0.5 rounded">
                      Align Chest in Frame
                    </span>
                  </div>

                  <div className="text-center text-xs font-semibold text-white bg-black/70 backdrop-blur-md py-1.5 px-3 rounded-xl border border-white/10">
                    {aiFeedback}
                  </div>
                </div>
              )}

              {/* Camera Offline Placeholder */}
              {!cameraActive && (
                <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="p-3 rounded-2xl bg-white/5 text-white/60 border border-white/10">
                    <VideoOff size={28} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-white">Camera Motion Tracking Inactive</h4>
                    <p className="text-[11px] text-[var(--text-secondary)] max-w-xs">
                      Turn on front camera so AI can verify & count your pushups in real-time.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {cameraError && (
              <p className="text-xs text-rose-400 text-center font-medium">{cameraError}</p>
            )}

            {/* Camera Controls */}
            {!cameraActive ? (
              <button
                onClick={startCamera}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-600/30 transition-all active:scale-[0.99]"
              >
                <Video size={18} /> Start Camera AI Movement Tracking
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const next = repsDone + 1;
                    setRepsDone(next);
                    if (next >= targetReps) {
                      stopCamera();
                      unlockTemporary(15);
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2.5 text-xs font-semibold text-white border border-white/10 transition-all"
                >
                  <Zap size={14} className="text-amber-400" /> Manual Rep (+1)
                </button>
                <button
                  onClick={stopCamera}
                  className="px-4 py-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold hover:bg-rose-500/30 transition-all"
                >
                  Stop Camera
                </button>
              </div>
            )}
          </div>
        )}

        {/* HABIT & REFLECTION CHALLENGE */}
        {condition === "habit_completion" && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.03))] p-5 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <BookOpen size={16} />
              Habit Review & Intention Check-in
            </div>

            <form onSubmit={(e) => { e.preventDefault(); if (reflectionText.trim()) unlockTemporary(15); }} className="space-y-3">
              <label className="text-xs text-[var(--text-secondary)]">
                Write a 1-sentence reflection on why you need 15 extra minutes:
              </label>
              <textarea
                rows={3}
                required
                placeholder="I am using the extra 15 minutes to reply to urgent work messages..."
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-3,rgba(255,255,255,0.05))] p-3 text-sm text-white outline-none focus:border-emerald-400 transition-all resize-none"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.99]"
              >
                <CheckCircle2 size={16} /> Confirm & Unlock (+15m)
              </button>
            </form>
          </div>
        )}

        {/* COOLDOWN TIMER CHALLENGE */}
        {condition === "cooldown_timer" && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.03))] p-5 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-purple-400 text-xs font-semibold">
              <Timer size={16} />
              Mandatory Phone Cooldown
            </div>

            <div className="py-6 bg-black/40 rounded-xl border border-white/10 space-y-1">
              <span className="text-xs text-[var(--text-secondary)]">Time Remaining</span>
              <div className="text-4xl font-extrabold text-white font-mono tracking-wider">
                {Math.floor(cooldownSeconds / 60)}:
                {(cooldownSeconds % 60).toString().padStart(2, "0")}
              </div>
            </div>

            <button
              disabled={cooldownSeconds > 0}
              onClick={() => unlockTemporary(15)}
              className={`w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                cooldownSeconds <= 0
                  ? "bg-purple-500 text-black hover:bg-purple-600 shadow-lg shadow-purple-500/20"
                  : "bg-white/10 text-white/40 cursor-not-allowed border border-white/10"
              }`}
            >
              {cooldownSeconds <= 0 ? "Unlock Now (+15m)" : "Cooldown Active..."}
            </button>
          </div>
        )}

        {/* Dismiss Test Lock Button */}
        <div className="pt-1 text-center">
          <button
            onClick={() => { stopCamera(); setLockState(false); }}
            className="text-xs text-white/40 hover:text-white/70 transition-all underline"
          >
            Dismiss Lockout Test
          </button>
        </div>
      </GlassCard>
    </div>
  );
}

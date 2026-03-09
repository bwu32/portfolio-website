"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Background from "@/app/components/Background";
import CursorGlow from "@/app/components/CursorGlow";

export default function SecretContent() {
  const router = useRouter();

  // Password gate
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [shake, setShake] = useState(false);

  // Call / camera / video states
  const [showCall, setShowCall] = useState(false);
  const [cameraPhase, setCameraPhase] = useState<"fullscreen" | "pip" | null>(null);
  const [callAnswered, setCallAnswered] = useState(false);

  // Clock
  const [clockTime, setClockTime] = useState("");

  // Slide
  const [slideX, setSlideX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const pillRef = useRef<HTMLDivElement>(null);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraVideoRef = useRef<HTMLVideoElement>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const ringAudioRef = useRef<HTMLAudioElement | null>(null);
  const connectAudioRef = useRef<HTMLAudioElement | null>(null);

  // ── POPSTATE (back button) ──
  const popStateHandlerRef = useRef<() => void>(() => {});
  useEffect(() => {
    popStateHandlerRef.current = () => {
      if (callAnswered || cameraPhase) {
        setCallAnswered(false);
        setCameraPhase(null);
        stopCamera();
        setShowCall(true);
        setSlideX(0);
      } else if (showCall) {
        stopRing();
        setShowCall(false);
        exitFullscreen();
      }
    };
  }, [callAnswered, showCall, cameraPhase]);

  useEffect(() => {
    const handler = () => popStateHandlerRef.current();
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  // Push history when call screen opens
  useEffect(() => {
    if (showCall) window.history.pushState({ secret: "call" }, "");
  }, [showCall]);

  // Clock
  useEffect(() => {
    function tick() {
      const now = new Date();
      setClockTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Autoplay video when callAnswered
  useEffect(() => {
    if (callAnswered && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [callAnswered]);

  // Sync camera stream → video element whenever cameraPhase changes
  useEffect(() => {
    if (cameraPhase && cameraVideoRef.current && cameraStreamRef.current) {
      cameraVideoRef.current.srcObject = cameraStreamRef.current;
    }
  }, [cameraPhase]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRing();
      cameraStreamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  // ── AUDIO HELPERS ──
  function startRing() {
    if (ringAudioRef.current) return;
    const audio = new Audio("/icons/secret/ring.mp3");
    audio.loop = true;
    audio.play().catch(() => {});
    ringAudioRef.current = audio;
  }

  function stopRing() {
    if (ringAudioRef.current) {
      ringAudioRef.current.pause();
      ringAudioRef.current.currentTime = 0;
      ringAudioRef.current = null;
    }
  }

  function playPickupSound() {
    const audio = new Audio("/icons/secret/connect.mp3");
    audio.play().catch(() => {});
    connectAudioRef.current = audio;
  }

  // ── CAMERA HELPERS ──
  async function startCamera(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      cameraStreamRef.current = stream;
      return true;
    } catch {
      return false;
    }
  }

  function stopCamera() {
    cameraStreamRef.current?.getTracks().forEach(t => t.stop());
    cameraStreamRef.current = null;
  }

  // ── FULLSCREEN HELPERS ──
  function enterFullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if ((el as any).webkitRequestFullscreen) {
      (el as any).webkitRequestFullscreen();
    } else if ((el as any).mozRequestFullScreen) {
      (el as any).mozRequestFullScreen();
    } else if ((el as any).msRequestFullscreen) {
      (el as any).msRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
      else if ((document as any).webkitExitFullscreen) (document as any).webkitExitFullscreen();
    }
  }

  // ── ANSWER FLOW ──
  async function handleAnswer() {
    stopRing();
    playPickupSound();
    window.history.pushState({ secret: "video" }, "");

    const hasCamera = await startCamera();
    if (hasCamera) {
      // Hide call screen and show camera in the same render — no gap
      setCameraPhase("fullscreen");
      setShowCall(false);
      // Wait for the fullscreen frame to paint before starting the pip transition
      requestAnimationFrame(() => {
        setTimeout(() => {
          setCameraPhase("pip");
          setCallAnswered(true);
        }, 600);
      });
    } else {
      setShowCall(false);
      setCallAnswered(true);
    }
  }

  // ── PASSWORD ──
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.toLowerCase() === "fortnite") {
      setUnlocked(true);
    } else {
      setShake(true);
      setTimeout(() => router.push("/"), 600);
    }
  }

  // ── SLIDE TO ANSWER ──
  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX - slideX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return;
    const pill = pillRef.current;
    if (!pill) return;
    const maxSlide = pill.offsetWidth - 56 - 12;
    const newX = Math.max(0, Math.min(e.clientX - startXRef.current, maxSlide));
    setSlideX(newX);
    if (newX >= maxSlide * 0.82) {
      isDraggingRef.current = false;
      setIsDragging(false);
      handleAnswer();
    }
  }

  function handlePointerUp() {
    isDraggingRef.current = false;
    setIsDragging(false);
    setSlideX(0);
  }

  // ── CAMERA STYLE ──
  const cameraStyle: React.CSSProperties =
    cameraPhase === "fullscreen"
      ? {
          position: "fixed",
          zIndex: 60,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100dvh",
          borderRadius: 0,
          overflow: "hidden",
          transition:
            "top 0.85s cubic-bezier(0.4,0,0.2,1), left 0.85s cubic-bezier(0.4,0,0.2,1), width 0.85s cubic-bezier(0.4,0,0.2,1), height 0.85s cubic-bezier(0.4,0,0.2,1), border-radius 0.85s cubic-bezier(0.4,0,0.2,1)",
        }
      : {
          position: "fixed",
          zIndex: 60,
          top: 16,
          left: "calc(100vw - 136px)",
          width: 120,
          height: 160,
          borderRadius: 8,
          overflow: "hidden",
          border: "2px solid rgba(255,255,255,0.22)",
          boxShadow: "0 4px 28px rgba(0,0,0,0.65)",
          transition:
            "top 0.85s cubic-bezier(0.4,0,0.2,1), left 0.85s cubic-bezier(0.4,0,0.2,1), width 0.85s cubic-bezier(0.4,0,0.2,1), height 0.85s cubic-bezier(0.4,0,0.2,1), border-radius 0.85s cubic-bezier(0.4,0,0.2,1)",
        };

  return (
    <main className="min-h-screen w-full relative">
      <div className="fixed inset-0 -z-10"><Background /></div>
      <CursorGlow />

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%  { transform: translateX(-10px); }
          40%  { transform: translateX(10px); }
          60%  { transform: translateX(-8px); }
          80%  { transform: translateX(8px); }
        }
        @keyframes callPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52,199,89,0.4); }
          60%       { box-shadow: 0 0 0 22px rgba(52,199,89,0); }
        }
        @keyframes glint {
          0%   { background-position: -250% center; }
          100% { background-position: 250% center; }
        }
        .slide-label {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.45) 20%,
            rgba(255,255,255,0.95) 50%,
            rgba(255,255,255,0.45) 80%
          );
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: glint 5s linear infinite;
        }
      `}</style>

      {!unlocked ? (
        /* ── PASSWORD GATE ── */
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-6">classified</p>
          <h1 className="text-6xl md:text-8xl font-['Impact'] text-[#E8DDB5] mb-2 tracking-wide">???</h1>
          <p className="text-white/40 text-sm mb-10 tracking-widest uppercase">enter password to continue</p>

          <form
            onSubmit={handleSubmit}
            className={`flex flex-col items-center gap-4 w-full max-w-xs ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              autoFocus
              className="w-full px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white text-center tracking-[0.3em] text-sm placeholder:text-white/20 placeholder:tracking-[0.3em] focus:outline-none focus:border-white/30 transition-colors"
            />
            <button
              type="submit"
              className="relative overflow-hidden px-10 py-3 rounded-full bg-[#2b366d]/40 border border-white/10 text-white text-xs font-bold tracking-[0.3em] uppercase hover:bg-[#2b366d]/70 active:scale-95 transition-all"
            >
              <span className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
              <span className="relative z-10">ENTER</span>
            </button>
          </form>
        </div>
      ) : (
        <>
          {/* ── SECRET CONTENT ── */}
          <div className="min-h-screen py-12 px-6 md:px-60">
            <Link href="/" className="group text-2xl text-white mb-2 opacity-50 hover:opacity-100 transition-opacity inline-flex items-center gap-2">
              <span className="relative -top-[2px] text-3xl leading-none transform transition-transform duration-300 group-hover:-translate-x-2">&laquo;</span>
              <span className="tracking-wide">BRIAN WU</span>
            </Link>

            <h1 className="text-7xl md:text-8xl font-['Impact'] text-[#E8DDB5] -ml-1 leading-none mt-2 mb-2">
              SECRET PAGE
            </h1>
            <p className="text-lg text-white/50 mb-12 max-w-[500px] leading-relaxed">
              now this is REALLY awesome.
            </p>

            <div className="space-y-8 max-w-2xl">
              <div className="border border-white/10 rounded-2xl p-8 bg-white/[0.02]">
                <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-4">fun facts</h2>
                <ul className="space-y-3 text-white/60 text-sm leading-relaxed list-none">
                  <li className="border-l border-white/20 pl-4">this website was built entirely with next.js, tailwind, and pure vibes.</li>
                  <li className="border-l border-white/20 pl-4">the background animation is a custom shader. yes i know it&apos;s cool.</li>
                  <li className="border-l border-white/20 pl-4">the password was fortnite. of course it was.</li>
                  <li className="border-l border-white/20 pl-4">you are officially one of the few people of all time. congratulations.</li>
                </ul>
              </div>

              <div className="border border-white/10 rounded-2xl p-8 bg-white/[0.02]">
                <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-4">you earned this</h2>
                <p className="text-[#E8DDB5] text-4xl font-['Impact'] tracking-wider">#1 VICTORY ROYALE</p>
                <p className="text-white/40 text-xs mt-2 uppercase tracking-widest">awarded to secret page discoverers only</p>
              </div>

              {/* SOUP OR MAN */}
              <button
                onClick={() => {
                  setCallAnswered(false);
                  setCameraPhase(null);
                  setSlideX(0);
                  setShowCall(true);
                  // Request fullscreen after render, audio after fullscreen is granted
                  requestAnimationFrame(() => {
                    enterFullscreen();
                    setTimeout(() => startRing(), 80);
                  });
                }}
                className="w-full text-left border border-white/10 rounded-2xl p-8 bg-white/[0.02] hover:bg-white/[0.05] active:scale-[0.98] transition-all group"
              >
                <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-2 group-hover:text-[#E8DDB5] transition-colors">
                  SOUP OR MAN
                </h2>
                <p className="text-white/40 text-sm">family night 48</p>
              </button>
            </div>

            <p className="mt-24 text-[10px] text-white/30 uppercase tracking-[0.5em] font-bold">BRIAN WU © 2026 — shhhh</p>
          </div>

          {/* ── IPHONE CALL SCREEN ── */}
          {showCall && (
            <div
              className="fixed inset-0 z-50 flex flex-col select-none"
              style={{ background: "linear-gradient(170deg, #0d1b2e 0%, #162840 50%, #0a141e 100%)", height: "100dvh" }}
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] left-0 w-[65vw] h-[65vw] rounded-full bg-blue-900/30 blur-[120px]" />
                <div className="absolute bottom-0 -right-[5%] w-[55vw] h-[55vw] rounded-full bg-slate-700/20 blur-[100px]" />
              </div>

              {/* Status bar */}
              <div className="relative z-10 flex justify-between items-center px-7 pt-4 pb-1">
                <span className="text-white text-[15px] font-semibold tabular-nums">{clockTime}</span>
                <div className="flex items-center gap-[5px]">
                  <div className="flex gap-[2px] items-end h-[10px]">
                    {[4, 6, 8, 10].map((h, i) => (
                      <div key={i} className="w-[3px] rounded-sm bg-white" style={{ height: `${h}px`, opacity: i < 3 ? 1 : 0.35 }} />
                    ))}
                  </div>
                  <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                    <circle cx="7.5" cy="9.5" r="1.5" fill="white" />
                    <path d="M3.8 6.8a5.2 5.2 0 0 1 7.4 0" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                    <path d="M1 4a9 9 0 0 1 13 0" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.45" />
                  </svg>
                  <div className="flex items-center gap-[2px]">
                    <div className="relative w-[22px] h-[11px] rounded-[3px] border-[1.3px] border-white/70 flex items-center px-[2px]">
                      <div className="w-full h-[5.5px] bg-white rounded-sm" />
                    </div>
                    <div className="w-[2px] h-[5px] bg-white/50 rounded-r-[1px]" />
                  </div>
                </div>
              </div>

              {/* Caller info */}
              <div className="relative z-10 flex flex-col items-center pt-10 px-8">
                <p className="text-white/55 text-sm font-medium tracking-[0.22em] uppercase mb-5">incoming call</p>
                <div
                  className="w-[104px] h-[104px] rounded-full bg-gradient-to-br from-[#2a3d55] to-[#111e2e] border border-white/10 flex items-center justify-center mb-6 shadow-2xl"
                  style={{ animation: "callPulse 2.2s ease-in-out infinite" }}
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8.5" r="4" fill="rgba(255,255,255,0.4)" />
                    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="rgba(255,255,255,0.4)" />
                  </svg>
                </div>
                <h1
                  className="text-white text-[44px] font-semibold tracking-tight leading-tight text-center"
                  style={{ fontFamily: "-apple-system, 'SF Pro Display', BlinkMacSystemFont, sans-serif" }}
                >
                  Unknown Caller
                </h1>
              </div>

              {/* Bottom controls */}
              <div className="relative z-10 mt-auto pb-14 px-10 flex flex-col items-center gap-7">
                <div className="flex justify-between w-full max-w-[280px]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-[58px] h-[58px] rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(16px)" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="13" r="7" stroke="white" strokeWidth="1.6" />
                        <path d="M12 10.5v3l1.5 1.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 6V4" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M10 3.5h4" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="text-white/70 text-xs font-medium">Remind Me</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-[58px] h-[58px] rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(16px)" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H7l-4 4V6c0-1.1.9-2 2-2z" stroke="white" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-white/70 text-xs font-medium">Message</span>
                  </div>
                </div>

                {/* Slide to answer pill */}
                <div
                  ref={pillRef}
                  className="relative w-full max-w-[300px] h-[68px] rounded-full flex items-center px-[6px] overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.13)", backdropFilter: "blur(24px)" }}
                >
                  <span
                    className="slide-label absolute inset-0 flex items-center justify-center text-[15px] font-medium tracking-wide pointer-events-none select-none"
                    style={{ opacity: Math.max(0, 1 - slideX / 70) }}
                  >
                    slide to answer
                  </span>
                  <div
                    className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 touch-none"
                    style={{
                      background: "white",
                      transform: `translateX(${slideX}px)`,
                      transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                      cursor: isDragging ? "grabbing" : "grab",
                    }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 4.99 3 4.45 3.45 4 4 4h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02L6.6 10.8z" fill="#34c759" />
                    </svg>
                  </div>
                </div>

                {/* Decline */}
                <button
                  onClick={() => { stopRing(); setShowCall(false); exitFullscreen(); }}
                  className="w-[66px] h-[66px] rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform"
                  style={{ background: "#ff3b30" }}
                  aria-label="Decline"
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 4.99 3 4.45 3.45 4 4 4h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02L6.6 10.8z" fill="white" transform="rotate(135 12 12)" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ── CAMERA (fullscreen → PiP) ── */}
          {cameraPhase && (
            <div style={cameraStyle}>
              <video
                ref={cameraVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ transform: "scaleX(-1)" }}
              />
            </div>
          )}

          {/* ── VIDEO ── */}
          {callAnswered && (
            <div className="fixed inset-0 z-50 bg-black" style={{ height: "100dvh" }}>
              <video
                ref={videoRef}
                src="/icons/secret/facetime.mp4"
                className="w-full h-full object-cover"
                playsInline
                autoPlay
                onEnded={() => {
                  setCallAnswered(false);
                  setCameraPhase(null);
                  stopCamera();
                  setShowCall(true);
                  setSlideX(0);
                }}
              />
            </div>
          )}
        </>
      )}
    </main>
  );
}

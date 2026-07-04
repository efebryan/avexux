"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, HelpCircle, AlertCircle, Play, Coins, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface SpinWheelProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}

interface Sector {
  label: string;
  color: string;
  isWin: boolean;
  value?: number;
  type?: "cash" | "premium" | "gift";
}

const sectors: Sector[] = [
  { label: "₦1,000 Cash", color: "#10b981", isWin: true, value: 1000, type: "cash" },
  { label: "Try Again 😢", color: "#64748b", isWin: false },
  { label: "Premium Pro", color: "#3b82f6", isWin: true, type: "premium" },
  { label: "Better Luck 🍀", color: "#475569", isWin: false },
  { label: "₦5,000 Gift", color: "#8b5cf6", isWin: true, value: 5000, type: "gift" },
  { label: "Try Again 😢", color: "#64748b", isWin: false },
  { label: "₦10,000 Cash", color: "#eab308", isWin: true, value: 10000, type: "cash" },
  { label: "Better Luck 🍀", color: "#475569", isWin: false },
];

export function SpinWheel({ balance, setBalance }: SpinWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinsLeft, setSpinsLeft] = useState(1);
  const spinCost = 500;

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [resultSector, setResultSector] = useState<Sector | null>(null);

  // Rotation properties
  const angleRef = useRef(0);
  const spinTimeoutRef = useRef<number | null>(null);

  // Draw the wheel on canvas
  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const r = width / 2 - 10;
    const cx = width / 2;
    const cy = height / 2;

    ctx.clearRect(0, 0, width, height);

    const arcAngle = (2 * Math.PI) / sectors.length;

    sectors.forEach((sec, idx) => {
      const startAngle = angleRef.current + idx * arcAngle;
      const endAngle = startAngle + arcAngle;

      // Draw Sector Arc
      ctx.beginPath();
      ctx.fillStyle = sec.color;
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startAngle, endAngle);
      ctx.lineTo(cx, cy);
      ctx.fill();

      // Outer border highlight for active/sectors
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Sector Text
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(startAngle + arcAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px Inter, sans-serif";
      
      // Text Offset adjustment
      ctx.fillText(sec.label, r - 20, 4);
      ctx.restore();
    });

    // Draw Outer Rim
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 6;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(cx, cy, r + 4, 0, 2 * Math.PI);
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center Hub (Small Inner Circle)
    ctx.beginPath();
    ctx.arc(cx, cy, 25, 0, 2 * Math.PI);
    ctx.fillStyle = "#1e293b";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.stroke();
  };

  useEffect(() => {
    drawWheel();
  }, []);

  // Web Audio Ticking Sound
  const playTickSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(300, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      // Audio context failed to load/safari rules
    }
  };

  const spin = () => {
    if (isSpinning) return;

    const currentSpins = spinsLeft;
    const cost = currentSpins > 0 ? 0 : spinCost;

    if (cost > balance) {
      toast.error("Insufficient balance to buy a spin!");
      return;
    }

    setIsSpinning(true);
    if (cost > 0) {
      setBalance((prev) => prev - cost);
    } else {
      setSpinsLeft((prev) => prev - 1);
    }

    // Determine target slice randomly
    const targetIdx = Math.floor(Math.random() * sectors.length);
    const arcAngle = (2 * Math.PI) / sectors.length;

    // Calculate angles
    // 0 index is at right (3 o'clock). Center pin is at top (12 o'clock / -90 deg / 1.5 * Math.PI)
    // We want the wheel rotation to align the selected index with the top pointer.
    const pointerAngle = 1.5 * Math.PI; 
    const finalAngle = pointerAngle - (targetIdx * arcAngle + arcAngle / 2);
    
    // Add multiple full rotations (5-7 full spins)
    const rotations = 2 * Math.PI * (5 + Math.floor(Math.random() * 3));
    const targetRotation = rotations + finalAngle;

    const startRot = angleRef.current % (2 * Math.PI);
    const dist = targetRotation - startRot;

    const duration = 4000; // 4 seconds
    const start = performance.now();

    // Audio tracking
    let lastTickAngle = startRot;
    const tickInterval = arcAngle;

    const animateSpin = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      angleRef.current = startRot + dist * ease;

      // Play tick sound when sector boundary crossed
      if (Math.abs(angleRef.current - lastTickAngle) >= tickInterval) {
        playTickSound();
        lastTickAngle = angleRef.current;
      }

      drawWheel();

      if (progress < 1) {
        spinTimeoutRef.current = requestAnimationFrame(animateSpin);
      } else {
        setIsSpinning(false);
        const wonItem = sectors[targetIdx];
        setResultSector(wonItem);
        setModalOpen(true);

        if (wonItem.isWin && wonItem.value) {
          setBalance((prev) => prev + (wonItem.value || 0));
        }
      }
    };

    spinTimeoutRef.current = requestAnimationFrame(animateSpin);
  };

  return (
    <Card className="p-5 max-w-xl mx-auto rounded-xl border border-gray-100 shadow-lg bg-white flex flex-col items-center relative overflow-hidden">
      <div className="text-center mb-6">
        <h2 className="text-xl font-extrabold text-gray-900 flex items-center justify-center gap-1.5">
          <Trophy className="w-5 h-5 text-yellow-500" /> Lucky Rewards Spin Wheel
        </h2>
        <p className="text-xs text-gray-500 mt-1 max-w-sm">
          Spin the wheel of fortune! Win instant cash bonuses, premium status, and gift card packages.
        </p>
      </div>

      {/* Main Wheel View */}
      <div className="relative mb-6 flex justify-center items-center">
        {/* Top Pointer Indicator */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-red-500 drop-shadow-md"></div>
        
        <canvas 
          ref={canvasRef} 
          width={280} 
          height={280} 
          className="rounded-full shadow-2xl relative z-10 bg-slate-900 border-4 border-slate-800"
        />
      </div>

      {/* Spin Controls */}
      <div className="w-full flex flex-col items-center gap-3">
        <div className="flex gap-4 text-xs font-bold text-gray-600 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 shadow-inner">
          <span className="flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5 text-blue-500" /> Free Spins: {spinsLeft}
          </span>
          <span className="flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-yellow-500" /> Spin Cost: ₦{spinCost}
          </span>
        </div>

        <Button 
          onClick={spin}
          disabled={isSpinning}
          className="w-full max-w-[240px] bg-[#0f8538] hover:bg-[#0c6b2c] text-white font-bold rounded-xl shadow-md h-9 text-sm flex items-center justify-center gap-1.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-white" />
          {isSpinning ? "Spinning..." : spinsLeft > 0 ? "Spin for FREE" : `Pay ₦${spinCost} & Spin`}
        </Button>
      </div>

      {/* Results Triggered Modal Dialog */}
      {resultSector && (
        <Dialog open={modalOpen} onOpenChange={(open) => !open && setModalOpen(false)}>
          <DialogContent className="max-w-sm sm:rounded-xl border-0 shadow-2xl p-5 text-center bg-white">
            <div className="py-4 flex flex-col items-center">
              {resultSector.isWin ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                    <Trophy className="w-6 h-6 text-[#0f8538]" />
                  </div>
                  <DialogTitle className="text-base font-bold text-gray-900 leading-tight">
                    Congratulations! 🥳
                  </DialogTitle>
                  <DialogDescription className="text-xs text-gray-600 mt-2">
                    You spun the wheel and won <strong className="text-gray-900">{resultSector.label}</strong>! 
                    {resultSector.value ? ` The bonus of ₦${resultSector.value.toLocaleString()} has been credited to your wallet.` : " Your prize package is being set up."}
                  </DialogDescription>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                    <AlertCircle className="w-6 h-6 text-amber-600" />
                  </div>
                  <DialogTitle className="text-base font-bold text-gray-900 leading-tight">
                    Better luck next time! 🍀
                  </DialogTitle>
                  <DialogDescription className="text-xs text-gray-600 mt-2">
                    Oh! You landed on {resultSector.label}. Don't worry, try again on your next available spin!
                  </DialogDescription>
                </>
              )}
            </div>
            
            <div className="mt-2 flex justify-center pb-1">
              <Button 
                onClick={() => setModalOpen(false)}
                className="w-full max-w-[120px] bg-[#0f8538] hover:bg-[#0c6b2c] text-white rounded-lg h-8 text-xs font-bold shadow-md"
              >
                Okay
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}

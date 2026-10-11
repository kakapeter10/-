import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, CheckCircle, Palette } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';
import { useGame } from '../context/GameContext';

interface TracingCanvasProps {
  digitStr: string;
  wordStr: string;
}

export const TracingCanvas: React.FC<TracingCanvasProps> = ({ digitStr, wordStr }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#EF4444');
  const [hasDrawn, setHasDrawn] = useState(false);
  const { language, t, addStars, speakCurrentLanguage } = useGame();

  const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 160px "Fredoka", "Readex Pro", sans-serif';
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash([8, 8]);
    ctx.strokeText(digitStr, canvas.width / 2, canvas.height / 2 + 10);

    ctx.fillStyle = '#F8FAFC';
    ctx.fillText(digitStr, canvas.width / 2, canvas.height / 2 + 10);
    ctx.restore();
  };

  useEffect(() => {
    setupCanvas();
    setHasDrawn(false);
  }, [digitStr]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 16;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setLineDash([]);
    setIsDrawing(true);
    setHasDrawn(true);
    soundEffects.playButtonClick();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleFinishTracing = () => {
    if (!hasDrawn) return;
    soundEffects.playSuccess();
    speakCurrentLanguage(
      language === 'en'
        ? `Splendid! You drew number ${digitStr} wonderfully!`
        : language === 'fr'
        ? `Magnifique ! Tu as tracé le nombre ${digitStr} avec brio !`
        : `أحسنت رسم الرقم ${digitStr}! خطك جميل جداً!`
    );
    addStars(1);
    setHasDrawn(false);
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-2xl p-4 border border-amber-200/80 shadow-xs">
      <div className="flex items-center justify-between w-full mb-3">
        <span className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-amber-500" />
          {t.numbers.tracePrompt}
        </span>
        <button
          onClick={() => {
            soundEffects.playButtonClick();
            setupCanvas();
            setHasDrawn(false);
          }}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.numbers.clearCanvas}</span>
        </button>
      </div>

      <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-amber-300 bg-amber-50/20 touch-none shadow-inner">
        <canvas
          ref={canvasRef}
          width={280}
          height={240}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="cursor-crosshair w-[280px] h-[240px]"
        />
      </div>

      <div className="flex items-center justify-between w-full mt-3 gap-2">
        <div className="flex items-center gap-1.5">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => {
                soundEffects.playButtonClick();
                setStrokeColor(c);
              }}
              style={{ backgroundColor: c }}
              className={`w-6 h-6 rounded-full cursor-pointer transition-transform ${
                strokeColor === c ? 'scale-125 ring-2 ring-offset-2 ring-slate-400' : 'hover:scale-110'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleFinishTracing}
          disabled={!hasDrawn}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer transition-all ${
            hasDrawn
              ? 'bg-emerald-500 text-white shadow-xs hover:bg-emerald-600 active:scale-95'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5" />
          <span>{t.numbers.finishTracing}</span>
        </button>
      </div>
    </div>
  );
};

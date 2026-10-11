import React, { useState, useRef, useEffect } from 'react';
import {
  Square,
  Circle,
  Triangle,
  Paintbrush,
  Volume2,
  RotateCcw,
  Star,
  Smile,
  Pipette,
  Check,
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';
import { useGame } from '../context/GameContext';

type ColoringShapeType = 'square' | 'circle' | 'triangle';
type ColoringMode = 'fill' | 'brush';

interface ColorOption {
  id: string;
  nameAr: string;
  nameEn: string;
  nameFr: string;
  hex: string;
  ringClass: string;
  isRainbow?: boolean;
}

const PALETTE_COLORS: ColorOption[] = [
  { id: 'red', nameAr: 'أَحْمَر', nameEn: 'Red', nameFr: 'Rouge', hex: '#EF4444', ringClass: 'ring-red-400' },
  { id: 'blue', nameAr: 'أَزْرَق', nameEn: 'Blue', nameFr: 'Bleu', hex: '#3B82F6', ringClass: 'ring-blue-400' },
  { id: 'yellow', nameAr: 'أَصْفَر', nameEn: 'Yellow', nameFr: 'Jaune', hex: '#FBBF24', ringClass: 'ring-yellow-400' },
  { id: 'green', nameAr: 'أَخْضَر', nameEn: 'Green', nameFr: 'Vert', hex: '#10B981', ringClass: 'ring-emerald-400' },
  { id: 'orange', nameAr: 'بُرْتُقَالِي', nameEn: 'Orange', nameFr: 'Orange', hex: '#F97316', ringClass: 'ring-orange-400' },
  { id: 'purple', nameAr: 'بَنَفْسَجِي', nameEn: 'Purple', nameFr: 'Violet', hex: '#8B5CF6', ringClass: 'ring-purple-400' },
  { id: 'pink', nameAr: 'وَرْدِي', nameEn: 'Pink', nameFr: 'Rose', hex: '#EC4899', ringClass: 'ring-pink-400' },
  { id: 'cyan', nameAr: 'سَمَاوِي', nameEn: 'Sky Blue', nameFr: 'Bleu Ciel', hex: '#06B6D4', ringClass: 'ring-cyan-400' },
  { id: 'brown', nameAr: 'بُنِّي', nameEn: 'Brown', nameFr: 'Marron', hex: '#8D6E63', ringClass: 'ring-amber-700' },
  { id: 'rainbow', nameAr: 'قَوْسُ قُزَح', nameEn: 'Rainbow', nameFr: 'Arc-en-ciel', hex: 'linear-gradient(135deg, #EF4444, #FBBF24, #10B981, #3B82F6, #8B5CF6)', ringClass: 'ring-pink-500', isRainbow: true },
];

export const ShapeColoringModule: React.FC = () => {
  const { language, t, addStars, speakCurrentLanguage } = useGame();

  // Active shape
  const [activeShape, setActiveShape] = useState<ColoringShapeType>('square');
  // Fill color per shape
  const [shapeColors, setShapeColors] = useState<Record<ColoringShapeType, string>>({
    square: '#60A5FA', // nice friendly blue default
    circle: '#FBBF24', // friendly yellow default
    triangle: '#F87171', // friendly coral default
  });
  // Active palette color
  const [selectedColor, setSelectedColor] = useState<ColorOption>(PALETTE_COLORS[0]);
  // Mode: Instant Fill or Freehand Brush
  const [mode, setMode] = useState<ColoringMode>('fill');
  // Brush size
  const [brushSize, setBrushSize] = useState<number>(18);
  // Cute cartoon face overlay toggle
  const [showFace, setShowFace] = useState<boolean>(true);
  // Pattern style: 'plain' | 'polka' | 'stars' | 'stripes'
  const [pattern, setPattern] = useState<'plain' | 'polka' | 'stars' | 'stripes'>('plain');
  // Winking animation state
  const [isWinking, setIsWinking] = useState<boolean>(false);
  // Celebration stars animation
  const [celebrating, setCelebrating] = useState<boolean>(false);
  // Feedback message
  const [cheerMessage, setCheerMessage] = useState<string | null>(null);

  // Brush drawing canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawnWithBrush, setHasDrawnWithBrush] = useState(false);

  // Clear brush canvas when switching shapes or manually
  const clearBrushCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawnWithBrush(false);
  };

  useEffect(() => {
    clearBrushCanvas();
  }, [activeShape]);

  // Handle color click
  const handleSelectColor = (color: ColorOption) => {
    soundEffects.playButtonClick();
    setSelectedColor(color);
    const colorName = language === 'en' ? color.nameEn : language === 'fr' ? color.nameFr : color.nameAr;
    speakCurrentLanguage(colorName);
  };

  // Handle shape change
  const handleSelectShape = (shape: ColoringShapeType) => {
    soundEffects.playButtonClick();
    setActiveShape(shape);
    const shapeName =
      shape === 'square'
        ? t.skills.squareTitle
        : shape === 'circle'
        ? t.skills.circleTitle
        : t.skills.triangleTitle;
    speakCurrentLanguage(shapeName);
  };

  // Instant tap fill
  const handleFillShape = () => {
    if (mode === 'brush') return;
    soundEffects.playPop();
    const newColor = selectedColor.isRainbow
      ? 'url(#rainbowGrad)'
      : selectedColor.hex;

    setShapeColors((prev) => ({
      ...prev,
      [activeShape]: newColor,
    }));

    const shapeName =
      activeShape === 'square'
        ? (language === 'en' ? 'Square' : language === 'fr' ? 'Carré' : 'المربع')
        : activeShape === 'circle'
        ? (language === 'en' ? 'Circle' : language === 'fr' ? 'Cercle' : 'الدائرة')
        : (language === 'en' ? 'Triangle' : language === 'fr' ? 'Triangle' : 'المثلث');
    const colorName =
      language === 'en' ? selectedColor.nameEn : language === 'fr' ? selectedColor.nameFr : selectedColor.nameAr;

    setCheerMessage(`🎨 ${shapeName} + ${colorName}!`);
    setTimeout(() => setCheerMessage(null), 3000);
  };

  // Brush events
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (mode !== 'brush') return;
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
    ctx.strokeStyle = selectedColor.isRainbow ? '#EC4899' : selectedColor.hex;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    setIsDrawing(true);
    setHasDrawnWithBrush(true);
    soundEffects.playButtonClick();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || mode !== 'brush') return;
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

  // Winking face reaction on tap
  const handleFaceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playPop();
    setIsWinking(true);
    setTimeout(() => setIsWinking(false), 900);
  };

  // Reset coloring
  const handleReset = () => {
    soundEffects.playButtonClick();
    clearBrushCanvas();
    setShapeColors((prev) => ({
      ...prev,
      [activeShape]: '#F1F5F9', // light gray reset
    }));
  };

  // Finish and earn Star
  const handleFinish = () => {
    soundEffects.playStarSparkle();
    soundEffects.playSuccess();
    addStars(1);
    setCelebrating(true);
    const shapeName =
      activeShape === 'square'
        ? (language === 'en' ? 'square' : language === 'fr' ? 'carré' : 'المربع')
        : activeShape === 'circle'
        ? (language === 'en' ? 'circle' : language === 'fr' ? 'cercle' : 'الدائرة')
        : (language === 'en' ? 'triangle' : language === 'fr' ? 'triangle' : 'المثلث');

    speakCurrentLanguage(
      language === 'en'
        ? `Splendid! You colored the ${shapeName} with beautiful colors and earned a Star! ⭐`
        : language === 'fr'
        ? `Magnifique ! Tu as colorié le ${shapeName} avec de superbes couleurs et gagné une Étoile ! ⭐`
        : `تلوين رائع ومبهج للمربع والدائرة والمثلث! أحسنت وكسبت نجمة جديدة! ⭐`
    );

    setTimeout(() => {
      setCelebrating(false);
    }, 2500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm relative overflow-hidden">
      {/* Celebration overlay */}
      {celebrating && (
        <div className="absolute inset-0 bg-amber-500/20 backdrop-blur-2xs z-30 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 pointer-events-none">
          <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-400 text-center space-y-3">
            <div className="flex justify-center gap-2 text-4xl sm:text-5xl animate-bounce">
              ⭐ 🎨 🌟 👏 ✨
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-amber-950">
              {t.skills.coloredShapeCheer}
            </h3>
            <p className="text-sm font-bold text-amber-700">
              {language === 'en' ? '+1 Bright Star Awarded!' : language === 'fr' ? '+1 Étoile Brillante Gagnée !' : '+1 نجمة ذهبية أضيفت لرصيدك!'}
            </p>
          </div>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
            <Paintbrush className="w-3.5 h-3.5 text-amber-600" />
            {t.skills.shapeColoring} 🎨
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-2">
            {t.skills.shapeColoringTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            {t.skills.shapeColoringDesc}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Pronounce shape */}
          <button
            onClick={() => {
              const sName =
                activeShape === 'square'
                  ? t.skills.squareTitle
                  : activeShape === 'circle'
                  ? t.skills.circleTitle
                  : t.skills.triangleTitle;
              speakCurrentLanguage(sName);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold cursor-pointer transition-colors border border-amber-200"
          >
            <Volume2 className="w-4 h-4 text-amber-600" />
            <span>{t.skills.pronounceShape}</span>
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.skills.clearColoring}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Shape selector + Canvas + Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Shape Selector & Options */}
        <div className="lg:col-span-3 space-y-4">
          {/* Shape selection buttons */}
          <div className="p-4 rounded-3xl bg-amber-50/50 border border-amber-200 space-y-3">
            <span className="text-xs font-black text-amber-900 block">
              {t.skills.selectShapeToColor}
            </span>

            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2.5">
              {/* Square */}
              <button
                onClick={() => handleSelectShape('square')}
                className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  activeShape === 'square'
                    ? 'bg-amber-100/90 border-2 border-amber-500 shadow-sm scale-102 font-black text-amber-950'
                    : 'bg-white border border-amber-200/80 hover:bg-amber-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg border-2 border-slate-700 flex items-center justify-center"
                    style={{ background: shapeColors.square }}
                  >
                    <Square className="w-4 h-4 text-slate-900/40" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold">{t.skills.squareTitle}</span>
                </div>
                {activeShape === 'square' && <Check className="w-4 h-4 text-amber-600" />}
              </button>

              {/* Circle */}
              <button
                onClick={() => handleSelectShape('circle')}
                className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  activeShape === 'circle'
                    ? 'bg-amber-100/90 border-2 border-amber-500 shadow-sm scale-102 font-black text-amber-950'
                    : 'bg-white border border-amber-200/80 hover:bg-amber-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-slate-700 flex items-center justify-center"
                    style={{ background: shapeColors.circle }}
                  >
                    <Circle className="w-4 h-4 text-slate-900/40" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold">{t.skills.circleTitle}</span>
                </div>
                {activeShape === 'circle' && <Check className="w-4 h-4 text-amber-600" />}
              </button>

              {/* Triangle */}
              <button
                onClick={() => handleSelectShape('triangle')}
                className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  activeShape === 'triangle'
                    ? 'bg-amber-100/90 border-2 border-amber-500 shadow-sm scale-102 font-black text-amber-950'
                    : 'bg-white border border-amber-200/80 hover:bg-amber-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg border-2 border-slate-700 flex items-center justify-center"
                    style={{ background: shapeColors.triangle }}
                  >
                    <Triangle className="w-4 h-4 text-slate-900/40" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold">{t.skills.triangleTitle}</span>
                </div>
                {activeShape === 'triangle' && <Check className="w-4 h-4 text-amber-600" />}
              </button>
            </div>
          </div>

          {/* Mode Switcher: Fill vs Brush */}
          <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-700 block">
              {language === 'en' ? 'Coloring Tool:' : language === 'fr' ? 'Outil de Coloriage :' : 'أداة التلوين:'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  soundEffects.playButtonClick();
                  setMode('fill');
                }}
                className={`p-2.5 rounded-xl font-bold text-xs flex flex-col items-center gap-1 cursor-pointer transition-all ${
                  mode === 'fill'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Pipette className="w-4 h-4" />
                <span>{t.skills.fillMode}</span>
              </button>
              <button
                onClick={() => {
                  soundEffects.playButtonClick();
                  setMode('brush');
                }}
                className={`p-2.5 rounded-xl font-bold text-xs flex flex-col items-center gap-1 cursor-pointer transition-all ${
                  mode === 'brush'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Paintbrush className="w-4 h-4" />
                <span>{t.skills.brushMode}</span>
              </button>
            </div>

            {/* Brush sizes if in brush mode */}
            {mode === 'brush' && (
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold text-slate-500">
                  {language === 'en' ? 'Size:' : language === 'fr' ? 'Taille :' : 'حجم الفرشاة:'}
                </span>
                <div className="flex gap-1.5">
                  {[10, 18, 28].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setBrushSize(sz)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer ${
                        brushSize === sz
                          ? 'bg-amber-500 text-white'
                          : 'bg-white border border-slate-200 text-slate-600'
                      }`}
                    >
                      <span
                        className="rounded-full bg-current"
                        style={{ width: sz / 2.5, height: sz / 2.5 }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cute Face & Pattern Toggle */}
          <div className="p-3.5 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
            <button
              onClick={() => {
                soundEffects.playButtonClick();
                setShowFace(!showFace);
              }}
              className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center justify-between cursor-pointer transition-all ${
                showFace
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-rose-500" />
                <span>{t.skills.cuteFaceToggle}</span>
              </div>
              <span className="text-xs">{showFace ? '✅' : '⚪'}</span>
            </button>

            {/* Pattern buttons */}
            <div className="pt-2 border-t border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                {language === 'en' ? 'Texture Pattern:' : language === 'fr' ? 'Motif de Texture :' : 'نقشة الزينة:'}
              </span>
              <div className="grid grid-cols-4 gap-1.5 text-[11px] font-bold">
                {[
                  { id: 'plain', label: language === 'en' ? 'Plain' : language === 'fr' ? 'Uni' : 'سادة' },
                  { id: 'polka', label: '●●●' },
                  { id: 'stars', label: '★★★' },
                  { id: 'stripes', label: '///' },
                ].map((pat) => (
                  <button
                    key={pat.id}
                    onClick={() => {
                      soundEffects.playButtonClick();
                      setPattern(pat.id as any);
                    }}
                    className={`p-1.5 rounded-lg border text-center cursor-pointer transition-colors ${
                      pattern === pat.id
                        ? 'bg-amber-100 border-amber-400 text-amber-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {pat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: The Giant Interactive Coloring Shape Canvas */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div
            onClick={handleFillShape}
            className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-square rounded-3xl bg-amber-50/40 border-2 border-amber-200 shadow-inner flex items-center justify-center select-none overflow-hidden cursor-pointer group"
          >
            {/* SVG Definitions for patterns & gradients */}
            <svg className="absolute w-0 h-0" aria-hidden="true">
              <defs>
                <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="25%" stopColor="#F97316" />
                  <stop offset="50%" stopColor="#FBBF24" />
                  <stop offset="75%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>

                <pattern id="patternPolka" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="3" fill="#FFFFFF" opacity="0.35" />
                </pattern>

                <pattern id="patternStars" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path
                    d="M15,4 L17,11 L24,11 L18,15 L20,22 L15,18 L10,22 L12,15 L6,11 L13,11 Z"
                    fill="#FFFFFF"
                    opacity="0.35"
                  />
                </pattern>

                <pattern id="patternStripes" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="20" stroke="#FFFFFF" strokeWidth="6" opacity="0.3" />
                </pattern>
              </defs>
            </svg>

            {/* The Base SVG Geometric Shape */}
            <svg
              viewBox="0 0 320 320"
              className="w-[280px] sm:w-[320px] h-[280px] sm:h-[320px] drop-shadow-md transition-transform group-hover:scale-101"
            >
              {/* Shape Render based on activeShape */}
              {activeShape === 'square' && (
                <>
                  <rect
                    x="35"
                    y="35"
                    width="250"
                    height="250"
                    rx="28"
                    fill={shapeColors.square}
                    stroke="#1E293B"
                    strokeWidth="10"
                    strokeLinejoin="round"
                    className="transition-colors duration-300"
                  />
                  {pattern !== 'plain' && (
                    <rect
                      x="35"
                      y="35"
                      width="250"
                      height="250"
                      rx="28"
                      fill={
                        pattern === 'polka'
                          ? 'url(#patternPolka)'
                          : pattern === 'stars'
                          ? 'url(#patternStars)'
                          : 'url(#patternStripes)'
                      }
                      pointerEvents="none"
                    />
                  )}
                </>
              )}

              {activeShape === 'circle' && (
                <>
                  <circle
                    cx="160"
                    cy="160"
                    r="125"
                    fill={shapeColors.circle}
                    stroke="#1E293B"
                    strokeWidth="10"
                    className="transition-colors duration-300"
                  />
                  {pattern !== 'plain' && (
                    <circle
                      cx="160"
                      cy="160"
                      r="125"
                      fill={
                        pattern === 'polka'
                          ? 'url(#patternPolka)'
                          : pattern === 'stars'
                          ? 'url(#patternStars)'
                          : 'url(#patternStripes)'
                      }
                      pointerEvents="none"
                    />
                  )}
                </>
              )}

              {activeShape === 'triangle' && (
                <>
                  <polygon
                    points="160,35 285,275 35,275"
                    fill={shapeColors.triangle}
                    stroke="#1E293B"
                    strokeWidth="10"
                    strokeLinejoin="round"
                    className="transition-colors duration-300"
                  />
                  {pattern !== 'plain' && (
                    <polygon
                      points="160,35 285,275 35,275"
                      fill={
                        pattern === 'polka'
                          ? 'url(#patternPolka)'
                          : pattern === 'stars'
                          ? 'url(#patternStars)'
                          : 'url(#patternStripes)'
                      }
                      pointerEvents="none"
                    />
                  )}
                </>
              )}
            </svg>

            {/* Brush Drawing Canvas overlay */}
            <canvas
              ref={canvasRef}
              width={340}
              height={340}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className={`absolute inset-0 w-full h-full ${
                mode === 'brush' ? 'cursor-crosshair pointer-events-auto' : 'pointer-events-none'
              }`}
            />

            {/* Cute Cartoon Eyes and Smile overlay (clickable for wink reaction) */}
            {showFace && (
              <div
                onClick={handleFaceClick}
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto cursor-pointer select-none"
                style={{
                  transform: activeShape === 'triangle' ? 'translateY(16px)' : 'none',
                }}
                title={language === 'en' ? 'Tap face to wink!' : language === 'fr' ? 'Touche le visage pour clin d’œil !' : 'المس الوجه للغمز والضحك!'}
              >
                {/* Cheerful Cartoon Eyes */}
                <div className="flex items-center gap-10 sm:gap-12 mb-3">
                  {/* Left Eye */}
                  <div className="relative w-8 sm:w-9 h-8 sm:h-9 bg-slate-900 rounded-full flex items-start justify-end p-1.5 shadow-xs">
                    <div className="w-3.5 h-3.5 bg-white rounded-full" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute bottom-1.5 left-1.5" />
                  </div>

                  {/* Right Eye (winks on click) */}
                  {isWinking ? (
                    <div className="w-8 sm:w-9 h-8 sm:h-9 flex items-center justify-center">
                      <span className="text-3xl font-black text-slate-900">^</span>
                    </div>
                  ) : (
                    <div className="relative w-8 sm:w-9 h-8 sm:h-9 bg-slate-900 rounded-full flex items-start justify-end p-1.5 shadow-xs">
                      <div className="w-3.5 h-3.5 bg-white rounded-full" />
                      <div className="w-1.5 h-1.5 bg-white rounded-full absolute bottom-1.5 left-1.5" />
                    </div>
                  )}
                </div>

                {/* Pink Cheek Blushes */}
                <div className="flex items-center justify-between w-28 sm:w-32 -mt-2 mb-1 px-1">
                  <div className="w-4 h-2.5 bg-rose-400/70 rounded-full blur-[0.5px]" />
                  <div className="w-4 h-2.5 bg-rose-400/70 rounded-full blur-[0.5px]" />
                </div>

                {/* Big Happy Smile Mouth */}
                <div className="w-10 sm:w-12 h-5 sm:h-6 border-b-4 border-slate-900 rounded-b-full flex items-center justify-center bg-rose-600 overflow-hidden shadow-inner">
                  <div className="w-6 h-3 bg-rose-300 rounded-t-full mt-2" />
                </div>
              </div>
            )}

            {/* Click to fill tooltip badge */}
            {mode === 'fill' && (
              <div className="absolute bottom-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-amber-300 text-[11px] font-bold text-amber-900 shadow-xs pointer-events-none animate-bounce-gentle">
                👆 {t.skills.fillColorPrompt}
              </div>
            )}
          </div>

          {/* Cheer / Feedback banner */}
          {cheerMessage && (
            <div className="mt-3 px-4 py-1.5 rounded-2xl bg-amber-100 text-amber-900 font-bold text-xs animate-bounce-gentle">
              {cheerMessage}
            </div>
          )}

          {/* Big Finish Button */}
          <button
            onClick={handleFinish}
            className="mt-4 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-2xl font-black text-sm sm:text-base shadow-md cursor-pointer transition-all flex items-center gap-2 group"
          >
            <Star className="w-5 h-5 text-amber-300 fill-amber-300 group-hover:rotate-12 transition-transform" />
            <span>{t.skills.finishColoring}</span>
          </button>
        </div>

        {/* Right Column: Palette & Color Bubbles */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-4 rounded-3xl bg-amber-50/50 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-900">
                {t.skills.colorPalette}
              </span>
              <div
                className="w-5 h-5 rounded-full border-2 border-slate-800 shadow-xs"
                style={{ background: selectedColor.hex }}
              />
            </div>

            {/* 10 Vibrant Palette Swatches */}
            <div className="grid grid-cols-2 gap-2">
              {PALETTE_COLORS.map((col) => {
                const isSelected = selectedColor.id === col.id;
                const colName =
                  language === 'en' ? col.nameEn : language === 'fr' ? col.nameFr : col.nameAr;

                return (
                  <button
                    key={col.id}
                    onClick={() => handleSelectColor(col)}
                    className={`p-2.5 rounded-2xl flex items-center gap-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white border-2 border-amber-500 shadow-md scale-105'
                        : 'bg-white/80 border border-amber-200/70 hover:bg-white hover:scale-102'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 border-slate-700 shadow-xs flex items-center justify-center ${
                        isSelected ? 'ring-2 ring-amber-400 ring-offset-1' : ''
                      }`}
                      style={{ background: col.hex }}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white drop-shadow-md stroke-[3]" />}
                    </div>
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {colName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Educational Real-world Example Tip */}
          <div className="p-4 rounded-3xl bg-emerald-50/60 border border-emerald-200 space-y-1.5 text-center">
            <span className="text-xs font-bold text-emerald-800 block">
              💡 {language === 'en' ? 'Shape Fun Fact:' : language === 'fr' ? 'Le Savais-tu ? :' : 'معلومة هندسية مفيدة:'}
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeShape === 'square'
                ? (language === 'en'
                    ? 'A Square has 4 equal straight sides and 4 equal square corners! 🎁'
                    : language === 'fr'
                    ? 'Le Carré a 4 côtés égaux et 4 coins droits parfaits ! 🎁'
                    : 'المربع له 4 أضلاع متساوية في الطول تماماً و 4 زوايا قائمة كعلبة الهدية! 🎁')
                : activeShape === 'circle'
                ? (language === 'en'
                    ? 'A Circle is round with zero straight edges and zero sharp corners! 🕒'
                    : language === 'fr'
                    ? 'Le Cercle est tout rond, sans aucun côté ni aucun coin ! 🕒'
                    : 'الدائرة مستديرة تماماً بلا أضلاع ولا زوايا حادة كقرص الشمس وساعة الحائط! 🕒')
                : (language === 'en'
                    ? 'A Triangle has 3 sides and 3 pointy corners, like a slice of pizza! 🍕'
                    : language === 'fr'
                    ? 'Le Triangle a 3 côtés et 3 coins pointus, comme une part de pizza ! 🍕'
                    : 'المثلث له 3 أضلاع و 3 زوايا حادة كرأس الهرم وشريحة البيتزا الشهية! 🍕')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useRef } from 'react';
import { Award, Lock, Trash2 } from 'lucide-react';
import { STICKERS_COLLECTION, StickerItem } from '../data/skillsData';
import { useGame } from '../context/GameContext';
import { soundEffects } from '../utils/soundEffects';

export const StickerAlbum: React.FC = () => {
  const { language, t, stars, placedStickers, addPlacedSticker, clearStickerBoard, speakCurrentLanguage } = useGame();
  const boardRef = useRef<HTMLDivElement | null>(null);

  const getStickerTitle = (sticker: StickerItem) => {
    if (language === 'en') return sticker.titleEn;
    if (language === 'fr') return sticker.titleFr;
    return sticker.titleAr;
  };

  const handleSelectStickerToPlace = (sticker: StickerItem) => {
    const title = getStickerTitle(sticker);
    if (stars < sticker.unlockedAtStars) {
      soundEffects.playTryAgain();
      speakCurrentLanguage(
        language === 'en'
          ? `You need ${sticker.unlockedAtStars} stars to unlock ${title}!`
          : language === 'fr'
          ? `Il te faut ${sticker.unlockedAtStars} étoiles pour débloquer ${title} !`
          : `تحتاج إلى ${sticker.unlockedAtStars} نجوم لفتح ملصق ${title}!`
      );
      return;
    }

    const randX = Math.floor(Math.random() * 60) + 20;
    const randY = Math.floor(Math.random() * 60) + 20;
    addPlacedSticker(sticker.id, sticker.emoji, randX, randY);
    speakCurrentLanguage(
      language === 'en'
        ? `Placed ${title}!`
        : language === 'fr'
        ? `Autocollant ${title} placé !`
        : `ألصقت ملصق ${title}!`
    );
  };

  const unlockedCount = STICKERS_COLLECTION.filter((s) => stars >= s.unlockedAtStars).length;

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-amber-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            <span>{t.stickers.title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {t.stickers.desc}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 font-bold text-sm font-number">
            ⭐ {t.stickers.yourStars} <span>{stars}</span>
          </div>

          <button
            onClick={clearStickerBoard}
            disabled={placedStickers.length === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
              placedStickers.length > 0
                ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.stickers.clearBoard}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Scenic Canvas & Stickers Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <div
            ref={boardRef}
            className="relative w-full h-[380px] sm:h-[440px] rounded-3xl overflow-hidden border-2 border-amber-300 shadow-md select-none"
          >
            <img
              src="/src/assets/images/shapes_colors_land_1791712565200.jpg"
              alt="Playful creative background"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-white/5 pointer-events-none" />

            {/* Placed Stickers Layer */}
            {placedStickers.map((stk) => (
              <div
                key={stk.id}
                style={{
                  top: `${stk.y}%`,
                  left: `${stk.x}%`,
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-5xl cursor-pointer hover:scale-125 transition-transform drop-shadow-lg filter select-none animate-in zoom-in-50 duration-200"
                onClick={() => {
                  soundEffects.playButtonClick();
                }}
              >
                {stk.emoji}
              </div>
            ))}

            {placedStickers.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white/85 backdrop-blur-xs px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 shadow-sm border border-amber-200">
                  {t.stickers.tapToPlacePrompt}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Available Stickers Palette */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-amber-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-slate-800 text-sm">
                {t.stickers.earnedCount}
              </span>
              <span className="text-xs text-slate-400 font-number">
                ({unlockedCount} / {STICKERS_COLLECTION.length})
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 max-h-[360px] overflow-y-auto p-1">
              {STICKERS_COLLECTION.map((sticker) => {
                const isUnlocked = stars >= sticker.unlockedAtStars;
                const title = getStickerTitle(sticker);

                return (
                  <button
                    key={sticker.id}
                    onClick={() => handleSelectStickerToPlace(sticker)}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                      isUnlocked
                        ? 'bg-amber-50/70 border border-amber-200 hover:bg-amber-100 hover:scale-105 active:scale-95 shadow-2xs'
                        : 'bg-slate-50 border border-slate-200 opacity-60'
                    }`}
                  >
                    <span className="text-3xl mb-1">{sticker.emoji}</span>
                    <span className="text-[10px] font-bold text-slate-700 truncate max-w-full">
                      {title}
                    </span>

                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-2xs rounded-2xl flex flex-col items-center justify-center text-white">
                        <Lock className="w-3.5 h-3.5 mb-0.5" />
                        <span className="text-[9px] font-bold font-number">
                          {sticker.unlockedAtStars} ⭐
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 p-3 bg-amber-50 rounded-2xl border border-amber-100 text-xs text-amber-900 text-center">
            {t.stickers.needMoreTip}
          </div>
        </div>
      </div>
    </div>
  );
};

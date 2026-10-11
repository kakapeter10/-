import React, { useState } from 'react';
import { Sparkles, ShoppingBag } from 'lucide-react';
import { useGame, CHARACTERS_LIST, ACCESSORIES_ITEMS } from '../context/GameContext';
import { soundEffects } from '../utils/soundEffects';

interface CompanionWidgetProps {
  onOpenShop: () => void;
}

export const CompanionWidget: React.FC<CompanionWidgetProps> = ({ onOpenShop }) => {
  const { language, t, activeCompanionId, activeAccessories, speakCompanionCheer } = useGame();
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);

  const companion = CHARACTERS_LIST.find((c) => c.id === activeCompanionId) || CHARACTERS_LIST[0];

  const compName = language === 'en' ? companion.nameEn : language === 'fr' ? companion.nameFr : companion.nameAr;
  const compTitle = language === 'en' ? companion.titleEn : language === 'fr' ? companion.titleFr : companion.titleAr;

  const handleCompanionClick = () => {
    const phrases =
      language === 'en'
        ? companion.cheerPhrasesEn
        : language === 'fr'
        ? companion.cheerPhrasesFr
        : companion.cheerPhrasesAr;
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    setSpeechBubble(phrase);
    speakCompanionCheer();

    setTimeout(() => {
      setSpeechBubble(null);
    }, 4500);
  };

  const activeAccList = ACCESSORIES_ITEMS.filter((item) => activeAccessories.includes(item.id));

  return (
    <div className="fixed bottom-4 left-4 z-30 flex items-end gap-3 select-none">
      {/* Companion Card */}
      <div className="relative group">
        {/* Speech Bubble */}
        {speechBubble && (
          <div className="absolute -top-16 left-0 bg-white border-2 border-amber-300 text-slate-800 text-xs sm:text-sm font-bold py-2 px-3 rounded-2xl shadow-lg max-w-[220px] animate-in fade-in slide-in-from-bottom-2 duration-200">
            <span>{speechBubble}</span>
            <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-b-2 border-r-2 border-amber-300 rotate-45 transform" />
          </div>
        )}

        {/* Character Avatar with Accessories */}
        <div
          onClick={handleCompanionClick}
          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-1 border-3 border-amber-400 shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          title={`${compName} (${compTitle})`}
        >
          <img
            src={companion.image}
            alt={compName}
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />

          {/* Equipped Accessories Overlays */}
          {activeAccList.map((acc) => (
            <div
              key={acc.id}
              className={`absolute text-lg sm:text-xl drop-shadow-md ${
                acc.category === 'hat'
                  ? '-top-3 left-1/2 -translate-x-1/2'
                  : acc.category === 'glasses'
                  ? 'top-4 left-1/2 -translate-x-1/2'
                  : acc.category === 'badge'
                  ? 'bottom-0 right-0'
                  : '-top-2 -right-2 animate-bounce-gentle'
              }`}
            >
              {acc.emoji}
            </div>
          ))}

          {/* Cheer Sparkle Trigger */}
          <div className="absolute -bottom-1 -left-1 bg-amber-500 text-white p-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Quick Shop Button */}
      <button
        onClick={() => {
          soundEffects.playButtonClick();
          onOpenShop();
        }}
        className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95"
      >
        <ShoppingBag className="w-4 h-4" />
        <span className="hidden sm:inline">{t.shop.title}</span>
        <span className="sm:hidden">
          {language === 'en' ? 'Shop' : language === 'fr' ? 'Boutique' : 'المتجر'}
        </span>
      </button>
    </div>
  );
};

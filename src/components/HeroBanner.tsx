import React from 'react';
import { Volume2, Sparkles, BookOpen, Calculator, Shapes, Award, Target, Star } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';
import { useGame } from '../context/GameContext';

interface HeroBannerProps {
  onSelectTab: (tab: 'numbers' | 'math' | 'skills' | 'stickers') => void;
  onOpenDailyChallenge?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectTab, onOpenDailyChallenge }) => {
  const { t, speakCurrentLanguage, isDailyCompletedToday } = useGame();

  const handlePlayGreeting = () => {
    soundEffects.playSuccess();
    speakCurrentLanguage(t.hero.greetingSpeech);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-amber-500 border border-amber-300 shadow-sm text-white mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[300px]">
        {/* Text Column */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between z-10 bg-gradient-to-r from-amber-600/90 via-amber-500/95 to-amber-500">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-100 text-xs sm:text-sm font-bold flex items-center gap-1.5 bg-amber-700/30 px-3 py-1 rounded-full backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                {t.hero.badge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-3 text-balance">
              {t.hero.title}
            </h1>

            <p className="text-amber-50 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
              {t.hero.desc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {onOpenDailyChallenge && (
              <button
                onClick={() => {
                  soundEffects.playButtonClick();
                  onOpenDailyChallenge();
                }}
                className="relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-400 to-amber-300 hover:from-orange-500 hover:to-amber-400 text-slate-900 rounded-2xl font-black text-sm shadow-md cursor-pointer transition-transform hover:scale-103 active:scale-98 border border-white/60"
              >
                <Target className="w-4 h-4 text-orange-800 animate-spin-slow shrink-0" />
                <span>{t.dailyChallenge.title}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-orange-600 text-white text-2xs font-extrabold flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  x2
                </span>
                {!isDailyCompletedToday && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </button>
            )}

            <button
              onClick={handlePlayGreeting}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-amber-700 hover:bg-amber-50 rounded-2xl font-bold text-sm shadow-md cursor-pointer transition-transform hover:scale-102 active:scale-98"
            >
              <Volume2 className="w-4 h-4 text-amber-600 animate-bounce-gentle" />
              <span>{t.hero.listenGreeting}</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playButtonClick();
                onSelectTab('numbers');
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-700/60 hover:bg-amber-700 text-white rounded-2xl font-bold text-sm cursor-pointer transition-colors border border-amber-400/40"
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.hero.startNumbers}</span>
            </button>
          </div>

          {/* Quick activity links */}
          <div className="grid grid-cols-4 gap-2 pt-6 mt-6 border-t border-amber-400/40 text-center">
            <button
              onClick={() => { soundEffects.playButtonClick(); onSelectTab('numbers'); }}
              className="flex flex-col items-center gap-1 p-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 transition-colors cursor-pointer text-xs"
            >
              <BookOpen className="w-4 h-4 text-amber-200" />
              <span className="font-semibold">{t.hero.numbersShort}</span>
            </button>
            <button
              onClick={() => { soundEffects.playButtonClick(); onSelectTab('math'); }}
              className="flex flex-col items-center gap-1 p-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 transition-colors cursor-pointer text-xs"
            >
              <Calculator className="w-4 h-4 text-amber-200" />
              <span className="font-semibold">{t.hero.mathShort}</span>
            </button>
            <button
              onClick={() => { soundEffects.playButtonClick(); onSelectTab('skills'); }}
              className="flex flex-col items-center gap-1 p-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 transition-colors cursor-pointer text-xs"
            >
              <Shapes className="w-4 h-4 text-amber-200" />
              <span className="font-semibold">{t.hero.skillsShort}</span>
            </button>
            <button
              onClick={() => { soundEffects.playButtonClick(); onSelectTab('stickers'); }}
              className="flex flex-col items-center gap-1 p-2 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 transition-colors cursor-pointer text-xs"
            >
              <Award className="w-4 h-4 text-amber-200" />
              <span className="font-semibold">{t.hero.stickersShort}</span>
            </button>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full">
          <img
            src="/src/assets/images/hero_kids_learning_1791712552204.jpg"
            alt="Cartoon animals holding number blocks in educational meadow"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 via-transparent to-transparent lg:hidden" />
        </div>
      </div>
    </section>
  );
};

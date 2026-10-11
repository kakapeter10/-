import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Settings, Mic, MicOff, Globe, Trophy, Target } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { soundEffects } from '../utils/soundEffects';
import { Language } from '../locales/translations';

interface HeaderProps {
  activeTab: 'numbers' | 'math' | 'skills' | 'stickers';
  setActiveTab: (tab: 'numbers' | 'math' | 'skills' | 'stickers') => void;
  onOpenDailyChallenge?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenDailyChallenge }) => {
  const {
    language,
    setLanguage,
    t,
    stars,
    points,
    isDailyCompletedToday,
    soundEnabled,
    setSoundEnabled,
    speechEnabled,
    setSpeechEnabled,
    formatNumber,
  } = useGame();
  const [showSettings, setShowSettings] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const handleTabClick = (tab: 'numbers' | 'math' | 'skills' | 'stickers') => {
    soundEffects.playButtonClick();
    setActiveTab(tab);
  };

  const navLinks = [
    { id: 'numbers' as const, label: t.tabs.numbers },
    { id: 'math' as const, label: t.tabs.math },
    { id: 'skills' as const, label: t.tabs.skills },
    { id: 'stickers' as const, label: t.tabs.stickers },
  ];

  const languagesList: Array<{ code: Language; label: string; flag: string }> = [
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  const starsFormatted = formatNumber(stars);
  const pointsFormatted = formatNumber(points);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4 sm:gap-8">
        
        {/* Zone 1: Single text wordmark */}
        <button 
          onClick={() => handleTabClick('numbers')} 
          className="flex items-center gap-2.5 cursor-pointer group whitespace-nowrap shrink-0 text-slate-900"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-sm font-bold text-xl group-hover:scale-105 transition-transform font-number">
            123
          </div>
          <span className="text-lg sm:text-xl font-black text-amber-700 tracking-tight">
            {t.appName}
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleTabClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-1 relative ${
                  isActive
                    ? 'text-amber-600 font-bold border-b-2 border-amber-500'
                    : 'hover:text-amber-700'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Star Counter, Points Counter, Daily Challenge, Language Switcher and Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Daily Challenge Trigger Button */}
          {onOpenDailyChallenge && (
            <button
              onClick={() => {
                soundEffects.playButtonClick();
                onOpenDailyChallenge();
              }}
              className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-xs transition-transform hover:scale-103 active:scale-97 cursor-pointer"
              title={t.header.dailyChallenge}
            >
              <Target className="w-4 h-4 text-amber-100 animate-bounce-gentle shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">{t.header.dailyChallenge}</span>
              {!isDailyCompletedToday && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </button>
          )}

          {/* Star Counter */}
          <div 
            title={t.header.stars}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-bold text-xs sm:text-sm shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 animate-spin-slow" />
            <span className="font-number">{starsFormatted.main}</span>
            <span className="text-xs text-amber-700 hidden lg:inline">{t.header.stars}</span>
          </div>

          {/* Points Counter */}
          <div 
            title={t.header.points}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 font-bold text-xs sm:text-sm shadow-xs"
          >
            <Trophy className="w-4 h-4 text-sky-600" />
            <span className="font-number">{pointsFormatted.main}</span>
            <span className="text-xs text-sky-700 hidden lg:inline">{t.header.points}</span>
          </div>

          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                soundEffects.playButtonClick();
                setShowLangMenu(!showLangMenu);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/70 text-amber-900 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
              title={t.header.langSelect}
            >
              <Globe className="w-4 h-4 text-amber-600" />
              <span>
                {language === 'ar' ? 'العربية' : language === 'en' ? 'English' : 'Français'}
              </span>
            </button>

            {showLangMenu && (
              <div className="absolute top-full mt-1.5 left-0 z-50 bg-white border border-amber-200 rounded-2xl shadow-xl py-1.5 min-w-[130px] animate-in fade-in zoom-in-95 duration-100">
                {languagesList.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-start px-3 py-2 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                      language === lang.code
                        ? 'bg-amber-100 text-amber-800'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) soundEffects.playButtonClick();
            }}
            className={`p-2 rounded-xl border cursor-pointer transition-colors ${
              soundEnabled
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
            }`}
            title={soundEnabled ? t.header.soundMute : t.header.soundUnmute}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Speech Voice Toggle */}
          <button
            onClick={() => {
              setSpeechEnabled(!speechEnabled);
              if (!speechEnabled) {
                soundEffects.speak(
                  language === 'en' ? 'Hello!' : language === 'fr' ? 'Bonjour !' : 'مرحباً!',
                  language
                );
              }
            }}
            className={`p-2 rounded-xl border cursor-pointer transition-colors ${
              speechEnabled
                ? 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100'
                : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
            }`}
            title={speechEnabled ? t.header.voiceMute : t.header.voiceUnmute}
          >
            {speechEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          {/* Settings modal trigger */}
          <button
            onClick={() => {
              soundEffects.playButtonClick();
              setShowSettings(!showSettings);
            }}
            className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
            title={t.header.settings}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile navigation bar */}
      <div className="md:hidden flex items-center justify-around border-t border-amber-100 px-2 py-1.5 bg-amber-50/70">
        {navLinks.map((link) => {
          const isActive = activeTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => handleTabClick(link.id)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                isActive ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-amber-700'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </div>

      {/* Settings Panel Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 relative animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-amber-600" />
              {t.settingsModal.title}
            </h3>

            <div className="space-y-4 mb-6 text-sm text-slate-700">
              <div>
                <label className="block font-medium mb-1.5 text-slate-800">
                  {t.header.langSelect}:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {languagesList.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`py-2 px-3 rounded-xl border text-center font-bold text-xs sm:text-sm cursor-pointer transition-all ${
                        language === lang.code
                          ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 space-y-1">
                <p className="font-semibold">{t.settingsModal.parentsTipTitle}</p>
                <p>{t.settingsModal.parentsTipText}</p>
              </div>
            </div>

            <button
              onClick={() => {
                soundEffects.playButtonClick();
                setShowSettings(false);
              }}
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold cursor-pointer transition-colors shadow-sm"
            >
              {t.settingsModal.saveAndClose}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

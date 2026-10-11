import React, { useState, useEffect } from 'react';
import {
  X,
  Target,
  Sparkles,
  Star,
  Trophy,
  Volume2,
  Flame,
  CheckCircle2,
  RefreshCw,
  Award,
  ChevronRight,
  Heart,
} from 'lucide-react';
import { useGame, CHARACTERS_LIST } from '../context/GameContext';
import { soundEffects } from '../utils/soundEffects';
import {
  DailyChallengeItem,
  getTodayDateString,
  getDailyChallengeForDate,
  getRandomDailyChallenge,
} from '../data/dailyChallengesData';

interface DailyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    language,
    t,
    stars,
    points,
    dailyStreak,
    isDailyCompletedToday,
    completeDailyChallenge,
    activeCompanionId,
    formatNumber,
    speakCurrentLanguage,
  } = useGame();

  const todayDateStr = getTodayDateString();

  // Current challenge item
  const [currentChallenge, setCurrentChallenge] = useState<DailyChallengeItem>(() => {
    return getDailyChallengeForDate(todayDateStr);
  });

  const [isBonusPractice, setIsBonusPractice] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [countedItemIds, setCountedItemIds] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [wrongOptionId, setWrongOptionId] = useState<string | null>(null);
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);

  const companion =
    CHARACTERS_LIST.find((c) => c.id === activeCompanionId) || CHARACTERS_LIST[0];
  const compName =
    language === 'en'
      ? companion.nameEn
      : language === 'fr'
      ? companion.nameFr
      : companion.nameAr;

  // Whenever modal opens, reset or sync
  useEffect(() => {
    if (isOpen) {
      if (isDailyCompletedToday && !isBonusPractice) {
        // Already completed today
        setSolved(true);
      }
    }
  }, [isOpen, isDailyCompletedToday, isBonusPractice]);

  if (!isOpen) return null;

  const questionText =
    language === 'en'
      ? currentChallenge.questionEn
      : language === 'fr'
      ? currentChallenge.questionFr
      : currentChallenge.questionAr;

  const speechText =
    language === 'en'
      ? currentChallenge.speechEn
      : language === 'fr'
      ? currentChallenge.speechFr
      : currentChallenge.speechAr;

  const funFactText =
    language === 'en'
      ? currentChallenge.funFactEn
      : language === 'fr'
      ? currentChallenge.funFactFr
      : currentChallenge.funFactAr;

  const getCategoryTitle = (cat: DailyChallengeItem['category']) => {
    switch (cat) {
      case 'counting':
        return t.dailyChallenge.categoryCounting;
      case 'math':
        return t.dailyChallenge.categoryMath;
      case 'shapes':
        return t.dailyChallenge.categoryShapes;
      case 'animals':
        return t.dailyChallenge.categoryAnimals;
      case 'professions':
        return t.dailyChallenge.categoryProfessions;
      case 'colors':
        return t.dailyChallenge.categoryColors;
      default:
        return t.dailyChallenge.title;
    }
  };

  const handleReadQuestion = () => {
    soundEffects.playButtonClick();
    speakCurrentLanguage(speechText);
  };

  const handleTapCountItem = (itemId: string, index: number) => {
    if (countedItemIds.includes(itemId)) return;
    const newCounted = [...countedItemIds, itemId];
    setCountedItemIds(newCounted);
    soundEffects.playCountPitch(newCounted.length);
  };

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (solved) return;
    setSelectedOptionId(optionId);

    if (isCorrect) {
      soundEffects.playButtonClick();
      setWrongOptionId(null);
      setSolved(true);
      setShowCelebrationBanner(true);

      // Award points & double star
      completeDailyChallenge(isBonusPractice);
    } else {
      setWrongOptionId(optionId);
      soundEffects.playTryAgain();
      speakCurrentLanguage(t.dailyChallenge.tryAgainMessage);
      setTimeout(() => {
        setWrongOptionId(null);
      }, 900);
    }
  };

  const handleStartNextBonus = () => {
    soundEffects.playButtonClick();
    const nextItem = getRandomDailyChallenge(currentChallenge.id);
    setCurrentChallenge(nextItem);
    setIsBonusPractice(true);
    setSelectedOptionId(null);
    setWrongOptionId(null);
    setCountedItemIds([]);
    setSolved(false);
    setShowCelebrationBanner(false);

    // Read the new question after a moment
    setTimeout(() => {
      const q =
        language === 'en'
          ? nextItem.speechEn
          : language === 'fr'
          ? nextItem.speechFr
          : nextItem.speechAr;
      speakCurrentLanguage(q);
    }, 300);
  };

  const pointsFormatted = formatNumber(points);
  const starsFormatted = formatNumber(stars);
  const streakFormatted = formatNumber(dailyStreak);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-gradient-to-b from-amber-50/90 to-white rounded-3xl border-3 border-amber-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs p-1 flex items-center justify-center text-2xl shadow-inner border border-white/30">
              <Target className="w-7 h-7 text-white animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black tracking-tight">
                  {isBonusPractice
                    ? t.dailyChallenge.bonusPracticeTitle
                    : t.dailyChallenge.title}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/25 text-white backdrop-blur-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-200" />
                  {currentChallenge.badgeIcon}
                </span>
              </div>
              <p className="text-amber-100 text-xs sm:text-sm font-medium">
                {isBonusPractice
                  ? t.dailyChallenge.bonusPracticeTitle
                  : t.dailyChallenge.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playButtonClick();
              onClose();
            }}
            className="w-10 h-10 rounded-2xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors border border-white/30 active:scale-95"
            title={t.shop.close}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Status & Rewards Summary Strip */}
        <div className="bg-amber-100/70 border-b border-amber-200 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
          {/* Rewards info */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              {t.dailyChallenge.rewardBadge}:
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 font-extrabold text-xs shadow-2xs">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              {isBonusPractice ? '+1 ⭐' : t.dailyChallenge.doubleStar}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-200/80 text-sky-900 font-extrabold text-xs shadow-2xs">
              <Trophy className="w-3.5 h-3.5 text-sky-600" />
              {isBonusPractice ? '+15' : t.dailyChallenge.bonusPoints}
            </span>
          </div>

          {/* Streak indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-100 text-orange-800 font-bold border border-orange-200">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-400 animate-bounce-gentle" />
            <span className="text-xs">
              {t.dailyChallenge.streakDays}:{' '}
              <strong className="font-number text-orange-900 text-sm">
                {streakFormatted.main}
              </strong>
            </span>
          </div>
        </div>

        {/* Scrollable Main Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* Completed State Banner if already completed */}
          {isDailyCompletedToday && !isBonusPractice && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 text-emerald-900 flex items-center gap-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-extrabold text-sm sm:text-base text-emerald-800">
                  {t.dailyChallenge.completedStatus}
                </h4>
                <p className="text-xs text-emerald-700">
                  {t.dailyChallenge.nextTomorrowNote}
                </p>
              </div>
              <button
                onClick={handleStartNextBonus}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors cursor-pointer shrink-0"
              >
                {t.dailyChallenge.playAnother}
              </button>
            </div>
          )}

          {/* Challenge Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-sm">
            {/* Category badge & voice button */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-800 font-bold text-xs flex items-center gap-1">
                  <span>{currentChallenge.badgeIcon}</span>
                  <span>{getCategoryTitle(currentChallenge.category)}</span>
                </span>
                <span className="text-xs text-slate-400 font-number">
                  #{currentChallenge.id}
                </span>
              </div>

              <button
                onClick={handleReadQuestion}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-transform active:scale-95 cursor-pointer shadow-2xs"
                title={t.dailyChallenge.listenQuestion}
              >
                <Volume2 className="w-4 h-4" />
                <span>{t.dailyChallenge.listenQuestion}</span>
              </button>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-xl font-black text-slate-800 text-center leading-relaxed mb-6">
              {questionText}
            </h3>

            {/* Interactive Visual Element: Countable Tap Area */}
            {currentChallenge.interactiveType === 'count_tap' &&
              currentChallenge.countableItems && (
                <div className="my-5 p-4 sm:p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200 text-center">
                  <p className="text-xs text-amber-800 font-bold mb-3 flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t.dailyChallenge.tapToCountItem}</span>
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                    {currentChallenge.countableItems.map((item, idx) => {
                      const isCounted = countedItemIds.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleTapCountItem(item.id, idx)}
                          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl text-3xl sm:text-4xl flex items-center justify-center transition-all cursor-pointer select-none active:scale-90 ${
                            isCounted
                              ? 'bg-amber-400 shadow-md scale-105 border-2 border-amber-500'
                              : 'bg-white hover:bg-amber-100 shadow-xs border-2 border-amber-200 hover:scale-105'
                          }`}
                        >
                          <span>{item.emoji}</span>
                          {isCounted && (
                            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-white font-bold font-number text-xs flex items-center justify-center shadow-xs border-2 border-white">
                              {countedItemIds.indexOf(item.id) + 1}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {countedItemIds.length > 0 && (
                    <div className="mt-3 text-xs font-bold text-amber-900">
                      {t.dailyChallenge.countedItems}:{' '}
                      <span className="font-number text-base text-amber-700">
                        {countedItemIds.length}
                      </span>
                    </div>
                  )}
                </div>
              )}

            {/* Interactive Visual Element: Visual Equation */}
            {currentChallenge.interactiveType === 'visual_equation' &&
              currentChallenge.equation && (
                <div className="my-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xl font-black">
                  {/* First group */}
                  <div className="flex flex-col items-center gap-1 bg-white p-3 rounded-2xl border border-amber-200 shadow-xs">
                    <div className="flex items-center gap-1 text-2xl">
                      {currentChallenge.equation.emojis1.map((em, i) => (
                        <span key={i} className="animate-bounce-gentle">
                          {em}
                        </span>
                      ))}
                    </div>
                    <span className="font-number text-sm font-bold text-amber-800">
                      {currentChallenge.equation.num1}
                    </span>
                  </div>

                  {/* Operation Sign */}
                  <span className="text-2xl font-black text-amber-600 px-1 font-number">
                    {currentChallenge.equation.op}
                  </span>

                  {/* Second group */}
                  <div className="flex flex-col items-center gap-1 bg-white p-3 rounded-2xl border border-amber-200 shadow-xs">
                    <div className="flex items-center gap-1 text-2xl">
                      {currentChallenge.equation.emojis2.map((em, i) => (
                        <span key={i} className="animate-bounce-gentle">
                          {em}
                        </span>
                      ))}
                    </div>
                    <span className="font-number text-sm font-bold text-amber-800">
                      {currentChallenge.equation.num2}
                    </span>
                  </div>

                  {/* Equals */}
                  <span className="text-2xl font-black text-amber-600 px-1 font-number">
                    =
                  </span>

                  {/* Question Box */}
                  <div className="w-14 h-14 rounded-2xl bg-amber-400 text-white flex items-center justify-center text-2xl font-black shadow-md border-2 border-amber-500 animate-pulse">
                    ?
                  </div>
                </div>
              )}

            {/* Interactive Visual Element: Shape Visual */}
            {currentChallenge.shapeVisual && (
              <div className="my-5 p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-center">
                {currentChallenge.shapeVisual === 'triangle' && (
                  <svg className="w-24 h-24 text-amber-500 fill-amber-300 drop-shadow-sm" viewBox="0 0 100 100">
                    <polygon points="50,15 90,85 10,85" stroke="currentColor" strokeWidth="4" />
                  </svg>
                )}
                {currentChallenge.shapeVisual === 'square' && (
                  <div className="w-20 h-20 rounded-2xl bg-amber-300 border-4 border-amber-500 shadow-sm flex items-center justify-center text-amber-800 text-2xl font-bold">
                    ⏹️
                  </div>
                )}
                {currentChallenge.shapeVisual === 'circle' && (
                  <div className="w-20 h-20 rounded-full bg-amber-300 border-4 border-amber-500 shadow-sm flex items-center justify-center text-amber-800 text-2xl font-bold">
                    ⭕
                  </div>
                )}
              </div>
            )}

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {currentChallenge.options.map((option) => {
                const label =
                  language === 'en'
                    ? option.labelEn
                    : language === 'fr'
                    ? option.labelFr
                    : option.labelAr;

                const isSelected = selectedOptionId === option.id;
                const isWrong = wrongOptionId === option.id;
                const isCorrectAndSolved = solved && option.isCorrect;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id, option.isCorrect)}
                    disabled={solved}
                    className={`p-3.5 sm:p-4 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer text-center relative select-none ${
                      isCorrectAndSolved
                        ? 'bg-emerald-500 text-white shadow-md scale-102 border-2 border-emerald-600'
                        : isWrong
                        ? 'bg-rose-100 text-rose-800 border-2 border-rose-400 animate-shake'
                        : 'bg-amber-50/80 hover:bg-amber-100 text-slate-800 border-2 border-amber-200 hover:border-amber-400 hover:scale-102 active:scale-98 shadow-xs'
                    }`}
                  >
                    {option.emoji && (
                      <span className="text-xl">{option.emoji}</span>
                    )}
                    <span>{label}</span>
                    {isCorrectAndSolved && (
                      <CheckCircle2 className="w-5 h-5 text-white ml-1 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Celebration & Reward Banner after solving */}
          {solved && showCelebrationBanner && (
            <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white shadow-lg animate-in zoom-in-95 duration-300">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 text-3xl border border-white/30 shadow-inner animate-bounce-gentle">
                  🌟
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg sm:text-xl font-black">
                      {t.dailyChallenge.congratsTitle}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-white/30 text-white text-xs font-extrabold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
                      {isBonusPractice ? '+1 ⭐' : '+2 ⭐⭐'}
                    </span>
                  </div>
                  <p className="text-amber-50 text-xs sm:text-sm font-medium leading-relaxed mb-3">
                    {t.dailyChallenge.congratsMessage}
                  </p>

                  {/* Educational fun fact */}
                  <div className="p-3 rounded-2xl bg-black/10 backdrop-blur-xs text-xs sm:text-sm border border-white/20 text-white font-medium">
                    💡 <strong>{funFactText}</strong>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-4 pt-3 border-t border-white/25 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-amber-100 font-semibold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-200 fill-amber-200" />
                  <span>
                    {t.dailyChallenge.streakDays}: {dailyStreak}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleStartNextBonus}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-amber-800 hover:bg-amber-50 font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-103 active:scale-98 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4 text-amber-600" />
                    <span>{t.dailyChallenge.playAnother}</span>
                  </button>

                  <button
                    onClick={() => {
                      soundEffects.playButtonClick();
                      onClose();
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-700/60 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer border border-white/30"
                  >
                    {t.dailyChallenge.backHome}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-amber-50 border-t border-amber-200 flex items-center justify-between text-xs text-amber-900 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <strong className="font-number">{starsFormatted.main}</strong> {t.header.stars}
            </span>
            <span className="text-amber-300">|</span>
            <span className="font-bold flex items-center gap-1 text-sky-800">
              <Trophy className="w-3.5 h-3.5 text-sky-600" />
              <strong className="font-number">{pointsFormatted.main}</strong> {t.header.points}
            </span>
          </div>

          <div className="text-slate-500 text-2xs sm:text-xs">
            {companion.avatarEmoji} {compName} {companion.titleAr}
          </div>
        </div>
      </div>
    </div>
  );
};

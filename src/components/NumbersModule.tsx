import React, { useState } from 'react';
import { Volume2, ChevronRight, ChevronLeft, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';
import { NUMBERS_1_TO_20, NumberItem } from '../data/numbersData';
import { soundEffects } from '../utils/soundEffects';
import { useGame } from '../context/GameContext';
import { TracingCanvas } from './TracingCanvas';

export const NumbersModule: React.FC = () => {
  const [selectedNumIndex, setSelectedNumIndex] = useState(0);
  const [tappedItems, setTappedItems] = useState<number[]>([]);
  const [quizActive, setQuizActive] = useState(false);
  const [quizTarget, setQuizTarget] = useState<NumberItem>(NUMBERS_1_TO_20[2]);
  const [quizOptions, setQuizOptions] = useState<number[]>([]);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const { language, t, addStars, formatNumber, speakCurrentLanguage } = useGame();
  const currentItem = NUMBERS_1_TO_20[selectedNumIndex];

  const getWord = (item: NumberItem) => {
    if (language === 'en') return item.wordEn;
    if (language === 'fr') return item.wordFr;
    return item.wordAr;
  };

  const getObjectName = (item: NumberItem) => {
    if (language === 'en') return item.objectNameEn;
    if (language === 'fr') return item.objectNameFr;
    return item.objectNameAr;
  };

  const getPluralName = (item: NumberItem) => {
    if (language === 'en') return item.pluralNameEn;
    if (language === 'fr') return item.pluralNameFr;
    return item.pluralNameAr;
  };

  const getRhyme = (item: NumberItem) => {
    if (language === 'en') return item.rhymeEn;
    if (language === 'fr') return item.rhymeFr;
    return item.rhymeAr;
  };

  const handleSelectNumber = (index: number) => {
    soundEffects.playButtonClick();
    setSelectedNumIndex(index);
    setTappedItems([]);
    const item = NUMBERS_1_TO_20[index];
    soundEffects.playCountPitch(item.value);
    speakCurrentLanguage(`${getWord(item)}, ${item.value}`);
  };

  const handleNext = () => {
    if (selectedNumIndex < NUMBERS_1_TO_20.length - 1) {
      handleSelectNumber(selectedNumIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedNumIndex > 0) {
      handleSelectNumber(selectedNumIndex - 1);
    }
  };

  const handlePronounce = () => {
    soundEffects.playCountPitch(currentItem.value);
    speakCurrentLanguage(`${getWord(currentItem)}! ${getRhyme(currentItem)}`);
  };

  const handleTapObject = (objIndex: number) => {
    if (tappedItems.includes(objIndex)) return;
    const newTapped = [...tappedItems, objIndex];
    setTappedItems(newTapped);
    const countSoFar = newTapped.length;

    soundEffects.playCountPitch(countSoFar);
    speakCurrentLanguage(countSoFar.toString());

    if (countSoFar === currentItem.value) {
      soundEffects.playSuccess();
      setTimeout(() => {
        speakCurrentLanguage(
          language === 'en'
            ? `Splendid! You counted ${currentItem.value} ${getPluralName(currentItem)}!`
            : language === 'fr'
            ? `Magnifique ! Tu as compté ${currentItem.value} ${getPluralName(currentItem)} !`
            : `ممتاز يا بطل! قمت بعد ${getPluralName(currentItem)} بالكامل!`
        );
        addStars(2);
      }, 400);
    }
  };

  const startQuiz = () => {
    soundEffects.playButtonClick();
    const randomIndex = Math.floor(Math.random() * NUMBERS_1_TO_20.length);
    const target = NUMBERS_1_TO_20[randomIndex];
    setQuizTarget(target);

    const opts = new Set<number>([target.value]);
    while (opts.size < 4) {
      const r = Math.floor(Math.random() * 20) + 1;
      opts.add(r);
    }
    setQuizOptions(Array.from(opts).sort(() => Math.random() - 0.5));
    setQuizFeedback(null);
    setQuizActive(true);
    speakCurrentLanguage(`${t.numbers.quizQuestion} ${getWord(target)}?`);
  };

  const handleAnswerQuiz = (val: number) => {
    if (val === quizTarget.value) {
      soundEffects.playSuccess();
      speakCurrentLanguage(
        language === 'en'
          ? `Correct answer! It is number ${getWord(quizTarget)}!`
          : language === 'fr'
          ? `Bonne réponse ! C’est le nombre ${getWord(quizTarget)} !`
          : `إجابة صحيحة يا ذكي! إنه الرقم ${getWord(quizTarget)}!`
      );
      setQuizFeedback(t.numbers.quizCorrect);
      addStars(1);
    } else {
      soundEffects.playTryAgain();
      speakCurrentLanguage(
        language === 'en'
          ? 'Try again, champion!'
          : language === 'fr'
          ? 'Essaie encore, champion !'
          : 'حاول مرة أخرى يا بطل!'
      );
      setQuizFeedback(t.numbers.quizWrong);
    }
  };

  const currentWord = getWord(currentItem);
  const currentRhyme = getRhyme(currentItem);

  return (
    <div className="space-y-6">
      {/* 1-to-20 Numbers Grid */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-amber-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-bold text-slate-800">
              {t.numbers.chooseNumber}
            </span>
            <span className="text-xs text-slate-500">
              ({t.numbers.range})
            </span>
          </div>

          <button
            onClick={() => {
              if (quizActive) {
                setQuizActive(false);
              } else {
                startQuiz();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs sm:text-sm font-bold cursor-pointer transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-purple-500" />
            <span>{quizActive ? t.numbers.backToLesson : t.numbers.smartChallenge}</span>
          </button>
        </div>

        {/* 20 Number Buttons Grid (STRICTLY STANDARD NUMERALS 1 to 20) */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {NUMBERS_1_TO_20.map((num, idx) => {
            const isSelected = idx === selectedNumIndex && !quizActive;
            return (
              <button
                key={num.value}
                onClick={() => {
                  setQuizActive(false);
                  handleSelectNumber(idx);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl font-bold cursor-pointer transition-all ${
                  isSelected
                    ? `${num.bgColor} ${num.color} ring-3 ring-amber-400 scale-105 shadow-sm`
                    : 'bg-slate-50 hover:bg-amber-50/60 text-slate-700 border border-slate-200/80 hover:border-amber-200'
                }`}
              >
                <span className="text-xl sm:text-2xl font-number">{num.value}</span>
                <span className="text-sm mt-0.5">{num.emoji}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* QUIZ MODE */}
      {quizActive ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-sm text-center">
          <div className="max-w-md mx-auto space-y-6">
            <span className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
              {t.numbers.smartChallenge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
              {t.numbers.quizQuestion} <span className="text-purple-600 underline">{getWord(quizTarget)}</span>?
            </h2>

            <div className="flex justify-center items-center gap-3">
              <span className="text-5xl">{quizTarget.emoji}</span>
              <button
                onClick={() => speakCurrentLanguage(`${t.numbers.quizQuestion} ${getWord(quizTarget)}?`)}
                className="p-3 rounded-2xl bg-purple-50 text-purple-700 hover:bg-purple-100 cursor-pointer"
                title={t.numbers.quizListen}
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4">
              {quizOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswerQuiz(opt)}
                  className="p-5 rounded-2xl border-2 border-purple-200 bg-purple-50/40 hover:bg-purple-100 text-purple-900 font-black text-4xl font-number cursor-pointer transition-all hover:scale-102 active:scale-98 shadow-xs"
                >
                  {opt}
                </button>
              ))}
            </div>

            {quizFeedback && (
              <div className="p-3 bg-purple-100/70 text-purple-900 font-bold rounded-xl animate-bounce-gentle">
                {quizFeedback}
              </div>
            )}

            <button
              onClick={startQuiz}
              className="mt-4 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold cursor-pointer transition-colors"
            >
              {t.numbers.quizNext}
            </button>
          </div>
        </div>
      ) : (
        /* NUMBER DETAIL STUDIO */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Visual Display & Counting Arena */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm flex flex-col justify-between">
            <div>
              {/* Prev / Next & Pronounce */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePrev}
                  disabled={selectedNumIndex === 0}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                    selectedNumIndex === 0
                      ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                      : 'border-amber-200 text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  <ChevronRight className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
                  <span>{t.numbers.previous}</span>
                </button>

                <button
                  onClick={handlePronounce}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-sm cursor-pointer transition-transform active:scale-95"
                >
                  <Volume2 className="w-5 h-5 animate-bounce-gentle" />
                  <span>{t.numbers.pronounce} ({currentWord})</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={selectedNumIndex === NUMBERS_1_TO_20.length - 1}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                    selectedNumIndex === NUMBERS_1_TO_20.length - 1
                      ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                      : 'border-amber-200 text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  <span>{t.numbers.next}</span>
                  <ChevronLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
                </button>
              </div>

              {/* Huge Single Standard Numeral Spotlight */}
              <div className={`p-6 rounded-3xl ${currentItem.bgColor} border ${currentItem.borderColor} text-center mb-6`}>
                <div className="flex items-center justify-center">
                  <span className={`text-7xl sm:text-8xl font-black ${currentItem.color} font-number`}>
                    {currentItem.value}
                  </span>
                </div>

                {/* Word in Current Language */}
                <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mt-2">
                  {currentWord}
                </h2>

                {/* Rhyme */}
                <p className="mt-3 text-sm sm:text-base font-semibold text-slate-700 bg-white/70 py-2 px-4 rounded-xl border border-white/90 shadow-2xs">
                  ✨ {currentRhyme}
                </p>
              </div>

              {/* Tap to Count Sandbox */}
              <div className="border border-amber-200 rounded-3xl p-5 bg-amber-50/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                      {t.numbers.tapToCount}
                    </h3>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-xl font-number">
                    {t.numbers.countedSoFar} {tappedItems.length} / {currentItem.value}
                  </div>
                </div>

                {/* Item Grid for tap counting */}
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2.5 p-3 bg-white rounded-2xl border border-amber-100 min-h-[140px] items-center justify-center">
                  {Array.from({ length: currentItem.value }).map((_, idx) => {
                    const isTapped = tappedItems.includes(idx);
                    return (
                      <button
                        key={idx}
                        onClick={() => handleTapObject(idx)}
                        className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer select-none ${
                          isTapped
                            ? 'bg-amber-100 border-2 border-amber-400 scale-105 shadow-xs'
                            : 'bg-slate-50 border border-slate-200 opacity-60 hover:opacity-100 hover:scale-105'
                        }`}
                        title={`Tap to count item #${idx + 1}`}
                      >
                        <span className="text-2xl">{currentItem.emoji}</span>
                        {isTapped && (
                          <span className="text-[10px] font-black text-amber-800 font-number -mt-1">
                            {idx + 1}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {tappedItems.length === currentItem.value && (
                  <div className="mt-3 p-2.5 bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold rounded-xl text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{t.numbers.countComplete}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Tracing & Writing Studio */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <TracingCanvas
              digitStr={currentItem.value.toString()}
              wordStr={currentWord}
            />

            {/* Quick Summary Card */}
            <div className="bg-white rounded-3xl p-5 border border-amber-200 shadow-xs space-y-3">
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <span>🌟 {t.numbers.quickFactTitle} ({currentItem.value}):</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>
                    {t.numbers.nextIs}{' '}
                    <strong>{getWord(NUMBERS_1_TO_20[(selectedNumIndex + 1) % 20])} ({currentItem.value + 1})</strong>.
                  </span>
                </li>
                {selectedNumIndex > 0 && (
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>
                      {t.numbers.prevIs}{' '}
                      <strong>{getWord(NUMBERS_1_TO_20[selectedNumIndex - 1])} ({currentItem.value - 1})</strong>.
                    </span>
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>
                    {t.numbers.halfSumIs} {Math.floor(currentItem.value / 2)} + {Math.ceil(currentItem.value / 2)} = {currentItem.value}!
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

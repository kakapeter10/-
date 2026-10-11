import React, { useState } from 'react';
import { Plus, Minus, Scale, Train, Volume2, RefreshCw } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';
import { useGame } from '../context/GameContext';

type MathGameMode = 'addition' | 'subtraction' | 'comparison' | 'train';

export const MathModule: React.FC = () => {
  const [mode, setMode] = useState<MathGameMode>('addition');
  const { language, t, addStars, speakCurrentLanguage } = useGame();

  // ADDITION STATE
  const [addNum1, setAddNum1] = useState(4);
  const [addNum2, setAddNum2] = useState(3);
  const [addOptions, setAddOptions] = useState<number[]>([6, 7, 8]);
  const [addAnswered, setAddAnswered] = useState<boolean | null>(null);

  // SUBTRACTION STATE
  const [subTotal, setSubTotal] = useState(8);
  const [subRemove, setSubRemove] = useState(3);
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const [subAnswered, setSubAnswered] = useState<boolean | null>(null);

  // COMPARISON / BALANCE STATE
  const [compLeft, setCompLeft] = useState(9);
  const [compRight, setCompRight] = useState(6);
  const [compFeedback, setCompFeedback] = useState<string | null>(null);

  // TRAIN SEQUENCE STATE
  const [trainStart, setTrainStart] = useState(11);
  const [trainMissingIndex, setTrainMissingIndex] = useState(2);
  const [trainOptions, setTrainOptions] = useState<number[]>([12, 13, 14]);
  const [trainAnswered, setTrainAnswered] = useState<boolean | null>(null);

  // Generate new Addition Problem
  const newAdditionProblem = () => {
    soundEffects.playButtonClick();
    const n1 = Math.floor(Math.random() * 8) + 1;
    const n2 = Math.floor(Math.random() * 8) + 1;
    const sum = n1 + n2;
    setAddNum1(n1);
    setAddNum2(n2);
    setAddAnswered(null);

    const opts = new Set<number>([sum]);
    while (opts.size < 3) {
      const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
      const fake = Math.max(1, sum + delta);
      opts.add(fake);
    }
    setAddOptions(Array.from(opts).sort(() => Math.random() - 0.5));
    speakCurrentLanguage(
      language === 'en'
        ? `What is ${n1} plus ${n2}?`
        : language === 'fr'
        ? `Combien font ${n1} plus ${n2} ?`
        : `كم ناتج جمع ${n1} مع ${n2}؟`
    );
  };

  const handleAnswerAddition = (val: number) => {
    const correctSum = addNum1 + addNum2;
    if (val === correctSum) {
      soundEffects.playSuccess();
      speakCurrentLanguage(
        language === 'en'
          ? `Correct! ${addNum1} plus ${addNum2} equals ${correctSum}!`
          : language === 'fr'
          ? `Bravo ! ${addNum1} plus ${addNum2} égale ${correctSum} !`
          : `أحسنت! ${addNum1} زائد ${addNum2} يساوي ${correctSum}!`
      );
      setAddAnswered(true);
      addStars(1);
    } else {
      soundEffects.playTryAgain();
      speakCurrentLanguage(
        language === 'en'
          ? 'Count the apples in both baskets together!'
          : language === 'fr'
          ? 'Compte les pommes dans les deux paniers ensemble !'
          : 'حاول مجدداً، عدّ التفاحات في السلتين معاً!'
      );
      setAddAnswered(false);
    }
  };

  // Generate new Subtraction Problem
  const newSubtractionProblem = () => {
    soundEffects.playButtonClick();
    const total = Math.floor(Math.random() * 8) + 4;
    const remove = Math.floor(Math.random() * (total - 1)) + 1;
    setSubTotal(total);
    setSubRemove(remove);
    setPoppedBalloons([]);
    setSubAnswered(null);
    speakCurrentLanguage(
      language === 'en'
        ? `We have ${total} balloons, pop ${remove} of them!`
        : language === 'fr'
        ? `Nous avons ${total} ballons, éclate ${remove} d’entre eux !`
        : `لدينا ${total} بالونات، فرقع منها ${remove} بالونات!`
    );
  };

  const handlePopBalloon = (idx: number) => {
    if (poppedBalloons.includes(idx)) return;
    if (poppedBalloons.length >= subRemove) return;

    soundEffects.playBalloonBurst();
    const newPopped = [...poppedBalloons, idx];
    setPoppedBalloons(newPopped);

    if (newPopped.length === subRemove) {
      speakCurrentLanguage(
        language === 'en'
          ? `You popped ${subRemove} balloons! How many are left?`
          : language === 'fr'
          ? `Tu as éclaté ${subRemove} ballons ! Combien en reste-t-il ?`
          : `فرقعت ${subRemove} بالونات! كم بالوناً بقي الآن؟`
      );
    }
  };

  const handleAnswerSubtraction = (val: number) => {
    const correctRemain = subTotal - subRemove;
    if (val === correctRemain) {
      soundEffects.playSuccess();
      speakCurrentLanguage(
        language === 'en'
          ? `Splendid! ${subTotal} minus ${subRemove} equals ${correctRemain}!`
          : language === 'fr'
          ? `Formidable ! ${subTotal} moins ${subRemove} égale ${correctRemain} !`
          : `رائع جداً! ${subTotal} ناقص ${subRemove} يساوي ${correctRemain}!`
      );
      setSubAnswered(true);
      addStars(1);
    } else {
      soundEffects.playTryAgain();
      speakCurrentLanguage(
        language === 'en'
          ? 'Count the remaining unpopped balloons!'
          : language === 'fr'
          ? 'Compte les ballons entiers restants !'
          : 'عد البالونات المتبقية التي لم تفرقع بعد!'
      );
      setSubAnswered(false);
    }
  };

  // Generate new Comparison Problem
  const newComparisonProblem = () => {
    soundEffects.playButtonClick();
    const l = Math.floor(Math.random() * 19) + 1;
    const r = Math.random() > 0.25 ? Math.floor(Math.random() * 19) + 1 : l;
    setCompLeft(l);
    setCompRight(r);
    setCompFeedback(null);
    speakCurrentLanguage(
      language === 'en'
        ? `Compare ${l} and ${r}`
        : language === 'fr'
        ? `Compare ${l} et ${r}`
        : `قارن بين الرقمين: ${l} و ${r}`
    );
  };

  const handleAnswerComparison = (sign: '>' | '<' | '=') => {
    let isCorrect = false;
    if (compLeft > compRight && sign === '>') isCorrect = true;
    if (compLeft < compRight && sign === '<') isCorrect = true;
    if (compLeft === compRight && sign === '=') isCorrect = true;

    if (isCorrect) {
      soundEffects.playSuccess();
      const txt =
        sign === '='
          ? (language === 'en' ? `${compLeft} is equal to ${compRight}!` : language === 'fr' ? `${compLeft} est égal à ${compRight} !` : 'الرقم كفتان متساويتان!')
          : sign === '>'
          ? (language === 'en' ? `${compLeft} is greater than ${compRight}!` : language === 'fr' ? `${compLeft} est plus grand que ${compRight} !` : `${compLeft} أكبر من ${compRight}!`)
          : (language === 'en' ? `${compLeft} is less than ${compRight}!` : language === 'fr' ? `${compLeft} est plus petit que ${compRight} !` : `${compLeft} أصغر من ${compRight}!`);
      speakCurrentLanguage(txt);
      setCompFeedback(t.math.correctAlert);
      addStars(1);
    } else {
      soundEffects.playTryAgain();
      speakCurrentLanguage(t.math.wrongAlert);
      setCompFeedback(t.math.wrongAlert);
    }
  };

  // Generate new Train Problem
  const newTrainProblem = () => {
    soundEffects.playButtonClick();
    const start = Math.floor(Math.random() * 15) + 1;
    const missing = Math.floor(Math.random() * 4);
    const correctVal = start + missing;

    setTrainStart(start);
    setTrainMissingIndex(missing);
    setTrainAnswered(null);

    const opts = new Set<number>([correctVal]);
    while (opts.size < 3) {
      const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1);
      const fake = Math.max(1, correctVal + delta);
      opts.add(fake);
    }
    setTrainOptions(Array.from(opts).sort(() => Math.random() - 0.5));
    speakCurrentLanguage(t.math.missingNumberPrompt);
  };

  const handleAnswerTrain = (val: number) => {
    const correctVal = trainStart + trainMissingIndex;
    if (val === correctVal) {
      soundEffects.playSuccess();
      speakCurrentLanguage(
        language === 'en'
          ? `Choo choo! The train departs with number ${correctVal}!`
          : language === 'fr'
          ? `Tchou tchou ! Le train démarre avec le nombre ${correctVal} !`
          : `توت توت! انطلق القطار بالرقم الصحيح ${correctVal}!`
      );
      setTrainAnswered(true);
      addStars(1);
    } else {
      soundEffects.playTryAgain();
      speakCurrentLanguage(t.math.wrongAlert);
      setTrainAnswered(false);
    }
  };

  const tiltDeg =
    compLeft === compRight
      ? 0
      : compLeft > compRight
      ? -10
      : 10;

  return (
    <div className="space-y-6">
      {/* Math Sub-Navigation */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-amber-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-800">{t.math.selectGame}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => { soundEffects.playButtonClick(); setMode('addition'); }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer transition-all ${
              mode === 'addition'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-rose-50 text-slate-700'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>{t.math.addition}</span>
          </button>

          <button
            onClick={() => { soundEffects.playButtonClick(); setMode('subtraction'); }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer transition-all ${
              mode === 'subtraction'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-sky-50 text-slate-700'
            }`}
          >
            <Minus className="w-4 h-4" />
            <span>{t.math.subtraction}</span>
          </button>

          <button
            onClick={() => { soundEffects.playButtonClick(); setMode('comparison'); }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer transition-all ${
              mode === 'comparison'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-amber-50 text-slate-700'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{t.math.comparison}</span>
          </button>

          <button
            onClick={() => { soundEffects.playButtonClick(); setMode('train'); }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer transition-all ${
              mode === 'train'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-emerald-50 text-slate-700'
            }`}
          >
            <Train className="w-4 h-4" />
            <span>{t.math.train}</span>
          </button>
        </div>
      </div>

      {/* 1. ADDITION ARENA */}
      {mode === 'addition' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-sm text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
                {t.math.appleGarden}
              </span>
              <button
                onClick={newAdditionProblem}
                className="flex items-center gap-1.5 text-xs text-rose-700 hover:text-rose-900 bg-rose-50 px-3 py-1.5 rounded-xl cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.math.newProblem}</span>
              </button>
            </div>

            {/* Visual Baskets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 py-4">
              <div className="bg-rose-50/70 border border-rose-200 rounded-3xl p-4 flex flex-col items-center">
                <span className="text-3xl font-black text-rose-700 font-number mb-2">
                  {addNum1}
                </span>
                <div className="flex flex-wrap justify-center gap-1 max-w-[140px] min-h-[50px]">
                  {Array.from({ length: addNum1 }).map((_, i) => (
                    <span key={i} className="text-2xl animate-bounce-gentle">🍎</span>
                  ))}
                </div>
                <span className="text-xs text-slate-500 mt-2">{t.math.basket1}</span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center text-3xl font-black shadow-md font-number">
                  +
                </div>
              </div>

              <div className="bg-rose-50/70 border border-rose-200 rounded-3xl p-4 flex flex-col items-center">
                <span className="text-3xl font-black text-rose-700 font-number mb-2">
                  {addNum2}
                </span>
                <div className="flex flex-wrap justify-center gap-1 max-w-[140px] min-h-[50px]">
                  {Array.from({ length: addNum2 }).map((_, i) => (
                    <span key={i} className="text-2xl animate-bounce-gentle">🍎</span>
                  ))}
                </div>
                <span className="text-xs text-slate-500 mt-2">{t.math.basket2}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-800">
                {t.math.howManyApples}
              </h3>
              <button
                onClick={() => speakCurrentLanguage(`${addNum1} + ${addNum2}`)}
                className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              {addOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswerAddition(opt)}
                  className="py-4 px-3 rounded-2xl border-2 border-rose-200 bg-rose-50/40 hover:bg-rose-100 text-rose-900 font-black text-3xl font-number cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-xs"
                >
                  {opt}
                </button>
              ))}
            </div>

            {addAnswered !== null && (
              <div
                className={`p-3 rounded-2xl font-bold text-sm ${
                  addAnswered
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {addAnswered
                  ? `${t.math.correctAlert} (${addNum1} + ${addNum2} = ${addNum1 + addNum2})`
                  : t.math.wrongAlert}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. SUBTRACTION & BALLOON POP ARENA */}
      {mode === 'subtraction' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-200 shadow-sm text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-600 bg-sky-100 px-3 py-1 rounded-full">
                {t.math.balloonsGame}
              </span>
              <button
                onClick={newSubtractionProblem}
                className="flex items-center gap-1.5 text-xs text-sky-700 hover:text-sky-900 bg-sky-50 px-3 py-1.5 rounded-xl cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.math.newProblem}</span>
              </button>
            </div>

            <div className="bg-sky-50/60 p-4 rounded-3xl border border-sky-200">
              <h3 className="text-lg sm:text-xl font-black text-slate-800 mb-1">
                {t.math.balloonsPrompt} ({subTotal} - {subRemove})
              </h3>
              <p className="text-xs text-slate-500 mb-4 font-number">
                {t.math.poppedOf}: {poppedBalloons.length} / {subRemove}
              </p>

              {/* Balloons Field */}
              <div className="flex flex-wrap justify-center gap-3 py-2">
                {Array.from({ length: subTotal }).map((_, idx) => {
                  const isPopped = poppedBalloons.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => handlePopBalloon(idx)}
                      disabled={isPopped || poppedBalloons.length >= subRemove}
                      className={`w-14 h-16 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isPopped
                          ? 'opacity-30 scale-75 line-through bg-slate-100 cursor-not-allowed'
                          : 'bg-white shadow-xs border border-sky-200 hover:scale-110 active:scale-95 animate-bounce-gentle'
                      }`}
                    >
                      <span className="text-3xl">{isPopped ? '💥' : '🎈'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-base sm:text-lg font-bold text-slate-700">
                {t.math.balloonsRemain}
              </p>

              <div className="flex justify-center gap-3">
                {[subTotal - subRemove, subTotal - subRemove + 1, Math.max(1, subTotal - subRemove - 1)]
                  .sort(() => Math.random() - 0.5)
                  .map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswerSubtraction(opt)}
                      className="py-3 px-6 rounded-2xl border-2 border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-900 font-black text-2xl font-number cursor-pointer transition-all hover:scale-105 active:scale-95"
                    >
                      {opt}
                    </button>
                  ))}
              </div>
            </div>

            {subAnswered !== null && (
              <div
                className={`p-3 rounded-2xl font-bold text-sm ${
                  subAnswered
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-sky-100 text-sky-800'
                }`}
              >
                {subAnswered
                  ? `${t.math.correctAlert} (${subTotal} - ${subRemove} = ${subTotal - subRemove})`
                  : t.math.wrongAlert}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. COMPARISON & BALANCE SCALE */}
      {mode === 'comparison' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                {t.math.balanceGame}
              </span>
              <button
                onClick={newComparisonProblem}
                className="flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-900 bg-amber-50 px-3 py-1.5 rounded-xl cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.math.newProblem}</span>
              </button>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-800">
              {t.math.whichPanBigger}
            </h3>

            {/* Visual Balance Scale SVG */}
            <div className="relative h-48 flex items-center justify-center">
              <div
                className="relative w-80 h-32 transition-transform duration-500 ease-out flex items-center justify-between"
                style={{ transform: `rotate(${tiltDeg}deg)` }}
              >
                <div className="absolute top-1/2 left-0 right-0 h-3 bg-amber-700 rounded-full shadow-sm" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-1 h-12 bg-amber-800" />
                  <div className="w-24 h-16 rounded-b-3xl bg-amber-100 border-2 border-amber-400 flex flex-col items-center justify-center shadow-xs">
                    <span className="text-2xl font-black text-amber-900 font-number">
                      {compLeft}
                    </span>
                    <span className="text-[10px] text-amber-700">{t.math.pan1}</span>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-900 border-2 border-white shadow-md z-20" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-1 h-12 bg-amber-800" />
                  <div className="w-24 h-16 rounded-b-3xl bg-amber-100 border-2 border-amber-400 flex flex-col items-center justify-center shadow-xs">
                    <span className="text-2xl font-black text-amber-900 font-number">
                      {compRight}
                    </span>
                    <span className="text-[10px] text-amber-700">{t.math.pan2}</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-20 bg-amber-800 rounded-t-lg z-0" />
            </div>

            {/* Answer Signs: > or = or < */}
            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => handleAnswerComparison('>')}
                className="p-4 w-20 rounded-2xl border-2 border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-black text-3xl font-number cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-xs"
                title={t.math.greaterThan}
              >
                &gt;
              </button>
              <button
                onClick={() => handleAnswerComparison('=')}
                className="p-4 w-20 rounded-2xl border-2 border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-black text-3xl font-number cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-xs"
                title={t.math.equal}
              >
                =
              </button>
              <button
                onClick={() => handleAnswerComparison('<')}
                className="p-4 w-20 rounded-2xl border-2 border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-black text-3xl font-number cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-xs"
                title={t.math.lessThan}
              >
                &lt;
              </button>
            </div>

            {compFeedback && (
              <div className="p-3 bg-amber-100 text-amber-900 font-bold rounded-2xl">
                {compFeedback}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. TRAIN SEQUENCE ARENA */}
      {mode === 'train' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                {t.math.trainGame}
              </span>
              <button
                onClick={newTrainProblem}
                className="flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded-xl cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.math.newProblem}</span>
              </button>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-800">
              {t.math.missingNumberPrompt}
            </h3>

            {/* Train Visual Display */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-6">
              <div className="flex flex-col items-center bg-emerald-600 text-white p-3 rounded-2xl border-2 border-emerald-700 shadow-sm min-w-[70px]">
                <span className="text-3xl">🚂</span>
                <span className="text-[10px] font-bold">{t.math.locomotive}</span>
              </div>

              {[0, 1, 2, 3].map((offset) => {
                const num = trainStart + offset;
                const isMissing = offset === trainMissingIndex;

                return (
                  <div
                    key={offset}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 shadow-xs min-w-[65px] h-20 ${
                      isMissing
                        ? 'border-dashed border-amber-400 bg-amber-50 animate-pulse'
                        : 'border-emerald-300 bg-emerald-50 text-emerald-900'
                    }`}
                  >
                    {isMissing ? (
                      <span className="text-3xl font-black text-amber-500">❓</span>
                    ) : (
                      <span className="text-2xl font-black font-number">
                        {num}
                      </span>
                    )}
                    <span className="text-[9px] text-slate-400 mt-1">{t.math.carriage} {offset + 1}</span>
                  </div>
                );
              })}
            </div>

            {/* Choices */}
            <div className="flex justify-center gap-3">
              {trainOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswerTrain(opt)}
                  className="py-3 px-6 rounded-2xl border-2 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-black text-2xl font-number cursor-pointer transition-all hover:scale-105 active:scale-95"
                >
                  {opt}
                </button>
              ))}
            </div>

            {trainAnswered !== null && (
              <div
                className={`p-3 rounded-2xl font-bold text-sm ${
                  trainAnswered
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {trainAnswered ? t.math.trainSuccess : t.math.wrongAlert}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Shapes, Palette, Brain, Layers, Volume2, RefreshCw, Dog, Users, Briefcase, HelpCircle, CheckCircle2, Paintbrush } from 'lucide-react';
import {
  SHAPES_DATA,
  BASIC_COLORS,
  COLOR_RECIPES,
  ANIMALS_DATA,
  FAMILY_DATA,
  PROFESSIONS_DATA,
  ShapeItem,
  AnimalItem,
  FamilyItem,
  ProfessionItem,
} from '../data/skillsData';
import { soundEffects } from '../utils/soundEffects';
import { useGame } from '../context/GameContext';
import { ShapeColoringModule } from './ShapeColoringModule';

type SkillsSubTab = 'shapes' | 'shapeColoring' | 'animals' | 'family' | 'professions' | 'colors' | 'memory' | 'sizes';

export const SkillsModule: React.FC = () => {
  const [subTab, setSubTab] = useState<SkillsSubTab>('shapes');
  const { language, t, addStars, speakCurrentLanguage } = useGame();

  // SHAPES STATE
  const [selectedShape, setSelectedShape] = useState<ShapeItem>(SHAPES_DATA[0]);
  const [shadowGameTarget, setShadowGameTarget] = useState<ShapeItem>(SHAPES_DATA[1]);
  const [shadowSuccess, setShadowSuccess] = useState<boolean | null>(null);

  // ANIMALS STATE
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalItem>(ANIMALS_DATA[0]);
  const [animalQuizActive, setAnimalQuizActive] = useState(false);
  const [animalQuizTarget, setAnimalQuizTarget] = useState<AnimalItem>(ANIMALS_DATA[0]);
  const [animalQuizOptions, setAnimalQuizOptions] = useState<AnimalItem[]>([]);
  const [animalQuizFeedback, setAnimalQuizFeedback] = useState<string | null>(null);

  // FAMILY STATE
  const [selectedFamily, setSelectedFamily] = useState<FamilyItem>(FAMILY_DATA[0]);
  const [familyQuizActive, setFamilyQuizActive] = useState(false);
  const [familyQuizTarget, setFamilyQuizTarget] = useState<FamilyItem>(FAMILY_DATA[0]);
  const [familyQuizOptions, setFamilyQuizOptions] = useState<FamilyItem[]>([]);
  const [familyQuizFeedback, setFamilyQuizFeedback] = useState<string | null>(null);

  // PROFESSIONS & RIDDLE STATE
  const [selectedProfession, setSelectedProfession] = useState<ProfessionItem>(PROFESSIONS_DATA[0]);
  const [riddleActive, setRiddleActive] = useState(false);
  const [riddleTarget, setRiddleTarget] = useState<ProfessionItem>(PROFESSIONS_DATA[0]);
  const [riddleOptions, setRiddleOptions] = useState<ProfessionItem[]>([]);
  const [riddleFeedback, setRiddleFeedback] = useState<string | null>(null);

  // COLORS LAB STATE
  const [mixColor1, setMixColor1] = useState('أَحْمَر');
  const [mixColor2, setMixColor2] = useState('أَصْفَر');

  // MEMORY GAME STATE
  const [memoryCards, setMemoryCards] = useState<Array<{ id: number; content: string; matched: boolean; flipped: boolean }>>(() => {
    const symbols = ['⭐', '🍎', '🎈', '🚗'];
    const deck = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((c, idx) => ({ id: idx, content: c, matched: false, flipped: false }));
    return deck;
  });
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

  // SIZES ORDERING STATE
  const [sizeFeedback, setSizeFeedback] = useState<string | null>(null);

  const resetMemoryGame = () => {
    soundEffects.playButtonClick();
    const symbols = ['⭐', '🍎', '🎈', '🚗'];
    const deck = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((c, idx) => ({ id: idx, content: c, matched: false, flipped: false }));
    setMemoryCards(deck);
    setFlippedIndices([]);
  };

  const handleCardClick = (idx: number) => {
    if (flippedIndices.length >= 2 || memoryCards[idx].flipped || memoryCards[idx].matched) return;

    soundEffects.playCardFlip();
    const newCards = [...memoryCards];
    newCards[idx].flipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (newCards[first].content === newCards[second].content) {
        setTimeout(() => {
          soundEffects.playSuccess();
          newCards[first].matched = true;
          newCards[second].matched = true;
          setMemoryCards([...newCards]);
          setFlippedIndices([]);

          if (newCards.every((c) => c.matched)) {
            speakCurrentLanguage(
              language === 'en'
                ? 'Genius! You matched all pairs!'
                : language === 'fr'
                ? 'Génial ! Tu as associé toutes les paires !'
                : 'عبقري! لقد طابقت جميع البطاقات بنجاح!'
            );
            addStars(2);
          }
        }, 450);
      } else {
        setTimeout(() => {
          soundEffects.playTryAgain();
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setMemoryCards([...newCards]);
          setFlippedIndices([]);
        }, 850);
      }
    }
  };

  const startAnimalQuiz = () => {
    soundEffects.playButtonClick();
    const rand = ANIMALS_DATA[Math.floor(Math.random() * ANIMALS_DATA.length)];
    setAnimalQuizTarget(rand);
    setAnimalQuizFeedback(null);
    setAnimalQuizActive(true);

    const opts = new Set<AnimalItem>([rand]);
    while (opts.size < 4) {
      const other = ANIMALS_DATA[Math.floor(Math.random() * ANIMALS_DATA.length)];
      opts.add(other);
    }
    setAnimalQuizOptions(Array.from(opts).sort(() => Math.random() - 0.5));

    const soundText = language === 'en' ? rand.soundEn : language === 'fr' ? rand.soundFr : rand.soundAr;
    const prompt =
      language === 'en'
        ? `Who makes this sound: ${soundText}?`
        : language === 'fr'
        ? `Qui fait ce cri : ${soundText} ?`
        : `من الحيوان الذي يصدر هذا الصوت: ${soundText}؟`;
    speakCurrentLanguage(prompt);
  };

  const handleAnswerAnimalQuiz = (animal: AnimalItem) => {
    if (animal.id === animalQuizTarget.id) {
      soundEffects.playSuccess();
      const aName = language === 'en' ? animal.nameEn : language === 'fr' ? animal.nameFr : animal.nameAr;
      speakCurrentLanguage(
        language === 'en'
          ? `Correct! It is the ${aName}!`
          : language === 'fr'
          ? `Exact ! C’est le ${aName} !`
          : `أحسنت يا بطل! إنه ${aName}!`
      );
      setAnimalQuizFeedback(
        language === 'en'
          ? `Brilliant! That's the ${aName}! ⭐`
          : language === 'fr'
          ? `Bravo ! C’est bien le ${aName} ! ⭐`
          : `إجابة رائعة! إنه ${aName}! ⭐`
      );
      addStars(1);
    } else {
      soundEffects.playTryAgain();
      speakCurrentLanguage(
        language === 'en'
          ? 'Listen to the sound and try again!'
          : language === 'fr'
          ? 'Écoute bien le cri et réessaie !'
          : 'استمع لصوت الحيوان وحاول مجدداً!'
      );
      setAnimalQuizFeedback(
        language === 'en'
          ? 'Try again, who makes this sound?'
          : language === 'fr'
          ? 'Essaie encore, qui fait ce cri ?'
          : 'حاول مجدداً، من صاحب هذا الصوت؟'
      );
    }
  };

  const startFamilyQuiz = () => {
    soundEffects.playButtonClick();
    const rand = FAMILY_DATA[Math.floor(Math.random() * FAMILY_DATA.length)];
    setFamilyQuizTarget(rand);
    setFamilyQuizFeedback(null);
    setFamilyQuizActive(true);

    const opts = new Set<FamilyItem>([rand]);
    while (opts.size < 4) {
      const other = FAMILY_DATA[Math.floor(Math.random() * FAMILY_DATA.length)];
      opts.add(other);
    }
    setFamilyQuizOptions(Array.from(opts).sort(() => Math.random() - 0.5));

    const quoteText = language === 'en' ? rand.quoteEn : language === 'fr' ? rand.quoteFr : rand.quoteAr;
    const prompt =
      language === 'en'
        ? `Who says lovingly: "${quoteText}"?`
        : language === 'fr'
        ? `Qui dit avec amour : "${quoteText}" ?`
        : `من يقول بمحبة: «${quoteText}»؟`;
    speakCurrentLanguage(prompt);
  };

  const handleAnswerFamilyQuiz = (member: FamilyItem) => {
    if (member.id === familyQuizTarget.id) {
      soundEffects.playSuccess();
      const fName = language === 'en' ? member.nameEn : language === 'fr' ? member.nameFr : member.nameAr;
      speakCurrentLanguage(
        language === 'en'
          ? `Wonderful! That is ${fName}!`
          : language === 'fr'
          ? `Merveilleux ! C’est ${fName} !`
          : `رائع جداً! إنه ${fName}!`
      );
      setFamilyQuizFeedback(
        language === 'en'
          ? `Warm hug! That's ${fName}! ⭐`
          : language === 'fr'
          ? `Câlin doux ! C’est ${fName} ! ⭐`
          : `أحسنت المحبة! إنه ${fName}! ⭐`
      );
      addStars(1);
    } else {
      soundEffects.playTryAgain();
      speakCurrentLanguage(
        language === 'en'
          ? 'Think of family roles and try again!'
          : language === 'fr'
          ? 'Pense aux membres de la famille et réessaie !'
          : 'تأمل في دور كل فرد وحاول مجدداً!'
      );
      setFamilyQuizFeedback(
        language === 'en'
          ? 'Try again, who says this loving quote?'
          : language === 'fr'
          ? 'Essaie encore, qui dit ce message doux ?'
          : 'حاول مجدداً، من صاحب هذا الكلام اللطيف؟'
      );
    }
  };

  const startProfessionRiddle = () => {
    soundEffects.playButtonClick();
    const rand = PROFESSIONS_DATA[Math.floor(Math.random() * PROFESSIONS_DATA.length)];
    setRiddleTarget(rand);
    setRiddleFeedback(null);
    setRiddleActive(true);

    const opts = new Set<ProfessionItem>([rand]);
    while (opts.size < 4) {
      const other = PROFESSIONS_DATA[Math.floor(Math.random() * PROFESSIONS_DATA.length)];
      opts.add(other);
    }
    setRiddleOptions(Array.from(opts).sort(() => Math.random() - 0.5));

    const riddleText =
      language === 'en' ? rand.riddleEn : language === 'fr' ? rand.riddleFr : rand.riddleAr;
    speakCurrentLanguage(riddleText);
  };

  const handleAnswerRiddle = (prof: ProfessionItem) => {
    if (prof.id === riddleTarget.id) {
      soundEffects.playSuccess();
      const profName =
        language === 'en' ? prof.nameEn : language === 'fr' ? prof.nameFr : prof.nameAr;
      speakCurrentLanguage(
        language === 'en'
          ? `Bingo! I am the ${profName}!`
          : language === 'fr'
          ? `Bravo ! Je suis le ${profName} !`
          : `أحسنت! أنا هو ${profName}!`
      );
      setRiddleFeedback(
        language === 'en'
          ? `Awesome! That’s the ${profName}! ⭐`
          : language === 'fr'
          ? `Bravo ! C’est bien le ${profName} ! ⭐`
          : `إجابة صحيحة ومميزة! إنه ${profName}! ⭐`
      );
      addStars(1);
    } else {
      soundEffects.playTryAgain();
      speakCurrentLanguage(
        language === 'en'
          ? 'Not quite, listen to the riddle carefully!'
          : language === 'fr'
          ? 'Pas tout à fait, réécoute bien la devinette !'
          : 'فكر بالأداة التي يستعملها وحاول مجدداً!'
      );
      setRiddleFeedback(
        language === 'en'
          ? 'Try again, who uses this tool?'
          : language === 'fr'
          ? 'Essaie encore, qui utilise cet outil ?'
          : 'حاول مجدداً، من يستخدم هذه الأداة؟'
      );
    }
  };

  const currentRecipe = COLOR_RECIPES.find(
    (r) =>
      (r.color1Ar === mixColor1 && r.color2Ar === mixColor2) ||
      (r.color1Ar === mixColor2 && r.color2Ar === mixColor1)
  );

  return (
    <div className="space-y-6">
      {/* Sub Navigation */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-amber-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-bold text-slate-800">{t.skills.selectSkill}</span>

        <div className="flex flex-wrap items-center gap-2">
          {/* 1. Shapes */}
          <button
            onClick={() => { soundEffects.playButtonClick(); setSubTab('shapes'); }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer transition-all ${
              subTab === 'shapes'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-amber-50 text-slate-700'
            }`}
          >
            <Shapes className="w-4 h-4" />
            <span>{t.skills.shapes}</span>
          </button>

          {/* 2. Shape Coloring (تلوين الأشكال) */}
          <button
            onClick={() => { soundEffects.playButtonClick(); setSubTab('shapeColoring'); }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer transition-all ${
              subTab === 'shapeColoring'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-rose-50 text-slate-700'
            }`}
          >
            <Paintbrush className="w-4 h-4" />
            <span>{t.skills.shapeColoring} 🎨</span>
          </button>

          {/* 3. Animals */}
          <button
            onClick={() => { soundEffects.playButtonClick(); setSubTab('animals'); }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer transition-all ${
              subTab === 'animals'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-emerald-50 text-slate-700'
            }`}
          >
            <Dog className="w-4 h-4" />
            <span>
              {language === 'en' ? 'Animals World' : language === 'fr' ? 'Monde des Animaux' : 'عالم الحيوانات'}
            </span>
          </button>

          {/* 3. Family */}
          <button
            onClick={() => { soundEffects.playButtonClick(); setSubTab('family'); }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer transition-all ${
              subTab === 'family'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-rose-50 text-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>
              {language === 'en' ? 'My Loving Family' : language === 'fr' ? 'Ma Famille' : 'أفراد الأسرة'}
            </span>
          </button>

          {/* 4. Professions */}
          <button
            onClick={() => { soundEffects.playButtonClick(); setSubTab('professions'); }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer transition-all ${
              subTab === 'professions'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-indigo-50 text-slate-700'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>
              {language === 'en' ? 'Professions & Jobs' : language === 'fr' ? 'Métiers & Héros' : 'عالم المهن'}
            </span>
          </button>

          {/* 5. Colors */}
          <button
            onClick={() => { soundEffects.playButtonClick(); setSubTab('colors'); }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer transition-all ${
              subTab === 'colors'
                ? 'bg-purple-500 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-purple-50 text-slate-700'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>{t.skills.colors}</span>
          </button>

          {/* 6. Memory */}
          <button
            onClick={() => { soundEffects.playButtonClick(); setSubTab('memory'); }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer transition-all ${
              subTab === 'memory'
                ? 'bg-blue-500 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-blue-50 text-slate-700'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>{t.skills.memory}</span>
          </button>

          {/* 7. Sizes */}
          <button
            onClick={() => { soundEffects.playButtonClick(); setSubTab('sizes'); }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer transition-all ${
              subTab === 'sizes'
                ? 'bg-teal-500 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-teal-50 text-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t.skills.sizes}</span>
          </button>
        </div>
      </div>

      {/* 1. SHAPES & SHADOW MATCH */}
      {subTab === 'shapes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                  {t.skills.shapesDiscovery}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundEffects.playButtonClick();
                      setSubTab('shapeColoring');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold cursor-pointer border border-rose-200 transition-colors"
                  >
                    <Paintbrush className="w-3.5 h-3.5" />
                    <span>{t.skills.shapeColoring} 🎨</span>
                  </button>
                  <button
                    onClick={() => {
                      const sName = language === 'en' ? selectedShape.nameEn : language === 'fr' ? selectedShape.nameFr : selectedShape.nameAr;
                      const sDesc = language === 'en' ? selectedShape.descEn : language === 'fr' ? selectedShape.descFr : selectedShape.descAr;
                      speakCurrentLanguage(`${sName}! ${sDesc}`);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{t.skills.pronounceShape}</span>
                  </button>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-amber-50/40 border border-amber-200 flex flex-col items-center justify-center text-center mb-6">
                <svg viewBox="0 0 100 100" className="w-36 h-36 drop-shadow-md animate-bounce-gentle">
                  <path d={selectedShape.svgPath} fill={selectedShape.color} />
                </svg>

                <h2 className="text-3xl font-black text-slate-800 mt-4 mb-1">
                  {language === 'en' ? selectedShape.nameEn : language === 'fr' ? selectedShape.nameFr : selectedShape.nameAr}
                </h2>
                <p className="text-sm text-slate-600 max-w-sm">
                  {language === 'en' ? selectedShape.descEn : language === 'fr' ? selectedShape.descFr : selectedShape.descAr}
                </p>

                <div className="flex items-center justify-center gap-4 mt-4 text-xs font-bold">
                  <div className="p-2 px-3 rounded-xl bg-white border border-amber-200 text-amber-800">
                    {t.skills.sides} {selectedShape.sides}
                  </div>
                  <div className="p-2 px-3 rounded-xl bg-white border border-amber-200 text-amber-800">
                    {t.skills.corners} {selectedShape.corners}
                  </div>
                  <div className="p-2 px-3 rounded-xl bg-white border border-amber-200 text-amber-800 flex items-center gap-1">
                    <span>{selectedShape.exampleEmoji}</span>
                    <span>{language === 'en' ? selectedShape.realWorldExampleEn : language === 'fr' ? selectedShape.realWorldExampleFr : selectedShape.realWorldExampleAr}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {SHAPES_DATA.map((shape) => {
                  const isSelected = selectedShape.id === shape.id;
                  const name = language === 'en' ? shape.nameEn : language === 'fr' ? shape.nameFr : shape.nameAr;
                  return (
                    <button
                      key={shape.id}
                      onClick={() => {
                        soundEffects.playButtonClick();
                        setSelectedShape(shape);
                        speakCurrentLanguage(name);
                      }}
                      className={`p-2.5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-100 border-2 border-amber-400 scale-105 shadow-xs'
                          : 'bg-slate-50 border border-slate-200 hover:bg-amber-50/50'
                      }`}
                    >
                      <svg viewBox="0 0 100 100" className="w-8 h-8">
                        <path d={shape.svgPath} fill={shape.color} />
                      </svg>
                      <span className="text-[10px] font-bold text-slate-700 mt-1 truncate max-w-[50px]">
                        {name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-amber-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                  {t.skills.shadowMatch}
                </h3>
                <button
                  onClick={() => {
                    const nextIndex = Math.floor(Math.random() * SHAPES_DATA.length);
                    setShadowGameTarget(SHAPES_DATA[nextIndex]);
                    setShadowSuccess(null);
                  }}
                  className="text-xs text-amber-600 hover:text-amber-800 cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.skills.changeShadow}</span>
                </button>
              </div>

              <p className="text-xs text-slate-500 mb-4">
                {t.skills.shadowPrompt}
              </p>

              <div className="p-6 rounded-3xl bg-slate-900 flex items-center justify-center mb-6">
                <svg viewBox="0 0 100 100" className="w-28 h-28">
                  <path d={shadowGameTarget.svgPath} fill="#475569" stroke="#94A3B8" strokeWidth="2" />
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {SHAPES_DATA.slice(0, 4).map((s) => {
                  const sName = language === 'en' ? s.nameEn : language === 'fr' ? s.nameFr : s.nameAr;
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        if (s.id === shadowGameTarget.id) {
                          soundEffects.playSuccess();
                          speakCurrentLanguage(sName);
                          setShadowSuccess(true);
                          addStars(1);
                        } else {
                          soundEffects.playTryAgain();
                          setShadowSuccess(false);
                        }
                      }}
                      className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-amber-50 flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
                    >
                      <svg viewBox="0 0 100 100" className="w-7 h-7">
                        <path d={s.svgPath} fill={s.color} />
                      </svg>
                      <span className="font-bold text-xs text-slate-800">{sName}</span>
                    </button>
                  );
                })}
              </div>

              {shadowSuccess !== null && (
                <div
                  className={`mt-4 p-2.5 rounded-xl text-xs font-bold text-center ${
                    shadowSuccess
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {shadowSuccess ? t.skills.shadowCorrect : t.skills.shadowWrong}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. SHAPE COLORING (تلوين الأشكال الهندسية الأساسية) */}
      {subTab === 'shapeColoring' && <ShapeColoringModule />}

      {/* 3. ANIMALS WORLD (الحيوانات) */}
      {subTab === 'animals' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                {language === 'en' ? 'Animals Kingdom' : language === 'fr' ? 'Le Royaume des Animaux' : 'عالم الحيوانات اللطيفة'} 🐾 ({ANIMALS_DATA.length})
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-2">
                {language === 'en'
                  ? 'Learn 16 Animal Names, Sounds & Habitats!'
                  : language === 'fr'
                  ? 'Découvre 16 Animaux, leurs Cris et leurs Habitats !'
                  : 'تعرف على 16 حيواناً بأصواتها وبيئاتها وأسمائها!'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (animalQuizActive) {
                    setAnimalQuizActive(false);
                  } else {
                    startAnimalQuiz();
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>
                  {animalQuizActive
                    ? (language === 'en' ? 'Back to Animals' : language === 'fr' ? 'Retour aux Animaux' : 'العودة للحيوانات')
                    : (language === 'en' ? 'Animal Sound Quiz' : language === 'fr' ? 'Quiz des Cris' : 'تحدي أصوات الحيوانات 🎯')}
                </span>
              </button>

              {!animalQuizActive && (
                <button
                  onClick={() => {
                    const aName = language === 'en' ? selectedAnimal.nameEn : language === 'fr' ? selectedAnimal.nameFr : selectedAnimal.nameAr;
                    const aSound = language === 'en' ? selectedAnimal.soundEn : language === 'fr' ? selectedAnimal.soundFr : selectedAnimal.soundAr;
                    speakCurrentLanguage(`${aName}! ${aSound}`);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{language === 'en' ? 'Hear Sound' : language === 'fr' ? 'Écouter le cri' : 'صوت الحيوان'}</span>
                </button>
              )}
            </div>
          </div>

          {animalQuizActive ? (
            /* Animal Sound Quiz Mode */
            <div className="max-w-xl mx-auto p-6 rounded-3xl bg-emerald-50/70 border-2 border-emerald-300 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-3xl">
                📢
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-emerald-950">
                {language === 'en'
                  ? `Who makes this sound: "${animalQuizTarget.soundEn}"?`
                  : language === 'fr'
                  ? `Qui fait ce cri : "${animalQuizTarget.soundFr}" ?`
                  : `مَن صَاحِبُ هَذَا الصَّوْتِ: «${animalQuizTarget.soundAr}»؟`}
              </h3>
              <p className="text-xs text-emerald-700 font-bold">
                {language === 'en'
                  ? `Lives in: ${animalQuizTarget.habitatEn}`
                  : language === 'fr'
                  ? `Habitat : ${animalQuizTarget.habitatFr}`
                  : `يعيش في: ${animalQuizTarget.habitatAr}`}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {animalQuizOptions.map((a) => {
                  const aName = language === 'en' ? a.nameEn : language === 'fr' ? a.nameFr : a.nameAr;
                  return (
                    <button
                      key={a.id}
                      onClick={() => handleAnswerAnimalQuiz(a)}
                      className="p-4 rounded-2xl bg-white border-2 border-emerald-200 hover:border-emerald-400 hover:scale-102 flex flex-col items-center justify-center cursor-pointer transition-all shadow-xs"
                    >
                      <span className="text-4xl mb-1">{a.emoji}</span>
                      <span className="text-sm font-bold text-slate-800">{aName}</span>
                    </button>
                  );
                })}
              </div>

              {animalQuizFeedback && (
                <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-900 font-bold text-sm animate-bounce-gentle">
                  {animalQuizFeedback}
                </div>
              )}

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={startAnimalQuiz}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
                >
                  {language === 'en' ? 'Next Animal 🔄' : language === 'fr' ? 'Animal Suivant 🔄' : 'سؤال تالٍ 🔄'}
                </button>
              </div>
            </div>
          ) : (
            /* Animals Explorer Gallery */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Spotlight Card */}
              <div className="md:col-span-5 p-8 rounded-3xl bg-emerald-50/60 border border-emerald-200 text-center flex flex-col items-center">
                <span className="text-8xl drop-shadow-md animate-bounce-gentle mb-4">{selectedAnimal.emoji}</span>
                <h3 className="text-3xl font-black text-emerald-950">
                  {language === 'en' ? selectedAnimal.nameEn : language === 'fr' ? selectedAnimal.nameFr : selectedAnimal.nameAr}
                </h3>
                <p className="text-sm font-bold text-emerald-700 mt-1">
                  {language === 'en' ? selectedAnimal.soundEn : language === 'fr' ? selectedAnimal.soundFr : selectedAnimal.soundAr}
                </p>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed max-w-xs">
                  {language === 'en' ? selectedAnimal.descEn : language === 'fr' ? selectedAnimal.descFr : selectedAnimal.descAr}
                </p>
                <div className="mt-4 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-xs font-semibold text-emerald-800">
                  🏡 {language === 'en' ? selectedAnimal.habitatEn : language === 'fr' ? selectedAnimal.habitatFr : selectedAnimal.habitatAr}
                </div>
              </div>

              {/* 16 Animals Grid */}
              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[460px] overflow-y-auto p-1">
                {ANIMALS_DATA.map((animal) => {
                  const isSelected = selectedAnimal.id === animal.id;
                  const aName = language === 'en' ? animal.nameEn : language === 'fr' ? animal.nameFr : animal.nameAr;
                  return (
                    <button
                      key={animal.id}
                      onClick={() => {
                        soundEffects.playButtonClick();
                        setSelectedAnimal(animal);
                        speakCurrentLanguage(aName);
                      }}
                      className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-100 border-2 border-emerald-500 scale-105 shadow-sm'
                          : 'bg-slate-50 border border-slate-200 hover:bg-emerald-50/50'
                      }`}
                    >
                      <span className="text-3xl mb-1">{animal.emoji}</span>
                      <span className="text-xs font-bold text-slate-800 text-center truncate max-w-[85px]">{aName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. FAMILY MEMBERS (الأسرة) */}
      {subTab === 'family' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                {language === 'en' ? 'My Loving Family' : language === 'fr' ? 'Ma Famille Adorée' : 'أسرتي الحبيبة'} 🏡❤️ ({FAMILY_DATA.length})
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-2">
                {language === 'en'
                  ? 'Meet 13 Family Members and Their Loving Roles'
                  : language === 'fr'
                  ? 'Rencontre 13 Membres de la Famille'
                  : 'تعرف على 13 فرداً من الأسرة ودورهم المحب والداعم!'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (familyQuizActive) {
                    setFamilyQuizActive(false);
                  } else {
                    startFamilyQuiz();
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>
                  {familyQuizActive
                    ? (language === 'en' ? 'Back to Family' : language === 'fr' ? 'Retour à la Famille' : 'العودة للأسرة')
                    : (language === 'en' ? 'Family Love Quiz' : language === 'fr' ? 'Quiz de la Famille' : 'تحدي أفراد الأسرة 💖')}
                </span>
              </button>

              {!familyQuizActive && (
                <button
                  onClick={() => {
                    const fName = language === 'en' ? selectedFamily.nameEn : language === 'fr' ? selectedFamily.nameFr : selectedFamily.nameAr;
                    const fQuote = language === 'en' ? selectedFamily.quoteEn : language === 'fr' ? selectedFamily.quoteFr : selectedFamily.quoteAr;
                    speakCurrentLanguage(`${fName}! ${fQuote}`);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{language === 'en' ? 'Hear Quote' : language === 'fr' ? 'Écouter le message' : 'رسالة المحبة'}</span>
                </button>
              )}
            </div>
          </div>

          {familyQuizActive ? (
            /* Family Quiz Mode */
            <div className="max-w-xl mx-auto p-6 rounded-3xl bg-rose-50/70 border-2 border-rose-300 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center mx-auto text-3xl">
                💌
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-rose-950">
                «{language === 'en' ? familyQuizTarget.quoteEn : language === 'fr' ? familyQuizTarget.quoteFr : familyQuizTarget.quoteAr}»
              </h3>
              <p className="text-xs text-rose-700 font-bold">
                {language === 'en' ? 'Who says this loving message?' : language === 'fr' ? 'Qui dit ce doux message ?' : 'مَن صَاحِبُ هَذِهِ الرِّسَالَةِ الدَّافِئَةِ؟'}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {familyQuizOptions.map((f) => {
                  const fName = language === 'en' ? f.nameEn : language === 'fr' ? f.nameFr : f.nameAr;
                  return (
                    <button
                      key={f.id}
                      onClick={() => handleAnswerFamilyQuiz(f)}
                      className="p-4 rounded-2xl bg-white border-2 border-rose-200 hover:border-rose-400 hover:scale-102 flex flex-col items-center justify-center cursor-pointer transition-all shadow-xs"
                    >
                      <span className="text-4xl mb-1">{f.emoji}</span>
                      <span className="text-sm font-bold text-slate-800">{fName}</span>
                    </button>
                  );
                })}
              </div>

              {familyQuizFeedback && (
                <div className="p-3 rounded-2xl bg-rose-100 text-rose-900 font-bold text-sm animate-bounce-gentle">
                  {familyQuizFeedback}
                </div>
              )}

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={startFamilyQuiz}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
                >
                  {language === 'en' ? 'Next Family Member 🔄' : language === 'fr' ? 'Membre Suivant 🔄' : 'سؤال تالٍ 🔄'}
                </button>
              </div>
            </div>
          ) : (
            /* Family Explorer Gallery */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Selected Family Member Spotlight */}
              <div className="md:col-span-5 p-8 rounded-3xl bg-rose-50/60 border border-rose-200 text-center flex flex-col items-center">
                <span className="text-8xl drop-shadow-md animate-bounce-gentle mb-3">{selectedFamily.emoji}</span>
                <h3 className="text-3xl font-black text-rose-950">
                  {language === 'en' ? selectedFamily.nameEn : language === 'fr' ? selectedFamily.nameFr : selectedFamily.nameAr}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed max-w-xs">
                  {language === 'en' ? selectedFamily.roleEn : language === 'fr' ? selectedFamily.roleFr : selectedFamily.roleAr}
                </p>
                <div className="mt-4 p-3 rounded-2xl bg-white border border-rose-200 text-xs font-bold text-rose-800 shadow-2xs">
                  💬 «{language === 'en' ? selectedFamily.quoteEn : language === 'fr' ? selectedFamily.quoteFr : selectedFamily.quoteAr}»
                </div>
              </div>

              {/* 13 Family Members Grid */}
              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[460px] overflow-y-auto p-1">
                {FAMILY_DATA.map((member) => {
                  const isSelected = selectedFamily.id === member.id;
                  const fName = language === 'en' ? member.nameEn : language === 'fr' ? member.nameFr : member.nameAr;
                  return (
                    <button
                      key={member.id}
                      onClick={() => {
                        soundEffects.playButtonClick();
                        setSelectedFamily(member);
                        speakCurrentLanguage(fName);
                      }}
                      className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-rose-100 border-2 border-rose-400 scale-105 shadow-sm'
                          : 'bg-slate-50 border border-slate-200 hover:bg-rose-50/50'
                      }`}
                    >
                      <span className="text-3xl mb-1">{member.emoji}</span>
                      <span className="text-xs font-bold text-slate-800 text-center truncate max-w-[85px]">{fName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. PROFESSIONS & WHO AM I RIDDLE (المهن والأبطال) */}
      {subTab === 'professions' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
                {language === 'en' ? 'Heroes & Professions' : language === 'fr' ? 'Métiers et Héros' : 'عالم المهن والأبطال'} 🛠️ ({PROFESSIONS_DATA.length})
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-2">
                {language === 'en'
                  ? 'Explore 16 Jobs, Tools & Play "Who Am I?" Riddle!'
                  : language === 'fr'
                  ? 'Découvre 16 Métiers et joue à la devinette "Qui suis-je ?" !'
                  : 'اكتشف 16 مهنة وأدواتها والعب لغز «من أنا؟»!'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (riddleActive) {
                    setRiddleActive(false);
                  } else {
                    startProfessionRiddle();
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>
                  {riddleActive
                    ? (language === 'en' ? 'Back to Professions' : language === 'fr' ? 'Retour aux Métiers' : 'العودة لبطاقات المهن')
                    : (language === 'en' ? 'Play "Who Am I?" Riddle' : language === 'fr' ? 'Jouer à "Qui suis-je ?"' : 'تحدي لغز «من أنا؟» 🎯')}
                </span>
              </button>

              {!riddleActive && (
                <button
                  onClick={() => {
                    const pName = language === 'en' ? selectedProfession.nameEn : language === 'fr' ? selectedProfession.nameFr : selectedProfession.nameAr;
                    const pTool = language === 'en' ? selectedProfession.toolEn : language === 'fr' ? selectedProfession.toolFr : selectedProfession.toolAr;
                    speakCurrentLanguage(`${pName}! ${pTool}`);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{language === 'en' ? 'Hear Role' : language === 'fr' ? 'Écouter le métier' : 'نطق المهنة'}</span>
                </button>
              )}
            </div>
          </div>

          {riddleActive ? (
            /* Riddle Challenge Mode with 4 clean choice options */
            <div className="max-w-xl mx-auto p-6 rounded-3xl bg-indigo-50/70 border border-indigo-200 text-center space-y-4">
              <span className="text-5xl">{riddleTarget.toolEmoji}</span>
              <h3 className="text-xl sm:text-2xl font-black text-indigo-950">
                «{language === 'en' ? riddleTarget.riddleEn : language === 'fr' ? riddleTarget.riddleFr : riddleTarget.riddleAr}»
              </h3>
              <p className="text-xs text-indigo-700 font-bold">
                {language === 'en' ? 'Tap the correct profession below:' : language === 'fr' ? 'Touche le bon métier ci-dessous :' : 'اضغط على المهنة الصحيحة أدناه:'}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {(riddleOptions.length > 0 ? riddleOptions : PROFESSIONS_DATA.slice(0, 4)).map((p) => {
                  const pName = language === 'en' ? p.nameEn : language === 'fr' ? p.nameFr : p.nameAr;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleAnswerRiddle(p)}
                      className="p-4 rounded-2xl bg-white border-2 border-indigo-200 hover:border-indigo-400 hover:scale-102 flex flex-col items-center justify-center cursor-pointer transition-all shadow-xs"
                    >
                      <span className="text-4xl mb-1">{p.emoji}</span>
                      <span className="text-sm font-bold text-slate-800 text-center">{pName}</span>
                    </button>
                  );
                })}
              </div>

              {riddleFeedback && (
                <div className="p-3 rounded-2xl bg-indigo-100 text-indigo-900 font-bold text-sm animate-bounce-gentle">
                  {riddleFeedback}
                </div>
              )}

              <button
                onClick={startProfessionRiddle}
                className="mt-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
              >
                {language === 'en' ? 'Next Riddle 🔄' : language === 'fr' ? 'Autre Devinette 🔄' : 'لغز تالٍ 🔄'}
              </button>
            </div>
          ) : (
            /* 16 Professions Explorer Gallery */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Spotlight Card */}
              <div className="md:col-span-5 p-8 rounded-3xl bg-indigo-50/60 border border-indigo-200 text-center flex flex-col items-center">
                <span className="text-8xl drop-shadow-md animate-bounce-gentle mb-3">{selectedProfession.emoji}</span>
                <h3 className="text-3xl font-black text-indigo-950">
                  {language === 'en' ? selectedProfession.nameEn : language === 'fr' ? selectedProfession.nameFr : selectedProfession.nameAr}
                </h3>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
                  <span>{selectedProfession.toolEmoji}</span>
                  <span>{language === 'en' ? selectedProfession.toolEn : language === 'fr' ? selectedProfession.toolFr : selectedProfession.toolAr}</span>
                </div>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed max-w-xs">
                  {language === 'en' ? selectedProfession.descEn : language === 'fr' ? selectedProfession.descFr : selectedProfession.descAr}
                </p>
                <div className="mt-4 p-3 rounded-2xl bg-white border border-indigo-200 text-xs text-indigo-900 font-medium italic shadow-2xs">
                  💡 «{language === 'en' ? selectedProfession.riddleEn : language === 'fr' ? selectedProfession.riddleFr : selectedProfession.riddleAr}»
                </div>
              </div>

              {/* 16 Professions Grid */}
              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[460px] overflow-y-auto p-1">
                {PROFESSIONS_DATA.map((prof) => {
                  const isSelected = selectedProfession.id === prof.id;
                  const pName = language === 'en' ? prof.nameEn : language === 'fr' ? prof.nameFr : prof.nameAr;
                  return (
                    <button
                      key={prof.id}
                      onClick={() => {
                        soundEffects.playButtonClick();
                        setSelectedProfession(prof);
                        speakCurrentLanguage(pName);
                      }}
                      className={`p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-100 border-2 border-indigo-500 scale-105 shadow-sm'
                          : 'bg-slate-50 border border-slate-200 hover:bg-indigo-50/50'
                      }`}
                    >
                      <span className="text-3xl mb-1">{prof.emoji}</span>
                      <span className="text-xs font-bold text-slate-800 text-center truncate max-w-[85px]">{pName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. COLOR MIXING LAB */}
      {subTab === 'colors' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-sm text-center">
          <div className="max-w-xl mx-auto space-y-6">
            <span className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
              {t.skills.colorLabBadge}
            </span>
            <h2 className="text-2xl font-black text-slate-800">
              {t.skills.colorLabTitle}
            </h2>

            <div className="flex items-center justify-center gap-4 py-4">
              <div className="flex flex-col items-center">
                <span className="text-xs text-slate-500 mb-1">{t.skills.firstColor}</span>
                <select
                  value={mixColor1}
                  onChange={(e) => {
                    soundEffects.playButtonClick();
                    setMixColor1(e.target.value);
                  }}
                  className="p-2.5 px-4 rounded-2xl border-2 border-purple-300 font-bold text-slate-800 bg-purple-50/50 cursor-pointer"
                >
                  <option value="أَحْمَر">أَحْمَر (Red / Rouge)</option>
                  <option value="أَزْرَق">أَزْرَق (Blue / Bleu)</option>
                  <option value="أَصْفَر">أَصْفَر (Yellow / Jaune)</option>
                  <option value="أَبْيَض">أَبْيَض (White / Blanc)</option>
                </select>
              </div>

              <span className="text-3xl font-black text-purple-600 mt-4">+</span>

              <div className="flex flex-col items-center">
                <span className="text-xs text-slate-500 mb-1">{t.skills.secondColor}</span>
                <select
                  value={mixColor2}
                  onChange={(e) => {
                    soundEffects.playButtonClick();
                    setMixColor2(e.target.value);
                  }}
                  className="p-2.5 px-4 rounded-2xl border-2 border-purple-300 font-bold text-slate-800 bg-purple-50/50 cursor-pointer"
                >
                  <option value="أَصْفَر">أَصْفَر (Yellow / Jaune)</option>
                  <option value="أَزْرَق">أَزْرَق (Blue / Bleu)</option>
                  <option value="أَحْمَر">أَحْمَر (Red / Rouge)</option>
                  <option value="أَبْيَض">أَبْيَض (White / Blanc)</option>
                </select>
              </div>
            </div>

            {currentRecipe ? (
              <div className="p-6 rounded-3xl bg-purple-50/50 border border-purple-200 flex flex-col items-center animate-in zoom-in-95 duration-200">
                <div
                  className="w-24 h-24 rounded-full shadow-lg flex items-center justify-center text-4xl border-4 border-white mb-3"
                  style={{ backgroundColor: currentRecipe.resultHex }}
                >
                  <span>{currentRecipe.emoji}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-800">
                  {t.skills.result}{' '}
                  {language === 'en' ? currentRecipe.nameEn : language === 'fr' ? currentRecipe.nameFr : currentRecipe.nameAr}!
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {t.skills.colorMixExplain}
                </p>
                <button
                  onClick={() => {
                    soundEffects.playSuccess();
                    const resName = language === 'en' ? currentRecipe.nameEn : language === 'fr' ? currentRecipe.nameFr : currentRecipe.nameAr;
                    speakCurrentLanguage(resName);
                    addStars(1);
                  }}
                  className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs cursor-pointer shadow-xs"
                >
                  {t.skills.listenAndStar}
                </button>
              </div>
            ) : (
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-slate-500 text-sm">
                {t.skills.colorPickDiff}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. MEMORY GAME */}
      {subTab === 'memory' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-sm text-center">
          <div className="max-w-md mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                {t.skills.memoryBadge}
              </span>
              <button
                onClick={resetMemoryGame}
                className="flex items-center gap-1.5 text-xs text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.skills.memoryRestart}</span>
              </button>
            </div>

            <h3 className="text-xl font-black text-slate-800">
              {t.skills.memoryTitle}
            </h3>

            <div className="grid grid-cols-4 gap-3 py-2">
              {memoryCards.map((card, idx) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(idx)}
                  className={`h-24 rounded-2xl flex items-center justify-center text-3xl font-bold cursor-pointer transition-all duration-300 transform ${
                    card.flipped || card.matched
                      ? 'bg-amber-100 border-2 border-amber-400 rotate-0 shadow-sm'
                      : 'bg-blue-600 border-2 border-blue-700 text-white hover:scale-105'
                  }`}
                >
                  {card.flipped || card.matched ? card.content : '❓'}
                </button>
              ))}
            </div>

            <p className="text-xs text-slate-500">
              {t.skills.memoryTip}
            </p>
          </div>
        </div>
      )}

      {/* 7. SIZES ORDERING */}
      {subTab === 'sizes' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-200 shadow-sm text-center">
          <div className="max-w-md mx-auto space-y-6">
            <span className="text-xs font-bold text-teal-600 bg-teal-100 px-3 py-1 rounded-full">
              {t.skills.sizesBadge}
            </span>
            <h3 className="text-xl font-black text-slate-800">
              {t.skills.sizesTitle}
            </h3>

            <div className="flex items-end justify-center gap-6 py-6 min-h-[140px]">
              <button
                onClick={() => {
                  soundEffects.playTryAgain();
                  speakCurrentLanguage(t.skills.sizesWrongMedium);
                  setSizeFeedback(t.skills.sizesWrongMedium);
                }}
                className="w-16 h-16 rounded-full bg-teal-400 hover:scale-105 flex items-center justify-center text-white font-bold text-xs cursor-pointer shadow-sm transition-transform"
              >
                {t.skills.medium}
              </button>

              <button
                onClick={() => {
                  soundEffects.playSuccess();
                  speakCurrentLanguage(t.skills.sizesSmallSuccess);
                  setSizeFeedback(t.skills.sizesSmallSuccess);
                  addStars(1);
                }}
                className="w-10 h-10 rounded-full bg-teal-500 hover:scale-105 flex items-center justify-center text-white font-bold text-[10px] cursor-pointer shadow-sm transition-transform"
              >
                {t.skills.small}
              </button>

              <button
                onClick={() => {
                  soundEffects.playTryAgain();
                  speakCurrentLanguage(t.skills.sizesWrongLarge);
                  setSizeFeedback(t.skills.sizesWrongLarge);
                }}
                className="w-24 h-24 rounded-full bg-teal-600 hover:scale-105 flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-sm transition-transform"
              >
                {t.skills.large}
              </button>
            </div>

            {sizeFeedback && (
              <div className="p-3 bg-teal-100 text-teal-900 font-bold rounded-xl text-sm">
                {sizeFeedback}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

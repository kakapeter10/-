import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/soundEffects';
import { TRANSLATIONS, Language, Translations } from '../locales/translations';
import { getTodayDateString } from '../data/dailyChallengesData';

export interface CompanionCharacter {
  id: string;
  nameAr: string;
  nameEn: string;
  nameFr: string;
  titleAr: string;
  titleEn: string;
  titleFr: string;
  personalityAr: string;
  personalityEn: string;
  personalityFr: string;
  image: string;
  avatarEmoji: string;
  cost: number;
  unlocked: boolean;
  voiceIntroAr: string;
  voiceIntroEn: string;
  voiceIntroFr: string;
  cheerPhrasesAr: string[];
  cheerPhrasesEn: string[];
  cheerPhrasesFr: string[];
}

export interface AccessoryItem {
  id: string;
  nameAr: string;
  nameEn: string;
  nameFr: string;
  emoji: string;
  category: 'hat' | 'glasses' | 'badge' | 'prop';
  cost: number;
  unlocked: boolean;
  descAr: string;
  descEn: string;
  descFr: string;
}

export interface PlacedSticker {
  id: string;
  stickerId: string;
  emoji: string;
  x: number;
  y: number;
  scale: number;
}

interface GameContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  stars: number;
  addStars: (amount?: number) => void;
  spendStars: (amount: number) => boolean;
  points: number;
  addPoints: (amount?: number) => void;
  dailyStreak: number;
  lastDailyCompletedDate: string | null;
  isDailyCompletedToday: boolean;
  completeDailyChallenge: (isBonus?: boolean) => { starsAwarded: number; pointsAwarded: number };
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  speechEnabled: boolean;
  setSpeechEnabled: (enabled: boolean) => void;
  activeCompanionId: string;
  setActiveCompanionId: (id: string) => void;
  unlockedCharacters: string[];
  unlockCharacter: (id: string, cost: number) => boolean;
  unlockedItems: string[];
  unlockItem: (id: string, cost: number) => boolean;
  activeAccessories: string[];
  toggleAccessory: (id: string) => void;
  placedStickers: PlacedSticker[];
  addPlacedSticker: (stickerId: string, emoji: string, x: number, y: number) => void;
  clearStickerBoard: () => void;
  triggerConfetti: () => void;
  formatNumber: (n: number) => { main: string };
  speakCurrentLanguage: (text: string) => void;
  speakCompanionCheer: () => void;
}

export const CHARACTERS_LIST: CompanionCharacter[] = [
  {
    id: 'simsim',
    nameAr: 'سِمْسِم الأرنب',
    nameEn: 'Simsim the Bunny',
    nameFr: 'Simsim le Lapin',
    titleAr: 'الرفيق الودود والمحفز',
    titleEn: 'Friendly & Motivating Buddy',
    titleFr: 'Ami Doux et Encourageant',
    personalityAr: 'أرنب لطيف أبيض ذو وشاح مشرق ونجمة متوهجة، يمنح التشجيع المستمر والدفء!',
    personalityEn: 'A sweet white bunny with a warm scarf and a glowing star, giving warm praise and cheer!',
    personalityFr: 'Un gentil lapin blanc avec une écharpe douce et une étoile brillante, toujours encourageant !',
    image: '/src/assets/images/character_simsim_bunny_1791712850667.jpg',
    avatarEmoji: '🐰',
    cost: 0,
    unlocked: true,
    voiceIntroAr: 'مرحباً! أنا سمسم الأرنب الودود، سأكون معك خطوة بخطوة وسأصفق لكل إنجاز تصنعه!',
    voiceIntroEn: 'Hello! I am Simsim the friendly bunny, I will cheer for you every step of the way!',
    voiceIntroFr: 'Bonjour ! Je suis Simsim le gentil lapin, je serai là pour t’encourager à chaque étape !',
    cheerPhrasesAr: [
      'أنت بطل رائع يا صديقي!',
      'أحسنت! إجابة مذهلة كالعادة!',
      'خطوة ذكية جداً، أنا فخور بك!',
      'يا لك من عبقري صغير!',
    ],
    cheerPhrasesEn: [
      'You are amazing, my friend!',
      'Brilliant! A wonderful answer!',
      'So smart! I am so proud of you!',
      'You are a true little genius!',
    ],
    cheerPhrasesFr: [
      'Tu es fantastique, mon ami !',
      'Bravo ! Une excellente réponse !',
      'Tellement intelligent ! Je suis fier de toi !',
      'Tu es un vrai petit génie !',
    ],
  },
  {
    id: 'dodoo',
    nameAr: 'دُعْدُع القرد',
    nameEn: 'Dodoo the Explorer Monkey',
    nameFr: 'Dodoo le Petit Singe Curieux',
    titleAr: 'المستكشف المرح والفضولي',
    titleEn: 'Playful & Curious Explorer',
    titleFr: 'Explorateur Joyeux et Curieux',
    personalityAr: 'قرد صغير مغامر بنظارة زرقاء وقبعة استكشاف وعدسة مكبرة، يعشق الأسئلة والفضول!',
    personalityEn: 'A playful adventurer with blue round goggles, a safari hat and a magnifying glass, always curious!',
    personalityFr: 'Un petit singe espiègle avec des lunettes bleues, un chapeau de safari et une loupe, toujours curieux !',
    image: '/src/assets/images/character_dodoo_monkey_1791712863524.jpg',
    avatarEmoji: '🐵',
    cost: 5,
    unlocked: false,
    voiceIntroAr: 'أهلاً يا صديقي! أنا دُعدُع الفضولي، ما رأيك أن نستكشف لغزاً جديداً وأرقاماً عجيبة اليوم؟',
    voiceIntroEn: 'Hey there! I am Dodoo, ready to discover new secrets, numbers and riddles today?',
    voiceIntroFr: 'Salut l’ami ! Je suis Dodoo, prêt à découvrir de nouveaux nombres et devinettes aujourd’hui ?',
    cheerPhrasesAr: [
      'يا لها من مغامرة ممتعة! اكتشفنا الحل!',
      'أووو! كيف عرفت هذا اللغز بهذه السرعة؟',
      'فضولك قادك إلى النجاح الباهر!',
      'هيا نقفز فرحاً بهذا الاكتشاف الرائع!',
    ],
    cheerPhrasesEn: [
      'What a thrilling discovery! We solved it!',
      'Ooh ooh! How did you solve it so fast?',
      'Your curiosity leads to pure victory!',
      'Let us jump with joy for this great answer!',
    ],
    cheerPhrasesFr: [
      'Quelle belle découverte ! On a réussi !',
      'Ouh ouh ! Tu as trouvé si vite !',
      'Ta curiosité te mène tout droit au succès !',
      'Sautons de joie pour cette découverte !',
    ],
  },
  {
    id: 'farah',
    nameAr: 'فَرَح البومة الحكيمة',
    nameEn: 'Farah the Wise Owl',
    nameFr: 'Farah la Chouette Savante',
    titleAr: 'مرشدة الحكمة والمعرفة',
    titleEn: 'Guide of Wisdom & Math',
    titleFr: 'Guide de Sagesse et Savoir',
    personalityAr: 'بومة صغيرة بنظارة وقبعة تخرج، تحب تنظيم الأرقام وتوجيه النصائح الذكية!',
    personalityEn: 'A sweet owl wearing round glasses and a graduation cap, guiding through math logic!',
    personalityFr: 'Une petite chouette avec des lunettes et une toque d’étudiant, guidant les apprentissages !',
    image: '/src/assets/images/mascot_smart_owl_1791712575966.jpg',
    avatarEmoji: '🦉',
    cost: 10,
    unlocked: false,
    voiceIntroAr: 'تحياتي يا عالم المستقبل! أنا فرح، يسعدني أن أشاركك أسرار الحساب والرياضيات!',
    voiceIntroEn: 'Greetings, future scholar! I am Farah, delighted to share the wonders of math with you!',
    voiceIntroFr: 'Salutations, jeune savant ! Je suis Farah, ravie de partager les merveilles des nombres !',
    cheerPhrasesAr: [
      'تفكير منطقي سليم ومتقن!',
      'حكمتك تفوق التوقعات يا بطل!',
      'رياضيات مدهشة من عقل لامع!',
      'أصبت الهدف بدقة متناهية!',
    ],
    cheerPhrasesEn: [
      'Flawless mathematical reasoning!',
      'Your wisdom exceeds all expectations!',
      'Marvelous math from a brilliant mind!',
      'Bullseye! Perfect accuracy!',
    ],
    cheerPhrasesFr: [
      'Raisonnement mathématique impeccable !',
      'Ta sagesse dépasse toutes les attentes !',
      'Des calculs merveilleux d’un esprit brillant !',
      'En plein dans le mille ! Bravo !',
    ],
  },
  {
    id: 'tito',
    nameAr: 'تِيتُو الدب المرح',
    nameEn: 'Tito the Strong Bear',
    nameFr: 'Tito l’Ours Courageux',
    titleAr: 'الدب المحب للأرقام والفواكه',
    titleEn: 'Friendly Bear of Numbers',
    titleFr: 'L’Ours des Nombres et des Fruits',
    personalityAr: 'دب بني ضاحك يحمل مكعبات الأرقام المضيئة، يحب سلال التفاح والحلول الذكية!',
    personalityEn: 'A laughing bear holding glowing number blocks, loving fruit baskets and fun calculations!',
    personalityFr: 'Un ours rieur portant des cubes lumineux, grand amateur de paniers de pommes !',
    image: '/src/assets/images/hero_kids_learning_1791712552204.jpg',
    avatarEmoji: '🐻',
    cost: 15,
    unlocked: false,
    voiceIntroAr: 'أهلاً بك! أنا تيتو، أحب سلال التفاح وجمع الأعداد الكبيرة!',
    voiceIntroEn: 'Welcome! I am Tito, I love counting apples and building high number towers!',
    voiceIntroFr: 'Bienvenue ! Je suis Tito, j’adore compter les pommes et résoudre les calculs !',
    cheerPhrasesAr: [
      'قوة وذكاء في آن واحد!',
      'عمل جبار يا بطل الحساب!',
      'سلة الإنجازات تمتلئ بنجومك!',
      'إلى الأمام دائماً يا صديقي!',
    ],
    cheerPhrasesEn: [
      'Strength and smarts combined!',
      'Mighty fine job, arithmetic champion!',
      'Our trophy basket is overflowing with stars!',
      'Onward and upward, my friend!',
    ],
    cheerPhrasesFr: [
      'Force et intelligence réunies !',
      'Un travail remarquable, champion du calcul !',
      'Notre panier se remplit d’étoiles étincelantes !',
      'Toujours de l’avant, mon ami !',
    ],
  },
];

export const ACCESSORIES_ITEMS: AccessoryItem[] = [
  { id: 'acc_crown', nameAr: 'تاج الملك الذكي', nameEn: 'Royal Crown', nameFr: 'Couronne Royale', emoji: '👑', category: 'hat', cost: 6, unlocked: false, descAr: 'تاج ذهبي يوضع فوق رأس رفيقك', descEn: 'Golden crown worn on your buddy’s head', descFr: 'Couronne dorée posée sur la tête de ton ami' },
  { id: 'acc_glasses', nameAr: 'نظارات النجوم', nameEn: 'Star Sunglasses', nameFr: 'Lunettes Étoiles', emoji: '🕶️', category: 'glasses', cost: 4, unlocked: false, descAr: 'نظارات أنيقة للعباقرة', descEn: 'Cool shades for bright minds', descFr: 'Lunettes cool pour petits génies' },
  { id: 'acc_balloon', nameAr: 'بالون الاحتفال', nameEn: 'Party Balloon', nameFr: 'Ballon de Fête', emoji: '🎈', category: 'prop', cost: 3, unlocked: false, descAr: 'بالون طائر يرفرف بجانب الرفيق', descEn: 'Floating festive balloon beside companion', descFr: 'Ballon flottant aux côtés de ton compagnon' },
  { id: 'acc_medal', nameAr: 'ميدالية الشرف', nameEn: 'Gold Medal', nameFr: 'Médaille d’Honneur', emoji: '🥇', category: 'badge', cost: 8, unlocked: false, descAr: 'وسام التميز في الحساب والأشكال', descEn: 'Medal of excellence in learning', descFr: 'Médaille d’excellence pour les réussites' },
  { id: 'acc_magic_wand', nameAr: 'العصا السحرية', nameEn: 'Magic Wand', nameFr: 'Baguette Magique', emoji: '🪄', category: 'prop', cost: 10, unlocked: false, descAr: 'عصا سحرية تطلق شرارات ملونة', descEn: 'Sparkling wand releasing magic stars', descFr: 'Baguette magique qui lance des étoiles' },
  { id: 'acc_grad_cap', nameAr: 'قبعة التخرج', nameEn: 'Graduation Cap', nameFr: 'Toque de Diplômé', emoji: '🎓', category: 'hat', cost: 12, unlocked: false, descAr: 'قبعة الأكاديميين الصغار', descEn: 'Smart scholar graduation cap', descFr: 'Toque universitaire pour les petits savants' },
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('kids_app_lang') as Language) || 'ar';
  });

  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem('kids_app_stars');
    return saved ? parseInt(saved, 10) : 10;
  });

  const [points, setPoints] = useState<number>(() => {
    const saved = localStorage.getItem('kids_app_points');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [dailyStreak, setDailyStreak] = useState<number>(() => {
    const saved = localStorage.getItem('kids_app_daily_streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [lastDailyCompletedDate, setLastDailyCompletedDate] = useState<string | null>(() => {
    return localStorage.getItem('kids_app_daily_last_date');
  });

  const todayStr = getTodayDateString();
  const isDailyCompletedToday = lastDailyCompletedDate === todayStr;

  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    return localStorage.getItem('kids_app_sound') !== 'false';
  });

  const [speechEnabled, setSpeechEnabledState] = useState<boolean>(() => {
    return localStorage.getItem('kids_app_speech') !== 'false';
  });

  const [activeCompanionId, setActiveCompanionId] = useState<string>(() => {
    return localStorage.getItem('kids_app_companion') || 'simsim';
  });

  const [unlockedCharacters, setUnlockedCharacters] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kids_app_unlocked_chars');
      return saved ? JSON.parse(saved) : ['simsim'];
    } catch {
      return ['simsim'];
    }
  });

  const [unlockedItems, setUnlockedItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kids_app_unlocked_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeAccessories, setActiveAccessories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kids_app_active_acc');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>(() => {
    try {
      const saved = localStorage.getItem('kids_app_placed_stickers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Keep HTML document dir and lang attribute in sync with language
  useEffect(() => {
    localStorage.setItem('kids_app_lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    localStorage.setItem('kids_app_stars', stars.toString());
  }, [stars]);

  useEffect(() => {
    localStorage.setItem('kids_app_points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('kids_app_daily_streak', dailyStreak.toString());
  }, [dailyStreak]);

  useEffect(() => {
    if (lastDailyCompletedDate) {
      localStorage.setItem('kids_app_daily_last_date', lastDailyCompletedDate);
    }
  }, [lastDailyCompletedDate]);

  useEffect(() => {
    localStorage.setItem('kids_app_sound', soundEnabled.toString());
    soundEffects.enabled = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('kids_app_speech', speechEnabled.toString());
    soundEffects.speechEnabled = speechEnabled;
  }, [speechEnabled]);

  useEffect(() => {
    localStorage.setItem('kids_app_companion', activeCompanionId);
  }, [activeCompanionId]);

  useEffect(() => {
    localStorage.setItem('kids_app_unlocked_chars', JSON.stringify(unlockedCharacters));
  }, [unlockedCharacters]);

  useEffect(() => {
    localStorage.setItem('kids_app_unlocked_items', JSON.stringify(unlockedItems));
  }, [unlockedItems]);

  useEffect(() => {
    localStorage.setItem('kids_app_active_acc', JSON.stringify(activeAccessories));
  }, [activeAccessories]);

  useEffect(() => {
    localStorage.setItem('kids_app_placed_stickers', JSON.stringify(placedStickers));
  }, [placedStickers]);

  const setLanguage = (lang: Language) => {
    soundEffects.playButtonClick();
    setLanguageState(lang);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6'],
      });
    } catch {
      // ignore
    }
  };

  const addStars = (amount = 1) => {
    setStars((prev) => prev + amount);
    soundEffects.playStarSparkle();
    triggerConfetti();
  };

  const addPoints = (amount = 10) => {
    setPoints((prev) => prev + amount);
  };

  const completeDailyChallenge = (isBonus = false) => {
    const today = getTodayDateString();
    if (!isBonus) {
      // Official daily challenge completion
      const starsAwarded = 2; // Double star per user specification!
      const pointsAwarded = 50; // Extra points per user specification!
      setStars((prev) => prev + starsAwarded);
      setPoints((prev) => prev + pointsAwarded);

      // Streak calculation
      let newStreak = 1;
      if (lastDailyCompletedDate) {
        const lastDate = new Date(lastDailyCompletedDate);
        const currDate = new Date(today);
        const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          newStreak = dailyStreak + 1;
        } else if (diffDays === 0) {
          newStreak = dailyStreak > 0 ? dailyStreak : 1;
        } else {
          newStreak = 1;
        }
      }
      setDailyStreak(newStreak);
      setLastDailyCompletedDate(today);

      soundEffects.playDoubleStar();
      soundEffects.playSuccess();
      triggerConfetti();

      const cheer =
        language === 'en'
          ? 'Hooray! You completed today’s challenge and earned a double star and 50 extra points!'
          : language === 'fr'
          ? 'Bravo ! Tu as réussi le défi du jour et gagné une étoile doublée et 50 points bonus !'
          : 'أحسنت صنعاً يا بطل! لقد أتممت تحدي اليوم واكتسبت نجمة مضاعفة و50 نقطة إضافية!';
      speakCurrentLanguage(cheer);

      return { starsAwarded, pointsAwarded };
    } else {
      // Bonus practice challenge
      const starsAwarded = 1;
      const pointsAwarded = 15;
      setStars((prev) => prev + starsAwarded);
      setPoints((prev) => prev + pointsAwarded);

      soundEffects.playStarSparkle();
      soundEffects.playSuccess();
      triggerConfetti();

      const cheer =
        language === 'en'
          ? 'Great job on the practice challenge! You earned an extra star and 15 points!'
          : language === 'fr'
          ? 'Excellent travail sur le défi d’entraînement ! Tu as gagné une étoile et 15 points !'
          : 'عمل رائع ومتميز في التمرين الإضافي! كسبت نجمة إضافية و15 نقطة!';
      speakCurrentLanguage(cheer);

      return { starsAwarded, pointsAwarded };
    }
  };

  const spendStars = (amount: number): boolean => {
    if (stars >= amount) {
      setStars((prev) => prev - amount);
      soundEffects.playSuccess();
      triggerConfetti();
      return true;
    } else {
      soundEffects.playTryAgain();
      speakCurrentLanguage(
        language === 'en'
          ? 'You need more stars! Complete activities to earn them!'
          : language === 'fr'
          ? 'Tu as besoin de plus d’étoiles ! Complète des activités pour en gagner !'
          : 'تحتاج إلى المزيد من النجوم! أكمل بعض التحديات لتكسبها!'
      );
      return false;
    }
  };

  const speakCurrentLanguage = (text: string) => {
    soundEffects.speak(text, language);
  };

  const unlockCharacter = (id: string, cost: number): boolean => {
    if (unlockedCharacters.includes(id)) return true;
    if (spendStars(cost)) {
      setUnlockedCharacters((prev) => [...prev, id]);
      setActiveCompanionId(id);
      const char = CHARACTERS_LIST.find((c) => c.id === id);
      if (char) {
        const intro =
          language === 'en'
            ? `Congratulations! ${char.nameEn} joined your team! ${char.voiceIntroEn}`
            : language === 'fr'
            ? `Félicitations ! ${char.nameFr} a rejoint ton équipe ! ${char.voiceIntroFr}`
            : `مبروك! انضم ${char.nameAr} إلى فريقك! ${char.voiceIntroAr}`;
        speakCurrentLanguage(intro);
      }
      return true;
    }
    return false;
  };

  const unlockItem = (id: string, cost: number): boolean => {
    if (unlockedItems.includes(id)) return true;
    if (spendStars(cost)) {
      setUnlockedItems((prev) => [...prev, id]);
      setActiveAccessories((prev) => [...prev, id]);
      speakCurrentLanguage(
        language === 'en'
          ? 'Hooray! You unlocked a brand new accessory!'
          : language === 'fr'
          ? 'Bravo ! Tu as débloqué un nouvel accessoire !'
          : 'مبروك! حصلت على عنصر تزيين جديد ومميز!'
      );
      return true;
    }
    return false;
  };

  const toggleAccessory = (id: string) => {
    if (!unlockedItems.includes(id)) return;
    soundEffects.playEquipSound();
    setActiveAccessories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const speakCompanionCheer = () => {
    const char = CHARACTERS_LIST.find((c) => c.id === activeCompanionId) || CHARACTERS_LIST[0];
    const phrases =
      language === 'en'
        ? char.cheerPhrasesEn
        : language === 'fr'
        ? char.cheerPhrasesFr
        : char.cheerPhrasesAr;
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    soundEffects.playSuccess();
    speakCurrentLanguage(phrase);
  };

  const addPlacedSticker = (stickerId: string, emoji: string, x: number, y: number) => {
    const newSticker: PlacedSticker = {
      id: `${stickerId}_${Date.now()}`,
      stickerId,
      emoji,
      x,
      y,
      scale: 1,
    };
    setPlacedStickers((prev) => [...prev, newSticker]);
    soundEffects.playPop();
  };

  const clearStickerBoard = () => {
    setPlacedStickers([]);
    soundEffects.playPop();
  };

  // Numbers are strictly standard western numerals (1, 2, 3...) per user request!
  const formatNumber = (n: number) => {
    return { main: n.toString() };
  };

  const t = TRANSLATIONS[language];

  return (
    <GameContext.Provider
      value={{
        language,
        setLanguage,
        t,
        stars,
        addStars,
        spendStars,
        points,
        addPoints,
        dailyStreak,
        lastDailyCompletedDate,
        isDailyCompletedToday,
        completeDailyChallenge,
        soundEnabled,
        setSoundEnabled: setSoundEnabledState,
        speechEnabled,
        setSpeechEnabled: setSpeechEnabledState,
        activeCompanionId,
        setActiveCompanionId,
        unlockedCharacters,
        unlockCharacter,
        unlockedItems,
        unlockItem,
        activeAccessories,
        toggleAccessory,
        placedStickers,
        addPlacedSticker,
        clearStickerBoard,
        triggerConfetti,
        formatNumber,
        speakCurrentLanguage,
        speakCompanionCheer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error('useGame must be used within GameProvider');
  }
  return ctx;
}

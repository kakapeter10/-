export type Language = 'ar' | 'en' | 'fr';

export interface Translations {
  appName: string;
  appSubtitle: string;
  tabs: {
    numbers: string;
    math: string;
    skills: string;
    stickers: string;
  };
  header: {
    stars: string;
    points: string;
    dailyChallenge: string;
    soundMute: string;
    soundUnmute: string;
    voiceMute: string;
    voiceUnmute: string;
    settings: string;
    langSelect: string;
  };
  hero: {
    badge: string;
    title: string;
    desc: string;
    listenGreeting: string;
    startNumbers: string;
    greetingSpeech: string;
    numbersShort: string;
    mathShort: string;
    skillsShort: string;
    stickersShort: string;
  };
  numbers: {
    chooseNumber: string;
    range: string;
    smartChallenge: string;
    backToLesson: string;
    previous: string;
    next: string;
    pronounce: string;
    tapToCount: string;
    countedSoFar: string;
    countComplete: string;
    tracePrompt: string;
    clearCanvas: string;
    finishTracing: string;
    quickFactTitle: string;
    nextIs: string;
    prevIs: string;
    halfSumIs: string;
    quizQuestion: string;
    quizListen: string;
    quizCorrect: string;
    quizWrong: string;
    quizNext: string;
  };
  math: {
    selectGame: string;
    addition: string;
    subtraction: string;
    comparison: string;
    train: string;
    newProblem: string;
    appleGarden: string;
    basket1: string;
    basket2: string;
    howManyApples: string;
    balloonsGame: string;
    balloonsPrompt: string;
    poppedOf: string;
    balloonsRemain: string;
    balanceGame: string;
    whichPanBigger: string;
    pan1: string;
    pan2: string;
    greaterThan: string;
    equal: string;
    lessThan: string;
    trainGame: string;
    missingNumberPrompt: string;
    locomotive: string;
    carriage: string;
    correctAlert: string;
    wrongAlert: string;
    trainSuccess: string;
  };
  skills: {
    selectSkill: string;
    shapes: string;
    colors: string;
    memory: string;
    sizes: string;
    shapesDiscovery: string;
    pronounceShape: string;
    sides: string;
    corners: string;
    shadowMatch: string;
    changeShadow: string;
    shadowPrompt: string;
    shadowCorrect: string;
    shadowWrong: string;
    colorLabBadge: string;
    colorLabTitle: string;
    firstColor: string;
    secondColor: string;
    result: string;
    colorMixExplain: string;
    listenAndStar: string;
    colorPickDiff: string;
    memoryBadge: string;
    memoryTitle: string;
    memoryRestart: string;
    memoryTip: string;
    sizesBadge: string;
    sizesTitle: string;
    small: string;
    medium: string;
    large: string;
    sizesSmallSuccess: string;
    sizesWrongMedium: string;
    sizesWrongLarge: string;
    shapeColoring: string;
    shapeColoringTitle: string;
    shapeColoringDesc: string;
    selectShapeToColor: string;
    colorPalette: string;
    fillColorPrompt: string;
    fillMode: string;
    brushMode: string;
    clearColoring: string;
    finishColoring: string;
    coloredShapeCheer: string;
    cuteFaceToggle: string;
    squareTitle: string;
    circleTitle: string;
    triangleTitle: string;
  };
  stickers: {
    title: string;
    desc: string;
    yourStars: string;
    clearBoard: string;
    tapToPlacePrompt: string;
    earnedCount: string;
    needMoreTip: string;
  };
  shop: {
    title: string;
    subtitle: string;
    charactersTab: string;
    accessoriesTab: string;
    companionTip: string;
    listenVoice: string;
    activeCompanion: string;
    selectCompanion: string;
    unlockFor: string;
    starsWord: string;
    accessoriesTip: string;
    equipped: string;
    equip: string;
    close: string;
    earnMoreTip: string;
  };
  footer: {
    tagline: string;
    designedFor: string;
  };
  settingsModal: {
    title: string;
    parentsTipTitle: string;
    parentsTipText: string;
    saveAndClose: string;
  };
  dailyChallenge: {
    title: string;
    subtitle: string;
    badge: string;
    readyStatus: string;
    completedStatus: string;
    streakDays: string;
    rewardBadge: string;
    doubleStar: string;
    bonusPoints: string;
    listenQuestion: string;
    tapToCountItem: string;
    countedItems: string;
    checkAnswer: string;
    congratsTitle: string;
    congratsMessage: string;
    tryAgainMessage: string;
    playAnother: string;
    backHome: string;
    nextTomorrowNote: string;
    bonusPracticeTitle: string;
    categoryCounting: string;
    categoryMath: string;
    categoryShapes: string;
    categoryAnimals: string;
    categoryProfessions: string;
    categoryColors: string;
    startTodayChallenge: string;
    todaysChallengeDone: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  ar: {
    appName: 'واحة الأذكياء الصغار',
    appSubtitle: 'تعلم الأرقام والحساب والمرح',
    tabs: {
      numbers: 'الأرقام (1-20)',
      math: 'حديقة الحساب',
      skills: 'المفردات والمهارات',
      stickers: 'دفتر الملصقات',
    },
    header: {
      stars: 'نجمة',
      points: 'نقطة',
      dailyChallenge: 'تحدي اليوم',
      soundMute: 'كتم المؤثرات الصوتية',
      soundUnmute: 'تشغيل المؤثرات الصوتية',
      voiceMute: 'كتم النطق الصوتي',
      voiceUnmute: 'تشغيل النطق الصوتي',
      settings: 'إعدادات التطبيق',
      langSelect: 'تغيير اللغة',
    },
    hero: {
      badge: 'روضة الرياضيات والمرح للأطفال',
      title: 'تَعَلَّمِ الأَرْقَامَ حَتَّى 20 وَاحْتَرِفِ الحِسَابَ بِالمَرَحِ',
      desc: 'رحلة تفاعلية تدمج بين العد البصري، والجمع، والطرح، والميزان، واكتشاف الأشكال والحيوانات والأسرة والمهن مع نطق صوتي وجوائز ونجوم مستحقة!',
      listenGreeting: 'استمع لتحية البومة الحكيمة',
      startNumbers: 'ابدأ رحلة الأرقام (1-20)',
      greetingSpeech: 'مرحباً بك يا بطل في واحة الأذكياء الصغار! هيا بنا نتعلم الأرقام والحساب ونجمع النجوم معاً!',
      numbersShort: 'الأرقام 20',
      mathShort: 'الجمع والطرح',
      skillsShort: 'المفردات والمعرفة',
      stickersShort: 'الملصقات',
    },
    numbers: {
      chooseNumber: 'اختر رقماً لتتعلمه:',
      range: 'من 1 إلى 20',
      smartChallenge: 'تحدي الأرقام الذكي',
      backToLesson: 'العودة للدرس',
      previous: 'السابق',
      next: 'التالي',
      pronounce: 'انطق الرقم',
      tapToCount: 'اضغط على كل عنصر لتعُدّه:',
      countedSoFar: 'عَدَدْتَ:',
      countComplete: 'رائع جداً! عددت جميع العناصر بنجاح وكسبت نجمتين! ⭐⭐',
      tracePrompt: 'تتبع وارسم الرقم بإصبعك:',
      clearCanvas: 'مسح اللوحة',
      finishTracing: 'أتممت الرسم! (+1 ⭐)',
      quickFactTitle: 'معلومة سريعة عن الرقم',
      nextIs: 'الرقم التالي له هو:',
      prevIs: 'الرقم السابق له هو:',
      halfSumIs: 'نصفين متساويين يكونان:',
      quizQuestion: 'أَيْنَ هُوَ الرَّقْمُ:',
      quizListen: 'استمع للسؤال مجدداً',
      quizCorrect: 'أحسنت! إجابة صحيحة 🎉',
      quizWrong: 'حاول مجدداً، أنت تستطيع! 💪',
      quizNext: 'سؤال تالٍ 🔄',
    },
    math: {
      selectGame: 'اختر لعبة الحساب:',
      addition: 'حديقة الجمع (+)',
      subtraction: 'مزرعة الطرح (-)',
      comparison: 'الميزان والمقارنة',
      train: 'قطار الأرقام المفقودة',
      newProblem: 'مسألة جديدة',
      appleGarden: 'حديقة جمع التفاح 🍎',
      basket1: 'السلة الأولى',
      basket2: 'السلة الثانية',
      howManyApples: 'كَمْ تُفَّاحَةً فِي السَّلَّتَيْنِ مَعاً؟',
      balloonsGame: 'لعبة فرقعة البالونات 🎈',
      balloonsPrompt: 'كان لدينا بالونات، اضغط لفرقعة المطلوب!',
      poppedOf: 'تم فرقعة',
      balloonsRemain: 'كَمْ بَالُوناً سَلِيماً بَقِيَ لَدَيْنَا الآنَ؟',
      balanceGame: 'الميزان الذكي والمقارنة ⚖️',
      whichPanBigger: 'أَيُّ الكِفَّتَيْنِ أَكْبَرُ أَمْ مُتَسَاوِيَتَانِ؟',
      pan1: 'الكفة الأولى',
      pan2: 'الكفة الثانية',
      greaterThan: 'أكبر من',
      equal: 'يساوي',
      lessThan: 'أصغر من',
      trainGame: 'قطار الأرقام المتتالية 🚂',
      missingNumberPrompt: 'مَا هُوَ الرَّقْمُ المَفْقُودُ فِي عَرَبَةِ القِطَارِ؟',
      locomotive: 'المقدمة',
      carriage: 'عربة',
      correctAlert: 'أحسنت! إجابة صحيحة ومتقنة! 🎉',
      wrongAlert: 'فكر جيداً وحاول مجدداً يا بطل!',
      trainSuccess: 'رائع! اكتمل قطار الأرقام وسينطلق إلى المحطة التالية! 🚂🎉',
    },
    skills: {
      selectSkill: 'اختر المهارة الأساسية:',
      shapes: 'الأشكال الهندسية',
      colors: 'معمل الألوان السحري',
      memory: 'لعبة الذاكرة والتركيز',
      sizes: 'ترتيب الأحجام',
      shapesDiscovery: 'اكتشاف الأشكال',
      pronounceShape: 'انطق اسم الشكل',
      sides: 'الأضلاع:',
      corners: 'الزوايا:',
      shadowMatch: 'لعبة تطابق الظل 🎯',
      changeShadow: 'تغيير الظل',
      shadowPrompt: 'انظر إلى هذا الظل الأسود، أي الأشكال الملونة يناسبه تماماً؟',
      shadowCorrect: 'تطابق رائع وكسبت نجمة! ⭐',
      shadowWrong: 'تأمل في زوايا الظل وحاول مجدداً!',
      colorLabBadge: 'معمل مزج الألوان السحري 🎨',
      colorLabTitle: 'امْزُجْ لَوْنَيْنِ لِتَكْتَشِفَ اللَّوْنَ السِّحْرِيَّ الجَدِيدَ!',
      firstColor: 'اللون الأول',
      secondColor: 'اللون الثاني',
      result: 'النتيجة:',
      colorMixExplain: 'عند خلط اللونين ينتج لون سحري جديد!',
      listenAndStar: 'استمع وأضف نجمة! ⭐',
      colorPickDiff: 'اختر لونين مختلفين لرؤية النتيجة السحرية!',
      memoryBadge: 'تطابق الكروت الذكي 🧠',
      memoryTitle: 'اقْلِبِ الكُرُوتَ وَابْحَثْ عَنِ الشَّكْلَيْنِ المُتَطَابِقَيْنِ!',
      memoryRestart: 'إعادة اللعبة',
      memoryTip: 'لعبة رائعة لتنمية التركيز وقوة الذاكرة البصرية لدى الأطفال!',
      sizesBadge: 'ترتيب الأحجام 📏',
      sizesTitle: 'رَتِّبِ الكُرَاتِ مِنَ الأَصْغَرِ إِلَى الأَكْبَرِ!',
      small: 'صغير',
      medium: 'متوسط',
      large: 'كبير',
      sizesSmallSuccess: 'صحيح! الكرة الصغيرة هي البداية! 👏',
      sizesWrongMedium: 'هذه متوسطة، ابحث عن الكرة الصغيرة أولاً!',
      sizesWrongLarge: 'هذه الكرة الأكبر وتأتي في نهاية الترتيب!',
      shapeColoring: 'تلوين الأشكال',
      shapeColoringTitle: 'لَوْحَةُ تَلْوِينِ الأَشْكَالِ الهَنْدَسِيَّةِ 🎨',
      shapeColoringDesc: 'اختر المربع، الدائرة، أو المثلث ولوّنه بألوانك المبهجة باللمس أو بالفرشاة!',
      selectShapeToColor: 'اختر شكلاً لتلوينه:',
      colorPalette: 'لوحة الألوان:',
      fillColorPrompt: 'المس الشكل لتلوينه بهذا اللون!',
      fillMode: 'تلوين فوري (تعبئة)',
      brushMode: 'فرشاة التلوين',
      clearColoring: 'إعادة التلوين 🔄',
      finishColoring: 'أتممت التلوين! (+1 ⭐)',
      coloredShapeCheer: 'تلوين رائع ومميز جداً! كسبت نجمة جديدة! ⭐',
      cuteFaceToggle: 'وجه كرتوني مرح',
      squareTitle: 'المُرَبَّع',
      circleTitle: 'الدَّائِرَة',
      triangleTitle: 'المُثَلَّث',
    },
    stickers: {
      title: 'دَفْتَرُ المُلْصَقَاتِ وَلَوْحَةُ الإِبْدَاعِ',
      desc: 'اجمع النجوم لفتح ملصقات جديدة والصقها على لوحتك الإبداعية!',
      yourStars: 'نجومك:',
      clearBoard: 'تنظيف اللوحة',
      tapToPlacePrompt: 'اضغط على أي ملصق من القائمة الجانبية لإلصاقه هنا! ✨',
      earnedCount: 'ملصقاتك المستحقة:',
      needMoreTip: 'أكمل تمارين الحساب والأرقام لكسب المزيد من النجوم وفتح كل الملصقات! 🌟',
    },
    shop: {
      title: 'متجر المكافآت والأبطال',
      subtitle: 'استبدل نجومك بشخصيات جديدة وعناصر تزيين مبهجة!',
      charactersTab: 'شخصيات الأبطال والرفقاء',
      accessoriesTab: 'عناصر التزيين والإكسسوارات',
      companionTip: 'تعرف على رفقاء التعلم: اختر الشخصية التي تفضل أن ترافقك وتشجعك بصوتها في كل مرحلة!',
      listenVoice: 'استمع لصوت الشخصية',
      activeCompanion: 'الرفيق الحالي نشط ✨',
      selectCompanion: 'اختيار كرفيق نشط',
      unlockFor: 'فتح مقابل',
      starsWord: 'نجوم ⭐',
      accessoriesTip: 'زين رفيقك الذكي: انقر لتجهيز القبعات والنظارات والأوسمة التي تظهر مباشرة على شخصيتك!',
      equipped: 'مجهز حالياً ✔️',
      equip: 'ارتداء الإكسسوار',
      close: 'إغلاق',
      earnMoreTip: 'اجمع النجوم من خلال إكمال تمارين الأرقام والحساب!',
    },
    footer: {
      tagline: 'واحة الأذكياء الصغار — رحلة مبهجة لتعلم الأرقام والحساب والمهارات الأساسية',
      designedFor: 'صُمم بروح تفاعلية محفزة للأطفال ومربيهم',
    },
    settingsModal: {
      title: 'إعدادات التعلم والأرقام',
      parentsTipTitle: '💡 نصيحة للوالدين والمربين:',
      parentsTipText: 'التطبيق مصمم خصيصاً لمرحلة الطفولة المبكرة ورياض الأطفال، ليربط بين الرمز الرقمي، والكمية المحسوسة، والنطق السليم، وأساسيات الجمع والطرح والأشكال.',
      saveAndClose: 'حفظ وإغلاق',
    },
    dailyChallenge: {
      title: 'تحدي اليوم الممتع 🎯',
      subtitle: 'تمرين يومي ذكي يكافئك بنجمة مضاعفة ونقاط إضافية!',
      badge: 'تحدي اليوم الجديد',
      readyStatus: 'جاهز للحل الآن! اكسب نجمة مضاعفة ⭐⭐',
      completedStatus: 'تم إنجاز تحدي اليوم بنجاح! 🎉',
      streakDays: 'سلسلة التحدي اليومي',
      rewardBadge: 'المكافأة اليومية الكبرى',
      doubleStar: 'نجمة مضاعفة (x2) ⭐⭐',
      bonusPoints: '+50 نقطة تميز 🏆',
      listenQuestion: 'استمع للتمرين',
      tapToCountItem: 'اضغط للعد',
      countedItems: 'تم عد',
      checkAnswer: 'تأكيد الإجابة',
      congratsTitle: 'رائع ومذهل جداً يا بطل! 🌟',
      congratsMessage: 'لقد قمت بحل تحدي اليوم بذكاء واكتسبت 50 نقطة إضافية ونجمة مضاعفة!',
      tryAgainMessage: 'محاولة قريبة جداً! جرب خياراً آخر يا بطل!',
      playAnother: 'تحدي إضافي للمرح 🎲',
      backHome: 'العودة للواحة 🏠',
      nextTomorrowNote: 'تحدي يوم غد سيتجدد كل صباح مع جوائز جديدة!',
      bonusPracticeTitle: 'تمرين تدريبي إضافي',
      categoryCounting: 'عد واستكشاف',
      categoryMath: 'حساب ذكي',
      categoryShapes: 'أشكال هندسية',
      categoryAnimals: 'عالم الحيوانات',
      categoryProfessions: 'أبطال المهن',
      categoryColors: 'الألوان المبهجة',
      startTodayChallenge: 'ابدأ تحدي اليوم الآن!',
      todaysChallengeDone: 'أكملت تحدي اليوم بنجاح!',
    },
  },

  en: {
    appName: 'Little Geniuses Oasis',
    appSubtitle: 'Learn Numbers, Math & Fun Skills',
    tabs: {
      numbers: 'Numbers (1-20)',
      math: 'Math Playground',
      skills: 'Vocabulary & Skills',
      stickers: 'Sticker Album',
    },
    header: {
      stars: 'Star',
      points: 'Points',
      dailyChallenge: 'Daily Challenge',
      soundMute: 'Mute Sound Effects',
      soundUnmute: 'Unmute Sound Effects',
      voiceMute: 'Mute Voice Audio',
      voiceUnmute: 'Unmute Voice Audio',
      settings: 'App Settings',
      langSelect: 'Switch Language',
    },
    hero: {
      badge: 'Playful Math & Kindergarten Academy',
      title: 'LEARN NUMBERS TO 20 & MASTER MATH WITH JOY',
      desc: 'An interactive preschool adventure blending visual counting, addition, subtraction, shapes, animals, family, and professions with voice audio and rewarding star badges!',
      listenGreeting: 'Listen to Wise Owl Greeting',
      startNumbers: 'Start Numbers Journey (1-20)',
      greetingSpeech: 'Welcome little champion to Little Geniuses Oasis! Let us learn numbers and math together and collect bright stars!',
      numbersShort: 'Numbers 20',
      mathShort: 'Add & Subtract',
      skillsShort: 'Words & Skills',
      stickersShort: 'Stickers',
    },
    numbers: {
      chooseNumber: 'Choose a number to learn:',
      range: 'From 1 to 20',
      smartChallenge: 'Smart Number Quiz',
      backToLesson: 'Back to Lesson',
      previous: 'Previous',
      next: 'Next',
      pronounce: 'Pronounce Number',
      tapToCount: 'Tap each item to count it:',
      countedSoFar: 'Counted:',
      countComplete: 'Splendid! You counted all items and earned 2 Stars! ⭐⭐',
      tracePrompt: 'Trace & draw the number with your finger:',
      clearCanvas: 'Clear Canvas',
      finishTracing: 'Finished Drawing! (+1 ⭐)',
      quickFactTitle: 'Fun Fact About Number',
      nextIs: 'The next number is:',
      prevIs: 'The previous number is:',
      halfSumIs: 'Two equal parts make:',
      quizQuestion: 'WHERE IS THE NUMBER:',
      quizListen: 'Listen to question again',
      quizCorrect: 'Awesome! Correct answer 🎉',
      quizWrong: 'Try again, you can do it! 💪',
      quizNext: 'Next Question 🔄',
    },
    math: {
      selectGame: 'Choose Math Game:',
      addition: 'Addition Orchard (+)',
      subtraction: 'Balloon Subtraction (-)',
      comparison: 'Balance & Comparison',
      train: 'Missing Number Train',
      newProblem: 'New Problem',
      appleGarden: 'Apple Addition Orchard 🍎',
      basket1: 'Basket 1',
      basket2: 'Basket 2',
      howManyApples: 'HOW MANY APPLES IN BOTH BASKETS?',
      balloonsGame: 'Balloon Pop Game 🎈',
      balloonsPrompt: 'We had balloons, tap to pop the required amount!',
      poppedOf: 'Popped',
      balloonsRemain: 'HOW MANY WHOLE BALLOONS REMAIN NOW?',
      balanceGame: 'Smart Balance Scale ⚖️',
      whichPanBigger: 'WHICH SIDE IS HEAVIER OR ARE THEY EQUAL?',
      pan1: 'First Pan',
      pan2: 'Second Pan',
      greaterThan: 'Greater Than',
      equal: 'Equal',
      lessThan: 'Less Than',
      trainGame: 'Number Sequence Train 🚂',
      missingNumberPrompt: 'WHAT IS THE MISSING NUMBER IN THE TRAIN CARRIAGE?',
      locomotive: 'Engine',
      carriage: 'Car',
      correctAlert: 'Great job! Correct answer! 🎉',
      wrongAlert: 'Think carefully and try again, champion!',
      trainSuccess: 'Wonderful! The number train is complete and chugs ahead! 🚂🎉',
    },
    skills: {
      selectSkill: 'Choose Essential Skill:',
      shapes: 'Geometric Shapes',
      colors: 'Magic Color Lab',
      memory: 'Memory & Focus',
      sizes: 'Size Ordering',
      shapesDiscovery: 'Discover Shapes',
      pronounceShape: 'Pronounce Shape',
      sides: 'Sides:',
      corners: 'Corners:',
      shadowMatch: 'Shape Shadow Match 🎯',
      changeShadow: 'Change Shadow',
      shadowPrompt: 'Look at this dark silhouette, which colorful shape fits it?',
      shadowCorrect: 'Great match! You earned a star! ⭐',
      shadowWrong: 'Check the silhouette angles and try again!',
      colorLabBadge: 'Magic Color Mixing Lab 🎨',
      colorLabTitle: 'MIX TWO COLORS TO DISCOVER A NEW MAGICAL SHADE!',
      firstColor: 'First Color',
      secondColor: 'Second Color',
      result: 'Result:',
      colorMixExplain: 'Mixing these two colors creates a magical new shade!',
      listenAndStar: 'Listen & Earn a Star! ⭐',
      colorPickDiff: 'Pick two different colors to see the magic reaction!',
      memoryBadge: 'Smart Memory Match 🧠',
      memoryTitle: 'FLIP CARDS AND FIND THE MATCHING PAIRS!',
      memoryRestart: 'Restart Game',
      memoryTip: 'An excellent game to develop memory and visual cognitive skills in kids!',
      sizesBadge: 'Size Ordering 📏',
      sizesTitle: 'ARRANGE THE BALLS FROM SMALLEST TO BIGGEST!',
      small: 'Small',
      medium: 'Medium',
      large: 'Big',
      sizesSmallSuccess: 'Correct! The small ball comes first! 👏',
      sizesWrongMedium: 'This one is medium, look for the smallest ball first!',
      sizesWrongLarge: 'This is the biggest ball and comes at the very end!',
      shapeColoring: 'Color Shapes',
      shapeColoringTitle: 'GEOMETRIC SHAPES COLORING CANVAS 🎨',
      shapeColoringDesc: 'Pick a Square, Circle, or Triangle and bring it to life with your favorite colors!',
      selectShapeToColor: 'Pick a shape to color:',
      colorPalette: 'Color Palette:',
      fillColorPrompt: 'Tap shape to fill with selected color!',
      fillMode: 'Instant Fill',
      brushMode: 'Magic Brush',
      clearColoring: 'Reset Colors 🔄',
      finishColoring: 'Finished Coloring! (+1 ⭐)',
      coloredShapeCheer: 'Splendid coloring! You earned a star! ⭐',
      cuteFaceToggle: 'Cheerful Cartoon Face',
      squareTitle: 'Square',
      circleTitle: 'Circle',
      triangleTitle: 'Triangle',
    },
    stickers: {
      title: 'STICKER ALBUM & CREATIVE CANVAS',
      desc: 'Collect stars to unlock charming stickers and decorate your canvas!',
      yourStars: 'Your Stars:',
      clearBoard: 'Clear Board',
      tapToPlacePrompt: 'Click any unlocked sticker in the sidebar to stamp it here! ✨',
      earnedCount: 'Unlocked Stickers:',
      needMoreTip: 'Complete math and counting activities to earn stars and unlock all stickers! 🌟',
    },
    shop: {
      title: 'Rewards & Heroes Shop',
      subtitle: 'Redeem your stars for new companions and fun decorations!',
      charactersTab: 'Hero Companions',
      accessoriesTab: 'Decorations & Accessories',
      companionTip: 'Meet your learning buddies: Pick who cheers and talks to you through every level!',
      listenVoice: 'Listen to Voice Greeting',
      activeCompanion: 'Active Companion ✨',
      selectCompanion: 'Choose as Companion',
      unlockFor: 'Unlock for',
      starsWord: 'Stars ⭐',
      accessoriesTip: 'Dress up your companion: Click to equip hats, glasses and medals that appear on screen!',
      equipped: 'Equipped ✔️',
      equip: 'Wear Accessory',
      close: 'Close',
      earnMoreTip: 'Earn stars by completing number tracing and math exercises!',
    },
    footer: {
      tagline: 'Little Geniuses Oasis — A joyful journey to master numbers, arithmetic and early skills',
      designedFor: 'Crafted with care for preschool children and loving educators',
    },
    settingsModal: {
      title: 'Learning & Number Settings',
      parentsTipTitle: '💡 Advice for Parents & Educators:',
      parentsTipText: 'This app is designed for early childhood and preschool education, bridging numeric symbols, tangible counting, clean pronunciation, and foundational math operations.',
      saveAndClose: 'Save & Close',
    },
    dailyChallenge: {
      title: 'Daily Challenge 🎯',
      subtitle: 'A fun daily puzzle rewarding double stars and bonus points!',
      badge: 'Today’s New Challenge',
      readyStatus: 'Ready to solve! Earn double stars ⭐⭐',
      completedStatus: 'Completed for today! 🎉',
      streakDays: 'Daily Streak',
      rewardBadge: 'Today’s Grand Reward',
      doubleStar: 'Double Star (x2) ⭐⭐',
      bonusPoints: '+50 Bonus Points 🏆',
      listenQuestion: 'Listen to challenge',
      tapToCountItem: 'Tap to count',
      countedItems: 'Counted',
      checkAnswer: 'Confirm Answer',
      congratsTitle: 'Amazing job, superstar! 🌟',
      congratsMessage: 'You solved today’s challenge and earned a double star + 50 bonus points!',
      tryAgainMessage: 'Almost there! Try another choice, you can do it!',
      playAnother: 'Bonus Practice Challenge 🎲',
      backHome: 'Back to Oasis 🏠',
      nextTomorrowNote: 'Tomorrow’s new challenge will unlock in the morning!',
      bonusPracticeTitle: 'Bonus Practice Exercise',
      categoryCounting: 'Counting',
      categoryMath: 'Smart Math',
      categoryShapes: 'Shapes',
      categoryAnimals: 'Animals',
      categoryProfessions: 'Professions',
      categoryColors: 'Colors',
      startTodayChallenge: 'Start Today’s Challenge!',
      todaysChallengeDone: 'Completed today’s challenge!',
    },
  },

  fr: {
    appName: 'L’Oasis des Petits Génies',
    appSubtitle: 'Apprendre les Nombres, le Calcul et les Formes',
    tabs: {
      numbers: 'Nombres (1-20)',
      math: 'Jardin du Calcul',
      skills: 'Vocabulaire & Formes',
      stickers: 'Livre d’Autocollants',
    },
    header: {
      stars: 'Étoile',
      points: 'Points',
      dailyChallenge: 'Défi du Jour',
      soundMute: 'Couper les Effets Sonores',
      soundUnmute: 'Activer les Effets Sonores',
      voiceMute: 'Couper la Voix',
      voiceUnmute: 'Activer la Voix',
      settings: 'Paramètres',
      langSelect: 'Changer de Langue',
    },
    hero: {
      badge: 'Académie Maternelle des Mathématiques Amusantes',
      title: 'APPRENDS LES NOMBRES JUSQU’À 20 ET LE CALCUL EN T’AMUSANT',
      desc: 'Une aventure interactive préscolaire alliant calcul, formes, animaux, famille et métiers avec voix audio et étoiles méritées !',
      listenGreeting: 'Écouter la Chouette Savante',
      startNumbers: 'Commencer les Nombres (1-20)',
      greetingSpeech: 'Bienvenue petit champion dans l’Oasis des Petits Génies ! Découvrons les nombres et le calcul ensemble et gagnons des étoiles !',
      numbersShort: 'Nombres 20',
      mathShort: 'Calcul & Additions',
      skillsShort: 'Mots & Formes',
      stickersShort: 'Autocollants',
    },
    numbers: {
      chooseNumber: 'Choisis un nombre à apprendre :',
      range: 'De 1 à 20',
      smartChallenge: 'Défi des Nombres',
      backToLesson: 'Retour à la leçon',
      previous: 'Précédent',
      next: 'Suivant',
      pronounce: 'Prononcer le Nombre',
      tapToCount: 'Touche chaque objet pour le compter :',
      countedSoFar: 'Compté :',
      countComplete: 'Formidable ! Tu as compté tous les objets et gagné 2 Étoiles ! ⭐⭐',
      tracePrompt: 'Trace et dessine le chiffre avec ton doigt :',
      clearCanvas: 'Effacer le Tableau',
      finishTracing: 'Dessin Terminé ! (+1 ⭐)',
      quickFactTitle: 'Le sais-tu ?',
      nextIs: 'Le nombre suivant est :',
      prevIs: 'Le nombre précédent est :',
      halfSumIs: 'Deux parts égales font :',
      quizQuestion: 'OÙ SE TROUVE LE NOMBRE :',
      quizListen: 'Réécouter la question',
      quizCorrect: 'Bravo ! Bonne réponse 🎉',
      quizWrong: 'Essaie encore, tu peux y arriver ! 💪',
      quizNext: 'Question Suivante 🔄',
    },
    math: {
      selectGame: 'Choisis un jeu de calcul :',
      addition: 'Verger de l’Addition (+)',
      subtraction: 'Ballons de la Soustraction (-)',
      comparison: 'La Balance et Comparaison',
      train: 'Le Train des Nombres',
      newProblem: 'Nouveau Problème',
      appleGarden: 'Verger de Pommes 🍎',
      basket1: 'Premier Panier',
      basket2: 'Deuxième Panier',
      howManyApples: 'COMBIEN DE POMMES DANS LES DEUX PANIERS ?',
      balloonsGame: 'Jeu des Ballons Éclatés 🎈',
      balloonsPrompt: 'Voici des ballons, touche pour éclater le nombre demandé !',
      poppedOf: 'Éclaté',
      balloonsRemain: 'COMBIEN DE BALLONS ENTIERS RESTE-T-IL ?',
      balanceGame: 'Balance Intelligente ⚖️',
      whichPanBigger: 'QUEL CÔTÉ EST LE PLUS LOURD OU SONT-ILS ÉGAUX ?',
      pan1: 'Plateau 1',
      pan2: 'Plateau 2',
      greaterThan: 'Plus Grand Que',
      equal: 'Égal',
      lessThan: 'Plus Petit Que',
      trainGame: 'Train des Nombres Consécutifs 🚂',
      missingNumberPrompt: 'QUEL EST LE NOMBRE MANQUANT DANS LE WAGON ?',
      locomotive: 'Locomotive',
      carriage: 'Wagon',
      correctAlert: 'Bravo ! Réponse exacte ! 🎉',
      wrongAlert: 'Regarde bien et réessaie, champion !',
      trainSuccess: 'Superbe ! Le train des nombres est complet et démarre ! 🚂🎉',
    },
    skills: {
      selectSkill: 'Choisis une compétence fondamentale :',
      shapes: 'Formes Géométriques',
      colors: 'Labo Magique des Couleurs',
      memory: 'Jeu de Mémoire',
      sizes: 'Ordre des Tailles',
      shapesDiscovery: 'Découvrir les Formes',
      pronounceShape: 'Prononcer la Forme',
      sides: 'Côtés :',
      corners: 'Coins :',
      shadowMatch: 'Jeu de l’Ombre Mystère 🎯',
      changeShadow: 'Changer l’Ombre',
      shadowPrompt: 'Regarde cette ombre noire, quelle forme colorée correspond exactement ?',
      shadowCorrect: 'Superbe correspondance ! Tu gagnes une étoile ! ⭐',
      shadowWrong: 'Regarde bien les angles et réessaie !',
      colorLabBadge: 'Laboratoire Magique des Couleurs 🎨',
      colorLabTitle: 'MÉLANGE DEUX COULEURS POUR CRÉER UNE NOUVELLE COULEUR !',
      firstColor: 'Première Couleur',
      secondColor: 'Deuxième Couleur',
      result: 'Résultat :',
      colorMixExplain: 'Le mélange de ces deux couleurs donne une toute nouvelle couleur magique !',
      listenAndStar: 'Écouter & Gagner une Étoile ! ⭐',
      colorPickDiff: 'Choisis deux couleurs différentes pour voir la magie opérer !',
      memoryBadge: 'Mémoire & Concentration 🧠',
      memoryTitle: 'RETOURNE LES CARTES ET RETROUVE LES PAIRES IDENTIQUES !',
      memoryRestart: 'Recommencer le Jeu',
      memoryTip: 'Un jeu formidable pour développer la mémoire visuelle et l’attention des enfants !',
      sizesBadge: 'Ordre des Tailles 📏',
      sizesTitle: 'CLASSE LES BALLES DE LA PLUS PETITE À LA PLUS GRANDE !',
      small: 'Petite',
      medium: 'Moyenne',
      large: 'Grande',
      sizesSmallSuccess: 'Exact ! La petite balle vient en premier ! 👏',
      sizesWrongMedium: 'Celle-ci est moyenne, cherche d’abord la plus petite !',
      sizesWrongLarge: 'C’est la plus grande balle, elle vient tout à la fin !',
      shapeColoring: 'Coloriage des Formes',
      shapeColoringTitle: 'ATELIER DE COLORIAGE DES FORMES GÉOMÉTRIQUES 🎨',
      shapeColoringDesc: 'Choisis un Carré, un Cercle ou un Triangle et colorie-le avec tes couleurs préférées !',
      selectShapeToColor: 'Choisis une forme à colorier :',
      colorPalette: 'Palette de Couleurs :',
      fillColorPrompt: 'Touche la forme pour la remplir !',
      fillMode: 'Remplissage Immédiat',
      brushMode: 'Pinceau Magique',
      clearColoring: 'Recommencer 🔄',
      finishColoring: 'Coloriage Terminé ! (+1 ⭐)',
      coloredShapeCheer: 'Magnifique coloriage ! Tu gagnes une étoile ! ⭐',
      cuteFaceToggle: 'Visage Rigolo',
      squareTitle: 'Carré',
      circleTitle: 'Cercle',
      triangleTitle: 'Triangle',
    },
    stickers: {
      title: 'LIVRE D’AUTOCOLLANTS & TABLEAU CRÉATIF',
      desc: 'Collecte des étoiles pour débloquer de jolis autocollants et décorer ton paysage !',
      yourStars: 'Tes Étoiles :',
      clearBoard: 'Nettoyer le Tableau',
      tapToPlacePrompt: 'Clique sur un autocollant débloqué pour le coller ici ! ✨',
      earnedCount: 'Autocollants Débloqués :',
      needMoreTip: 'Termine les exercices de calcul et de nombres pour débloquer tous les autocollants ! 🌟',
    },
    shop: {
      title: 'Boutique des Récompenses et des Héros',
      subtitle: 'Échange tes étoiles contre de nouveaux compagnons et accessoires rigolos !',
      charactersTab: 'Héros & Compagnons',
      accessoriesTab: 'Décorations & Accessoires',
      companionTip: 'Fais connaissance avec tes amis : Choisis qui t’accompagne et t’encourage à chaque niveau !',
      listenVoice: 'Écouter la Voix',
      activeCompanion: 'Compagnon Actif ✨',
      selectCompanion: 'Choisir comme Compagnon',
      unlockFor: 'Débloquer pour',
      starsWord: 'Étoiles ⭐',
      accessoriesTip: 'Habille ton ami : Équipe couronnes, lunettes et médailles qui s’affichent à l’écran !',
      equipped: 'Équipé ✔️',
      equip: 'Porter l’Accessoire',
      close: 'Fermer',
      earnMoreTip: 'Gagne des étoiles en traçant les nombres et en réussissant les exercices !',
    },
    footer: {
      tagline: 'L’Oasis des Petits Génies — Un voyage joyeux pour maîtriser les nombres, le calcul et les compétences précoces',
      designedFor: 'Conçu avec bienveillance pour les tout-petits et les éducateurs',
    },
    settingsModal: {
      title: 'Paramètres d’Apprentissage',
      parentsTipTitle: '💡 Conseil pour les Parents :',
      parentsTipText: 'Cette application est conçue pour la petite enfance et la maternelle, associant le symbole numérique, la quantité concrète, la prononciation claire et les bases du calcul.',
      saveAndClose: 'Enregistrer & Fermer',
    },
    dailyChallenge: {
      title: 'Défi du Jour 🎯',
      subtitle: 'Un exercice quotidien amusant récompensé par une étoile doublée et des points !',
      badge: 'Nouveau Défi du Jour',
      readyStatus: 'Prêt à être résolu ! Gagne une étoile doublée ⭐⭐',
      completedStatus: 'Défi d’aujourd’hui réussi ! 🎉',
      streakDays: 'Série quotidienne',
      rewardBadge: 'Grande Récompense du Jour',
      doubleStar: 'Étoile Doublée (x2) ⭐⭐',
      bonusPoints: '+50 Points Bonus 🏆',
      listenQuestion: 'Écouter l’exercice',
      tapToCountItem: 'Touche pour compter',
      countedItems: 'Compté',
      checkAnswer: 'Confirmer la réponse',
      congratsTitle: 'Bravo, champion ! 🌟',
      congratsMessage: 'Tu as résolu le défi du jour et gagné une étoile doublée et 50 points bonus !',
      tryAgainMessage: 'Presque ! Essaie une autre réponse, tu peux y arriver !',
      playAnother: 'Défi d’entraînement bonus 🎲',
      backHome: 'Retour à l’Oasis 🏠',
      nextTomorrowNote: 'Le défi de demain sera disponible chaque matin !',
      bonusPracticeTitle: 'Exercice d’entraînement bonus',
      categoryCounting: 'Comptage',
      categoryMath: 'Calcul Malin',
      categoryShapes: 'Formes',
      categoryAnimals: 'Animaux',
      categoryProfessions: 'Métiers',
      categoryColors: 'Couleurs',
      startTodayChallenge: 'Commencer le défi du jour !',
      todaysChallengeDone: 'Défi du jour déjà accompli !',
    },
  },
};

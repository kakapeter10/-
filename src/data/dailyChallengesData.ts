export interface DailyChallengeOption {
  id: string;
  labelAr: string;
  labelEn: string;
  labelFr: string;
  emoji?: string;
  isCorrect: boolean;
}

export interface CountableItem {
  id: string;
  emoji: string;
  labelAr: string;
  labelEn: string;
  labelFr: string;
}

export interface DailyChallengeItem {
  id: string;
  category: 'counting' | 'math' | 'shapes' | 'animals' | 'professions' | 'colors';
  badgeIcon: string;
  questionAr: string;
  questionEn: string;
  questionFr: string;
  speechAr: string;
  speechEn: string;
  speechFr: string;
  interactiveType: 'count_tap' | 'single_choice' | 'visual_equation';
  countableItems?: CountableItem[];
  equation?: {
    num1: number;
    op: '+' | '-';
    num2: number;
    emojis1: string[];
    emojis2: string[];
  };
  shapeVisual?: 'circle' | 'square' | 'triangle' | 'star';
  options: DailyChallengeOption[];
  funFactAr: string;
  funFactEn: string;
  funFactFr: string;
}

export const DAILY_CHALLENGES: DailyChallengeItem[] = [
  // 1. Counting Challenge - Apples
  {
    id: 'dc_count_apples',
    category: 'counting',
    badgeIcon: '🍎',
    questionAr: 'كم تفاحة حمراء لذيذة ترى في الحديقة؟ اضغط عليها لعدها!',
    questionEn: 'How many delicious red apples do you see? Tap them to count!',
    questionFr: 'Combien de pommes rouges vois-tu ? Touche-les pour compter !',
    speechAr: 'كم تفاحة حمراء لذيذة ترى في الحديقة؟ اضغط عليها لعدها معاً!',
    speechEn: 'How many delicious red apples do you see? Tap them to count together!',
    speechFr: 'Combien de pommes rouges vois-tu ? Touche-les pour compter !',
    interactiveType: 'count_tap',
    countableItems: [
      { id: 'c1', emoji: '🍎', labelAr: 'تفاحة 1', labelEn: 'Apple 1', labelFr: 'Pomme 1' },
      { id: 'c2', emoji: '🍎', labelAr: 'تفاحة 2', labelEn: 'Apple 2', labelFr: 'Pomme 2' },
      { id: 'c3', emoji: '🍎', labelAr: 'تفاحة 3', labelEn: 'Apple 3', labelFr: 'Pomme 3' },
      { id: 'c4', emoji: '🍎', labelAr: 'تفاحة 4', labelEn: 'Apple 4', labelFr: 'Pomme 4' },
      { id: 'c5', emoji: '🍎', labelAr: 'تفاحة 5', labelEn: 'Apple 5', labelFr: 'Pomme 5' },
    ],
    options: [
      { id: 'opt_3', labelAr: '3 تفاحات', labelEn: '3 apples', labelFr: '3 pommes', emoji: '🍎', isCorrect: false },
      { id: 'opt_5', labelAr: '5 تفاحات', labelEn: '5 apples', labelFr: '5 pommes', emoji: '🍎', isCorrect: true },
      { id: 'opt_6', labelAr: '6 تفاحات', labelEn: '6 apples', labelFr: '6 pommes', emoji: '🍎', isCorrect: false },
    ],
    funFactAr: 'التفاح فاكهة مغذية تمد الأبطال الصغار بالطاقة والنشاط!',
    funFactEn: 'Apples are crunchy fruits that give young champions super energy!',
    funFactFr: 'Les pommes sont des fruits délicieux pleins de vitamines !',
  },

  // 2. Math Challenge - Kittens Addition
  {
    id: 'dc_math_kittens',
    category: 'math',
    badgeIcon: '🐱',
    questionAr: 'لدينا 3 قطط تلعب 🐱🐱🐱 وانضمت إليها قطتان 🐱🐱، كم قطة أصبح لدينا؟',
    questionEn: 'We have 3 kittens playing 🐱🐱🐱 and 2 more join 🐱🐱, how many kittens now?',
    questionFr: '3 chatons jouent 🐱🐱🐱 et 2 autres arrivent 🐱🐱, combien de chatons en tout ?',
    speechAr: 'لدينا 3 قطط وانضمت إليها قطتان، كم قطة أصبح لدينا الآن؟',
    speechEn: 'We have 3 kittens and 2 more join, how many kittens are there now?',
    speechFr: '3 chatons et 2 autres arrivent, combien de chatons en tout ?',
    interactiveType: 'visual_equation',
    equation: {
      num1: 3,
      op: '+',
      num2: 2,
      emojis1: ['🐱', '🐱', '🐱'],
      emojis2: ['🐱', '🐱'],
    },
    options: [
      { id: 'opt_4', labelAr: '4 قطط', labelEn: '4 kittens', labelFr: '4 chatons', isCorrect: false },
      { id: 'opt_5', labelAr: '5 قطط', labelEn: '5 kittens', labelFr: '5 chatons', isCorrect: true },
      { id: 'opt_6', labelAr: '6 قطط', labelEn: '6 kittens', labelFr: '6 chatons', isCorrect: false },
    ],
    funFactAr: 'الجمع هو ضم الأشياء معاً: 3 + 2 = 5 قطط سعيدة!',
    funFactEn: 'Addition joins groups together: 3 + 2 = 5 happy kittens!',
    funFactFr: 'L’addition réunit les groupes : 3 + 2 = 5 gentils chatons !',
  },

  // 3. Shape Challenge - Triangle
  {
    id: 'dc_shape_triangle',
    category: 'shapes',
    badgeIcon: '🔺',
    questionAr: 'أي من هذه الأشكال لديه 3 أضلاع مستقيمة و3 زوايا ويشبه قطعة البيتزا؟',
    questionEn: 'Which shape has 3 straight sides, 3 corners, and looks like a pizza slice?',
    questionFr: 'Quelle forme a 3 côtés droits et 3 sommets, comme une part de pizza ?',
    speechAr: 'أي من هذه الأشكال لديه 3 أضلاع مستقيمة و3 زوايا ويشبه قطعة البيتزا؟',
    speechEn: 'Which shape has 3 straight sides and looks like a pizza slice?',
    speechFr: 'Quelle forme a 3 côtés et ressemble à une part de pizza ?',
    interactiveType: 'single_choice',
    shapeVisual: 'triangle',
    options: [
      { id: 'opt_tri', labelAr: 'مثلث 🔺', labelEn: 'Triangle 🔺', labelFr: 'Triangle 🔺', emoji: '🔺', isCorrect: true },
      { id: 'opt_circle', labelAr: 'دائرة ⭕', labelEn: 'Circle ⭕', labelFr: 'Cercle ⭕', emoji: '⭕', isCorrect: false },
      { id: 'opt_square', labelAr: 'مربع ⏹️', labelEn: 'Square ⏹️', labelFr: 'Carré ⏹️', emoji: '⏹️', isCorrect: false },
    ],
    funFactAr: 'المثلث يحتوي على 3 أضلاع متصلة و3 رؤوس، مثل قمة الجبل وخيمة التخييم!',
    funFactEn: 'A triangle has 3 connected sides, like a mountain peak or a tent!',
    funFactFr: 'Le triangle a 3 côtés droits, comme le sommet d’une montagne !',
  },

  // 4. Animal Challenge - King of the Jungle
  {
    id: 'dc_animal_lion',
    category: 'animals',
    badgeIcon: '🦁',
    questionAr: 'من هو ملك الغابة الشجاع ذو الزئير القوي واللبدة الذهبية حول عنقه؟',
    questionEn: 'Who is the brave king of the jungle with a mighty roar and a golden mane?',
    questionFr: 'Qui est le roi de la jungle avec un puissant rugissement et une crinière dorée ?',
    speechAr: 'من هو ملك الغابة الشجاع ذو الزئير القوي واللبدة الذهبية حول عنقه؟',
    speechEn: 'Who is the brave king of the jungle with a mighty roar and a golden mane?',
    speechFr: 'Qui est le roi de la jungle avec une fière crinière dorée ?',
    interactiveType: 'single_choice',
    options: [
      { id: 'opt_lion', labelAr: 'الأسد 🦁', labelEn: 'Lion 🦁', labelFr: 'Lion 🦁', emoji: '🦁', isCorrect: true },
      { id: 'opt_rabbit', labelAr: 'الأرنب 🐰', labelEn: 'Bunny 🐰', labelFr: 'Lapin 🐰', emoji: '🐰', isCorrect: false },
      { id: 'opt_turtle', labelAr: 'السلحفاة 🐢', labelEn: 'Turtle 🐢', labelFr: 'Tortue 🐢', emoji: '🐢', isCorrect: false },
    ],
    funFactAr: 'الأسد حيوان قوي يعيش في مجموعات تسمى القطعان في السافانا!',
    funFactEn: 'The lion lives in family groups called prides in the savannah!',
    funFactFr: 'Le lion vit en famille appelée troupe dans la savane !',
  },

  // 5. Profession Challenge - Doctor
  {
    id: 'dc_prof_doctor',
    category: 'professions',
    badgeIcon: '🩺',
    questionAr: 'من يرتدي المعطف الأبيض ويستخدم السماعة الطبية ليفحص نبضات القلب ويعالجنا؟',
    questionEn: 'Who wears a white coat and uses a stethoscope to listen to our heart and care for us?',
    questionFr: 'Qui porte une blouse blanche et utilise un stéthoscope pour écouter notre cœur ?',
    speechAr: 'من يرتدي المعطف الأبيض ويستخدم السماعة الطبية ليفحص نبضات قلوبنا ويعالجنا؟',
    speechEn: 'Who wears a white coat and uses a stethoscope to care for our health?',
    speechFr: 'Qui porte une blouse blanche et soigne les malades avec gentillesse ?',
    interactiveType: 'single_choice',
    options: [
      { id: 'opt_doc', labelAr: 'الطبيب 🩺', labelEn: 'Doctor 🩺', labelFr: 'Médecin 🩺', emoji: '🩺', isCorrect: true },
      { id: 'opt_fire', labelAr: 'الإطفائي 🚒', labelEn: 'Firefighter 🚒', labelFr: 'Pompier 🚒', emoji: '🚒', isCorrect: false },
      { id: 'opt_chef', labelAr: 'الطاهي 👨‍🍳', labelEn: 'Chef 👨‍🍳', labelFr: 'Cuisinier 👨‍🍳', emoji: '👨‍🍳', isCorrect: false },
    ],
    funFactAr: 'الأطباء والممرضون أبطال يساعدوننا لنبقى بصحة جيدة وأجسام قوية!',
    funFactEn: 'Doctors and nurses help keep our bodies healthy and strong!',
    funFactFr: 'Les médecins et infirmiers veillent sur notre santé avec grand cœur !',
  },

  // 6. Counting Challenge - Colorful Balloons
  {
    id: 'dc_count_balloons',
    category: 'counting',
    badgeIcon: '🎈',
    questionAr: 'كم بالوناً ملوناً يطير في الهواء في حفلة الأذكياء؟ اضغط عليها لعدها!',
    questionEn: 'How many colorful balloons are floating in the sky? Tap to count!',
    questionFr: 'Combien de ballons colorés volent dans le ciel ? Touche pour compter !',
    speechAr: 'كم بالوناً ملوناً يطير في الهواء؟ اضغط عليها لعدها جميعاً!',
    speechEn: 'How many colorful balloons are floating in the sky? Tap them to count!',
    speechFr: 'Combien de ballons volent dans le ciel ? Touche-les pour compter !',
    interactiveType: 'count_tap',
    countableItems: [
      { id: 'b1', emoji: '🎈', labelAr: 'بالون 1', labelEn: 'Balloon 1', labelFr: 'Ballon 1' },
      { id: 'b2', emoji: '🎈', labelAr: 'بالون 2', labelEn: 'Balloon 2', labelFr: 'Ballon 2' },
      { id: 'b3', emoji: '🎈', labelAr: 'بالون 3', labelEn: 'Balloon 3', labelFr: 'Ballon 3' },
      { id: 'b4', emoji: '🎈', labelAr: 'بالون 4', labelEn: 'Balloon 4', labelFr: 'Ballon 4' },
    ],
    options: [
      { id: 'opt_3', labelAr: '3 بالونات', labelEn: '3 balloons', labelFr: '3 ballons', emoji: '🎈', isCorrect: false },
      { id: 'opt_4', labelAr: '4 بالونات', labelEn: '4 balloons', labelFr: '4 ballons', emoji: '🎈', isCorrect: true },
      { id: 'opt_5', labelAr: '5 بالونات', labelEn: '5 balloons', labelFr: '5 ballons', emoji: '🎈', isCorrect: false },
    ],
    funFactAr: 'البالونات تمتلئ بالهواء وترتفع بخفة لتجلب الفرح والبهجة!',
    funFactEn: 'Balloons fill with light air and float up to bring lots of joy!',
    funFactFr: 'Les ballons s’envolent légèrement dans l’air pour faire la fête !',
  },

  // 7. Math Challenge - Strawberries Subtraction
  {
    id: 'dc_math_strawberries',
    category: 'math',
    badgeIcon: '🍓',
    questionAr: 'كان لدينا 4 حبات فراولة 🍓🍓🍓🍓 وأكل الأرنب سمسم حبة واحدة 🍓، كم حبة فراولة بقيت؟',
    questionEn: 'We had 4 sweet strawberries 🍓🍓🍓🍓 and bunny Simsim ate 1, how many are left?',
    questionFr: 'Nous avions 4 fraises 🍓🍓🍓🍓 et le lapin Simsim en a mangé 1, combien en reste-t-il ?',
    speechAr: 'كان لدينا 4 حبات فراولة وأكل سمسم حبة واحدة، كم حبة فراولة بقيت في السلة؟',
    speechEn: 'We had 4 strawberries and Simsim ate 1, how many are left?',
    speechFr: 'Nous avions 4 fraises et Simsim en a mangé 1, combien en reste-t-il ?',
    interactiveType: 'visual_equation',
    equation: {
      num1: 4,
      op: '-',
      num2: 1,
      emojis1: ['🍓', '🍓', '🍓', '🍓'],
      emojis2: ['🍓'],
    },
    options: [
      { id: 'opt_2', labelAr: '2 فراولة', labelEn: '2 strawberries', labelFr: '2 fraises', isCorrect: false },
      { id: 'opt_3', labelAr: '3 فراولة', labelEn: '3 strawberries', labelFr: '3 fraises', isCorrect: true },
      { id: 'opt_4', labelAr: '4 فراولة', labelEn: '4 strawberries', labelFr: '4 fraises', isCorrect: false },
    ],
    funFactAr: 'عملية الطرح هي إنقاص وأخذ جزء: 4 - 1 = 3 حبات فراولة لذيذة!',
    funFactEn: 'Subtraction takes away a part: 4 - 1 = 3 yummy strawberries!',
    funFactFr: 'La soustraction enlève une partie : 4 - 1 = 3 délicieuses fraises !',
  },

  // 8. Shape Challenge - Square
  {
    id: 'dc_shape_square',
    category: 'shapes',
    badgeIcon: '⏹️',
    questionAr: 'أي من هذه الأشكال لديه 4 أضلاع مستقيمة متساوية تماماً مثل صندوق الهدايا؟',
    questionEn: 'Which shape has 4 straight sides that are all equal, like a gift box?',
    questionFr: 'Quelle forme a 4 côtés droits parfaitement égaux, comme une boîte cadeau ?',
    speechAr: 'أي من هذه الأشكال لديه 4 أضلاع مستقيمة متساوية تماماً مثل صندوق الهدايا؟',
    speechEn: 'Which shape has 4 equal straight sides like a gift box?',
    speechFr: 'Quelle forme a 4 côtés égaux comme une boîte cadeau ?',
    interactiveType: 'single_choice',
    shapeVisual: 'square',
    options: [
      { id: 'opt_sq', labelAr: 'مربع ⏹️', labelEn: 'Square ⏹️', labelFr: 'Carré ⏹️', emoji: '⏹️', isCorrect: true },
      { id: 'opt_cir', labelAr: 'دائرة ⭕', labelEn: 'Circle ⭕', labelFr: 'Cercle ⭕', emoji: '⭕', isCorrect: false },
      { id: 'opt_tri', labelAr: 'مثلث 🔺', labelEn: 'Triangle 🔺', labelFr: 'Triangle 🔺', emoji: '🔺', isCorrect: false },
    ],
    funFactAr: 'المربع شكل متناسق رائع، جميع أضلاعه الأربعة متساوية في الطول دائماً!',
    funFactEn: 'A square is perfectly balanced with 4 sides of the exact same length!',
    funFactFr: 'Le carré est parfaitement équilibré : ses 4 côtés ont la même longueur !',
  },

  // 9. Profession Challenge - Firefighter
  {
    id: 'dc_prof_firefighter',
    category: 'professions',
    badgeIcon: '🚒',
    questionAr: 'من يركب شاحنة الإطفاء الحمراء ذات السلم الطويل ويخمد النيران بشجاعة لإنقاذ الناس؟',
    questionEn: 'Who drives the red fire truck with a big ladder and courageously puts out fires?',
    questionFr: 'Qui conduit le grand camion rouge avec une échelle et éteint les incendies ?',
    speechAr: 'من يركب شاحنة الإطفاء الحمراء ويخمد النيران بشجاعة لإنقاذ الناس؟',
    speechEn: 'Who drives the big red fire truck and puts out fires to help people?',
    speechFr: 'Qui conduit le grand camion de pompiers rouge et protège les gens ?',
    interactiveType: 'single_choice',
    options: [
      { id: 'opt_fire', labelAr: 'رجل الإطفاء 🚒', labelEn: 'Firefighter 🚒', labelFr: 'Pompier 🚒', emoji: '🚒', isCorrect: true },
      { id: 'opt_teach', labelAr: 'المعلم 📚', labelEn: 'Teacher 📚', labelFr: 'Professeur 📚', emoji: '📚', isCorrect: false },
      { id: 'opt_pilot', labelAr: 'الطيار ✈️', labelEn: 'Pilot ✈️', labelFr: 'Pilote ✈️', emoji: '✈️', isCorrect: false },
    ],
    funFactAr: 'رجال الإطفاء شجعان جداً ويرتدون خوذات وبدلات خاصة تحميهم من الحرارة!',
    funFactEn: 'Firefighters are super brave and wear protective gear to keep safe!',
    funFactFr: 'Les pompiers sont très courageux et portent des tenues protectrices !',
  },

  // 10. Color Challenge - Blue Sky
  {
    id: 'dc_color_blue',
    category: 'colors',
    badgeIcon: '💙',
    questionAr: 'أي من هذه الألوان هو اللون الأزرق الصافي الذي يلون السماء الصافية وأمواج البحر؟',
    questionEn: 'Which of these colors is clear Blue, like the open sky and ocean waves?',
    questionFr: 'Laquelle de ces couleurs est le Bleu clair, comme le ciel et la mer ?',
    speechAr: 'أي من هذه الألوان هو اللون الأزرق الصافي الذي يلون السماء الصافية وأمواج البحر؟',
    speechEn: 'Which of these colors is clear blue like the sky and sea?',
    speechFr: 'Quelle couleur est le bleu clair comme le ciel d’été et la mer ?',
    interactiveType: 'single_choice',
    options: [
      { id: 'opt_blue', labelAr: 'الأزرق 💙', labelEn: 'Blue 💙', labelFr: 'Bleu 💙', emoji: '💙', isCorrect: true },
      { id: 'opt_red', labelAr: 'الأحمر ❤️', labelEn: 'Red ❤️', labelFr: 'Rouge ❤️', emoji: '❤️', isCorrect: false },
      { id: 'opt_yellow', labelAr: 'الأصفر 💛', labelEn: 'Yellow 💛', labelFr: 'Jaune 💛', emoji: '💛', isCorrect: false },
    ],
    funFactAr: 'اللون الأزرق لون هادئ ومريح، ونراه في سماء النهار الصافية وفي أعماق المحيطات!',
    funFactEn: 'Blue is a peaceful color found in clear day skies and the ocean!',
    funFactFr: 'Le bleu est une couleur douce et apaisante que l’on trouve dans le ciel et l’océan !',
  },

  // 11. Counting Challenge - Little Ducklings
  {
    id: 'dc_count_ducks',
    category: 'counting',
    badgeIcon: '🦆',
    questionAr: 'كم بطة صفراء تسبح في بركة الماء؟ اضغط على كل بطة لسماع صوتها وعدها!',
    questionEn: 'How many ducklings are swimming in the pond? Tap to count them!',
    questionFr: 'Combien de petits canards nagent dans la mare ? Touche pour compter !',
    speechAr: 'كم بطة تسبح في بركة الماء؟ اضغط على كل بطة لعدها معاً!',
    speechEn: 'How many ducklings are swimming in the pond? Tap to count them!',
    speechFr: 'Combien de canetons nagent dans la mare ? Touche-les pour compter !',
    interactiveType: 'count_tap',
    countableItems: [
      { id: 'd1', emoji: '🦆', labelAr: 'بطة 1', labelEn: 'Duck 1', labelFr: 'Canard 1' },
      { id: 'd2', emoji: '🦆', labelAr: 'بطة 2', labelEn: 'Duck 2', labelFr: 'Canard 2' },
      { id: 'd3', emoji: '🦆', labelAr: 'بطة 3', labelEn: 'Duck 3', labelFr: 'Canard 3' },
    ],
    options: [
      { id: 'opt_2', labelAr: '2 بطات', labelEn: '2 ducks', labelFr: '2 canards', emoji: '🦆', isCorrect: false },
      { id: 'opt_3', labelAr: '3 بطات', labelEn: '3 ducks', labelFr: '3 canards', emoji: '🦆', isCorrect: true },
      { id: 'opt_4', labelAr: '4 بطات', labelEn: '4 ducks', labelFr: '4 canards', emoji: '🦆', isCorrect: false },
    ],
    funFactAr: 'البط يحب السباحة ولديه أقدام مكففة تساعده على التجديف في الماء بخفة!',
    funFactEn: 'Ducks have webbed feet that work like little paddles in the water!',
    funFactFr: 'Les canards ont des pattes palmées qui rament facilement dans l’eau !',
  },

  // 12. Math Challenge - Stars Addition
  {
    id: 'dc_math_stars',
    category: 'math',
    badgeIcon: '⭐',
    questionAr: 'لدينا 2 نجمتان لامعتان ⭐⭐ وأضفنا إليهما نجمتان أخريان ⭐⭐، كم نجمة أصبح لدينا؟',
    questionEn: 'We have 2 glowing stars ⭐⭐ and add 2 more stars ⭐⭐, how many stars in all?',
    questionFr: 'Nous avons 2 étoiles brillantes ⭐⭐ et nous en ajoutons 2 autres ⭐⭐, combien d’étoiles ?',
    speechAr: 'لدينا نجمتان وأضفنا إليهما نجمتين أخريين، كم نجمة أصبح لدينا الآن؟',
    speechEn: 'We have 2 stars and add 2 more, how many stars are there in total?',
    speechFr: 'Nous avons 2 étoiles et en ajoutons 2 autres, combien d’étoiles en tout ?',
    interactiveType: 'visual_equation',
    equation: {
      num1: 2,
      op: '+',
      num2: 2,
      emojis1: ['⭐', '⭐'],
      emojis2: ['⭐', '⭐'],
    },
    options: [
      { id: 'opt_3', labelAr: '3 نجوم', labelEn: '3 stars', labelFr: '3 étoiles', isCorrect: false },
      { id: 'opt_4', labelAr: '4 نجوم', labelEn: '4 stars', labelFr: '4 étoiles', isCorrect: true },
      { id: 'opt_5', labelAr: '5 نجوم', labelEn: '5 stars', labelFr: '5 étoiles', isCorrect: false },
    ],
    funFactAr: '2 + 2 = 4! عملية جمع سهلة وجميلة تضيء كأربعة نجوم ذهبية!',
    funFactEn: '2 + 2 = 4! A fun addition equation that shines like golden stars!',
    funFactFr: '2 + 2 = 4 ! Une jolie addition facile qui brille comme des étoiles d’or !',
  },
];

/**
 * Returns today's date formatted as YYYY-MM-DD
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Deterministically pick today's challenge based on the date string
 */
export function getDailyChallengeForDate(dateStr: string): DailyChallengeItem {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) & 0xffffffff;
  }
  const index = Math.abs(hash) % DAILY_CHALLENGES.length;
  return DAILY_CHALLENGES[index];
}

/**
 * Pick another random challenge from the pool for practice
 */
export function getRandomDailyChallenge(excludeId?: string): DailyChallengeItem {
  const pool = excludeId
    ? DAILY_CHALLENGES.filter((c) => c.id !== excludeId)
    : DAILY_CHALLENGES;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex] || DAILY_CHALLENGES[0];
}

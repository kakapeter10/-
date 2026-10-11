import React, { useState } from 'react';
import { X, Sparkles, Check, Lock, Volume2, Award, Smile } from 'lucide-react';
import { useGame, CHARACTERS_LIST, ACCESSORIES_ITEMS } from '../context/GameContext';
import { soundEffects } from '../utils/soundEffects';

interface RewardShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RewardShopModal: React.FC<RewardShopModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'characters' | 'accessories'>('characters');
  const {
    language,
    t,
    stars,
    unlockedCharacters,
    unlockCharacter,
    activeCompanionId,
    setActiveCompanionId,
    unlockedItems,
    unlockItem,
    activeAccessories,
    toggleAccessory,
    formatNumber,
    speakCurrentLanguage,
  } = useGame();

  if (!isOpen) return null;

  const starsFormatted = formatNumber(stars);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-amber-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Shop Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-xs">
              <Award className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black">{t.shop.title}</h2>
              <p className="text-xs sm:text-sm text-amber-100">
                {t.shop.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Balance Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white text-amber-800 font-black text-sm sm:text-base shadow-sm font-number">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>{starsFormatted.main}</span>
              <span className="text-xs font-normal">{t.header.stars}</span>
            </div>

            <button
              onClick={() => {
                soundEffects.playButtonClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-amber-100 bg-amber-50/50 p-2 gap-2">
          <button
            onClick={() => {
              soundEffects.playButtonClick();
              setActiveTab('characters');
            }}
            className={`flex-1 py-2.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === 'characters'
                ? 'bg-white text-amber-800 shadow-xs'
                : 'text-slate-600 hover:text-amber-800'
            }`}
          >
            <Smile className="w-4 h-4 text-amber-600" />
            <span>{t.shop.charactersTab}</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playButtonClick();
              setActiveTab('accessories');
            }}
            className={`flex-1 py-2.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === 'accessories'
                ? 'bg-white text-amber-800 shadow-xs'
                : 'text-slate-600 hover:text-amber-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{t.shop.accessoriesTab}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'characters' ? (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                💡 <strong>{t.shop.companionTip}</strong>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CHARACTERS_LIST.map((char) => {
                  const isUnlocked = unlockedCharacters.includes(char.id);
                  const isActive = activeCompanionId === char.id;
                  const canAfford = stars >= char.cost;

                  const charName = language === 'en' ? char.nameEn : language === 'fr' ? char.nameFr : char.nameAr;
                  const charTitle = language === 'en' ? char.titleEn : language === 'fr' ? char.titleFr : char.titleAr;
                  const charPersonality = language === 'en' ? char.personalityEn : language === 'fr' ? char.personalityFr : char.personalityAr;
                  const charVoice = language === 'en' ? char.voiceIntroEn : language === 'fr' ? char.voiceIntroFr : char.voiceIntroAr;

                  return (
                    <div
                      key={char.id}
                      className={`rounded-2xl p-4 border-2 transition-all flex flex-col justify-between ${
                        isActive
                          ? 'border-amber-500 bg-amber-50/40 shadow-sm'
                          : isUnlocked
                          ? 'border-slate-200 bg-white hover:border-amber-300'
                          : 'border-slate-200 bg-slate-50/80 opacity-90'
                      }`}
                    >
                      <div>
                        <div className="flex items-start gap-3 mb-3">
                          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-amber-200 shrink-0">
                            <img
                              src={char.image}
                              alt={charName}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            {isActive && (
                              <div className="absolute top-1 right-1 bg-amber-500 text-white p-0.5 rounded-full text-[10px]">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-slate-800 text-base">
                                {charName}
                              </h3>
                              <button
                                onClick={() => {
                                  soundEffects.playButtonClick();
                                  speakCurrentLanguage(charVoice);
                                }}
                                className="p-1.5 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 cursor-pointer"
                                title={t.shop.listenVoice}
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-xs font-semibold text-amber-700 block">
                              {charTitle}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed mb-4">
                          {charPersonality}
                        </p>
                      </div>

                      {/* Action Button */}
                      <div>
                        {isUnlocked ? (
                          <button
                            onClick={() => {
                              soundEffects.playButtonClick();
                              setActiveCompanionId(char.id);
                              speakCurrentLanguage(
                                language === 'en'
                                  ? `Hello! I am ${charName}, your buddy now!`
                                  : language === 'fr'
                                  ? `Bonjour ! Je suis ${charName}, ton compagnon maintenant !`
                                  : `أهلاً بك! أنا ${charName} رفيقك الآن!`
                              );
                            }}
                            className={`w-full py-2 px-3 rounded-xl font-bold text-xs cursor-pointer transition-colors ${
                              isActive
                                ? 'bg-amber-500 text-white'
                                : 'bg-slate-100 hover:bg-amber-100 text-slate-700'
                            }`}
                          >
                            {isActive ? t.shop.activeCompanion : t.shop.selectCompanion}
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              unlockCharacter(char.id, char.cost);
                            }}
                            disabled={!canAfford}
                            className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                              canAfford
                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            <Lock className="w-3.5 h-3.5" />
                            <span>{t.shop.unlockFor} {char.cost} {t.shop.starsWord}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ACCESSORIES TAB */
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                ✨ <strong>{t.shop.accessoriesTip}</strong>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ACCESSORIES_ITEMS.map((item) => {
                  const isUnlocked = unlockedItems.includes(item.id);
                  const isEquipped = activeAccessories.includes(item.id);
                  const canAfford = stars >= item.cost;

                  const accName = language === 'en' ? item.nameEn : language === 'fr' ? item.nameFr : item.nameAr;
                  const accDesc = language === 'en' ? item.descEn : language === 'fr' ? item.descFr : item.descAr;

                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl p-4 border text-center flex flex-col justify-between transition-all ${
                        isEquipped
                          ? 'border-amber-400 bg-amber-50/50 shadow-xs'
                          : isUnlocked
                          ? 'border-slate-200 bg-white'
                          : 'border-slate-200 bg-slate-50 opacity-90'
                      }`}
                    >
                      <div>
                        <div className="text-4xl mb-2">{item.emoji}</div>
                        <h4 className="font-bold text-slate-800 text-sm mb-1">{accName}</h4>
                        <p className="text-[11px] text-slate-500 mb-3">{accDesc}</p>
                      </div>

                      <div>
                        {isUnlocked ? (
                          <button
                            onClick={() => toggleAccessory(item.id)}
                            className={`w-full py-1.5 px-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                              isEquipped
                                ? 'bg-amber-500 text-white'
                                : 'bg-slate-100 hover:bg-amber-100 text-slate-700'
                            }`}
                          >
                            {isEquipped ? t.shop.equipped : t.shop.equip}
                          </button>
                        ) : (
                          <button
                            onClick={() => unlockItem(item.id, item.cost)}
                            disabled={!canAfford}
                            className={`w-full py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                              canAfford
                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            <Lock className="w-3 h-3" />
                            <span>{item.cost} {t.shop.starsWord}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>{t.shop.earnMoreTip}</span>
          <button
            onClick={() => {
              soundEffects.playButtonClick();
              onClose();
            }}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold cursor-pointer transition-colors"
          >
            {t.shop.close}
          </button>
        </div>
      </div>
    </div>
  );
};

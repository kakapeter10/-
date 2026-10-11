/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Target } from 'lucide-react';
import { GameProvider, useGame } from './context/GameContext';
import { soundEffects } from './utils/soundEffects';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { NumbersModule } from './components/NumbersModule';
import { MathModule } from './components/MathModule';
import { SkillsModule } from './components/SkillsModule';
import { StickerAlbum } from './components/StickerAlbum';
import { CompanionWidget } from './components/CompanionWidget';
import { RewardShopModal } from './components/RewardShopModal';
import { DailyChallengeModal } from './components/DailyChallengeModal';

function MainApp() {
  const [activeTab, setActiveTab] = useState<'numbers' | 'math' | 'skills' | 'stickers'>('numbers');
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isDailyChallengeOpen, setIsDailyChallengeOpen] = useState(false);
  const { t, isDailyCompletedToday } = useGame();

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-slate-800">
      {/* Top Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDailyChallenge={() => setIsDailyChallengeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Hero Banner with Welcome Mascot Greeting */}
        <HeroBanner
          onSelectTab={setActiveTab}
          onOpenDailyChallenge={() => setIsDailyChallengeOpen(true)}
        />

        {/* Daily Challenge Highlight Bar */}
        <div className="mb-6 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white shadow-md border-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-start">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 text-2xl shadow-inner border border-white/30">
              🎯
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="font-black text-base sm:text-lg">
                  {t.dailyChallenge.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-white/25 text-xs font-extrabold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-200" />
                  {isDailyCompletedToday
                    ? '🎉 ' + t.dailyChallenge.todaysChallengeDone
                    : '⭐ ' + t.dailyChallenge.doubleStar}
                </span>
              </div>
              <p className="text-amber-100 text-xs sm:text-sm font-medium">
                {isDailyCompletedToday
                  ? t.dailyChallenge.completedStatus
                  : t.dailyChallenge.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                soundEffects.playButtonClick();
                setIsDailyChallengeOpen(true);
              }}
              className="px-4 py-2.5 rounded-2xl bg-white text-amber-800 hover:bg-amber-50 font-black text-xs sm:text-sm shadow-md transition-transform hover:scale-103 active:scale-97 cursor-pointer flex items-center gap-2"
            >
              <Target className="w-4 h-4 text-orange-600 animate-spin-slow" />
              <span>
                {isDailyCompletedToday
                  ? t.dailyChallenge.playAnother
                  : t.dailyChallenge.startTodayChallenge}
              </span>
            </button>
          </div>
        </div>

        {/* Module Content */}
        <div className="mt-4">
          {activeTab === 'numbers' && <NumbersModule />}
          {activeTab === 'math' && <MathModule />}
          {activeTab === 'skills' && <SkillsModule />}
          {activeTab === 'stickers' && <StickerAlbum />}
        </div>
      </main>

      {/* Bottom Floating Companion Character & Shop Trigger */}
      <CompanionWidget onOpenShop={() => setIsShopOpen(true)} />

      {/* Reward Store Modal */}
      <RewardShopModal isOpen={isShopOpen} onClose={() => setIsShopOpen(false)} />

      {/* Daily Challenge Modal */}
      <DailyChallengeModal
        isOpen={isDailyChallengeOpen}
        onClose={() => setIsDailyChallengeOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-amber-200/80 bg-white/70 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-semibold text-amber-800">
            {t.footer.tagline}
          </p>
          <p className="text-slate-400">
            {t.footer.designedFor}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <MainApp />
    </GameProvider>
  );
}

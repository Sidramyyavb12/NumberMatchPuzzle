import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGameEngine } from './src/hooks/useGameEngine';
import { useTimer } from './src/hooks/useTimer';
import { LEVELS } from './src/constants/levels';
import Grid from './src/components/Grid';
import Timer from './src/components/Timer';
import AddRowButton from './src/components/AddRowButton';
import LevelIndicator from './src/components/LevelIndicator';
import GameOverModal from './src/components/GameOverModal';

export default function App() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const currentLevel = LEVELS[currentLevelIndex];

  const {
    gameState,
    handleCellPress,
    addRow,
    resetGame,
    setGameStatus,
    invalidMatchCellId,
  } = useGameEngine(currentLevel);

  const handleTimeUp = () => {
    setGameStatus('lost');
  };

  const { timeLeft, start, reset, formatTime } = useTimer(
    currentLevel.timeLimit,
    handleTimeUp
  );

  // Start timer when game starts
  useEffect(() => {
    if (gameState.status === 'playing') {
      reset(currentLevel.timeLimit);
      start();
    }
  }, [gameState.status, currentLevel.timeLimit]);

  const handleRestart = () => {
    resetGame();
    reset(currentLevel.timeLimit);
    start();
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < LEVELS.length - 1) {
      const nextIndex = currentLevelIndex + 1;
      setCurrentLevelIndex(nextIndex);
    }
  };

  // Reset game when level changes
  useEffect(() => {
    if (currentLevelIndex > 0) {
      resetGame();
      reset(currentLevel.timeLimit);
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevelIndex]);

  const canAddRow =
    gameState.visibleRows < currentLevel.maxRows &&
    gameState.status === 'playing';

  return (
    <SafeAreaView 
      className="flex-1 bg-blue-50"
      style={{ flex: 1, backgroundColor: '#EFF6FF' }}
    >
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="px-4 pt-4 pb-2" style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
        <LevelIndicator
          level={currentLevel}
          matchedPairs={gameState.matchedPairs}
        />
      </View>

      {/* Timer */}
      <View className="items-center my-4" style={{ alignItems: 'center', marginVertical: 16 }}>
        <Timer timeLeft={timeLeft} formatTime={formatTime} />
      </View>

      {/* Game Grid */}
      <View className="flex-1" style={{ flex: 1 }}>
        <Grid
          grid={gameState.grid}
          visibleRows={gameState.visibleRows}
          selectedCell={gameState.selectedCell}
          onCellPress={handleCellPress}
          invalidMatchCellId={invalidMatchCellId}
        />
      </View>

      {/* Add Row Button */}
      <View className="px-4 pb-4" style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        <AddRowButton
          onPress={addRow}
          disabled={!canAddRow}
          currentRows={gameState.visibleRows}
          maxRows={currentLevel.maxRows}
        />
      </View>

      {/* Game Over Modal */}
      <GameOverModal
        visible={gameState.status === 'won' || gameState.status === 'lost'}
        status={gameState.status}
        onRestart={handleRestart}
        onNextLevel={handleNextLevel}
        hasNextLevel={currentLevelIndex < LEVELS.length - 1}
      />

      {/* Instructions */}
      <View className="px-4 pb-2" style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <Text className="text-gray-600 text-xs text-center" style={{ color: '#4B5563', fontSize: 12, textAlign: 'center' }}>
          💡 Match numbers that are equal or sum to 10
        </Text>
      </View>
    </SafeAreaView>
  );
}

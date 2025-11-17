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
import HintButton from './src/components/HintButton';
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
    hintCells,
    showHint,
    hintsUsed,
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
      style={{ flex: 1, backgroundColor: '#E8F5E9' }}
    >
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
        <LevelIndicator
          level={currentLevel}
          matchedPairs={gameState.matchedPairs}
        />
      </View>

      {/* Timer */}
      <View style={{ alignItems: 'center', marginVertical: 16 }}>
        <Timer timeLeft={timeLeft} formatTime={formatTime} />
      </View>

      {/* Game Grid */}
      <View style={{ flex: 1 }}>
        <Grid
          grid={gameState.grid}
          visibleRows={gameState.visibleRows}
          selectedCell={gameState.selectedCell}
          onCellPress={handleCellPress}
          invalidMatchCellId={invalidMatchCellId}
          hintCells={hintCells}
        />
      </View>

      {/* Action Buttons */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 16, gap: 12 }}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <HintButton
              onPress={showHint}
              disabled={gameState.status !== 'playing'}
              hintsUsed={hintsUsed}
              maxHints={5}
            />
          </View>
          <View style={{ flex: 1 }}>
            <AddRowButton
              onPress={addRow}
              disabled={!canAddRow}
              currentRows={gameState.visibleRows}
              maxRows={currentLevel.maxRows}
            />
          </View>
        </View>
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
      <View style={{ 
        paddingHorizontal: 16, 
        paddingBottom: 8,
        paddingTop: 8,
        backgroundColor: '#C8E6C9',
        marginHorizontal: 16,
        marginBottom: 8,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#81C784',
      }}>
        <Text style={{ 
          color: '#1B5E20', 
          fontSize: 14, 
          textAlign: 'center',
          fontWeight: '700',
        }}>
          💡 Match numbers that are equal or sum to 10
        </Text>
      </View>
    </SafeAreaView>
  );
}

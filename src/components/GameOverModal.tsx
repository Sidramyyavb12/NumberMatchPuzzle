import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import { GameStatus } from '../types/game.types';

interface GameOverModalProps {
  visible: boolean;
  status: GameStatus;
  onRestart: () => void;
  onNextLevel?: () => void;
  hasNextLevel: boolean;
}

export default function GameOverModal({
  visible,
  status,
  onRestart,
  onNextLevel,
  hasNextLevel,
}: GameOverModalProps) {
  const isWon = status === 'won';
  const isLost = status === 'lost';

  if (!isWon && !isLost) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRestart}
    >
      <View 
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}
      >
        <View 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 24,
            width: '100%',
            maxWidth: 384,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 16,
              color: isWon ? '#22C55E' : '#EF4444',
            }}
          >
            {isWon ? '🎉 You Won!' : '⏰ Time Up!'}
          </Text>

          <Text 
            style={{
              color: '#374151',
              textAlign: 'center',
              marginBottom: 24,
              fontSize: 18,
            }}
          >
            {isWon
              ? 'Congratulations! You matched all the numbers!'
              : "Time's up! Try again to complete the level."}
          </Text>

          <View 
            style={{}}
          >
            {isWon && hasNextLevel && onNextLevel && (
              <Pressable
                onPress={onNextLevel}
                style={{
                  backgroundColor: '#22C55E',
                  paddingVertical: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                }}
              >
                <Text 
                  style={{
                    color: '#FFFFFF',
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  Next Level ➡️
                </Text>
              </Pressable>
            )}

            <Pressable
              onPress={onRestart}
              style={{
                paddingVertical: 16,
                borderRadius: 12,
                backgroundColor: isWon && hasNextLevel ? '#D1D5DB' : '#3B82F6',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: isWon && hasNextLevel ? '#374151' : '#FFFFFF',
                }}
              >
                {isWon && !hasNextLevel ? '🎮 Play Again' : '🔄 Restart Level'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}


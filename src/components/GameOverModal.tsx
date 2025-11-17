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
            backgroundColor: '#E8F5E9',
            borderRadius: 25,
            padding: 28,
            width: '100%',
            maxWidth: 384,
            borderWidth: 4,
            borderColor: isWon ? '#4CAF50' : '#F44336',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.5,
            shadowRadius: 16,
            elevation: 12,
          }}
        >
          <Text
            style={{
              fontSize: 36,
              fontWeight: '900',
              textAlign: 'center',
              marginBottom: 16,
              color: isWon ? '#2E7D32' : '#C62828',
              textShadowColor: isWon ? '#4CAF50' : '#F44336',
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 4,
            }}
          >
            {isWon ? '🎉 You Won!' : '⏰ Time Up!'}
          </Text>

          <Text 
            style={{
              color: '#1B5E20',
              textAlign: 'center',
              marginBottom: 24,
              fontSize: 18,
              fontWeight: '600',
            }}
          >
            {isWon
              ? 'Congratulations! You matched all the numbers!'
              : "Time's up! Try again to complete the level."}
          </Text>

          <View 
            style={{ gap: 12 }}
          >
            {isWon && hasNextLevel && onNextLevel && (
              <Pressable
                onPress={onNextLevel}
                style={{
                  backgroundColor: '#66BB6A',
                  paddingVertical: 16,
                  borderRadius: 20,
                  borderWidth: 3,
                  borderColor: '#4CAF50',
                  shadowColor: '#4CAF50',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Text 
                  style={{
                    color: '#FFFFFF',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '900',
                    textShadowColor: '#2E7D32',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 2,
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
                borderRadius: 20,
                backgroundColor: isWon && hasNextLevel ? '#BDBDBD' : '#81C784',
                borderWidth: 3,
                borderColor: isWon && hasNextLevel ? '#757575' : '#4CAF50',
                shadowColor: isWon && hasNextLevel ? '#757575' : '#4CAF50',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: '900',
                  color: isWon && hasNextLevel ? '#424242' : '#FFFFFF',
                  textShadowColor: isWon && hasNextLevel ? '#757575' : '#2E7D32',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
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


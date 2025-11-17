import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface HintButtonProps {
  onPress: () => void;
  disabled: boolean;
  hintsUsed: number;
  maxHints?: number;
}

export default function HintButton({
  onPress,
  disabled,
  hintsUsed,
  maxHints = 5,
}: HintButtonProps) {
  const canUseHint = !disabled && hintsUsed < maxHints;
  
  return (
    <Pressable
      onPress={onPress}
      disabled={!canUseHint}
      style={{
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        backgroundColor: canUseHint ? '#81C784' : '#BDBDBD',
        borderWidth: 3,
        borderColor: canUseHint ? '#4CAF50' : '#757575',
        shadowColor: canUseHint ? '#4CAF50' : '#757575',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: canUseHint ? 6 : 2,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Text style={{ fontSize: 22 }}>💡</Text>
        <Text 
          style={{
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '900',
            textShadowColor: '#2E7D32',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 1,
          }}
        >
          Hint {hintsUsed}/{maxHints}
        </Text>
      </View>
    </Pressable>
  );
}


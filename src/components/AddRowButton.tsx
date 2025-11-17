import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface AddRowButtonProps {
  onPress: () => void;
  disabled: boolean;
  currentRows: number;
  maxRows: number;
}

export default function AddRowButton({
  onPress,
  disabled,
  currentRows,
  maxRows,
}: AddRowButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        backgroundColor: disabled ? '#BDBDBD' : '#66BB6A',
        borderWidth: 3,
        borderColor: disabled ? '#757575' : '#4CAF50',
        shadowColor: disabled ? '#757575' : '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: disabled ? 2 : 6,
      }}
    >
      <Text 
        style={{
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: '900',
          textAlign: 'center',
          textShadowColor: '#2E7D32',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 1,
        }}
      >
        {disabled
          ? `Max Rows (${maxRows})`
          : `➕ Add Row (${currentRows}/${maxRows})`}
      </Text>
    </Pressable>
  );
}


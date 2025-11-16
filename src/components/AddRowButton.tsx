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
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 9999,
        backgroundColor: disabled ? '#D1D5DB' : '#22C55E',
      }}
    >
      <Text 
        style={{
          color: '#FFFFFF',
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {disabled
          ? `Max Rows (${maxRows})`
          : `➕ Add Row (${currentRows}/${maxRows})`}
      </Text>
    </Pressable>
  );
}


import React from 'react';
import { View, ScrollView } from 'react-native';
import { Cell as CellType } from '../types/game.types';
import Cell from './Cell';

interface GridProps {
  grid: CellType[][];
  visibleRows: number;
  selectedCell: CellType | null;
  onCellPress: (cell: CellType) => void;
  invalidMatchCellId: string | null;
}

export default function Grid({
  grid,
  visibleRows,
  selectedCell,
  onCellPress,
  invalidMatchCellId,
}: GridProps) {
  const visibleGrid = grid.slice(0, visibleRows);

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingTop: 16, paddingHorizontal: 8 }}>
        {visibleGrid.map((row, rowIndex) => (
          <View 
            key={rowIndex} 
            className="flex-row justify-center"
            style={{ flexDirection: 'row', justifyContent: 'center' }}
          >
            {row.map((cell) => (
              <Cell
                key={cell.id}
                cell={cell}
                selected={selectedCell?.id === cell.id}
                onPress={onCellPress}
                invalidMatch={invalidMatchCellId === cell.id}
              />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}


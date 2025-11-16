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
  hintCells?: { cell1Id: string; cell2Id: string } | null;
}

export default function Grid({
  grid,
  visibleRows,
  selectedCell,
  onCellPress,
  invalidMatchCellId,
  hintCells,
}: GridProps) {
  const visibleGrid = grid.slice(0, visibleRows);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingTop: 16, paddingHorizontal: 8 }}>
        {visibleGrid.map((row, rowIndex) => (
          <View 
            key={rowIndex} 
            style={{ flexDirection: 'row', justifyContent: 'center' }}
          >
            {row.map((cell) => (
              <Cell
                key={cell.id}
                cell={cell}
                selected={selectedCell?.id === cell.id}
                onPress={onCellPress}
                invalidMatch={invalidMatchCellId === cell.id}
                isHinted={hintCells ? (cell.id === hintCells.cell1Id || cell.id === hintCells.cell2Id) : false}
              />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}


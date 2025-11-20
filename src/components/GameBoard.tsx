import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import ScoreManager from '../core/ScoreManager';
import { tryMatch, Tile } from '../core/gameLogic';

const scoreManager = new ScoreManager();

export default function GameBoard() {
    const cols = 4;
    const total = 16;
    // simple initial pairing numbers: [1,1,2,2,...]
    const makeInitial = (): Tile[] => {
        const arr: Tile[] = [];
        for (let i = 0; i < total / 2; i++) {
            arr.push(i + 1, i + 1);
        }
        // simple shuffle
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const [grid, setGrid] = useState<Tile[]>(() => makeInitial());
    const [selected, setSelected] = useState<number | null>(null);
    const [score, setScore] = useState<number>(0);
    const [high, setHigh] = useState<number>(0);

    useEffect(() => {
        (async () => {
            await scoreManager.loadHighScore();
            setHigh(scoreManager.getHigh());
            scoreManager.startSession();
        })();
    }, []);

    const onPress = (index: number) => {
        // prevent selecting an already cleared/empty tile
        if (grid[index] == null) return;

        if (selected === null) {
            setSelected(index);
            return;
        }

        if (selected === index) {
            setSelected(null);
            return;
        }

        const res = tryMatch(grid, cols, selected, index, scoreManager);
        if (res.matched) {
            setGrid(res.newGrid);
        }
        setScore(scoreManager.getCurrent());
        setHigh(scoreManager.getHigh());
        setSelected(null);
    };

    const renderItem = ({ item, index }: { item: Tile; index: number }) => {
        const display = item == null ? '' : String(item);
        const isSelected = index === selected;
        return (
            <TouchableOpacity
                style={[styles.tile, isSelected ? styles.selectedTile : undefined]}
                onPress={() => onPress(index)}
                disabled={item == null}
            >
                <Text style={styles.tileText}>{display}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Score: {score}</Text>
                <Text>High: {high}</Text>
            </View>
            <FlatList<Tile>
                data={grid}
                keyExtractor={(_, i) => String(i)}
                numColumns={cols}
                renderItem={renderItem}
                scrollEnabled={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    tile: {
        width: 70,
        height: 70,
        margin: 6,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    },
    selectedTile: { backgroundColor: '#cce' },
    tileText: { fontSize: 20, fontWeight: '600' },
});
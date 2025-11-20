import AsyncStorage from '@react-native-async-storage/async-storage';

const HIGHSCORE_KEY = 'numbermatch_highscore';

export default class ScoreManager {
    private current = 0;
    private high = 0;

    async loadHighScore() {
        try {
            const raw = await AsyncStorage.getItem(HIGHSCORE_KEY);
            if (raw != null) this.high = parseInt(raw, 10) || 0;
            return this.high;
        } catch {
            return 0;
        }
    }

    async saveHighScore() {
        try {
            await AsyncStorage.setItem(HIGHSCORE_KEY, String(this.high));
        } catch {
            // ignore
        }
    }

    startSession() {
        this.current = 0;
    }

    add(points: number) {
        this.current += points;
        if (this.current > this.high) {
            this.high = this.current;
            this.saveHighScore();
        }
    }

    resetHighScore() {
        this.high = 0;
        this.saveHighScore();
    }

    getCurrent() {
        return this.current;
    }

    getHigh() {
        return this.high;
    }
}
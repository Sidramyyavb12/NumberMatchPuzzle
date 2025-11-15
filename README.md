# Number Match Puzzle Game

A React Native puzzle game where players match numbers that are equal or sum to 10. Built with Expo, TypeScript, and NativeWind (Tailwind CSS).

## 🎮 Game Overview

This is a number-matching puzzle game similar to "Number Master" by KiwiFun. Players must match pairs of numbers by tapping two cells that either:
- Have the same number, OR
- Sum to 10

## ✨ Features

- **3 Progressive Levels**: Each level increases in difficulty with more cells and complexity
- **2-Minute Timer**: Complete each level within the time limit
- **Dynamic Grid**: Start with 3-4 visible rows, add more rows as needed
- **Visual Feedback**: 
  - Valid matches fade to show completion
  - Invalid matches trigger shake animation
  - Selected cells are highlighted
- **Smooth Animations**: Built with React Native Reanimated
- **Modern UI**: Styled with NativeWind (Tailwind CSS for React Native)

## 🏗️ Architecture

### Project Structure

```
NumberMatchPuzzle/
├── src/
│   ├── components/        # React components
│   │   ├── Cell.tsx      # Individual game cell
│   │   ├── Grid.tsx      # Game grid container
│   │   ├── Timer.tsx     # Countdown timer
│   │   ├── AddRowButton.tsx
│   │   ├── LevelIndicator.tsx
│   │   └── GameOverModal.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useGameEngine.ts  # Core game logic
│   │   └── useTimer.ts       # Timer management
│   ├── utils/            # Utility functions
│   │   ├── gameLogic.ts      # Matching rules
│   │   ├── gridGenerator.ts  # Grid generation
│   │   └── animations.ts     # Animation helpers
│   ├── types/            # TypeScript types
│   │   └── game.types.ts
│   └── constants/        # Game constants
│       └── levels.ts         # Level configurations
├── App.tsx               # Main app component
└── package.json
```

### Key Components

1. **Game Engine Hook** (`useGameEngine.ts`)
   - Manages game state
   - Handles cell selection and matching
   - Controls row addition
   - Tracks game progress

2. **Timer Hook** (`useTimer.ts`)
   - Countdown timer functionality
   - Auto-pauses on game end
   - Formatting utilities

3. **Cell Component** (`Cell.tsx`)
   - Individual game cell with animations
   - Handles press interactions
   - Visual states: normal, selected, matched, invalid

4. **Grid Component** (`Grid.tsx`)
   - Renders visible rows
   - Scrollable container
   - Manages cell layout

## 🚀 Setup & Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (optional, can use npx)
- Android Studio / Xcode (for native builds)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd NumberMatchPuzzle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on device/emulator**
   - Press `a` for Android
   - Press `i` for iOS
   - Scan QR code with Expo Go app

## 🎯 Game Rules

### Matching Rules
- Two cells can be matched if:
  - They have the **same number** (e.g., 5 and 5)
  - They **sum to 10** (e.g., 3 and 7, 4 and 6)

### Gameplay
1. Tap a cell to select it (highlighted in yellow)
2. Tap another cell to attempt a match
3. If valid: cells become dull/faded and remain visible
4. If invalid: cells shake and deselect
5. Use "Add Row" button to reveal more cells
6. Complete the level by matching all pairs before time runs out

### Levels

**Level 1 - Easy**
- 6 rows × 5 columns (30 cells)
- 3 rows initially visible
- 2 minutes time limit

**Level 2 - Medium**
- 7 rows × 6 columns (42 cells)
- 4 rows initially visible
- 2 minutes time limit

**Level 3 - Hard**
- 8 rows × 7 columns (56 cells)
- 4 rows initially visible
- 2 minutes time limit

## 🛠️ Technologies Used

- **React Native** (v0.81.5)
- **Expo** (SDK 54)
- **TypeScript** (v5.9.2)
- **NativeWind** (v4.2.1) - Tailwind CSS for React Native
- **React Native Reanimated** (v4.1.5) - Smooth animations
- **React Native Safe Area Context** - Safe area handling

## 📱 Building APK

### For Android

1. **Install EAS CLI** (if not already installed)
   ```bash
   npm install -g eas-cli
   ```

2. **Configure EAS**
   ```bash
   eas build:configure
   ```

3. **Build APK**
   ```bash
   eas build --platform android --profile preview
   ```

   Or for a production build:
   ```bash
   eas build --platform android
   ```

4. **Download APK**
   - The build will be available in your Expo dashboard
   - Download and test the APK

### Alternative: Local Build

```bash
# For Android
npm run android

# This will build and install on connected device/emulator
```

## 🧪 Testing

The game has been tested on:
- Android devices/emulators
- iOS simulators (if on macOS)
- Expo Go app

## 📝 Code Quality

- **TypeScript**: Full type safety throughout
- **Clean Architecture**: Separation of concerns
- **Reusable Components**: Modular design
- **Custom Hooks**: Logic separation
- **Consistent Styling**: NativeWind/Tailwind CSS

## 🎨 Customization

### Adding New Levels

Edit `src/constants/levels.ts`:

```typescript
{
  id: 4,
  name: 'Level 4 - Expert',
  rows: 9,
  cols: 8,
  initialVisibleRows: 4,
  maxRows: 9,
  timeLimit: 120,
  description: 'Ultimate challenge!',
}
```

### Adjusting Cell Size

Edit `src/constants/levels.ts`:

```typescript
export const GAME_CONFIG = {
  CELL_SIZE: 70, // Change this value
  // ...
};
```

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler cache issues**
   ```bash
   npx expo start --clear
   ```

2. **NativeWind styles not working**
   - Ensure `babel.config.js` includes `nativewind/babel` plugin
   - Check `tailwind.config.js` content paths

3. **Animations not smooth**
   - Ensure `react-native-reanimated/plugin` is last in babel plugins
   - Check that Reanimated is properly installed

## 📄 License

This project is created for educational/job assignment purposes.

## 👨‍💻 Developer Notes

### Key Design Decisions

1. **Custom Hooks**: Separated game logic into reusable hooks for better testability
2. **TypeScript**: Full type safety to catch errors early
3. **NativeWind**: Used for consistent, maintainable styling
4. **State Management**: React hooks for simple, effective state management
5. **Animation Library**: React Native Reanimated for smooth 60fps animations

### Future Enhancements

- Sound effects
- Haptic feedback
- Score system
- Leaderboard
- More levels
- Power-ups
- Hint system

## 📞 Contact

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ using React Native and Expo**


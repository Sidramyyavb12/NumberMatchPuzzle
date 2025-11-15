# Complete Setup Instructions

## 🚀 Quick Start Guide

### Step 1: Install Dependencies

```bash
cd NumberMatchPuzzle
npm install
```

### Step 2: Start Development Server

```bash
npm start
```

### Step 3: Run on Device

- **Android**: Press `a` or scan QR code with Expo Go
- **iOS**: Press `i` or scan QR code with Expo Go
- **Web**: Press `w`

## 📦 Project Structure Explained

```
NumberMatchPuzzle/
├── App.tsx                    # Main entry point
├── src/
│   ├── components/           # UI Components
│   │   ├── Cell.tsx         # Game cell with animations
│   │   ├── Grid.tsx         # Grid container
│   │   ├── Timer.tsx        # Countdown timer
│   │   ├── AddRowButton.tsx # Add row button
│   │   ├── LevelIndicator.tsx # Level info display
│   │   └── GameOverModal.tsx # Win/lose modal
│   ├── hooks/               # Custom React hooks
│   │   ├── useGameEngine.ts # Core game logic
│   │   └── useTimer.ts      # Timer management
│   ├── utils/               # Helper functions
│   │   ├── gameLogic.ts     # Matching rules
│   │   ├── gridGenerator.ts # Grid creation
│   │   └── animations.ts    # Animation helpers
│   ├── types/               # TypeScript definitions
│   │   └── game.types.ts    # Game type definitions
│   └── constants/           # Game constants
│       └── levels.ts        # Level configurations
├── babel.config.js          # Babel configuration
├── tailwind.config.js       # Tailwind CSS config
└── package.json            # Dependencies
```

## 🔧 Configuration Files

### babel.config.js
- Configures NativeWind and Reanimated plugins
- **Important**: Reanimated plugin must be last

### tailwind.config.js
- Configures Tailwind CSS content paths
- Includes NativeWind preset

### tsconfig.json
- TypeScript configuration
- Strict mode enabled

## 🎮 Understanding the Game Logic

### Matching Rules (gameLogic.ts)
```typescript
canMatch(cell1, cell2) {
  return cell1.value === cell2.value || 
         cell1.value + cell2.value === 10;
}
```

### Grid Generation (gridGenerator.ts)
- Creates grids with guaranteed valid matches
- Ensures pairs that sum to 10 or are equal
- Shuffles numbers randomly

### Game Engine (useGameEngine.ts)
- Manages game state
- Handles cell selection
- Tracks matched pairs
- Controls row addition

## 🎨 Styling with NativeWind

The project uses NativeWind (Tailwind CSS for React Native):

```tsx
<View className="flex-1 bg-blue-50">
  <Text className="text-2xl font-bold text-center">
    Hello World
  </Text>
</View>
```

## 🐛 Common Issues & Solutions

### Issue: Styles not applying
**Solution**: 
1. Check `babel.config.js` has `nativewind/babel` plugin
2. Verify `tailwind.config.js` content paths
3. Clear cache: `npx expo start --clear`

### Issue: Animations not working
**Solution**:
1. Ensure `react-native-reanimated/plugin` is last in babel plugins
2. Check Reanimated is installed: `npm list react-native-reanimated`

### Issue: Timer not starting
**Solution**:
- Check that game status is 'playing'
- Verify timer hook is properly initialized

## 📱 Building for Production

### Android APK

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure build**
   ```bash
   eas build:configure
   ```

4. **Build APK**
   ```bash
   eas build --platform android --profile preview
   ```

5. **Download from Expo dashboard**

### Local Android Build

```bash
# Make sure Android Studio is set up
npm run android
```

## 🧪 Testing Checklist

- [ ] Game starts correctly
- [ ] Timer counts down from 2:00
- [ ] Cells can be selected
- [ ] Valid matches work (equal numbers)
- [ ] Valid matches work (sum to 10)
- [ ] Invalid matches show shake animation
- [ ] Matched cells become dull
- [ ] Add row button works
- [ ] Level completion triggers win modal
- [ ] Time up triggers lose modal
- [ ] Next level button works
- [ ] Restart button works

## 📚 Key Concepts to Understand

### 1. Game State Management
- Uses React hooks (useState, useCallback)
- Centralized in `useGameEngine` hook
- Immutable updates for grid

### 2. Animation System
- React Native Reanimated for smooth animations
- Separate animations for different states
- Shake animation for invalid matches
- Fade animation for matched cells

### 3. Component Architecture
- Presentational components (Cell, Grid)
- Container components (App)
- Custom hooks for logic separation

### 4. Type Safety
- Full TypeScript coverage
- Interfaces for all data structures
- Type-safe function parameters

## 🎯 Interview Preparation

### Be Ready to Explain:

1. **Why this architecture?**
   - Separation of concerns
   - Reusability
   - Testability
   - Maintainability

2. **How matching works?**
   - Two rules: equal or sum to 10
   - Validation in `gameLogic.ts`
   - State updates in `useGameEngine`

3. **Animation implementation?**
   - React Native Reanimated
   - Different animations for different states
   - Performance considerations

4. **State management approach?**
   - React hooks (no Redux needed for this scale)
   - Custom hooks for logic separation
   - Immutable updates

5. **Styling approach?**
   - NativeWind (Tailwind CSS)
   - Utility-first CSS
   - Responsive design considerations

## 🚀 Next Steps

1. Test the game thoroughly
2. Build APK for testing
3. Record demo video (30-60 seconds)
4. Push to GitHub
5. Create GitHub release with APK
6. Prepare for interview questions

## 📞 Need Help?

- Check README.md for detailed documentation
- Review code comments in source files
- Test each component individually
- Use React Native Debugger for debugging

---

**Good luck with your interview! 🎉**


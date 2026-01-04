# 🌸 aMAZE-ing PASTELular Automata

A procedural maze game that uses cellular automata to generate hypnotic, solvable mazes.

## Features
- Watch mazes generate in real-time using cellular automata
- Beautiful pastel aesthetic
- Infinite replayability
- Lightweight desktop app built with Tauri

## Development

### Prerequisites
- Node.js (v16+)
- Rust (latest stable)
- Platform-specific tools:
  - **macOS**: Xcode Command Line Tools
  - **Windows**: Microsoft C++ Build Tools
  - **Linux**: webkit2gtk, gtk3

### Setup
```bash
npm install
npm run tauri dev
```

### Build
```bash
npm run tauri build
```

Builds will be in `src-tauri/target/release/bundle/`

## Controls
- Arrow Keys or WASD to move
- Reach the green star to win

## Tech Stack
- **Frontend**: HTML5 Canvas, Vanilla JS
- **Backend**: Tauri (Rust)
- **Build**: Vite

## License
MIT
```

---

## 🎨 Assets You Need to Add

Create these placeholder files in your project:

### public/music/background.mp3
Find or create a loopable chill/ambient track. Recommended sources:
- pixabay.com/music
- freesound.org
- incompetech.com

### public/sounds/win.wav
A short celebratory sound (0.5-2 seconds)

### src-tauri/icons/
Run this command to generate all icon sizes:
```bash
npm run tauri icon /path/to/your/icon.png
```

Your icon should be:
- 1024x1024px PNG
- Transparent background
- Simple, recognizable design (maybe a cute maze or pastel character)

---

## 🚀 Next Steps

1. Copy all files above into your project
2. Add audio files to `public/` folders
3. Create an app icon
4. Run `npm install`
5. Run `npm run tauri dev` to test
6. Run `npm run tauri build` to create distributable

The build command will create:
- `.exe` for Windows
- `.dmg` for macOS
- `.deb`/`.AppImage` for Linux
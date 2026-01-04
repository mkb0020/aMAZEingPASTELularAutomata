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


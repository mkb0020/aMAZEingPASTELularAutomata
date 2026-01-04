import { Maze } from './maze.js';
import { Player } from './player.js';
import { EnemyManager } from './enemy.js';

export class Game {
  constructor(renderer, audio, ui) {
    this.renderer = renderer;
    this.audio = audio;
    this.ui = ui;
    this.maze = new Maze(50, 50);
    this.player = new Player();
    this.enemyManager = new EnemyManager();
    this.phase = 'idle';
    this.gameLoopRunning = false;
    this.difficulty = 'medium'; 
    
    this.setupKeyboard();
  }

  start() {
    this.ui.bindNewMaze(() => this.generateMaze());
    this.ui.bindAudio(() => this.audio.toggle());
    this.ui.bindDifficulty((difficulty) => this.setDifficulty(difficulty));
    this.ui.bindModalRetry(() => this.generateMaze());
    this.ui.setMessage('Click "Generate Maze" to begin!');
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
    this.enemyManager.setDifficulty(difficulty);
    console.log(`Difficulty set to: ${difficulty}`);
  }

  setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      if (this.phase !== 'playing') return;

      let dx = 0, dy = 0;
      
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') dy = -1;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') dy = 1;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') dx = -1;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') dx = 1;

      if (dx !== 0 || dy !== 0) {
        e.preventDefault();
        this.player.move(dx, dy, this.maze);
        
        if (this.player.pos.x === this.maze.exit.x && 
            this.player.pos.y === this.maze.exit.y) {
          this.win();
        }
        
        if (this.enemyManager.checkCollisions(this.player.pos)) {
          this.gameOver();
        }
      }
    });
  }

  async generateMaze() {
    this.phase = 'generating';
    this.ui.setMessage('Generating maze...');
    this.ui.disableButton(true);
    this.ui.hideControls();
    this.stopGameLoop();
    
    const success = await this.maze.generateStepByStep(this.renderer);
    
    if (success) {
      this.phase = 'playing';
      this.player.spawn(this.maze.start);
      
      this.enemyManager.spawnEnemies(this.maze);
      
      this.renderer.draw(
        this.maze.grid, 
        this.player.pos, 
        this.maze.exit,
        this.enemyManager.getEnemies()
      );
      
      this.ui.setMessage(`Avoid the enemies and reach the star! (${this.difficulty.toUpperCase()} mode)`);
      this.ui.showControls();
      
      this.startGameLoop();
    } else {
      this.phase = 'idle';
      this.ui.setMessage('Maze generation failed');
      this.ui.showUnbeatableModal();
    }
    
    this.ui.disableButton(false);
  }

  startGameLoop() {
    this.gameLoopRunning = true;
    this.gameLoop();
  }

  stopGameLoop() {
    this.gameLoopRunning = false;
  }

  gameLoop() {
    if (!this.gameLoopRunning || this.phase !== 'playing') return;
    
    this.enemyManager.update(this.maze, this.player.pos);
    
    if (this.enemyManager.checkCollisions(this.player.pos)) {
      this.gameOver();
      return;
    }
    
    this.renderer.draw(
      this.maze.grid, 
      this.player.pos, 
      this.maze.exit,
      this.enemyManager.getEnemies()
    );
    
    requestAnimationFrame(() => this.gameLoop());
  }

  win() {
    this.phase = 'won';
    this.stopGameLoop();
    this.ui.setMessage('🎉 You won! Generate a new maze?');
    this.audio.playWin();
    this.ui.hideControls();
  }

  gameOver() {
    this.phase = 'dead';
    this.stopGameLoop();
    this.ui.setMessage('💀 Caught by an enemy! Try again?');
    this.ui.hideControls();
  }
}
export class AudioManager {
  constructor() {
    this.bgMusic = null;
    this.isPlaying = false;
    
    try {
      this.bgMusic = new Audio('/music/background.mp3');
      this.bgMusic.loop = true;
      this.bgMusic.volume = 0.3;
    } catch (e) {
      console.warn('Audio not available');
    }
  }

  toggle() {
    if (!this.bgMusic) return;
    
    if (this.isPlaying) {
      this.bgMusic.pause();
      this.isPlaying = false;
    } else {
      this.bgMusic.play().catch(() => {});
      this.isPlaying = true;
    }
  }

  playWin() {
    try {
      const winSound = new Audio('/sounds/win.mp3');
      winSound.volume = 0.5;
      winSound.play().catch(() => {});
    } catch (e) {
      console.warn('Win sound not available');
    }
  }
}
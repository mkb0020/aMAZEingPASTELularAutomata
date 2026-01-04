export class UI {
  constructor() {
    this.newMazeBtn = document.getElementById('newMazeBtn');
    this.audioToggle = document.getElementById('audioToggle');
    this.difficultySelect = document.getElementById('difficultySelect');
    this.message = document.getElementById('message');
    this.controls = document.getElementById('controls');
    this.unbeatableModal = document.getElementById('unbeatableModal');
    this.modalRetryBtn = document.getElementById('modalRetryBtn');
  }

  bindNewMaze(callback) {
    this.newMazeBtn.addEventListener('click', callback);
  }

  bindAudio(callback) {
    this.audioToggle.addEventListener('click', callback);
  }

  bindDifficulty(callback) {
    if (this.difficultySelect) {
      this.difficultySelect.addEventListener('change', (e) => {
        callback(e.target.value);
      });
    }
  }

  bindModalRetry(callback) {
    this.modalRetryBtn.addEventListener('click', () => {
      this.hideUnbeatableModal();
      callback();
    });
  }

  showUnbeatableModal() {
    this.unbeatableModal.style.display = 'flex';
  }

  hideUnbeatableModal() {
    this.unbeatableModal.style.display = 'none';
  }

  setMessage(text) {
    this.message.textContent = text;
  }

  disableButton(disabled) {
    this.newMazeBtn.disabled = disabled;
    this.newMazeBtn.textContent = disabled ? 'Generating...' : 'Generate Maze';
  }

  showControls() {
    this.controls.style.display = 'block';
  }

  hideControls() {
    this.controls.style.display = 'none';
  }
}
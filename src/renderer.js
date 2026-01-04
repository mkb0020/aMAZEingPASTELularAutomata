export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.cellSize = 10;
  }

  draw(grid, player, exit, enemies = []) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (!grid) return;

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        ctx.fillStyle = grid[y][x] === 1 ? '#c77dff' : '#fff3ff';
        ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        
        ctx.strokeStyle = '#f0d9ff';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
      }
    }

    if (exit) {
      ctx.fillStyle = '#7ae582';
      ctx.fillRect(
        exit.x * this.cellSize + 2,
        exit.y * this.cellSize + 2,
        this.cellSize - 4,
        this.cellSize - 4
      );
      ctx.fillStyle = '#4ade80';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('★', exit.x * this.cellSize + this.cellSize/2, exit.y * this.cellSize + this.cellSize/2);
    }

    if (enemies && enemies.length > 0) {
      for (const enemy of enemies) {
        ctx.fillStyle = enemy.isChasing ? '#ff0000' : '#ff4444';
        ctx.fillRect(
          enemy.x * this.cellSize + 1,
          enemy.y * this.cellSize + 1,
          this.cellSize - 2,
          this.cellSize - 2
        );
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(enemy.isChasing ? '😈' : '👾', enemy.x * this.cellSize + this.cellSize/2, enemy.y * this.cellSize + this.cellSize/2);
      }
    }

    if (player) {
      ctx.fillStyle = '#ff6b9d';
      ctx.beginPath();
      ctx.arc(
        player.x * this.cellSize + this.cellSize / 2,
        player.y * this.cellSize + this.cellSize / 2,
        this.cellSize / 3,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }
}
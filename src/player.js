export class Player {
  constructor() {
    this.pos = { x: 0, y: 0 };
  }

  spawn(start) {
    this.pos = { ...start };
  }

  move(dx, dy, maze) {
    const newX = this.pos.x + dx;
    const newY = this.pos.y + dy;
    
    if (newY >= 0 && newY < maze.height &&
        newX >= 0 && newX < maze.width &&
        maze.grid[newY][newX] === 0) {
      this.pos.x = newX;
      this.pos.y = newY;
      return true;
    }
    return false;
  }
}
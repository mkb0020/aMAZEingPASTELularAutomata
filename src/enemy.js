export class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direction = this.randomDirection();
    this.moveTimer = 0;
    this.moveDelay = 8; 
    this.chaseRange = 10; 
    this.isChasing = false;
  }

  randomDirection() {
    const dirs = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 }
    ];
    return dirs[Math.floor(Math.random() * dirs.length)];
  }

  distanceToPlayer(player) {
    return Math.abs(this.x - player.x) + Math.abs(this.y - player.y);
  }

  getDirectionToPlayer(player) {
    const dx = Math.sign(player.x - this.x);
    const dy = Math.sign(player.y - this.y);
    
    if (dx !== 0 && dy !== 0) {
      if (Math.random() < 0.5) {
        return { dx, dy: 0 };
      } else {
        return { dx: 0, dy };
      }
    } else if (dx !== 0) {
      return { dx, dy: 0 };
    } else if (dy !== 0) {
      return { dx: 0, dy };
    }
    
    return this.randomDirection();
  }

  update(maze, player) {
    this.moveTimer++;
    
    if (this.moveTimer >= this.moveDelay) {
      this.moveTimer = 0;
      
      const distToPlayer = this.distanceToPlayer(player);
      this.isChasing = distToPlayer <= this.chaseRange;
      
      let newX, newY;
      
      if (this.isChasing) {
        this.direction = this.getDirectionToPlayer(player);
        newX = this.x + this.direction.dx;
        newY = this.y + this.direction.dy;
      } else {
        newX = this.x + this.direction.dx;
        newY = this.y + this.direction.dy;
      }
      
      if (
        newY >= 0 && newY < maze.height &&
        newX >= 0 && newX < maze.width &&
        maze.grid[newY][newX] === 0
      ) {
        this.x = newX;
        this.y = newY;
      } else {
        if (this.isChasing) {
          const alt = this.getDirectionToPlayer(player);
          const altX = this.x + alt.dx;
          const altY = this.y + alt.dy;
          
          if (
            altY >= 0 && altY < maze.height &&
            altX >= 0 && altX < maze.width &&
            maze.grid[altY][altX] === 0
          ) {
            this.x = altX;
            this.y = altY;
            this.direction = alt;
          } else {
            this.direction = this.randomDirection();
          }
        } else {
          this.direction = this.randomDirection();
        }
      }
      
      if (!this.isChasing && Math.random() < 0.15) {
        this.direction = this.randomDirection();
      }
    }
  }

  collidesWith(player) {
    return this.x === player.x && this.y === player.y;
  }
}

export class EnemyManager {
  constructor() {
    this.enemies = [];
    this.difficulty = 'medium'; 
  }

  setDifficulty(difficulty) {
    this.difficulty = difficulty;
  }

  spawnEnemies(maze) {
    this.enemies = [];
    
    const enemyCount = {
      easy: 2,
      medium: 4,
      hard: 7
    }[this.difficulty];

    console.log(`Spawning ${enemyCount} enemies (${this.difficulty} mode)`);

    const openSpaces = [];
    
    for (let y = 5; y < maze.height - 5; y++) {
      for (let x = 5; x < maze.width - 5; x++) {
        if (maze.grid[y][x] === 0) {
          const distFromStart = Math.abs(x - maze.start.x) + Math.abs(y - maze.start.y);
          const distFromExit = Math.abs(x - maze.exit.x) + Math.abs(y - maze.exit.y);
          
          if (distFromStart > 8 && distFromExit > 8) {
            openSpaces.push({ x, y });
          }
        }
      }
    }

    for (let i = 0; i < enemyCount && openSpaces.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * openSpaces.length);
      const pos = openSpaces.splice(randomIndex, 1)[0];
      this.enemies.push(new Enemy(pos.x, pos.y));
    }
  }

  update(maze, player) {
    for (const enemy of this.enemies) {
      enemy.update(maze, player);
    }
  }

  checkCollisions(player) {
    for (const enemy of this.enemies) {
      if (enemy.collidesWith(player)) {
        return true; 
      }
    }
    return false;
  }

  getEnemies() {
    return this.enemies;
  }
}
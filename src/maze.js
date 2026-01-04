export class Maze {
  constructor(width = 50, height = 50) {
    this.width = width;
    this.height = height;
    this.grid = [];
    this.start = { x: 1, y: 1 };
    this.exit = { x: width - 2, y: height - 2 };
    
    this.mazeRules = {
      survive: [1, 2, 3, 4, 5],
      birth: [3]
    };
  }

  async generateStepByStep(renderer) {
    console.log('Generating maze with random hole punching...');
    
    this.grid = this.createRandomGrid();

    const mazeIterations = 12;
    for (let i = 0; i < mazeIterations; i++) {
      this.applyCARules(this.mazeRules);
      renderer.draw(this.grid, null, null);
      await this.sleep(100);
    }

    this.grid[this.start.y][this.start.x] = 0;
    this.grid[this.exit.y][this.exit.x] = 0;
    renderer.draw(this.grid, null, null);
    await this.sleep(200);

    let attempts = 0;
    const maxAttempts = 15;
    let holesPerAttempt = 100;

    console.log('Initial beatable check:', this.isBeatable());

    while (!this.isBeatable() && attempts < maxAttempts) {
      attempts++;
      console.log(`Attempt ${attempts}: Punching ${holesPerAttempt} random holes...`);
      
      this.punchRandomHoles(holesPerAttempt);
      renderer.draw(this.grid, null, null);
      await this.sleep(150);
      
      const beatable = this.isBeatable();
      console.log(`  -> After punching: beatable = ${beatable}`);
      
      if (attempts % 3 === 0 && !beatable) {
        holesPerAttempt += 3; 
        console.log(`  -> Increasing to ${holesPerAttempt} holes per attempt`);
      }
    }

    if (this.isBeatable()) {
      const pathLength = this.calculateShortestPath();
      console.log(`✓ Maze is beatable! Path length: ${pathLength}, took ${attempts} attempts`);
    } else {
      console.log('✗ Could not make maze beatable with random holes');
    }

    return true;
  }

  punchRandomHoles(count) {
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * (this.width - 2)) + 1; 
      const y = Math.floor(Math.random() * (this.height - 2)) + 1;
      
      if (this.grid[y][x] === 1) {
        this.grid[y][x] = 0;
      }
    }
  }



  createRandomGrid() {
    return Array.from({ length: this.height }, () =>
      Array.from({ length: this.width }, () => Math.random() < 0.5 ? 1 : 0)
    );
  }

  applyCARules(rules) {
    const newGrid = this.grid.map(row => [...row]);
    
    for (let y = 1; y < this.height - 1; y++) {
      for (let x = 1; x < this.width - 1; x++) {
        const neighbors = this.countNeighbors(x, y);
        
        if (this.grid[y][x] > 0) {
          newGrid[y][x] = rules.survive.includes(neighbors) ? 1 : 0;
        } else {
          newGrid[y][x] = rules.birth.includes(neighbors) ? 1 : 0;
        }
      }
    }
    
    this.grid = newGrid;
  }

  countNeighbors(x, y) {
    let count = 0;
    
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        
        const nx = x + dx;
        const ny = y + dy;
        
        if (ny >= 0 && ny < this.height && nx >= 0 && nx < this.width) {
          if (this.grid[ny][nx] === 1) count++;
        }
      }
    }
    
    return count;
  }

  isBeatable() {
    const visited = Array.from({ length: this.height }, () =>
      Array(this.width).fill(false)
    );

    const queue = [this.start];

    while (queue.length > 0) {
      const { x, y } = queue.shift();
      if (x === this.exit.x && y === this.exit.y) return true;
      if (visited[y][x]) continue;
      visited[y][x] = true;

      const directions = [
        { dx: 1, dy: 0 }, { dx: -1, dy: 0 },
        { dx: 0, dy: 1 }, { dx: 0, dy: -1 }
      ];

      for (const { dx, dy } of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          ny >= 0 && ny < this.height &&
          nx >= 0 && nx < this.width &&
          this.grid[ny][nx] === 0 &&
          !visited[ny][nx]
        ) {
          queue.push({ x: nx, y: ny });
        }
      }
    }

    return false;
  }

  calculateShortestPath() {
    const visited = new Set();
    const queue = [{ pos: this.start, dist: 0 }];
    
    const key = (pos) => `${pos.x},${pos.y}`;
    visited.add(key(this.start));

    while (queue.length > 0) {
      const { pos, dist } = queue.shift();
      
      if (pos.x === this.exit.x && pos.y === this.exit.y) {
        return dist;
      }

      const directions = [
        { dx: 1, dy: 0 }, { dx: -1, dy: 0 },
        { dx: 0, dy: 1 }, { dx: 0, dy: -1 }
      ];

      for (const { dx, dy } of directions) {
        const next = { x: pos.x + dx, y: pos.y + dy };
        const nextKey = key(next);
        
        if (
          next.y >= 0 && next.y < this.height &&
          next.x >= 0 && next.x < this.width &&
          this.grid[next.y][next.x] === 0 &&
          !visited.has(nextKey)
        ) {
          visited.add(nextKey);
          queue.push({ pos: next, dist: dist + 1 });
        }
      }
    }

    return 0;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
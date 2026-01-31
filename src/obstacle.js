/**
 * Obstacle class - Flappy Bird-style pipes/obstacles
 */

export class Obstacle {
  constructor(x, canvasHeight, gapY, gapSize = 150) {
    this.x = x;
    this.canvasHeight = canvasHeight;
    this.gapY = gapY; // Center Y of the gap
    this.gapSize = gapSize;
    this.width = 60;
    this.scrollSpeed = 3;
    this.offScreen = false;
    this.passed = false; // Track if player has passed this obstacle
    
    // Calculate top and bottom pipe heights
    this.topHeight = gapY - gapSize / 2;
    this.bottomY = gapY + gapSize / 2;
    this.bottomHeight = canvasHeight - this.bottomY;
  }
  
  /**
   * Update obstacle position
   */
  update() {
    this.x -= this.scrollSpeed;
    
    // Check if off screen
    if (this.x + this.width < 0) {
      this.offScreen = true;
    }
  }
  
  /**
   * Draw the obstacle (pipes)
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    const pipeColor = '#4CAF50';
    const pipeCapColor = '#45A049';
    const capHeight = 30;
    const capOverhang = 5;
    
    // Top pipe body
    ctx.fillStyle = pipeColor;
    ctx.fillRect(this.x, 0, this.width, this.topHeight - capHeight);
    
    // Top pipe cap
    ctx.fillStyle = pipeCapColor;
    ctx.fillRect(
      this.x - capOverhang,
      this.topHeight - capHeight,
      this.width + capOverhang * 2,
      capHeight
    );
    
    // Bottom pipe cap
    ctx.fillStyle = pipeCapColor;
    ctx.fillRect(
      this.x - capOverhang,
      this.bottomY,
      this.width + capOverhang * 2,
      capHeight
    );
    
    // Bottom pipe body
    ctx.fillStyle = pipeColor;
    ctx.fillRect(
      this.x,
      this.bottomY + capHeight,
      this.width,
      this.bottomHeight - capHeight
    );
    
    // Add some texture/details
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = 2;
    
    // Top pipe outline
    ctx.strokeRect(this.x, 0, this.width, this.topHeight - capHeight);
    ctx.strokeRect(
      this.x - capOverhang,
      this.topHeight - capHeight,
      this.width + capOverhang * 2,
      capHeight
    );
    
    // Bottom pipe outline
    ctx.strokeRect(
      this.x - capOverhang,
      this.bottomY,
      this.width + capOverhang * 2,
      capHeight
    );
    ctx.strokeRect(
      this.x,
      this.bottomY + capHeight,
      this.width,
      this.bottomHeight - capHeight
    );
  }
  
  /**
   * Check if a bounding box collides with this obstacle
   * @param {{x: number, y: number, width: number, height: number}} bounds
   * @returns {boolean}
   */
  collidesWith(bounds) {
    // Check if player is within the X range of the pipe
    if (bounds.x + bounds.width > this.x && bounds.x < this.x + this.width) {
      // Check if player hits top pipe
      if (bounds.y < this.topHeight) {
        return true;
      }
      // Check if player hits bottom pipe
      if (bounds.y + bounds.height > this.bottomY) {
        return true;
      }
    }
    return false;
  }
  
  /**
   * Check if player has passed this obstacle
   * @param {number} playerX
   * @returns {boolean}
   */
  hasPassed(playerX) {
    if (!this.passed && playerX > this.x + this.width) {
      this.passed = true;
      return true;
    }
    return false;
  }
  
  /**
   * Check if obstacle is off screen
   * @returns {boolean}
   */
  isOffScreen() {
    return this.offScreen;
  }
  
  /**
   * Get the gap bounds (for placing collectibles)
   * @returns {{x: number, y: number, width: number, height: number}}
   */
  getGapBounds() {
    return {
      x: this.x,
      y: this.gapY - this.gapSize / 2,
      width: this.width,
      height: this.gapSize
    };
  }
}

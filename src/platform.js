/**
 * Platform class - represents platforms and obstacles in the game world
 */

export class Platform {
  constructor(x, y, width, height, type = 'normal') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type; // 'normal', 'tall', 'stairs'
    this.offScreen = false;
  }
  
  /**
   * Update platform position
   * @param {number} scrollSpeed - World scroll speed
   */
  update(scrollSpeed) {
    this.x -= scrollSpeed;
    
    // Check if off screen to the left
    if (this.x + this.width < 0) {
      this.offScreen = true;
    }
  }
  
  /**
   * Draw the platform
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    if (this.type === 'stairs') {
      this.drawStairs(ctx);
    } else {
      this.drawNormalPlatform(ctx);
    }
  }
  
  /**
   * Draw a normal platform
   * @param {CanvasRenderingContext2D} ctx
   */
  drawNormalPlatform(ctx) {
    // Platform base
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Grass on top
    ctx.fillStyle = '#228B22';
    ctx.fillRect(this.x, this.y, this.width, 8);
    
    // Border
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    
    // Add texture dots
    ctx.fillStyle = '#654321';
    for (let i = 0; i < this.width / 20; i++) {
      const dotX = this.x + 10 + i * 20;
      const dotY = this.y + 15 + Math.random() * (this.height - 25);
      ctx.fillRect(dotX, dotY, 3, 3);
    }
  }
  
  /**
   * Draw stairs
   * @param {CanvasRenderingContext2D} ctx
   */
  drawStairs(ctx) {
    const stepCount = 4;
    const stepWidth = this.width / stepCount;
    const stepHeight = this.height / stepCount;
    
    for (let i = 0; i < stepCount; i++) {
      const stepX = this.x + i * stepWidth;
      const stepY = this.y + this.height - (i + 1) * stepHeight;
      const stepW = stepWidth;
      const stepH = (i + 1) * stepHeight;
      
      // Step base
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(stepX, stepY, stepW, stepH);
      
      // Step top
      ctx.fillStyle = '#228B22';
      ctx.fillRect(stepX, stepY, stepW, 6);
      
      // Border
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 2;
      ctx.strokeRect(stepX, stepY, stepW, stepH);
    }
  }
  
  /**
   * Get bounding box for collision detection
   * @returns {{x: number, y: number, width: number, height: number}}
   */
  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }
  
  /**
   * Check if platform is off screen
   * @returns {boolean}
   */
  isOffScreen() {
    return this.offScreen;
  }
  
  /**
   * Get the top Y position (for player to stand on)
   * @returns {number}
   */
  getTopY() {
    return this.y;
  }
}

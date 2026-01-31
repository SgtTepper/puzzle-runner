/**
 * World class - handles static background for Flappy Bird style
 */

export class World {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    
    // Clouds for background
    this.clouds = this.generateClouds();
  }
  
  /**
   * Generate background clouds
   */
  generateClouds() {
    const clouds = [];
    for (let i = 0; i < 8; i++) {
      clouds.push({
        x: Math.random() * this.canvasWidth,
        y: Math.random() * (this.canvasHeight / 2),
        size: 30 + Math.random() * 30,
        speed: 0.2 + Math.random() * 0.3
      });
    }
    return clouds;
  }
  
  /**
   * Update world (just animate clouds slowly)
   */
  update() {
    // Slow cloud movement for parallax effect
    this.clouds.forEach(cloud => {
      cloud.x -= cloud.speed;
      if (cloud.x + cloud.size * 2 < 0) {
        cloud.x = this.canvasWidth + cloud.size;
        cloud.y = Math.random() * (this.canvasHeight / 2);
      }
    });
  }
  
  /**
   * Draw the world
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, this.canvasHeight);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    // Clouds
    this.drawClouds(ctx);
  }
  
  /**
   * Draw clouds
   * @param {CanvasRenderingContext2D} ctx
   */
  drawClouds(ctx) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    this.clouds.forEach(cloud => {
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.size * 0.6, cloud.y - cloud.size * 0.3, cloud.size * 0.8, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.size * 1.2, cloud.y, cloud.size * 0.9, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  
  /**
   * Resize world when canvas changes
   * @param {number} width
   * @param {number} height
   */
  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
  }
}

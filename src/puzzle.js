/**
 * Puzzle module - handles phrase splitting and piece collection state
 */

export class Puzzle {
  constructor(phrase) {
    this.originalPhrase = phrase;
    this.pieces = this.splitPhrase(phrase);
    this.collectedPieces = new Array(this.pieces.length).fill(false);
    
    // Auto-collect spaces - they should never be collectibles
    this.autoCollectSpaces();
  }
  
  /**
   * Split phrase into collectible pieces
   * For now, split by characters (including spaces)
   * @param {string} phrase
   * @returns {Array<string>}
   */
  splitPhrase(phrase) {
    // Split into individual characters
    return phrase.split('');
  }
  
  /**
   * Auto-collect all spaces so they appear in the HUD from the start
   */
  autoCollectSpaces() {
    this.pieces.forEach((piece, index) => {
      if (piece === ' ') {
        this.collectedPieces[index] = true;
      }
    });
  }
  
  /**
   * Mark a piece as collected
   * @param {number} index - Index of the piece to collect
   * @returns {boolean} - Whether the piece was newly collected
   */
  collectPiece(index) {
    if (index < 0 || index >= this.pieces.length) {
      return false;
    }
    
    if (!this.collectedPieces[index]) {
      this.collectedPieces[index] = true;
      return true;
    }
    
    return false;
  }
  
  /**
   * Reset all collected pieces except spaces
   */
  resetCollected() {
    this.pieces.forEach((piece, index) => {
      if (piece === ' ') {
        this.collectedPieces[index] = true; // Keep spaces collected
      } else {
        this.collectedPieces[index] = false; // Reset everything else
      }
    });
  }
  
  /**
   * Get the reconstructed phrase with collected pieces
   * @returns {string}
   */
  getReconstructedPhrase() {
    return this.pieces
      .map((piece, index) => this.collectedPieces[index] ? piece : '_')
      .join('');
  }
  
  /**
   * Check if all pieces are collected (including auto-collected spaces)
   * @returns {boolean}
   */
  isComplete() {
    return this.collectedPieces.every(collected => collected);
  }
  
  /**
   * Get the number of collected pieces (including spaces)
   * @returns {number}
   */
  getCollectedCount() {
    return this.collectedPieces.filter(c => c).length;
  }
  
  /**
   * Get total number of pieces (including spaces)
   * @returns {number}
   */
  getTotalCount() {
    return this.pieces.length;
  }
  
  /**
   * Get the number of non-space pieces that need to be collected
   * @returns {number}
   */
  getNonSpaceCount() {
    return this.pieces.filter(p => p !== ' ').length;
  }
  
  /**
   * Get the number of collected non-space pieces
   * @returns {number}
   */
  getCollectedNonSpaceCount() {
    let count = 0;
    this.pieces.forEach((piece, index) => {
      if (piece !== ' ' && this.collectedPieces[index]) {
        count++;
      }
    });
    return count;
  }
  
  /**
   * Get all indices of non-space pieces
   * @returns {Array<number>}
   */
  getNonSpaceIndices() {
    const indices = [];
    this.pieces.forEach((piece, index) => {
      if (piece !== ' ') {
        indices.push(index);
      }
    });
    return indices;
  }
  
  /**
   * Get the next uncollected piece index
   * @returns {number|null}
   */
  getNextUncollectedIndex() {
    const index = this.collectedPieces.findIndex(collected => !collected);
    return index !== -1 ? index : null;
  }
  
  /**
   * Get piece at index
   * @param {number} index
   * @returns {string|null}
   */
  getPiece(index) {
    return this.pieces[index] || null;
  }
}

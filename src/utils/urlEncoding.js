/**
 * URL-safe base64 encoding utilities
 */

/**
 * Encodes a text string to URL-safe base64
 * @param {string} text - The text to encode
 * @returns {string} URL-safe base64 encoded string
 */
export function encodeToUrlSafe(text) {
  // Convert text to UTF-8 bytes
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  
  // Convert bytes to binary string
  let binary = '';
  bytes.forEach(byte => {
    binary += String.fromCharCode(byte);
  });
  
  // Standard base64 encode
  let base64 = btoa(binary);
  
  // Convert to URL-safe: replace +/= with -_
  base64 = base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, ''); // Remove padding
  
  return base64;
}

/**
 * Decodes a URL-safe base64 string back to text
 * @param {string} encoded - The URL-safe base64 string
 * @returns {string} Decoded text
 */
export function decodeFromUrlSafe(encoded) {
  // Convert URL-safe back to standard base64
  let base64 = encoded
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  // Add padding back if needed
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  
  // Decode base64 to binary string
  const binary = atob(base64);
  
  // Convert binary string to bytes
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  
  // Decode UTF-8 bytes to text
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

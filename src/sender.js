import { encodeToUrlSafe } from './utils/urlEncoding.js';

// DOM elements
const phraseInput = document.getElementById('phraseInput');
const generateBtn = document.getElementById('generateBtn');
const linkSection = document.getElementById('linkSection');
const generatedLink = document.getElementById('generatedLink');
const copyBtn = document.getElementById('copyBtn');
const copySuccess = document.getElementById('copySuccess');

// Generate link when button is clicked
generateBtn.addEventListener('click', () => {
  const phrase = phraseInput.value.trim();
  
  if (!phrase) {
    alert('Please enter a word or phrase first!');
    return;
  }
  
  // Encode the phrase
  const encoded = encodeToUrlSafe(phrase);
  
  // Create the game URL
  const baseUrl = window.location.origin + window.location.pathname.replace('sender.html', '');
  const gameUrl = `${baseUrl}game.html?p=${encoded}`;
  
  // Display the link
  generatedLink.value = gameUrl;
  linkSection.classList.remove('hidden');
  
  // Hide success message if it was showing
  copySuccess.classList.add('hidden');
});

// Copy link to clipboard
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(generatedLink.value);
    
    // Show success message
    copySuccess.classList.remove('hidden');
    
    // Hide it after 3 seconds
    setTimeout(() => {
      copySuccess.classList.add('hidden');
    }, 3000);
  } catch (err) {
    // Fallback for older browsers
    generatedLink.select();
    document.execCommand('copy');
    
    copySuccess.classList.remove('hidden');
    setTimeout(() => {
      copySuccess.classList.add('hidden');
    }, 3000);
  }
});

// Allow generating link with Enter key
phraseInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    generateBtn.click();
  }
});

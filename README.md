# ASCII Art Converter

A simple web app to convert images into ASCII art with mask overlay, configurable charset, font size, and color mode.

## Features
- Modular code structure
- Runs conversion in a Web Worker for smooth UI
- Preset configurations and shareable settings via URL
- Responsive and accessible controls

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   Run in development mode:
   npm run dev
   Build for production:
   npm run build
   Folder Structure

See the project root for a breakdown of files and folders.

---

## src/main.js
```js
import { convertToAscii } from './asciiConverter';
import { paintMask } from './maskPainter';
import presets from './presets.json';

const charsetInput = document.getElementById('charset');
const fontSizeInput = document.getElementById('fontSize');
const colorModeSelect = document.getElementById('colorMode');
const maskColorInput = document.getElementById('maskColor');
const loadButton = document.getElementById('loadImage');
const fileInput = document.getElementById('imageFile');

const canvas = document.getElementById('maskCanvas');
const output = document.getElementById('asciiOutput');
const ctx = canvas.getContext('2d');

loadButton.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', async () => {
  const file = fileInput.files[0];
  if (!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);
  await img.decode();

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  paintMask(ctx, maskColorInput.value);

  const options = {
    charset: charsetInput.value,
    fontSize: +fontSizeInput.value,
    colorMode: colorModeSelect.value
  };

  const ascii = await convertToAscii(ctx, options);
  output.style.fontSize = options.fontSize + 'px';
  output.textContent = ascii;
});

export function convertToAscii(ctx, { charset, fontSize, colorMode }) {
  return new Promise(resolve => {
    const { width, height } = ctx.canvas;
    const columns = Math.floor(width / fontSize);
    const rows = Math.floor(height / fontSize);
    const imageData = ctx.getImageData(0, 0, width, height).data;
    let result = '';

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        const x = c * fontSize;
        const y = r * fontSize;
        const i = (y * width + x) * 4;
        const [rVal, gVal, bVal] = imageData.slice(i, i + 3);
        const brightness = (0.3 * rVal + 0.59 * gVal + 0.11 * bVal) / 255;
        const char = charset[Math.floor(brightness * (charset.length - 1))];

        if (colorMode === 'color') {
          result += `%c${char}`;
        } else {
          result += char;
        }
      }
      result += '\n';
    }

    resolve(result);
  });
}

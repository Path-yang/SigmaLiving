const fs = require('fs');
const path = require('path');

// Create a simple SVG icon
const svgIcon = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#3b82f6" rx="64"/>
  <circle cx="256" cy="256" r="180" fill="white"/>
  <text x="256" y="320" font-family="Arial, sans-serif" font-size="120" font-weight="bold" text-anchor="middle" fill="#3b82f6">❤️</text>
</svg>`;

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Write SVG icon
fs.writeFileSync(path.join(iconsDir, 'icon.svg'), svgIcon);

// Create a simple HTML file to convert SVG to PNG (user can open in browser)
const htmlConverter = `<!DOCTYPE html>
<html>
<head><title>Icon Converter</title></head>
<body>
  <img id="icon" src="icon.svg" width="512" height="512" style="border: 1px solid #ccc;">
  <br><br>
  <button onclick="downloadIcon()">Download 512x512 PNG</button>
  <button onclick="resizeAndDownload(192)">Download 192x192 PNG</button>
  <button onclick="resizeAndDownload(72)">Download 72x72 PNG</button>
  
  <script>
    function downloadIcon() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 512;
      canvas.height = 512;
      
      const img = document.getElementById('icon');
      ctx.drawImage(img, 0, 0, 512, 512);
      
      const link = document.createElement('a');
      link.download = 'icon-512x512.png';
      link.href = canvas.toDataURL();
      link.click();
    }
    
    function resizeAndDownload(size) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = size;
      canvas.height = size;
      
      const img = document.getElementById('icon');
      ctx.drawImage(img, 0, 0, size, size);
      
      const link = document.createElement('a');
      link.download = \`icon-\${size}x\${size}.png\`;
      link.href = canvas.toDataURL();
      link.click();
    }
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(iconsDir, 'convert.html'), htmlConverter);

console.log('Icons generated! Open public/icons/convert.html in your browser to download PNG versions.');

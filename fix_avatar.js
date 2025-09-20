const fs = require('fs');

// Read the InteractiveAvatar file
let content = fs.readFileSync('src/components/InteractiveAvatar.tsx', 'utf8');

// Replace the main container to make avatar video fill the entire screen
content = content.replace(
  `<div className="w-full flex flex-col gap-4">
      <div className="flex flex-col rounded-xl bg-zinc-900 overflow-hidden w-full max-w-4xl">`,
  `<div className="w-full h-full flex flex-col">
      <div className="flex flex-col w-full h-full ${sessionState === StreamingAvatarSessionState.CONNECTED ? 'bg-black' : 'rounded-xl bg-zinc-900'} overflow-hidden">`
);

// Write the file back
fs.writeFileSync('src/components/InteractiveAvatar.tsx', content);

console.log('Fixed InteractiveAvatar.tsx - avatar video now fills entire screen');

const fs = require('fs');
const path = require('path');

const iconDir = path.join(__dirname, 'assets', 'icons');
const imgDir = path.join(__dirname, 'assets', 'images');

fs.mkdirSync(iconDir, { recursive: true });
fs.mkdirSync(imgDir, { recursive: true });

// Copy the generated image to assets/images
const sourceImage = 'C:\\Users\\Guilherme Simões\\.gemini\\antigravity\\brain\\6cd13ce6-95c7-4194-841e-a40c8c9a91f9\\hero_bg_1778327412097.png';
const destImage = path.join(imgDir, 'hero_bg.png');
try {
  if (fs.existsSync(sourceImage)) {
    fs.copyFileSync(sourceImage, destImage);
  }
} catch (e) {}

const color = "#FFCC00";
const white = "#FFFFFF";

const svgs = {
  // Features
  'chart.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-5 5"/></svg>`,
  'sync.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${white}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>`,
  'multisport.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
  'team.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${white}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  'brain.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>`,
  
  // Dashboard sports
  'bike.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/></svg>`,
  'run.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"/><path d="M5 22v-3l4-2-2-4"/><path d="M19 14l-3-3-2 3"/><path d="M13 14v4l-4 4"/></svg>`,
  'swim.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6 0 1.2-.2 1.8-.6L4.5 5c1.2-.8 2.8-.8 4 0l.7.4c1.2.8 2.8.8 4 0l.7-.4c1.2-.8 2.8-.8 4 0l.7.4c1.2.8 2.8.8 4 0V8c-.6 0-1.2-.2-1.8-.6l-.7-.4c-1.2-.8-2.8-.8-4 0l-.7.4c-1.2.8-2.8.8-4 0l-.7-.4c-1.2-.8-2.8-.8-4 0l-.7.4c-1.2.8-2.8.8-4 0V6z"/><path d="M2 12c.6 0 1.2-.2 1.8-.6l.7-.4c1.2-.8 2.8-.8 4 0l.7.4c1.2.8 2.8.8 4 0l.7-.4c1.2-.8 2.8-.8 4 0l.7.4c1.2.8 2.8.8 4 0v2c-.6 0-1.2-.2-1.8-.6l-.7-.4c-1.2-.8-2.8-.8-4 0l-.7.4c-1.2.8-2.8.8-4 0l-.7-.4c-1.2-.8-2.8-.8-4 0l-.7.4c-1.2.8-2.8.8-4 0v-2z"/><path d="M2 18c.6 0 1.2-.2 1.8-.6l.7-.4c1.2-.8 2.8-.8 4 0l.7.4c1.2.8 2.8.8 4 0l.7-.4c1.2-.8 2.8-.8 4 0l.7.4c1.2.8 2.8.8 4 0v2c-.6 0-1.2-.2-1.8-.6l-.7-.4c-1.2-.8-2.8-.8-4 0l-.7.4c-1.2.8-2.8.8-4 0l-.7-.4c-1.2-.8-2.8-.8-4 0l-.7.4c-1.2.8-2.8.8-4 0v-2z"/></svg>`,
  
  // Download Store
  'apple.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${white}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>`,
  'android.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  'desktop.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${white}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,

  // Generic Integrations
  'strava.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="#FC4C02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.3 11.2l-3.3 6.6-3.3-6.6h-4.3l7.6 15 7.6-15h-4.3zM15.3 11.2h4.3l-7.6-15-7.6 15h4.3l3.3-6.6 3.3 6.6z"/></svg>`,
  'garmin.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="#007CC3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  'generic-sync.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${white}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  
  // Others
  'plus.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  'star.svg': `<svg viewBox="0 0 24 24" fill="${color}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  'check.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  'lightning.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  'fire.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="#FF5500" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  
  // Socials
  'camera.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${white}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  'twitter.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${white}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>`,
  'linkedin.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${white}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  'youtube.svg': `<svg viewBox="0 0 24 24" fill="none" stroke="${white}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>`
};

for (const [name, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(iconDir, name), content);
}

console.log("SVGs and images copied to assets folder successfully.");

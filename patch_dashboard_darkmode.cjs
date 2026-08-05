const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin/Dashboard.jsx', 'utf8');

content = content.replace(/bg-zinc-950/g, 'bg-white dark:bg-zinc-950');
content = content.replace(/text-zinc-100/g, 'text-zinc-900 dark:text-zinc-100');
content = content.replace(/bg-zinc-900/g, 'bg-zinc-100 dark:bg-zinc-900');
content = content.replace(/border-zinc-900/g, 'border-zinc-200 dark:border-zinc-900');
content = content.replace(/text-zinc-400/g, 'text-zinc-600 dark:text-zinc-400');
content = content.replace(/text-white/g, 'text-zinc-900 dark:text-white');
content = content.replace(/bg-zinc-800/g, 'bg-zinc-200 dark:bg-zinc-800');
content = content.replace(/border-zinc-800/g, 'border-zinc-300 dark:border-zinc-800');
content = content.replace(/text-zinc-300/g, 'text-zinc-700 dark:text-zinc-300');
content = content.replace(/text-zinc-500/g, 'text-zinc-500 dark:text-zinc-400');

fs.writeFileSync('src/pages/Admin/Dashboard.jsx', content);
console.log('Patched Dashboard.jsx Part 3 (Dark Mode toggle)');

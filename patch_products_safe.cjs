const fs = require('fs');
let content = fs.readFileSync('src/pages/Products.jsx', 'utf8');

const newImports = `import { useState, useEffect } from 'react';\nimport { fetchProducts } from '../utils/api';\nimport { ArrowRight, Plane, ShoppingCart, Wallet, Lock, Package, Loader2 } from 'lucide-react';\n\nconst ICONS_MAP = {\n  Plane,\n  ShoppingCart,\n  Wallet,\n  Package\n};`;

content = content.replace(
  "import { ArrowRight, Plane, ShoppingCart, Wallet, Lock } from 'lucide-react';",
  newImports
);

content = content.replace(
  /const products = \[[\s\S]*?domain: 'dailokhata\.os'\n    \}\n  \];/,
  `const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);`
);

content = content.replace(
  'const Icon = product.icon;',
  'const Icon = ICONS_MAP[product.icon] || Package;'
);

content = content.replace(
  '                    {product.metrics && (',
  '                    {product.metricsLabel && ('
);
content = content.replace(
  '                        <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">{product.metrics.label}</span>\n                        <span className="text-sm font-extrabold text-zinc-900 dark:text-white">{product.metrics.value}</span>',
  '                        <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">{product.metricsLabel}</span>\n                        <span className="text-sm font-extrabold text-zinc-900 dark:text-white">{product.metricsValue}</span>'
);

content = content.replace(
  '      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pb-32">',
  `      {loading ? (
        <div className="flex justify-center items-center py-20 text-zinc-500">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pb-32">`
);

content = content.replace(
  '      </section>\n    </div>',
  '      </section>\n      )}\n    </div>'
);

fs.writeFileSync('src/pages/Products.jsx', content);
console.log('Patched Products.jsx completely and safely.');

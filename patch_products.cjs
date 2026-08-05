const fs = require('fs');
let content = fs.readFileSync('src/pages/Products.jsx', 'utf8');

const newImports = `import { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/api';
import { ArrowRight, Plane, ShoppingCart, Wallet, Lock, Package, Loader2 } from 'lucide-react';

const ICONS_MAP = {
  Plane,
  ShoppingCart,
  Wallet,
  Package
};`;

content = content.replace(
  "import { ArrowRight, Plane, ShoppingCart, Wallet, Lock } from 'lucide-react';",
  newImports
);

const oldProductsArray = `  const products = [
    {
      title: 'YatraMind',
      tagline: 'The ultimate Nepal destination and booking intelligence.',
      desc: 'An advanced travel application designed to explore, search, and book destinations across Nepal. It acts as a digital travel concierge, making it easier than ever to plan itineraries and manage bookings seamlessly.',
      link: 'https://www.yatramind.app/',
      icon: Plane,
      image: '/images/yatramind_ui.png',
      status: 'Live',
      metrics: { label: 'Active Planners', value: '15,000+' },
      domain: 'yatramind.app'
    },
    {
      title: 'Fashion B2B',
      tagline: 'Revolutionizing wholesale clothing trade.',
      desc: 'A highly advanced B2B ecosystem designed specifically to make bulk clothes buying and selling easier and more efficient. It digitizes the entire supply chain, connecting manufacturers directly with retailers.',
      link: null,
      icon: ShoppingCart,
      image: '/images/b2b_fashion_ui.png',
      status: 'In Development',
      metrics: { label: 'Projected GMV (Q4)', value: '$2M+' },
      domain: 'fashionb2b.app'
    },
    {
      title: 'DailoKhata',
      tagline: 'Digital daily savings and collection ledger.',
      desc: 'A revolutionary FinTech application built for organizations in Nepal to digitize daily money collections. It replaces physical ledgers, allowing field staff to record client savings instantly and securely on-the-go.',
      link: null,
      icon: Wallet,
      image: '/images/dailokhata_ui.png',
      status: 'Live',
      metrics: { label: 'Active Orgs', value: '120+' },
      domain: 'dailokhata.os'
    }
  ];`;

const newProductsState = `  const [products, setProducts] = useState([]);
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
  }, []);`;

content = content.replace(oldProductsArray, newProductsState);

// Replace icon extraction in map
content = content.replace(
  'const Icon = product.icon;',
  'const Icon = ICONS_MAP[product.icon] || Package;'
);

// Replace product.metrics check
content = content.replace(
  '                    {product.metrics && (',
  '                    {product.metricsLabel && ('
);
content = content.replace(
  '                        <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">{product.metrics.label}</span>\n                        <span className="text-sm font-extrabold text-zinc-900 dark:text-white">{product.metrics.value}</span>',
  '                        <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">{product.metricsLabel}</span>\n                        <span className="text-sm font-extrabold text-zinc-900 dark:text-white">{product.metricsValue}</span>'
);

// Add loading state
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
console.log('Patched Products.jsx');

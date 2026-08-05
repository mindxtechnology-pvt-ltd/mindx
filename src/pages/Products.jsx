import SEO from '../components/seo/SEO';
import FadeIn from '../components/layout/FadeIn';
import { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/api';
import { ArrowRight, Plane, ShoppingCart, Wallet, Lock, Package, Loader2 } from 'lucide-react';

const ICONS_MAP = {
  Plane,
  ShoppingCart,
  Wallet,
  Package
};
import { Link } from 'react-router-dom';

export default function Products() {
  const products = [
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
  ];

  return (
    <div className="overflow-x-hidden text-zinc-900 dark:text-zinc-100 pt-4 pb-12 sm:pt-6 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SEO title="Products" description="Discover the proprietary SaaS platforms engineered by Mindx Technologies." />

      <section className="text-center max-w-3xl mx-auto pt-20 pb-12">
        <FadeIn blur delay={0.2} className="relative">
          <h1 className="text-5xl sm:text-6xl md:text-[5rem] font-extrabold tracking-tighter text-zinc-900 dark:text-white mb-3 leading-[1.05]">
            Products Built{' '}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 animate-gradient-x">
              by Mindx.
            </span>
          </h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.3}>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
            We practice what we preach. Discover the high-velocity platforms engineered, designed, and launched entirely in-house by our engineering powerhouse.
          </p>
        </FadeIn>
      </section>

      {loading ? (
        <div className="flex justify-center items-center py-20 text-zinc-500">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pb-32">
        {products.map((product, i) => {
          const Icon = ICONS_MAP[product.icon] || Package;
          let animationProps = { direction: "up" };
          if (i === 0) animationProps = { direction: "left" };
          else if (i === 1) animationProps = { direction: "right" };
          else if (i === 2) animationProps = { scale: true };
          
          return (
            <FadeIn key={i} {...animationProps} delay={0.1 * i} className={i === 2 ? "md:col-span-2" : ""}>
              <div className={`group flex flex-col h-full rounded-[2.5rem] bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden shadow-md hover:shadow-2xl hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-all duration-500 ${i === 2 ? "md:flex-row" : ""}`}>
                
                {/* Browser Mockup Image Frame */}
                <div className={`relative bg-zinc-950 flex flex-col overflow-hidden border-zinc-200/50 dark:border-zinc-800 ${i === 2 ? "w-full md:w-7/12 border-b md:border-b-0 md:border-r" : "w-full border-b"}`}>
                  
                  {/* Sleek Browser Window Header */}
                  <div className="h-9 px-4 bg-zinc-900/95 border-b border-zinc-800/80 flex items-center justify-between z-20 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="px-3 py-0.5 rounded-full bg-zinc-950/80 border border-zinc-800/80 text-[9px] flex items-center gap-1 text-zinc-400 font-mono">
                      <Lock size={9} className="text-emerald-400" /> {product.domain}
                    </div>
                    <div className="w-10" />
                  </div>

                  {/* Canvas Container with Ambient Glow */}
                  <div className="relative flex-1 p-3 sm:p-4 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center min-h-[220px]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      loading="lazy" 
                      className="w-full h-full object-contain max-h-[360px] rounded-xl shadow-2xl border border-white/5 transition-transform duration-700 group-hover:scale-[1.02] relative z-10" 
                    />
                  </div>
                </div>
                
                {/* Text Content */}
                <div className={`flex flex-col p-8 lg:p-10 ${i === 2 ? "md:w-5/12 justify-center" : "flex-grow"}`}>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase tracking-widest mb-4 w-fit border border-emerald-500/20">
                    <Icon size={14} /> {product.title}
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">{product.tagline}</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 flex-grow">
                    {product.desc}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60">
                    {product.link ? (
                      <Link to={product.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-bold hover:text-emerald-500 transition-colors">
                        Visit Live App <ArrowRight size={16} className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                        {product.status === 'Live' ? 'Enterprise Dashboard' : 'In Development'}
                      </span>
                    )}

                    {product.metricsLabel && (
                      <div className="flex flex-col text-right">
                        <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">{product.metrics.label}</span>
                        <span className="text-sm font-extrabold text-zinc-900 dark:text-white">{product.metrics.value}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </section>
    </div>
  );
}

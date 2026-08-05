import SEO from '../components/seo/SEO';
import FadeIn from '../components/layout/FadeIn';
import { ArrowRight, BookOpen, Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchBlogs } from '../utils/api';

const DEFAULT_POSTS = [
    {
      title: 'The Future of AI in SaaS',
      date: 'October 12, 2026',
      category: 'Engineering Deep Dive',
      readTime: '6 min read',
      desc: 'How autonomous LLM workflows and multi-agent RAG pipelines are transforming enterprise Software-as-a-Service architecture from static CRUD interfaces to proactive intelligent assistants.',
      author: 'Nawaraj Karki'
    },
    {
      title: 'Migrating from Legacy Architectures to Next.js',
      date: 'September 28, 2026',
      category: 'Web Systems',
      readTime: '8 min read',
      desc: 'A complete technical case study detailing our incremental migration strategy from monolithic PHP and legacy single-page apps to high-concurrency Next.js App Router applications.',
      author: 'Prabesh Bhandari'
    },
    {
      title: 'Why Cognitive Load & Mobile-First Design Still Dictate Conversion',
      date: 'September 15, 2026',
      category: 'UI/UX Systems',
      readTime: '5 min read',
      desc: 'Examining the psychological principles of micro-interactions, responsive typography, and progressive disclosure in enterprise B2B software interfaces.',
      author: 'Design Systems Team'
    },
    {
      title: 'Scaling Distributed Node.js Microservices to 10M Requests',
      date: 'August 30, 2026',
      category: 'Cloud Infrastructure',
      readTime: '10 min read',
      desc: 'Architectural lessons learned deploying Kubernetes clusters, Redis caching layers, and asynchronous message queues to handle extreme burst traffic reliably.',
      author: 'Nawaraj Karki'
    }
  ];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await fetchBlogs();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch blogs from API, falling back to local posts', err);
        setPosts(DEFAULT_POSTS);
      } finally {
        setIsLoading(false);
      }
    }
    loadBlogs();
  }, []);

  return (
    <div className="overflow-x-hidden text-zinc-900 dark:text-zinc-100 pt-4 pb-12 sm:pt-6 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEO title="Insights & Engineering Blog" description="Technical research, engineering deep dives, and architectural notes from Mindx Technologies." />

      {/* Premium Hero Section */}
      <section className="max-w-6xl mx-auto pt-20 pb-12 text-left flex flex-col items-start">
        <FadeIn blur delay={0.2} className="relative w-full">
          <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-extrabold tracking-tighter text-zinc-900 dark:text-white mb-6 leading-[1.05] max-w-4xl">
            Technical{' '}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 animate-gradient-x">
              Insights.
            </span>
          </h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.3}>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl">
            Architectural deep dives, performance optimization strategies, and lessons learned building high-velocity software ecosystems.
          </p>
        </FadeIn>
      </section>

      {/* Modern Bento Grid for Posts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto mb-12">
        {posts.map((post, i) => {
          let animProps = { direction: "up" };
          if (i === 0) animProps = { scale: true };
          else if (i === 1) animProps = { direction: "left" };
          else if (i === 2) animProps = { direction: "right" };
          else if (i === 3) animProps = { direction: "up" };

          return (
            <FadeIn key={i} {...animProps} delay={150} className={`flex ${i === 0 ? "md:col-span-2" : ""}`}>
              <div className={`p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm hover:shadow-2xl hover:border-blue-500/40 transition-all duration-500 flex flex-col justify-between group w-full ${i === 0 ? "md:flex-row md:items-center gap-12" : "gap-8"}`}>
                
                <div className={`flex flex-col ${i === 0 ? "md:w-2/3" : ""}`}>
                  <div className="flex flex-wrap items-center gap-3 mb-6 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest">
                    <span className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">{post.category}</span>
                    <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
                    <span className="text-zinc-500 dark:text-zinc-400">{post.date}</span>
                    <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
                    <span className="text-zinc-400 dark:text-zinc-500 flex items-center gap-1"><BookOpen size={14} /> {post.readTime}</span>
                  </div>
                  
                  <h3 className={`font-extrabold text-zinc-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 mb-4 tracking-tight ${i === 0 ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}>
                    {post.title}
                  </h3>
                  
                  <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                    {post.desc}
                  </p>
                  
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mt-auto">
                    By <span className="text-zinc-900 dark:text-zinc-200">{post.author}</span>
                  </div>
                </div>

                <div className={`flex-shrink-0 ${i === 0 ? "md:w-1/3 flex md:justify-end" : "mt-auto pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60"}`}>
                  <Link to={`/blog/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-widest transition-all duration-300 ${i === 0 ? "bg-zinc-900 dark:bg-white text-white dark:text-black hover:scale-105 shadow-xl hover:shadow-blue-500/20 text-xs sm:text-sm" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[10px] sm:text-xs w-full"}`}>
                    Read Deep Dive <ArrowRight size={i === 0 ? 18 : 14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

              </div>
            </FadeIn>
          );
        })}
      </section>
    </div>
  );
}

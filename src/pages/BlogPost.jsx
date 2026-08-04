import { useParams, Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import FadeIn from '../components/layout/FadeIn';
import { ArrowLeft } from 'lucide-react';

const blogDatabase = {
  'the-future-of-ai-in-saas': {
    title: 'The Future of AI in SaaS: Beyond the Thin Wrapper',
    date: 'October 12, 2026',
    author: 'Nawaraj Karki',
    readTime: '6 min read',
    category: 'Engineering Deep Dive',
    content: [
      { type: 'p', text: 'For the past three years, the SaaS ecosystem has been saturated with basic "AI Wrappers"—superficial user interfaces layered over raw OpenAI completion endpoints. As we navigate 2026, enterprise buyers and consumers are no longer wowed by basic text generation. They demand autonomous agentic workflows capable of multi-step execution.' },
      { type: 'h2', text: 'The Evolution from Generation to Autonomous Execution' },
      { type: 'p', text: 'Modern enterprise AI architecture requires a fundamental paradigm shift in data orchestration. Rather than simply forwarding prompt payloads to an LLM, we must construct resilient RAG (Retrieval-Augmented Generation) data pipelines allowing models to securely index and verify proprietary databases before executing state modifications.' },
      { type: 'p', text: 'At Mindx Technologies, our engineering team recently deployed an autonomous logistical routing system for a B2B enterprise partner. The AI agent does not merely suggest freight paths; it actively interrogates carrier APIs, negotiates real-time freight pricing, and executes dispatch contracts autonomously.' },
      { type: 'h2', text: 'Why Vector Databases & Embeddings Are Non-Negotiable' },
      { type: 'p', text: 'Integrating AI features into multi-tenant SaaS applications without dedicated vector storage (such as Pinecone, Milvus, or pgvector) introduces severe architectural bottlenecks. High-dimensional vector embeddings are vital for real-time semantic context retrieval without triggering token explosion or unacceptable latency spikes.' }
    ]
  }
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogDatabase[slug] || {
    title: slug ? slug.replace(/-/g, ' ').toUpperCase() : 'Engineering Research',
    date: 'October 2026',
    author: 'Mindx Architects',
    readTime: '4 min read',
    category: 'Technical Notes',
    content: [
      { type: 'p', text: 'This technical note explores advanced system architecture and frontend optimization strategies utilized across our production deployments.' }
    ]
  };

  return (
    <div className="overflow-x-hidden text-zinc-900 dark:text-zinc-100 pt-4 pb-12 sm:pt-6 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <SEO title={`${post.title} | Mindx Engineering Journal`} />

      <FadeIn direction="down" delay={100}>
        <div>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Insights
          </Link>
        </div>
      </FadeIn>

      <header className="mb-12 pb-8 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <FadeIn direction="up" delay={150}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-semibold mb-4">
            {post.category || 'Deep Dive'}
          </div>
        </FadeIn>
        <FadeIn direction="up" delay={200}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-zinc-900 dark:text-white leading-tight">{post.title}</h1>
        </FadeIn>
        <FadeIn direction="up" delay={250}>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <span className="text-zinc-900 dark:text-white font-semibold">By {post.author}</span>
            <span>&bull;</span>
            <span>{post.date}</span>
            <span>&bull;</span>
            <span>{post.readTime}</span>
          </div>
        </FadeIn>
      </header>

      <article className="space-y-6 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal max-w-3xl">
        {post.content.map((block, i) => {
          if (block.type === 'h2') {
            return (
              <FadeIn key={i} direction="up" staggerIndex={i} delay={100}>
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white pt-6 mb-3 tracking-tight">{block.text}</h2>
              </FadeIn>
            );
          }
          return (
            <FadeIn key={i} direction="up" staggerIndex={i} delay={100}>
              <p className="mb-4">{block.text}</p>
            </FadeIn>
          );
        })}
      </article>
    </div>
  );
}

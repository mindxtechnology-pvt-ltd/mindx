import { useParams, Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import FadeIn from '../components/layout/FadeIn';
import { ArrowLeft, Server, Database, Shield, ArrowRight } from 'lucide-react';

const caseStudiesData = {
  'freedom-bazar': {
    title: 'Freedom Bazar: Enterprise B2B Supply Chain',
    category: 'E-Commerce Architecture',
    description: 'We engineered a fault-tolerant B2B wholesale marketplace connecting local manufacturers with global buyers, featuring real-time logistics routing and multi-currency escrow payments.',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis Cluster', 'AWS EC2', 'Stripe Connect'],
    heroImage: '/images/freedombazar_dashboard.png',
    metrics: [
      { label: 'Platform Uptime SLA', value: '99.99%' },
      { label: 'API Latency', value: '< 45ms' },
      { label: 'Concurrent Vendors', value: '10,000+' }
    ],
    challenge: 'Local manufacturing enterprises lacked a unified digital infrastructure to export wholesale products globally. The legacy ecosystem relied on fragmented messaging, unverified bank wire transfers, and unpredictable shipping timelines. They required an enterprise platform capable of managing multi-party escrow payments, tiered volume pricing, and live inventory synchronization across hundreds of vendors.',
    solution: 'Mindx Technologies architected a microservices backend utilizing Node.js and distributed PostgreSQL. We engineered strict Role-Based Access Control (RBAC) separating Buyers, Vendors, and Administrators. For financial transactions, we integrated Stripe Connect escrow workflows, guaranteeing manufacturers receive payout upon buyer confirmation. The frontend was deployed as an optimized Next.js interface ensuring instant load times and global SEO indexation.',
    architecture: [
      { title: 'Database Relational Schema', desc: 'Normalized PostgreSQL architecture with indexed JSONB data columns for highly customizable product variant models.', icon: Database },
      { title: 'In-Memory Caching Layer', desc: 'Redis clustering for high-speed shopping cart operations and session tokens, reducing query load by over 70%.', icon: Server },
      { title: 'Zero-Trust Security Framework', desc: 'Stateless JWT authentication paired with strict rate-limiting and automated SQL injection protection.', icon: Shield }
    ]
  },
  'yatramind': {
    title: 'YatraMind: AI Travel Concierge Ecosystem',
    category: 'Generative AI & PWA',
    description: 'An intelligent travel planning platform generating ultra-personalized multi-destination itineraries in seconds using advanced LLM integrations inside a high-speed PWA architecture.',
    techStack: ['React PWA', 'Node.js', 'OpenAI API', 'Google Gemini API', 'MongoDB', 'Tailwind CSS'],
    heroImage: '/images/yatramind_dashboard.png',
    metrics: [
      { label: 'Organic User Retention', value: '+40%' },
      { label: 'Research Time Saved', value: '85%' },
      { label: 'Active Monthly Planners', value: '15,000+' }
    ],
    challenge: 'Planning complex multi-destination international travel requires hours of tedious cross-referencing across flights, hotels, weather data, and local activities. Existing travel platforms offered static templates that failed to adapt to personal traveler preferences or real-time logistical constraints.',
    solution: 'We engineered an asynchronous AI prompt pipeline leveraging OpenAI and Gemini models to dynamically construct bespoke travel schedules. Deployed as a Progressive Web App (PWA), YatraMind delivers offline accessibility, instant mobile app installability, and sub-second UI transitions.',
    architecture: [
      { title: 'Dynamic Prompt Orchestration', desc: 'Custom context-window optimization balancing prompt tokens across dual AI providers to guarantee sub-3 second response times.', icon: Server },
      { title: 'Progressive Web App Cache', desc: 'Service worker caching strategies enabling full offline itinerary viewing during remote international transit.', icon: Database },
      { title: 'Data Privacy & Encryption', desc: 'End-to-end encryption for user preferences and travel profiles compliant with global GDPR privacy standards.', icon: Shield }
    ]
  }
};

export default function CaseStudy() {
  const { slug } = useParams();
  const caseStudy = caseStudiesData[slug] || caseStudiesData['freedom-bazar'];

  return (
    <div className="overflow-x-hidden text-zinc-900 dark:text-zinc-100 pt-4 pb-12 sm:pt-6 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <SEO title={`${caseStudy.title} | Mindx Portfolio`} description={caseStudy.description} />

      {/* Navigation & Header */}
      <section className="mb-10">
        <FadeIn direction="down" delay={100}>
          <div>
            <Link to="/portfolio" className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4">
              <ArrowLeft size={14} /> Back to Case Studies
            </Link>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-semibold mb-3">
            {caseStudy.category}
          </div>
        </FadeIn>
        <FadeIn direction="up" delay={200}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-zinc-900 dark:text-white leading-tight">{caseStudy.title}</h1>
        </FadeIn>
        <FadeIn direction="up" delay={300}>
          <p className="text-xs sm:text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-3xl mb-6">{caseStudy.description}</p>
        </FadeIn>

        <FadeIn direction="up" delay={350}>
          <div className="flex flex-wrap gap-1.5">
            {caseStudy.techStack.map(tech => (
              <span key={tech} className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                {tech}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Hero Image */}
      <FadeIn direction="scale" delay={200}>
        <section className="mb-12 rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-950 shadow-sm max-h-[400px] flex items-center justify-center">
          <img src={caseStudy.heroImage} alt={caseStudy.title} className="w-full h-full object-cover" />
        </section>
      </FadeIn>

      {/* Key Metrics Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm">
        {caseStudy.metrics.map((metric, i) => (
          <FadeIn key={i} direction="up" staggerIndex={i} delay={150} className="text-center sm:border-r last:border-none border-zinc-200/60 dark:border-zinc-800/60 py-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight mb-0.5">{metric.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{metric.label}</div>
          </FadeIn>
        ))}
      </section>

      {/* Challenge & Solution */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <FadeIn direction="up" staggerIndex={0} delay={150} className="flex">
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm space-y-2.5 w-full">
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">The Problem & Challenge</h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{caseStudy.challenge}</p>
          </div>
        </FadeIn>
        <FadeIn direction="up" staggerIndex={1} delay={150} className="flex">
          <div className="p-6 sm:p-8 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 shadow-sm space-y-2.5 w-full">
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">The Architectural Solution</h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{caseStudy.solution}</p>
          </div>
        </FadeIn>
      </section>

      {/* System Architecture Grid */}
      <section className="mb-12">
        <FadeIn direction="up">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">System Architecture Highlights</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {caseStudy.architecture.map((arch, i) => {
            const Icon = arch.icon;
            return (
              <FadeIn key={i} direction="up" staggerIndex={i} delay={150} className="flex">
                <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm space-y-2.5 w-full">
                  <div className="p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-blue-600 dark:text-blue-400 border border-zinc-200/60 dark:border-zinc-700/60 w-fit">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{arch.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{arch.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Next Step CTA */}
      <section className="text-center p-8 sm:p-10 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md">
        <FadeIn direction="scale">
          <h2 className="text-lg sm:text-xl font-bold mb-1.5 tracking-tight">Need similar architectural scalability?</h2>
          <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-600 mb-5 max-w-md mx-auto leading-relaxed">Schedule a technical walkthrough with our lead engineers to map your project requirements.</p>
          <Link to="/start-project" className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5">
            Initiate Project <ArrowRight size={14} className="ml-1.5" />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}

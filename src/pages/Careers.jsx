import SEO from '../components/seo/SEO';
import FadeIn from '../components/layout/FadeIn';
import { ArrowRight, Briefcase, MapPin, Clock, CheckCircle2, Zap, Shield, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Careers() {
  const jobs = [
    {
      title: 'Senior Full-Stack Architect (React / Node)',
      location: 'Remote / Hybrid Nepal',
      type: 'Full-time',
      dept: 'Engineering',
      desc: 'Architect high-concurrency microservices, optimize PostgreSQL database performance, and lead technical mentorship for frontend and backend systems.'
    },
    {
      title: 'Lead Product UI/UX Designer',
      location: 'Remote Global',
      type: 'Full-time',
      dept: 'Design Systems',
      desc: 'Spearhead design systems across our flagship SaaS products. Prototype interactive micro-animations and conduct user telemetry research.'
    },
    {
      title: 'AI / LLM Pipeline Engineer',
      location: 'Sunsari HQ / Remote',
      type: 'Full-time',
      dept: 'Generative AI',
      desc: 'Design and deploy multi-agent RAG pipelines, fine-tune open weights models, and integrate real-time vector embeddings into production SaaS platforms.'
    },
    {
      title: 'DevOps & Cloud Infrastructure Engineer',
      location: 'Remote Global',
      type: 'Full-time',
      dept: 'Infrastructure',
      desc: 'Manage AWS/Kubernetes multi-region clusters, build automated CI/CD deployment pipelines, and ensure 99.99% SLA uptime for enterprise clients.'
    }
  ];

  const perks = [
    { icon: Zap, title: 'Asynchronous Velocity', desc: 'No pointless meetings. Work when you are most productive with clear async written memos.' },
    { icon: Shield, title: 'Generous Equipment Stipend', desc: 'Top-tier MacBook Pro M3 Max or custom Linux workstation provided on day one.' },
    { icon: Heart, title: 'Global Health & Wellness', desc: 'Comprehensive premium health coverage for you and your dependents.' },
    { icon: Briefcase, title: 'Conference & Learning Budget', desc: '$2,500 annual personal learning budget for technical courses, books, and global tech conferences.' }
  ];

  return (
    <div className="overflow-x-hidden text-zinc-900 dark:text-zinc-100 pt-4 pb-12 sm:pt-6 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <SEO title="Careers" description="Join Mindx Technologies. View open engineering positions and our high-velocity culture." />

      <section className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <FadeIn direction="down" delay={100}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-semibold mb-4">
            Elite Technical Careers
          </div>
        </FadeIn>
        <FadeIn direction="up" delay={200}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-zinc-900 dark:text-white leading-tight">Join Our Engineering Team</h1>
        </FadeIn>
        <FadeIn direction="up" delay={300}>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Help us architect high-concurrency enterprise applications and scale proprietary SaaS platforms globally. We offer competitive compensation, remote flexibility, and zero bureaucratic overhead.
          </p>
        </FadeIn>
      </section>

      {/* Perks Grid */}
      <section className="mb-16">
        <FadeIn direction="up">
          <h2 className="text-lg sm:text-xl font-bold text-center text-zinc-900 dark:text-white mb-6 tracking-tight">Why Engineers Thrive at Mindx</h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {perks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <FadeIn key={i} direction="up" staggerIndex={i} delay={150} className="flex">
                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 w-full">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1.5">{perk.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{perk.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Open Positions */}
      <section className="space-y-4 mb-16">
        <FadeIn direction="up">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">Open Positions</h2>
        </FadeIn>
        {jobs.map((job, i) => (
          <FadeIn key={i} direction="up" staggerIndex={i} delay={150}>
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
              <div className="max-w-2xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 block">{job.dept}</span>
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">{job.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">{job.desc}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  <span className="flex items-center gap-1"><MapPin size={13} className="text-blue-500" /> {job.location}</span>
                  <span className="flex items-center gap-1"><Clock size={13} className="text-blue-500" /> {job.type}</span>
                </div>
              </div>
              <Link to="/contact" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-blue-600 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-blue-600 dark:hover:text-white text-xs font-semibold transition-all shrink-0 shadow-sm">
                Apply Now <ArrowRight size={14} className="ml-1.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* Hiring Process */}
      <section className="mb-16 p-8 sm:p-10 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm">
        <FadeIn direction="up">
          <h2 className="text-lg sm:text-xl font-bold text-center text-zinc-900 dark:text-white mb-8 tracking-tight">Our 4-Step Technical Hiring Process</h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { step: '01', title: 'Application & Review', desc: 'Direct review of your GitHub repositories, architecture diagrams, or product portfolio by our founding engineers.' },
            { step: '02', title: 'Technical Deep Dive', desc: 'A 45-minute architectural conversation focusing on systems you built and complex engineering tradeoffs.' },
            { step: '03', title: 'Paid Async Challenge', desc: 'A compensated, real-world practical challenge that respects your time (no live whiteboard hazing).' },
            { step: '04', title: 'Offer & Day One', desc: 'Fast decision within 48 hours. Equipment shipped immediately so you hit the ground running.' }
          ].map((item, idx) => (
            <FadeIn key={idx} direction="scale" staggerIndex={idx} delay={150}>
              <div className="relative">
                <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">{item.step}</div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="p-8 sm:p-10 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 text-center">
        <FadeIn direction="scale">
          <Briefcase size={28} className="mx-auto text-blue-600 dark:text-blue-400 mb-3" />
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-1">Don't see a direct role matching your profile?</h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-6">We are always evaluating exceptional full-stack developers, system architects, and AI researchers.</p>
          <Link to="/contact" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-xs sm:text-sm font-semibold transition-all shadow-sm">
            Submit General Application
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}

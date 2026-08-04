import SEO from '../components/seo/SEO';
import FadeIn from '../components/layout/FadeIn';
import { Zap, Globe2, Code, Database, BrainCircuit, LayoutDashboard, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TeamSection from '../components/ui/TeamSection';

export default function About() {
  return (
    <div className="overflow-x-hidden text-zinc-900 dark:text-zinc-100 pt-4 pb-12 sm:pt-6 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEO title="About Us" description="Learn about Mindx Technologies, our mission, and our global engineering team." />

      {/* Premium Hero Section */}
      <section className="text-center max-w-4xl mx-auto pt-20 pb-12">
        <FadeIn blur delay={0.2} className="relative">
          <h1 className="text-5xl sm:text-6xl md:text-[5rem] font-extrabold tracking-tighter text-zinc-900 dark:text-white mb-6 leading-[1.05]">
            Our Mission &{' '}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 animate-gradient-x">
              Philosophy.
            </span>
          </h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.3}>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
            We operate a unique dual-force engineering model: partnering with visionary enterprise clients worldwide to deliver mission-critical software, while continuously building and scaling our own proprietary SaaS ecosystems.
          </p>
        </FadeIn>
      </section>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-32 max-w-5xl mx-auto">
        {[
          { stat: '10+', label: 'Global Enterprises' },
          { stat: '5', label: 'Proprietary SaaS Products' },
          { stat: '24/7', label: 'Active SLA Support' },
          { stat: '100%', label: 'On-Schedule Delivery' }
        ].map((item, i) => {
          let animProps = { direction: "up" };
          if (i === 0) animProps = { direction: "left" };
          else if (i === 1) animProps = { direction: "down" };
          else if (i === 2) animProps = { scale: true };
          else if (i === 3) animProps = { direction: "right" };

          return (
          <FadeIn key={i} {...animProps} staggerIndex={i} delay={150} className="flex">
            <div className="p-8 sm:p-10 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 text-center shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 w-full group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-2 tracking-tighter relative z-10">{item.stat}</div>
              <div className="text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 relative z-10">{item.label}</div>
            </div>
          </FadeIn>
        )})}
      </section>

      {/* Values Split Grid */}
      <section className="mb-32 max-w-5xl mx-auto">
        <FadeIn blur>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-widest mb-4">
            Core Principles
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-12 tracking-tight">The foundation of everything we build.</h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn direction="left" delay={150} className="flex">
            <div className="p-8 sm:p-12 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all group w-full flex flex-col justify-between">
              <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                <Zap size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">Velocity Without Compromise</h3>
                <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  We ship production software rapidly without breaking things. Our automated CI/CD pipelines, comprehensive unit test suites, and strict peer review workflows guarantee enterprise stability at startup velocity.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={150} className="flex">
            <div className="p-8 sm:p-12 rounded-[2rem] bg-zinc-950 border border-zinc-800 shadow-sm hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:border-blue-500/40 transition-all group w-full flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-600/20 transition-all duration-700"></div>
              <div className="p-4 rounded-2xl bg-zinc-800 text-white border border-zinc-700 shadow-xs w-fit mb-8 group-hover:bg-blue-600 group-hover:border-transparent transition-all duration-500 relative z-10">
                <Globe2 size={32} />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight">Borderless Engineering</h3>
                <p className="text-base text-zinc-400 leading-relaxed">
                  We build for global scale. Whether designing localized multi-currency routing or deploying multi-region AWS cloud clusters, every system we architect is engineered to handle international volume effortlessly.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Technologies We Master Section */}
      <section className="mb-32 max-w-5xl mx-auto">
        <FadeIn direction="up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-widest mb-4 flex justify-center mx-auto">
            Stack
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-zinc-900 dark:text-white mb-12 tracking-tight">Technologies We Master</h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: <Code size={28} className="text-blue-600 dark:text-blue-400" />, title: 'Frontend Stack', tech: 'React, Next.js, Tailwind' },
            { icon: <LayoutDashboard size={28} className="text-zinc-800 dark:text-zinc-200" />, title: 'Backend APIs', tech: 'Node.js, Express, REST' },
            { icon: <Database size={28} className="text-blue-600 dark:text-blue-400" />, title: 'Data Layers', tech: 'PostgreSQL, MongoDB' },
            { icon: <BrainCircuit size={28} className="text-zinc-800 dark:text-zinc-200" />, title: 'AI & Cloud', tech: 'OpenAI, Gemini, AWS' }
          ].map((item, i) => {
            let animProps = { scale: true };
            if (i === 0) animProps = { blur: true };
            else if (i === 1) animProps = { direction: "down" };
            else if (i === 2) animProps = { direction: "up" };
            else if (i === 3) animProps = { direction: "right" };

            return (
            <FadeIn key={i} {...animProps} staggerIndex={i} staggerStep={100} delay={150} className="flex">
              <div className="p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 text-center shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all flex flex-col items-center justify-center w-full group">
                <div className="mb-6 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/50 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">{item.tech}</p>
              </div>
            </FadeIn>
          )})}
        </div>
      </section>

      {/* Leadership Section - Premium 3D */}
      <div className="mb-12">
        <TeamSection />
      </div>

      {/* Modern Asymmetric Call To Action */}
      <section className="relative w-full max-w-5xl mx-auto rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm py-12 sm:py-16 px-8 sm:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-12 isolate mb-12">
        {/* Subtle Background Glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <FadeIn direction="right" delay={0.1} className="relative z-10 flex-1 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Elevate Your Business
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold tracking-tighter text-zinc-900 dark:text-white mb-6 leading-[1.05]">
            Ready to build <br className="hidden lg:block"/> something exceptional?
          </h2>
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
            Stop settling for fragile legacy agencies. Partner with dedicated software engineers who architect for infinite scale from day one.
          </p>
        </FadeIn>

        <FadeIn direction="left" delay={0.2} className="relative z-10 flex-shrink-0 w-full md:w-auto">
          <Link to="/start-project" className="group relative flex items-center justify-between md:justify-center gap-6 px-8 py-5 md:py-6 rounded-2xl md:rounded-[2rem] bg-zinc-900 dark:bg-white text-white dark:text-black overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 w-full md:w-[280px]">
            <div className="flex flex-col text-left">
              <span className="text-sm md:text-base font-bold tracking-wide">Start a Project</span>
              <span className="text-[10px] md:text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-semibold mt-1 group-hover:text-blue-300 dark:group-hover:text-blue-600 transition-colors">Free Consultation</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 dark:bg-black/5 flex items-center justify-center group-hover:bg-blue-600 text-white dark:text-black group-hover:text-white transition-all duration-500 group-hover:-rotate-45">
              <ArrowRight size={20} className="transition-transform" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"></div>
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}

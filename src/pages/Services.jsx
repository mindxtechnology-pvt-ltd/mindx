import SEO from '../components/seo/SEO';
import FadeIn from '../components/layout/FadeIn';
import { motion } from 'framer-motion';
import { 
  Code, Smartphone, BrainCircuit, Cloud, ArrowRight, 
  ShieldCheck, TrendingUp, CheckCircle2, Server, Database, Lock, Zap 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div className="overflow-x-hidden text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-100 selection:text-blue-900">
      <SEO title="Engineering Excellence | MindX" description="Premium software engineering and technical architecture by Mindx Technologies." />

      {/* ══ 1. ADVANCED CLEAN HERO SECTION ══ */}
      <section className="relative flex flex-col justify-center items-center text-center px-4 pt-40 pb-20 overflow-hidden bg-white dark:bg-[#09090b]">
        
        {/* Advanced Ambient Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Top Fade */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-zinc-50 dark:from-zinc-900/50 to-transparent" />
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.25]" />
          {/* Premium Spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-gradient-to-b from-blue-500/10 to-transparent blur-[100px] pointer-events-none opacity-50 dark:opacity-30" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          
          <FadeIn direction="down" delay={0.1} className="relative">
            <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-extrabold tracking-tighter text-zinc-900 dark:text-white mb-2 md:mb-4 leading-[1.05]">
              Engineering{' '}
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 animate-gradient-x">
                Excellence.
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.4}>
            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto">
              We architect, design, and engineer <strong className="font-semibold text-zinc-800 dark:text-zinc-200">mission-critical</strong> software solutions. From high-concurrency cloud systems to sleek mobile interfaces.
            </p>
          </FadeIn>
        </div>

        {/* Bottom Decorative Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent opacity-50" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        
        {/* ══ 2. ASYMMETRICAL WEB & SAAS SECTION ══ */}
        <section id="web-saas" className="relative scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text */}
            <div className="lg:col-span-5 space-y-6">
              <FadeIn direction="left" delay={0.1}>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-100 dark:border-blue-500/20">
                  <Code size={28} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                  Web & SaaS Platform Engineering
                </h2>
              </FadeIn>
              
              <FadeIn direction="left" delay={0.2}>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-lg">
                  We build fault-tolerant web apps and multi-tenant SaaS ecosystems. Every application is engineered for zero downtime and infinite horizontal scaling.
                </p>
              </FadeIn>
            </div>

            {/* Right Column: Bento Grid Features */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FadeIn direction="right" delay={0.3} className="h-full">
                <div className="h-full p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 transition-all hover:shadow-lg hover:border-blue-500/30 group">
                  <Server size={24} className="text-zinc-400 group-hover:text-blue-500 mb-4 transition-colors" />
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Frontend Architecture</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                    Strictly typed TypeScript, Zustand state management, and highly optimized React rendering loops.
                  </p>
                  <ul className="space-y-2 mt-auto">
                    <li className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"><CheckCircle2 size={14} className="text-blue-500" /> React & Next.js SSR</li>
                    <li className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"><CheckCircle2 size={14} className="text-blue-500" /> Instant edge rendering</li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={0.4} className="h-full">
                <div className="h-full p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 transition-all hover:shadow-lg hover:border-blue-500/30 group">
                  <Database size={24} className="text-zinc-400 group-hover:text-blue-500 mb-4 transition-colors" />
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Backend & Scaling</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                    Stateless JWT authentication, automated rate-limiting, and distributed microservices architecture.
                  </p>
                  <ul className="space-y-2 mt-auto">
                    <li className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"><CheckCircle2 size={14} className="text-blue-500" /> Node.js Microservices</li>
                    <li className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"><CheckCircle2 size={14} className="text-blue-500" /> PostgreSQL & Redis caching</li>
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <hr className="border-zinc-200 dark:border-zinc-800/50" />

        {/* ══ 3. MOBILE APPS & AI SECTION (DUAL COLUMN) ══ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Mobile Apps Container */}
          <FadeIn direction="up" delay={0.1} className="flex">
            <div id="mobile" className="scroll-mt-32 flex flex-col p-10 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 hover:shadow-xl transition-all relative overflow-hidden group w-full">
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-zinc-200/50 dark:bg-zinc-800 flex items-center justify-center mb-6">
                  <Smartphone size={24} className="text-zinc-700 dark:text-zinc-300" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3">Native Mobile Apps</h2>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 flex-grow">
                  Silky smooth 120fps mobile experiences engineered with React Native and native iOS/Android SDKs. We deploy directly to App Stores with strict automated CI/CD checks.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
                  <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center gap-3">
                    <Zap size={18} className="text-blue-500 shrink-0" />
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Cross-Platform React Native</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center gap-3">
                    <Lock size={18} className="text-blue-500 shrink-0" />
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Biometric & Offline Cache</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* AI & LLM "Dark Mode" Card (Always Dark for contrast) */}
          <FadeIn direction="down" delay={0.2} className="flex">
            <div id="ai-llm" className="scroll-mt-32 flex flex-col p-10 rounded-[2rem] bg-zinc-950 border border-indigo-500/30 shadow-[0_0_40px_rgba(99,102,241,0.15)] relative overflow-hidden group w-full">
              {/* Internal Glowing Orb */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-indigo-500/30 transition-all duration-700" />
              
              <div className="relative z-10 flex flex-col h-full text-white">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6 border border-indigo-500/30">
                  <BrainCircuit size={24} className="text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight mb-3">AI & Custom LLM Integrations</h2>
                <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
                  Embed intelligent autonomous workflows directly into your enterprise software. We build Retrieval-Augmented Generation (RAG) pipelines and fine-tune models on your data.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <Database size={18} className="text-indigo-400 shrink-0" />
                    <span className="text-xs font-bold text-zinc-200">Pinecone & pgvector</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <BrainCircuit size={18} className="text-indigo-400 shrink-0" />
                    <span className="text-xs font-bold text-zinc-200">OpenAI & Gemini APIs</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

        </section>

        {/* ══ 4. CLOUD INFRASTRUCTURE ══ */}
        <section id="cloud" className="relative scroll-mt-32">
          <FadeIn scale>
            <div className="p-12 md:p-16 rounded-[2.5rem] bg-zinc-900 dark:bg-zinc-900 text-white flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative shadow-2xl">
              {/* Aesthetic Background styling */}
              <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              
              <div className="relative z-10 lg:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-400/20">
                  <Cloud size={14} /> Cloud & DevOps
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">Zero-Downtime AWS Scaling</h2>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
                  We deploy containerized Kubernetes clusters and serverless architectures on AWS and Google Cloud, accompanied by automated CI/CD pipelines and 24/7 security monitoring.
                </p>
              </div>

              <div className="relative z-10 lg:w-1/2 flex flex-col gap-4 w-full">
                {['Docker & Kubernetes Containerization', 'Terraform Infrastructure as Code', 'Automated CI/CD Pipelines'].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={20} className="text-blue-400" />
                    </div>
                    <span className="font-semibold text-zinc-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ══ 5. ENGAGEMENT MODELS ══ */}
        <section className="py-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeIn direction="up">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">Flexible Engagement Models</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg">Partner with us in the way that best suits your project scale and organizational structure.</p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <FadeIn direction="left" delay={0.1} className="flex">
              <div className="flex flex-col p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all w-full">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Fixed-Price Sprints</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 flex-grow">
                  Defined milestone scopes with transparent pricing. Ideal for MVP prototypes and specific feature launches with strict deadlines.
                </p>
                <div className="h-1 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-full mt-auto" />
              </div>
            </FadeIn>

            <FadeIn scale delay={0.2} className="flex">
              <div className="flex flex-col p-8 rounded-3xl bg-zinc-950 text-white border border-blue-500/40 shadow-2xl relative w-full transform md:-translate-y-4">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-[10px] font-bold uppercase tracking-widest">Recommended</div>
                <h3 className="text-xl font-bold mb-3 mt-2">Dedicated Engineering Pods</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6 flex-grow">
                  Embed our cohesive team of architects, frontend developers, and QA engineers directly into your internal product workflow.
                </p>
                <div className="h-1 w-12 bg-blue-500 rounded-full mt-auto" />
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.3} className="flex">
              <div className="flex flex-col p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all w-full">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Architecture Advisory</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 flex-grow">
                  High-level code audits, database optimization, and cloud cost reduction consulting for existing platforms.
                </p>
                <div className="h-1 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-full mt-auto" />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══ 6. EMPHATIC CTA ══ */}
        <section className="pb-10">
          <FadeIn scale delay={0.2}>
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 dark:from-zinc-900 dark:via-blue-950/40 dark:to-zinc-900 border border-blue-500/20 dark:border-zinc-800 px-8 py-20 text-center shadow-2xl dark:shadow-[0_0_50px_rgba(37,99,235,0.15)]">
              {/* Glassmorphic overlays */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 dark:opacity-5" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white dark:text-white tracking-tight mb-6">
                  Have a custom architecture requirement?
                </h2>
                <p className="text-blue-100 dark:text-zinc-400 text-lg mb-10 leading-relaxed">
                  Schedule a direct technical breakdown with our founder and lead systems architect to discuss your platform's future.
                </p>
                <Link 
                  to="/start-project" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-zinc-100 text-blue-600 dark:text-zinc-900 font-bold text-lg hover:bg-zinc-100 dark:hover:bg-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] group"
                >
                  Discuss Your Architecture
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </section>

      </div>
    </div>
  );
}

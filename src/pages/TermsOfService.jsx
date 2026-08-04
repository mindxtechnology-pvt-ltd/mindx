import SEO from '../components/seo/SEO';
import FadeIn from '../components/layout/FadeIn';
import { ShieldAlert, AlertTriangle, Copyright, Server, Code2, Repeat, Clock, Cpu, Scale } from 'lucide-react';

const terms = [
  { id: 'ip', icon: Copyright, title: '1. Intellectual Property & Proprietary Software', content: <><p className="mb-6 leading-relaxed">Mindx Technologies retains exclusive ownership of all intellectual property rights associated with its internal SaaS ecosystems, including <strong className="text-zinc-900 dark:text-white">YatraMind</strong> and <strong className="text-zinc-900 dark:text-white">Freedom Bazar</strong>.</p><div className="p-5 rounded-2xl bg-red-50/80 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-800 dark:text-red-300 flex gap-4 items-start"><ShieldAlert size={20} className="shrink-0 mt-0.5 text-red-600 dark:text-red-400" /><div><strong className="block font-extrabold mb-1.5 text-red-900 dark:text-red-200 uppercase tracking-widest text-[10px]">Zero-Tolerance Plagiarism Policy</strong><span className="leading-relaxed text-sm">Unauthorized reverse-engineering, cloning, scraping, or redistribution of our proprietary software will result in immediate DMCA takedown actions and international civil litigation.</span></div></div></> },
  { id: 'security', icon: Server, title: '2. System Security & YatraMind API Abuse', content: <p className="leading-relaxed">Users are strictly forbidden from executing automated scripts, scrapers, or prompt-injection exploits against YatraMind or our underlying LLM routing infrastructure. Any penetration attempts or artificial latency generation triggers an automated permanent global IP ban and cybercrime reporting.</p> },
  { id: 'custom-work', icon: Code2, title: '3. Custom Engineering & Background IP', content: <p className="leading-relaxed">Upon final milestone settlement, clients receive full ownership of delivered custom application code. However, Mindx Technologies retains rights to pre-existing Background IP (internal boilerplates, architectural patterns, and utility modules). The client is granted a perpetual, non-exclusive license to use this Background IP within the delivered software.</p> },
  { id: 'refunds', icon: Repeat, title: '4. Non-Refundable Custom Work', content: <p className="leading-relaxed">Due to irreversible resource allocation during custom software sprints, all deposit commitments and retainer settlements are <strong className="text-zinc-900 dark:text-white">strictly non-refundable</strong> once development commences. Scope creep outside the signed technical blueprint requires an authorized Change Order.</p> },
  { id: 'abandonment', icon: Clock, title: '5. Project Abandonment', content: <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-300 flex gap-4 items-start"><AlertTriangle size={20} className="shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" /><div><strong className="block font-extrabold mb-1.5 text-amber-900 dark:text-amber-200 uppercase tracking-widest text-[10px]">30-Day Inactivity Protocol</strong><span className="leading-relaxed text-sm">If a client delays feedback, API credentials, or approvals for over 30 consecutive days without formal notice, the project is classified as formally abandoned. Mindx reserves the right to archive repositories and forfeit milestone retainers to reallocate engineering bandwidth.</span></div></div> },
  { id: 'ai', icon: Cpu, title: '6. Third-Party AI & API Disclaimer', content: <p className="leading-relaxed">Applications relying on external artificial intelligence providers (OpenAI, Google Gemini, AWS) are subject to third-party uptime SLAs and rate limits. Mindx Technologies is not liable for downstream outages or generative inaccuracies originating from third-party LLM providers.</p> },
  { id: 'law', icon: Scale, title: '7. Governing Law & Jurisdiction', content: <p className="leading-relaxed">These Terms are governed by the technological and commercial statutes of Nepal. Any formal legal dispute shall be resolved under the exclusive jurisdiction of courts located in Sunsari, Nepal.</p> }
];

export default function TermsOfService() {
  return (
    <div className="overflow-hidden text-zinc-900 dark:text-zinc-100 pt-16 pb-32 sm:pt-24 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <SEO title="Terms of Service | MindX Technologies" description="Legal terms of service, IP protections, and custom software contracts for Mindx Technologies." />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Minimal Hero */}
        <header className="mb-20 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
          
          <FadeIn direction="up" delay={100} className="flex justify-center mb-6">
             <div className="px-4 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-[10px] font-bold tracking-[0.2em] text-zinc-500 dark:text-zinc-400 uppercase">
               Legal Framework
             </div>
          </FadeIn>
          
          <FadeIn direction="up" delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-6 text-zinc-900 dark:text-white leading-[1.1]">
              Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Service.</span>
            </h1>
            <p className="text-base text-zinc-500 dark:text-zinc-400 font-medium">Last Updated: October 2026</p>
          </FadeIn>
        </header>

        {/* Introduction */}
        <FadeIn direction="up" delay={300} className="mb-12">
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium text-center max-w-2xl mx-auto">
            By engaging Mindx Technologies for software engineering services, accessing our proprietary platforms, or utilizing this domain, you agree to be bound by these strict Terms of Service.
          </p>
        </FadeIn>

        {/* Stacked Cards */}
        <div className="space-y-6">
          {terms.map((term, i) => {
            const Icon = term.icon;
            return (
              <FadeIn key={term.id} direction="up" delay={100} staggerIndex={i}>
                <div className="p-8 md:p-10 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  
                  {/* Subtle Background Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start relative z-10">
                     <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                       <Icon size={22} />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4">{term.title}</h3>
                       <div className="text-zinc-600 dark:text-zinc-400 text-[15px] font-medium">
                         {term.content}
                       </div>
                     </div>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
        
      </div>
    </div>
  );
}

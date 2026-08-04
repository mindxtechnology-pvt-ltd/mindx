import SEO from '../components/seo/SEO';
import FadeIn from '../components/layout/FadeIn';
import { ShieldAlert, Database, Eye, Scale } from 'lucide-react';

const policies = [
  { id: 'collection', icon: Eye, title: '1. Information Collection', content: <p className="leading-relaxed">We collect direct technical parameters and professional contact info voluntarily supplied when you submit project specifications, schedule discovery calls, or engage our contract workflows.</p> },
  { id: 'usage', icon: Database, title: '2. Usage of Information', content: <p className="leading-relaxed">Information supplied is strictly utilized to evaluate engineering scope, execute service contracts, maintain SLA communication, and improve software delivery pipelines. We never monetize or distribute client data.</p> },
  { id: 'liability', icon: Scale, title: '3. Client Data Liability (Data Processor Status)', content: <><p className="mb-6 leading-relaxed">When Mindx Technologies architects custom software, mobile applications, or cloud databases for an enterprise client, the client acts as the legal <strong className="text-zinc-900 dark:text-white">Data Controller</strong> under GDPR, CCPA, and global privacy mandates. Mindx Technologies operates strictly as the <strong className="text-zinc-900 dark:text-white">Data Processor</strong> or technical architect.</p><div className="p-5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-800 dark:text-indigo-300 flex gap-4 items-start"><ShieldAlert size={20} className="shrink-0 mt-0.5 text-indigo-600 dark:text-indigo-400" /><div><strong className="block font-extrabold mb-1.5 text-indigo-900 dark:text-indigo-200 uppercase tracking-widest text-[10px]">Strict Liability Disclaimer</strong><span className="leading-relaxed text-sm">Mindx Technologies explicitly disclaims liability for how a client collects, stores, secures, or monetizes end-user Personally Identifiable Information (PII). It is the sole legal obligation of the client to ensure their production software complies with international data regulations, publish independent privacy notices, and secure their environment post-deployment.</span></div></div></> }
];

export default function PrivacyPolicy() {
  return (
    <div className="overflow-hidden text-zinc-900 dark:text-zinc-100 pt-16 pb-32 sm:pt-24 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <SEO title="Privacy Policy | MindX Technologies" description="Privacy Policy and Data Processor liability specifications for Mindx Technologies." />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Minimal Hero */}
        <header className="mb-20 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
          
          <FadeIn direction="up" delay={100} className="flex justify-center mb-6">
             <div className="px-4 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-[10px] font-bold tracking-[0.2em] text-zinc-500 dark:text-zinc-400 uppercase">
               Data Protection
             </div>
          </FadeIn>
          
          <FadeIn direction="up" delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-6 text-zinc-900 dark:text-white leading-[1.1]">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Policy.</span>
            </h1>
            <p className="text-base text-zinc-500 dark:text-zinc-400 font-medium">Last Updated: October 2026</p>
          </FadeIn>
        </header>

        {/* Introduction */}
        <FadeIn direction="up" delay={300} className="mb-12">
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium text-center max-w-2xl mx-auto">
            At Mindx Technologies, we safeguard enterprise and personal data with strict architectural precision. This Privacy Policy explains our collection, usage, and processor responsibilities when you visit our web domain or engage our engineering services.
          </p>
        </FadeIn>

        {/* Stacked Cards */}
        <div className="space-y-6">
          {policies.map((policy, i) => {
            const Icon = policy.icon;
            return (
              <FadeIn key={policy.id} direction="up" delay={100} staggerIndex={i}>
                <div className="p-8 md:p-10 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  
                  {/* Subtle Background Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start relative z-10">
                     <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                       <Icon size={22} />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4">{policy.title}</h3>
                       <div className="text-zinc-600 dark:text-zinc-400 text-[15px] font-medium">
                         {policy.content}
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

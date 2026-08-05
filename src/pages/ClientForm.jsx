import SEO from '../components/seo/SEO';
import FadeIn from '../components/layout/FadeIn';
import { ArrowRight, ShieldCheck, Zap, Lock } from 'lucide-react';
import { useRef, useState } from 'react';
import { submitMessage } from '../utils/api';
import { checkRateLimit } from '../utils/rateLimiter';

export default function ClientForm() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    
    // Check Rate Limit (Max 3 per 24 hours per IP)
    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      alert(rateLimit.message);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(form.current);
    
    const payload = {
      name: `${formData.get('First_Name')} ${formData.get('Last_Name')}`,
      email: formData.get('Email'),
      subject: `New Project Request: ${formData.get('Project_Type')}`,
      message: `Company/Startup: ${formData.get('Company') || 'N/A'}\nEstimated Budget: ${formData.get('Estimated_Budget')}\nTechnical Domain: ${formData.get('Project_Type')}\n\nTechnical Specifications:\n${formData.get('Description')}`
    };

    try {
      await submitMessage(payload);
      alert("Success! Your technical specifications have been submitted. An architect will reach out shortly.");
      form.current.reset();
    } catch (error) {
      console.error("API submission error:", error);
      alert('Failed to transmit specifications to our team. Please check your connection or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-x-hidden text-zinc-900 dark:text-zinc-100 pt-4 pb-12 sm:pt-6 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <SEO title="Start a Project" description="Submit your project specifications to partner with Mindx Technologies." />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-16 lg:pt-24 items-center">
        
        {/* Left Column: Hero & Trust Indicators */}
        <div className="lg:col-span-5 flex flex-col items-start relative z-10">
          <div className="absolute top-0 -left-20 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
          
          <FadeIn blur delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800 backdrop-blur-md mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[11px] font-bold tracking-[0.2em] text-zinc-700 dark:text-zinc-300 uppercase">
                New Project Evaluation
              </span>
            </div>
          </FadeIn>

          <FadeIn blur delay={0.2}>
            <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-extrabold tracking-tighter text-zinc-900 dark:text-white mb-6 leading-[1.05]">
              Start a{' '}
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
                Project.
              </span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed mb-12 max-w-md">
              Tell us about your technical vision. Complete the questionnaire and our engineering architects will review your parameters within 4 business hours.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.4} className="space-y-6">
            <div className="flex items-center gap-5 group">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Mutual NDA Protected</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Your IP is secured before we even talk.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-5 group">
              <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
                <Zap size={20} className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Fixed-Price Sprint Guarantee</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">No unexpected hourly billing surprises.</p>
              </div>
            </div>

            <div className="flex items-center gap-5 group">
              <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center shrink-0">
                <Lock size={20} className="text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Zero Vendor Lock-in</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">You own 100% of the source code and IP.</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Advanced Form */}
        <FadeIn direction="left" delay={0.2} className="lg:col-span-7">
          <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none"></div>

            <form ref={form} onSubmit={sendEmail} className="space-y-6 relative z-10">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">First Name *</label>
                  <input required type="text" name="First_Name" placeholder="Alexander" className="w-full px-5 py-4 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800/80 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium shadow-inner" />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Last Name *</label>
                  <input required type="text" name="Last_Name" placeholder="Wright" className="w-full px-5 py-4 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800/80 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium shadow-inner" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Work Email *</label>
                  <input required type="email" name="Email" placeholder="alex@enterprise.com" className="w-full px-5 py-4 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800/80 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium shadow-inner" />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Organization / Startup</label>
                  <input type="text" name="Company" placeholder="Nexus Technologies Inc." className="w-full px-5 py-4 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800/80 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium shadow-inner" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Engineering Domain *</label>
                  <select required name="Project_Type" className="w-full px-5 py-4 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800/80 text-sm text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium cursor-pointer shadow-inner appearance-none">
                    <option value="" className="bg-white dark:bg-zinc-900">Select a technical domain...</option>
                    <option value="web" className="bg-white dark:bg-zinc-900">Web Application / Distributed SaaS</option>
                    <option value="mobile" className="bg-white dark:bg-zinc-900">Native Mobile App (iOS / Android)</option>
                    <option value="ai" className="bg-white dark:bg-zinc-900">Generative AI / Custom LLM Integration</option>
                    <option value="cloud" className="bg-white dark:bg-zinc-900">Cloud Architecture / DevOps Scaling</option>
                    <option value="other" className="bg-white dark:bg-zinc-900">Other Enterprise Solution</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Estimated Budget Allocation *</label>
                  <select required name="Estimated_Budget" className="w-full px-5 py-4 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800/80 text-sm text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium cursor-pointer shadow-inner appearance-none">
                    <option value="" className="bg-white dark:bg-zinc-900">Select estimated range (USD)...</option>
                    <option value="$5k - $10k" className="bg-white dark:bg-zinc-900">$5,000 - $10,000 (MVP Prototype)</option>
                    <option value="$10k - $50k" className="bg-white dark:bg-zinc-900">$10,000 - $50,000 (Growth Scaling)</option>
                    <option value="$50k+" className="bg-white dark:bg-zinc-900">$50,000+ (Enterprise Architecture)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Technical Specifications & Problem Scope *</label>
                <textarea required name="Description" rows={5} placeholder="Detail your target architecture, anticipated user concurrency, required third-party integrations, and projected launch timeline..." className="w-full px-5 py-4 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800/80 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium shadow-inner resize-none"></textarea>
              </div>

              <div className="pt-4">
                <button type="submit" disabled={isSubmitting} className="group w-full py-5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-extrabold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-zinc-900/20 dark:shadow-white/20 flex items-center justify-center gap-3 overflow-hidden relative disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? 'Transmitting...' : 'Submit Technical Specifications'} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                </button>
              </div>
            </form>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

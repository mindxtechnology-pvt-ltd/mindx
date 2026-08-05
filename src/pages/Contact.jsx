import SEO from '../components/seo/SEO';
import FadeIn from '../components/layout/FadeIn';
import { Mail, MapPin, Phone, Terminal, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { submitMessage } from '../utils/api';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      name: data.Name,
      email: data.Email,
      message: data.Message,
      subject: 'Discovery Call Request',
    };

    try {
      await submitMessage(payload);
      setIsSubmitted(true);
      e.target.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to transmit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-x-hidden text-zinc-900 dark:text-zinc-100 pt-4 pb-12 sm:pt-6 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <SEO title="Contact Us" description="Get in touch with Mindx Technologies to discuss your next mission-critical engineering project." />

      {/* Premium Hero Section */}
      <section className="max-w-6xl mx-auto pt-20 pb-16 text-left flex flex-col items-start isolate relative">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-blue-500/10 dark:bg-blue-500/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <FadeIn blur delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 backdrop-blur-md mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[11px] font-bold tracking-[0.2em] text-zinc-700 dark:text-zinc-300 uppercase">
              Direct Communication
            </span>
          </div>
        </FadeIn>
        
        <FadeIn blur delay={0.2} className="relative w-full">
          <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-extrabold tracking-tighter text-zinc-900 dark:text-white mb-6 leading-[1.05] max-w-4xl">
            Let's{' '}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 animate-gradient-x">
              Connect.
            </span>
          </h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.3}>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed max-w-2xl">
            Have an enterprise software requirement or proprietary SaaS vision? Let's discuss how our elite engineering team can architect it for infinite scale.
          </p>
        </FadeIn>
      </section>

      {/* Main Content Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-24 max-w-6xl mx-auto relative isolate">
        
        {/* Left Column: Contact Details (Bento style) */}
        <div className="lg:col-span-5 space-y-6">
          <FadeIn direction="right" delay={150}>
            <div className="p-8 sm:p-10 rounded-[2rem] bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 dark:from-zinc-900 dark:via-blue-950/40 dark:to-zinc-900 text-white shadow-xl dark:shadow-[0_0_40px_rgba(37,99,235,0.15)] border border-transparent dark:border-zinc-800 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 dark:bg-blue-500/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-xl sm:text-2xl font-extrabold mb-3">Skip the waiting queue.</h3>
              <p className="text-sm text-blue-100 dark:text-zinc-400 mb-8 leading-relaxed max-w-sm">Want to move rapidly? Request a direct 15-minute technical discovery call with our founder.</p>
              <a href="mailto:mindxtechnologyy@gmail.com?subject=Discovery%20Call%20Request" className="inline-flex items-center justify-between w-full px-6 py-4 rounded-full bg-white dark:bg-zinc-100 text-blue-700 dark:text-zinc-900 text-sm font-bold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg group-hover:shadow-white/25">
                <span>Book Discovery Call</span> 
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-100 flex items-center justify-center text-blue-700">
                  <ArrowRight size={16} />
                </div>
              </a>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={250}>
            <div className="p-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 shadow-sm space-y-6 hover:shadow-xl transition-shadow duration-500">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-6">Contact Channels</h3>
              
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-2xl bg-white dark:bg-zinc-800/80 text-blue-600 dark:text-blue-400 shadow-sm shrink-0 border border-zinc-200/50 dark:border-zinc-700/50 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-colors duration-300"><Phone size={20} /></div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">Phone</h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">+977-9812345678</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-2xl bg-white dark:bg-zinc-800/80 text-blue-600 dark:text-blue-400 shadow-sm shrink-0 border border-zinc-200/50 dark:border-zinc-700/50 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-colors duration-300"><Mail size={20} /></div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">Email</h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">mindxtechnologyy@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-2xl bg-white dark:bg-zinc-800/80 text-blue-600 dark:text-blue-400 shadow-sm shrink-0 border border-zinc-200/50 dark:border-zinc-700/50 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-colors duration-300"><MapPin size={20} /></div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">Headquarters</h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Kerabari 10 morang</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Advanced Premium Form */}
        <FadeIn direction="left" delay={200} className="lg:col-span-7">
          <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl backdrop-blur-xl relative overflow-hidden h-full flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none"></div>
            
            <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-3 tracking-tight">Send an Inquiry</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 font-medium">We typically review technical inquiries within <span className="text-blue-600 dark:text-blue-400 font-bold">4 business hours</span>.</p>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <input type="hidden" name="_subject" value="New Enterprise Inquiry from Mindx Tech!" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Your Name</label>
                  <input type="text" name="Name" required placeholder="Executive / Founder Name" className="w-full px-5 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium shadow-inner" />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Work Email</label>
        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <FadeIn direction="left" delay={200}>
            {isSubmitted ? (
              <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[500px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                
                <div className="w-24 h-24 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                  <CheckCircle2 size={48} className="text-green-600 dark:text-green-400 relative z-10" />
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">Message Sent</h3>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-10 leading-relaxed">
                  Your inquiry has been successfully transmitted to our team. We'll get back to you shortly.
                </p>
                
                <button 
                  onClick={() => setIsSubmitted(false)} 
                  className="px-8 py-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white text-sm font-bold tracking-widest uppercase hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none"></div>
                
                <div className="mb-10 relative z-10">
                  <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-3">Send us a message</h2>
                  <p className="text-zinc-500 dark:text-zinc-400">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Full Name *</label>
                    <input required type="text" name="Name" placeholder="John Doe" className="w-full px-5 py-4 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800/80 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium shadow-inner" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Email Address *</label>
                    <input required type="email" name="Email" placeholder="john@company.com" className="w-full px-5 py-4 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800/80 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium shadow-inner" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Your Message *</label>
                    <textarea required name="Message" rows={5} placeholder="How can we help you?" className="w-full px-5 py-4 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800/80 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium shadow-inner resize-none"></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" disabled={isSubmitting} className="group w-full py-5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-extrabold uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-zinc-900/20 dark:shadow-white/20 flex items-center justify-center gap-3 overflow-hidden relative disabled:opacity-50 disabled:cursor-not-allowed">
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? 'Sending...' : 'Send Message'} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Advanced FAQ Section */}
      <section className="pt-20 border-t border-zinc-200/80 dark:border-zinc-800/80 max-w-4xl mx-auto">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tighter">Frequently Asked Questions</h2>
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">Common procedural clarifications for our global technical partners.</p>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {[
            { q: 'Do you work with startups or only enterprise clients?', a: 'Both. We partner with funded startups to architect resilient MVPs from day one, and we work with enterprise clients on high-concurrency integrations and legacy refactoring.' },
            { q: 'How do you structure project pricing?', a: 'We operate on a transparent milestone or sprint basis rather than unpredictable hourly billing. This guarantees strict budget predictability.' },
            { q: 'Do you offer project refunds?', a: 'Due to the irreversible resource allocation of custom software engineering, all milestone deposits and sprint commitments are strictly non-refundable once development initiates.' },
            { q: 'Can we hire your engineers on a full-time staff augmentation basis?', a: 'No. Mindx operates as a dedicated technical partner rather than a staffing agency. You engage our full engineering standards, QA infrastructure, and leadership as a cohesive delivery unit.' }
          ].map((faq, i) => (
            <FadeIn key={i} direction="up" staggerIndex={i} delay={150}>
              <details className="group rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-6 transition-all cursor-pointer hover:border-blue-500/30 hover:shadow-lg overflow-hidden relative">
                <summary className="flex justify-between items-center font-bold text-base sm:text-lg text-zinc-900 dark:text-white list-none outline-none z-10 relative">
                  {faq.q}
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 group-open:bg-blue-600 dark:group-open:bg-blue-600 group-open:text-white transition-colors duration-300 ml-4">
                    <span className="text-lg leading-none transition-transform duration-300 group-open:rotate-45">+</span>
                  </div>
                </summary>
                <div className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-4 leading-relaxed pr-8 z-10 relative">
                  {faq.a}
                </div>
                {/* Subtle open background glow */}
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-open:opacity-100 transition-opacity duration-300 z-0"></div>
              </details>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}

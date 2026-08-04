import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import SEO from '../components/seo/SEO';
import {
  ArrowRight,
  TrendingUp,
  Globe,
  Layers,
  Settings,
  Users,
  Box,
  BrainCircuit,
  Cloud,
  ChevronRight,
  CheckCircle2,
  Cpu,
  Shield,
  Zap,
  Lock,
  Search,
  PenTool,
  Code2,
  Rocket,
  Star,
  ChevronLeft,
  Quote,
  ChevronDown,
  Plus,
  Minus
} from 'lucide-react';

/* ─── Animated counter hook ─── */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime;
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing function (easeOutQuart)
        const easeProgress = 1 - Math.pow(1 - percentage, 4);
        setCount(Math.floor(easeProgress * target));

        if (progress < duration) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [isInView, target, duration]);

  return { count, ref };
}

/* ─── Reusable Animated Components ─── */
const FadeIn = ({ children, delay = 0, direction = "up", className = "", scale = false, blur = false }) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction],
        ...(scale && { scale: 0.92 }),
        ...(blur && { filter: 'blur(12px)' })
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        ...(scale && { scale: 1 }),
        ...(blur && { filter: 'blur(0px)' })
      }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.21, 0.47, 0.32, 0.98], // Custom smooth ease
        delay: delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ════════════════════════════════════════
   ADVANCED PREMIUM HOMEPAGE
════════════════════════════════════════ */
export default function Home() {
  const { scrollYProgress } = useScroll();
  const ySpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroY = useTransform(ySpring, [0, 1], [0, 300]);
  
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const { count: projectsCount, ref: projectsRef } = useCounter(450);
  const { count: uptimeCount, ref: uptimeRef } = useCounter(99);

  const testimonials = [
    { quote: "MindX delivered our enterprise platform months ahead of schedule. The code quality is flawless.", author: "Sarah Jenkins", role: "Verified Proprietor - 2 Jul 2026", initial: "S" },
    { quote: "The architectural decisions they made allowed us to scale from 10k to 1M users without a hiccup.", author: "David Chen", role: "Verified Proprietor - 1 Jul 2026", initial: "D" },
    { quote: "Their mastery of React and Node is unmatched. The UI feels like butter.", author: "Elena Rostova", role: "Verified Proprietor - 28 Jun 2026", initial: "E" },
    { quote: "Partnering with MindX was the best technical decision we made this year.", author: "Marcus Thorne", role: "Verified Proprietor - 15 Jun 2026", initial: "M" },
    { quote: "They didn't just build what we asked for, they architected a solution that redefined our business.", author: "Priya Patel", role: "Verified Proprietor - 10 Jun 2026", initial: "P" },
    { quote: "Lightning fast, beautiful, and completely reliable. True engineering craftsmen.", author: "Alex Mercer", role: "Verified Proprietor - 1 Jun 2026", initial: "A" }
  ];

  const [faqIndex, setFaqIndex] = useState(0);

  const faqs = [
    { question: "What is your typical engagement model?", answer: "We offer flexible engagement models tailored to your needs. This includes dedicated engineering teams, project-based delivery with fixed scopes, and strategic staff augmentation to accelerate your existing roadmaps." },
    { question: "How do you ensure the security and quality of the code?", answer: "Our methodology includes rigorous code reviews, automated CI/CD testing pipelines, static analysis, and adherence to enterprise-grade security standards (like SOC2 compliance patterns) before any deployment." },
    { question: "Can you integrate AI into our existing legacy systems?", answer: "Absolutely. We specialize in modernizing legacy infrastructure by seamlessly integrating advanced AI primitives, automated RAG pipelines, and intelligent data layers without disrupting your core business operations." },
    { question: "What is the typical timeline for an enterprise SaaS deployment?", answer: "While timelines vary based on complexity, our agile sprint methodology typically allows us to deliver a robust Minimum Viable Product (MVP) within 8 to 12 weeks, followed by continuous iterative scaling." },
    { question: "Do you provide post-launch support and infrastructure maintenance?", answer: "Yes, we offer comprehensive post-launch SLA support, 24/7 continuous telemetry monitoring, and infrastructure scaling services to ensure your application remains highly performant and secure." },
    { question: "What technologies do you specialize in?", answer: "We focus on modern, scalable primitives. Our core stack includes React, Next.js, Node.js, Python, and cloud-native orchestration with Kubernetes on AWS or GCP, alongside cutting-edge LLMs for AI features." },
    { question: "Do you offer UI/UX design services as part of development?", answer: "Yes. Our team includes world-class product designers who work alongside our engineers to ensure that every pixel is perfect, intuitive, and adheres to premium modern design standards." }
  ];

  return (
    <div className="overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans selection:bg-blue-500 selection:text-white">
      <SEO title="Home | MindX Technologies" />

      {/* ══ 1. ULTRA-CLEAN HERO ══ */}
      <section className="relative min-h-[90vh] pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col justify-center overflow-hidden border-b border-zinc-100 dark:border-zinc-800/80">
        
        {/* Extremely subtle grid background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-50 dark:opacity-40" />
        
        {/* Soft glowing orb */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[150px] pointer-events-none" 
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Typography */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">

              <FadeIn direction="up" delay={0.2}>
                <h1 className="text-[4rem] sm:text-[5rem] lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-zinc-900 dark:text-white mb-8">
                  Engineering the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 animate-gradient-x">Future of Tech.</span>
                </h1>
              </FadeIn>

              <FadeIn direction="up" delay={0.3}>
                <p className="text-[17px] sm:text-[19px] text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg mb-10 font-medium">
                  We partner with visionary founders to architect and engineer the world's most elegant AI pipelines, SaaS platforms, and enterprise software experiences.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.4}>
                <div className="flex flex-wrap items-center gap-4">
                  <Link to="/start-project"
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-blue-600 text-white font-semibold shadow-[0_2px_10px_rgba(37,99,235,0.3)] transition-all hover:bg-blue-700 hover:shadow-[0_4px_15px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 gap-2 group">
                    Request Consultation
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link to="/services"
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 dark:hover:border-zinc-700 hover:border-zinc-300 shadow-sm hover:shadow hover:-translate-y-0.5">
                    Explore Our Process
                  </Link>
                </div>
              </FadeIn>
              
              <FadeIn direction="up" delay={0.5} className="mt-12 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                <div className="flex -space-x-2">
                  <img src="https://i.pravatar.cc/100?img=1" alt="User" className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900" />
                  <img src="https://i.pravatar.cc/100?img=2" alt="User" className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900" />
                  <img src="https://i.pravatar.cc/100?img=3" alt="User" className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900" />
                </div>
                <p>Trusted by 100+ innovative teams</p>
              </FadeIn>
            </div>

            {/* Abstract Visual / Clean Code Window */}
            <div className="lg:col-span-5 relative w-full h-full min-h-[400px] hidden lg:flex items-center justify-center">
              <FadeIn direction="none" scale blur delay={0.4} className="w-full relative">
                {/* Floating elements to create a highly refined composition */}
                <motion.div 
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl opacity-20 blur-xl"
                />
                
                <div className="relative w-full rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl shadow-zinc-200/50 dark:shadow-black/60 overflow-hidden flex flex-col">
                  {/* Window Header */}
                  <div className="h-12 border-b border-zinc-100 dark:border-zinc-800 flex items-center px-4 gap-2 bg-zinc-50 dark:bg-zinc-900/90">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400/80 dark:bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-400/80 dark:bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400/80 dark:bg-emerald-500/80" />
                    </div>
                    <div className="mx-auto px-4 py-1 rounded-md bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 text-[10px] font-mono text-zinc-400 flex items-center gap-2 shadow-sm">
                      <Lock size={10} className="text-emerald-500" /> deploy.mindx.tech
                    </div>
                  </div>
                  
                  {/* Code/Graph Content */}
                  <div className="p-6 bg-white dark:bg-zinc-900 flex-1 font-mono text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4">
                      <div className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 border border-emerald-100 dark:border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
                      </div>
                    </div>
                    
                    <p className="text-zinc-400 dark:text-zinc-500 mb-4">// System Architecture Initialization</p>
                    <p><span className="text-blue-500 dark:text-blue-400">import</span> {'{'} Engine, Pipeline {'}'} <span className="text-blue-500 dark:text-blue-400">from</span> <span className="text-emerald-600 dark:text-emerald-400">'@mindx/core'</span>;</p>
                    <p className="mt-2"><span className="text-blue-500 dark:text-blue-400">const</span> system = <span className="text-blue-500 dark:text-blue-400">new</span> Engine({'{'}</p>
                    <p className="ml-4 text-purple-600 dark:text-purple-400">scale<span className="text-zinc-600 dark:text-zinc-400">:</span> <span className="text-emerald-600 dark:text-emerald-400">'global'</span>,</p>
                    <p className="ml-4 text-purple-600 dark:text-purple-400">performance<span className="text-zinc-600 dark:text-zinc-400">:</span> <span className="text-emerald-600 dark:text-emerald-400">'optimal'</span>,</p>
                    <p className="ml-4 text-purple-600 dark:text-purple-400">security<span className="text-zinc-600 dark:text-zinc-400">:</span> <span className="text-blue-500 dark:text-blue-400">true</span></p>
                    <p>{'}'});</p>
                    
                    <div className="mt-6 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <Zap size={14} />
                        </div>
                        <div>
                          <p className="font-sans font-bold text-zinc-900 dark:text-white text-sm">Deployment Ready</p>
                          <p className="font-sans text-[10px] text-zinc-500 dark:text-zinc-400">All tests passed in 0.4s</p>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-zinc-400" />
                    </div>
                  </div>
                </div>
                
                {/* Floating Metric Card */}
                <motion.div 
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xl shadow-zinc-200/50 dark:shadow-black/60 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center border border-green-100 dark:border-green-500/20">
                     <TrendingUp size={16} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                     <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Efficiency</p>
                     <p className="font-bold text-lg text-zinc-900 dark:text-white">99.9%</p>
                  </div>
                </motion.div>

              </FadeIn>
            </div>
            
          </div>
        </div>
      </section>



      {/* ══ 3. ADVANCED BENTO GRID ══ */}
      <section className="py-32 relative bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800/80 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.03),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          
          <div className="mb-20 max-w-3xl mx-auto text-center">
            <FadeIn direction="up">
              <h2 className="text-[3rem] sm:text-[4.5rem] font-bold tracking-tighter text-zinc-900 dark:text-white leading-[1.1] mb-6">
                Architectural <span className="text-zinc-400 dark:text-zinc-500">Mastery.</span>
              </h2>
              <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed text-balance mx-auto">
                We engineer digital experiences with zero compromises, utilizing the most advanced primitives in modern software development.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[340px]">
            
            {/* Large Card: Software Engineering */}
            <FadeIn scale delay={0.1} className="md:col-span-2 lg:col-span-2 row-span-2 relative group overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 p-8 flex flex-col hover:shadow-2xl hover:shadow-zinc-200/40 dark:hover:shadow-black/60 dark:hover:border-blue-500/40 transition-all duration-500">
              <div className="relative z-10 flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center border border-zinc-200 dark:border-zinc-700/60">
                  <Box className="text-zinc-700 dark:text-zinc-300" size={18} />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Software Engineering</h3>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Enterprise Platforms & SaaS</p>
                </div>
              </div>

              {/* Realistic Dashboard Mockup */}
              <div className="relative flex-1 w-full bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden group-hover:-translate-y-1 transition-transform duration-500 shadow-sm mt-4">
                 {/* Mockup Toolbar */}
                 <div className="h-10 flex items-center justify-between px-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90">
                    <div className="flex gap-1.5">
                       <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 dark:bg-red-500/80" />
                       <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 dark:bg-amber-500/80" />
                       <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 dark:bg-emerald-500/80" />
                    </div>
                    <div className="text-[10px] font-mono font-medium text-zinc-400">api-gateway-prod</div>
                    <div className="w-4" />
                 </div>
                 {/* Mockup Content */}
                 <div className="flex-1 p-5 flex flex-col gap-6">
                    <div className="flex justify-between items-end">
                       <div>
                          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider mb-1">Latency</div>
                          <div className="text-2xl font-semibold text-zinc-900 dark:text-white leading-none">12<span className="text-sm text-zinc-400 ml-0.5">ms</span></div>
                       </div>
                       <div>
                          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider mb-1">Requests</div>
                          <div className="text-2xl font-semibold text-zinc-900 dark:text-white leading-none">4.2<span className="text-sm text-zinc-400 ml-0.5">k/s</span></div>
                       </div>
                       <div>
                          <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider mb-1">Error Rate</div>
                          <div className="text-2xl font-semibold text-zinc-900 dark:text-white leading-none">0.01<span className="text-sm text-zinc-400 ml-0.5">%</span></div>
                       </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col relative w-full h-full">
                       <div className="flex items-end gap-[2px] h-20 w-full mt-auto">
                          {[40, 70, 45, 90, 60, 80, 50, 100, 65, 85, 40, 70, 95, 60, 80, 55, 75, 45, 90, 65].map((h, i) => (
                             <motion.div 
                               key={i} 
                               initial={{ height: 10 }}
                               animate={{ height: `${h}%` }}
                               transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: i * 0.05 }}
                               className="flex-1 bg-blue-500/20 dark:bg-blue-500/30 hover:bg-blue-500/50 rounded-t-sm transition-colors"
                             />
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
            </FadeIn>

            {/* Medium Card: AI & ML */}
            <FadeIn direction="left" delay={0.2} className="md:col-span-2 lg:col-span-2 relative group overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 p-8 flex flex-col justify-between hover:shadow-2xl hover:shadow-zinc-200/40 dark:hover:shadow-black/60 dark:hover:border-purple-500/40 transition-all duration-500">
              <div className="relative z-10 flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center border border-purple-100/50 dark:border-purple-500/20">
                  <BrainCircuit className="text-purple-600 dark:text-purple-400" size={18} />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">AI & ML Systems</h3>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">LLMs & Intelligent Automation</p>
                </div>
              </div>
              
              {/* Realistic Terminal Fragment */}
              <div className="relative flex-1 w-full bg-zinc-950 dark:bg-zinc-950 rounded-2xl border border-zinc-800 p-6 font-mono text-[12px] text-zinc-300 flex flex-col justify-center group-hover:border-purple-500/30 transition-colors duration-500 shadow-xl overflow-hidden mt-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  <span className="text-purple-300/80 text-[10px] uppercase tracking-widest font-semibold">RAG Pipeline Active</span>
                </div>
                
                <div className="space-y-2 text-zinc-400">
                  <p><span className="text-zinc-600 dark:text-zinc-400">~</span> <span className="text-blue-400">model</span>.generate({'{'}</p>
                  <p className="pl-6">context: <span className="text-emerald-400">"vector_db_results"</span>,</p>
                  <p className="pl-6">temperature: <span className="text-orange-400">0.2</span>,</p>
                  <p className="pl-6">stream: <span className="text-orange-400">true</span></p>
                  <p>{'}'})</p>
                </div>
                
                <div className="mt-6 pt-5 border-t border-zinc-800/50">
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                    className="text-zinc-500 dark:text-zinc-400 flex items-center"
                  >
                    Processing embeddings<span className="inline-block w-2 h-4 bg-zinc-500 ml-2 animate-pulse" />
                  </motion.p>
                </div>
              </div>
            </FadeIn>

            {/* Small Card 1: Cloud Native */}
            <FadeIn direction="right" delay={0.3} className="md:col-span-1 lg:col-span-1 relative group overflow-hidden rounded-3xl bg-zinc-950 dark:bg-zinc-900/90 border border-zinc-800 dark:border-zinc-800/80 p-8 flex flex-col justify-between hover:border-zinc-700 dark:hover:border-sky-500/40 transition-all duration-500">
               <div className="relative z-10">
                 <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center border border-zinc-800 dark:border-zinc-700 mb-6 group-hover:-translate-y-1 transition-transform">
                   <Cloud className="text-zinc-400 dark:text-zinc-300" size={18} />
                 </div>
                 <h3 className="text-lg font-bold mb-2 tracking-tight text-white dark:text-white">Cloud Native</h3>
                 <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">Kubernetes orchestration for infinite, self-healing scale.</p>
               </div>
               
               <div className="mt-8 flex gap-1 h-16 items-end opacity-40 group-hover:opacity-100 transition-opacity w-full">
                 {[30,40,20,50,70,90,80,100].map((h, i) => (
                    <motion.div 
                      key={i} 
                      className="flex-1 bg-sky-500/80 rounded-t-sm" 
                      animate={{ height: [`${h}%`, `${h * 0.5}%`, `${h}%`] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                    />
                 ))}
               </div>
            </FadeIn>

            {/* Small Card 2: Performance */}
            <FadeIn direction="left" delay={0.4} className="md:col-span-1 lg:col-span-1 relative group overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 p-8 flex flex-col justify-between hover:shadow-2xl hover:shadow-zinc-200/40 dark:hover:shadow-black/60 dark:hover:border-yellow-500/40 transition-all duration-500">
               <div className="relative z-10">
                 <div className="w-10 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 flex items-center justify-center border border-zinc-200 dark:border-zinc-700/60 mb-6 group-hover:-translate-y-1 transition-transform">
                   <Zap className="text-yellow-500" size={18} />
                 </div>
                 <h3 className="text-lg font-bold mb-2 tracking-tight text-zinc-900 dark:text-white">Performance</h3>
                 <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">Sub-millisecond global response caching.</p>
               </div>
               
               <div className="mt-8 relative h-16 flex items-center w-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent blur-xl group-hover:opacity-100 opacity-0 transition-opacity" />
                  <div className="w-full h-[1px] bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                     <motion.div 
                       animate={{ x: ["-100%", "300%"] }}
                       transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                       className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" 
                     />
                  </div>
               </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ══ 4. PROCESS TIMELINE ══ */}
      <section className="py-32 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="mb-24 text-center max-w-3xl mx-auto">
            <FadeIn direction="up">
              <span className="inline-block py-1.5 px-4 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase mb-6">Our Methodology</span>
              <h2 className="text-[3rem] sm:text-[4rem] font-bold tracking-tighter text-zinc-900 dark:text-white leading-[1.1] mb-6">
                Engineered for scale. <br className="hidden md:block" />
                <span className="text-zinc-400">Built for speed.</span>
              </h2>
              <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed text-balance mx-auto">
                We don't just write code; we architect solutions. Our rigorous process ensures every deployment is enterprise-grade from day one.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {[
              { step: '01', title: 'Discovery & Architecture', desc: 'Deep-dive into requirements, threat modeling, and system architecture planning before a single line of code is written.', icon: Search },
              { step: '02', title: 'Design & Prototyping', desc: 'Crafting pixel-perfect, highly intuitive interface designs with interactive prototypes to validate user flows.', icon: PenTool },
              { step: '03', title: 'Agile Engineering', desc: 'Iterative sprints with robust CI/CD pipelines, comprehensive unit testing, and rigorous code reviews.', icon: Code2 },
              { step: '04', title: 'Deployment & Scale', desc: 'Zero-downtime deployment, infrastructure as code, and continuous telemetry monitoring for infinite scale.', icon: Rocket }
            ].map((item, i) => (
              <FadeIn scale key={i} delay={i * 0.1} className="group relative bg-[#FAFAFA] dark:bg-zinc-900 rounded-[2.5rem] border-[0.5px] border-zinc-200 dark:border-zinc-800/80 p-10 hover:bg-white dark:hover:bg-zinc-800/90 dark:hover:border-zinc-700 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] transition-all duration-700 overflow-hidden min-h-[320px] flex flex-col">
                 {/* Motion Style Animation Background */}
                 <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <motion.div 
                      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                      animate={{ top: ["0%", "100%"] }}
                      transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                    />
                    <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-400/10 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                 </div>
                 
                 <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700">
                       <item.icon className="text-zinc-700 dark:text-zinc-300" size={24} />
                    </div>
                    <div className="mt-auto max-w-sm">
                       <h3 className="text-2xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-white">{item.title}</h3>
                       <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>



      {/* ══ 6. TESTIMONIALS SLIDER ══ */}
      <section className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-100 dark:border-zinc-800 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.03),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center mb-8">
          <FadeIn direction="up">
             <span className="inline-block py-1.5 px-4 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-[10px] font-bold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase mb-6">Client Feedback</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white">Trusted by visionaries.</h2>
          </FadeIn>
        </div>

        <FadeIn scale delay={0.2} className="relative w-full max-w-6xl mx-auto px-4 pb-12 mt-6">
           <div className="relative h-[220px] md:h-[260px] flex items-center justify-center">
              <AnimatePresence initial={false}>
                 {testimonials.map((t, index) => {
                    let diff = index - testimonialIndex;
                    if (diff < -3) diff += testimonials.length;
                    if (diff > 2) diff -= testimonials.length;
                    
                    if (Math.abs(diff) > 1) return null;

                    const isActive = diff === 0;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          x: `${diff * 45}%`,
                          scale: isActive ? 1 : 0.85,
                          opacity: isActive ? 1 : 0.4,
                          zIndex: isActive ? 30 : 10
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={`absolute w-[90%] md:w-full max-w-[420px] bg-white dark:bg-zinc-900 rounded-[1.5rem] p-6 shadow-xl border-[0.5px] ${isActive ? 'shadow-zinc-200/50 border-zinc-300' : 'shadow-none border-zinc-200 dark:border-zinc-800/50 blur-[1px]'}`}
                      >
                         {/* Avatar and Name */}
                         <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 font-bold text-sm border border-zinc-200 dark:border-zinc-800/50">
                               {t.initial}
                            </div>
                            <div>
                               <div className="font-bold text-zinc-900 dark:text-white text-sm">{t.author}</div>
                               <div className="text-[11px] text-zinc-400">{t.role}</div>
                            </div>
                         </div>
                         
                         {/* Stars */}
                         <div className="flex gap-1 text-yellow-400 mb-4">
                            <Star size={14} fill="currentColor" strokeWidth={0} />
                            <Star size={14} fill="currentColor" strokeWidth={0} />
                            <Star size={14} fill="currentColor" strokeWidth={0} />
                            <Star size={14} fill="currentColor" strokeWidth={0} />
                            <Star size={14} fill="currentColor" strokeWidth={0} />
                         </div>

                         {/* Quote */}
                         <p className="text-zinc-600 dark:text-zinc-400 italic font-medium leading-relaxed text-[13px] md:text-sm">
                            "{t.quote}"
                         </p>
                      </motion.div>
                    );
                 })}
              </AnimatePresence>
           </div>
           
           {/* Controls Below */}
           <div className="flex items-center justify-center gap-6 mt-6 relative z-40">
              <button 
                onClick={() => setTestimonialIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
                className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-2 items-center">
                 {testimonials.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-2 rounded-full transition-all duration-300 ${i === testimonialIndex ? 'w-6 bg-blue-600' : 'w-2 bg-zinc-200'}`}
                    />
                 ))}
              </div>

              <button 
                onClick={() => setTestimonialIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
                className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
           </div>
        </FadeIn>
      </section>
      {/* ══ 7. FAQ SECTION ══ */}
      <section className="py-16 md:py-24 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
           
           {/* Top Heading */}
           <div className="text-center mb-10 md:mb-16">
              <FadeIn direction="up" delay={0.1}>
                 <span className="inline-block py-1.5 px-4 rounded-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm text-[10px] font-bold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase mb-6">FAQ</span>
              </FadeIn>
              <FadeIn direction="up" delay={0.2}>
                 <h2 className="text-[2.5rem] md:text-[4rem] font-bold leading-[1.05] tracking-tighter text-zinc-900 dark:text-white mb-6">
                    Any questions? We got you.
                 </h2>
              </FadeIn>
              <FadeIn direction="up" delay={0.3}>
                 <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg max-w-2xl mx-auto">
                    Everything you need to know about our engineering process. Can't find the answer you're looking for? Reach out to our team.
                 </p>
              </FadeIn>
           </div>

           {/* Accordion */}
           <div className="border-t border-zinc-200 dark:border-zinc-800/60">
             {faqs.map((faq, index) => {
                     const isOpen = faqIndex === index;
                     const num = String(index + 1).padStart(2, '0');
                     return (
                       <FadeIn key={index} direction="up" delay={0.4 + (index * 0.1)}>
                         <div className={`relative border-b border-zinc-200 dark:border-zinc-800/60 overflow-hidden group transition-colors duration-300 ${isOpen ? 'bg-zinc-50 dark:bg-zinc-800/60' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40'}`}>
                           
                           {/* Animated active indicator line */}
                           <AnimatePresence>
                             {isOpen && (
                                 <motion.div 
                                   layoutId="faqIndicator"
                                   className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 origin-top"
                                   initial={{ opacity: 0, scaleY: 0 }}
                                   animate={{ opacity: 1, scaleY: 1 }}
                                   exit={{ opacity: 0, scaleY: 0 }}
                                   transition={{ duration: 0.3 }}
                                 />
                             )}
                           </AnimatePresence>

                           <button
                             onClick={() => setFaqIndex(isOpen ? -1 : index)}
                             className="flex items-center w-full py-5 px-4 md:px-6 text-left outline-none"
                           >
                             <span className={`text-sm md:text-base font-mono font-bold tracking-widest mr-6 md:mr-10 transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-zinc-300 group-hover:text-zinc-400'}`}>
                               {num}
                             </span>
                             <span className={`font-semibold text-lg md:text-xl pr-8 flex-1 transition-colors duration-300 ${isOpen ? 'text-zinc-900 dark:text-white' : 'text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:text-white'}`}>
                                {faq.question}
                             </span>
                             <div className={`shrink-0 flex items-center justify-center transition-transform duration-500 ease-out ${isOpen ? 'rotate-180 text-blue-600' : 'text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-400'}`}>
                               {isOpen ? <Minus size={20} strokeWidth={2} /> : <Plus size={20} strokeWidth={2} />}
                             </div>
                           </button>
                           
                           <AnimatePresence>
                             {isOpen && (
                               <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                               >
                                 <div className="pb-6 px-4 md:px-6 pl-[3.25rem] md:pl-[4rem] pr-4 md:pr-12 text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed text-base md:text-lg">
                                   {faq.answer}
                                 </div>
                               </motion.div>
                             )}
                           </AnimatePresence>
                         </div>
                       </FadeIn>
                     );
                   })}
                 </div>
        </div>
      </section>
      {/* ══ 8. HIGH-IMPACT CTA ══ */}
      <section className="relative py-16 md:py-20 bg-zinc-50 dark:bg-zinc-900/50 overflow-hidden border-t border-zinc-100 dark:border-zinc-800">
        {/* Background Gradients */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[100px] opacity-60" />
           <div className="absolute w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[80px] opacity-50 translate-x-1/2 translate-y-1/4" />
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <FadeIn scale delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 shadow-sm mb-6">
               <Zap size={14} className="text-blue-600" />
               <span className="text-[11px] font-bold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase">Start Building Today</span>
            </div>
          </FadeIn>
          
          <FadeIn scale delay={0.2}>
            <h2 className="text-[3.5rem] md:text-[5rem] font-bold leading-[1.05] tracking-tighter text-zinc-900 dark:text-white mb-4">
              Ready to build <br className="hidden md:block"/> something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">incredible?</span>
            </h2>
          </FadeIn>
          
          <FadeIn scale delay={0.3}>
            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
              Join visionary founders and enterprise teams who trust MindX to deliver scalable, beautiful, and highly resilient software.
            </p>
          </FadeIn>
          
          <FadeIn scale delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <Link to="/start-project" className="group w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 hover:-translate-y-1 shadow-[0_8px_30px_rgba(37,99,235,0.3)]">
                Start your project
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/contact" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-semibold text-lg transition-all flex items-center justify-center shadow-sm">
                Talk to an architect
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
      
    </div>
  );
}

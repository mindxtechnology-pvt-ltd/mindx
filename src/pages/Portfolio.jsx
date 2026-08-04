import SEO from '../components/seo/SEO';
import FadeIn from '../components/layout/FadeIn';
import { ExternalLink, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

// Bespoke visual panels for each project
const NexusVisual = () => (
  <div className="w-full h-full bg-[#0D1117] p-5 flex flex-col gap-3 font-mono">
    <div className="flex items-center gap-2 mb-1">
      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
      <span className="ml-2 text-[10px] text-zinc-500">dashboard.tsx — Nexus Admin</span>
    </div>
    <div className="grid grid-cols-3 gap-2">
      {[{ label: 'Total Members', val: '4,821', color: 'text-blue-400' }, { label: 'Active Today', val: '312', color: 'text-emerald-400' }, { label: 'Pending Tasks', val: '47', color: 'text-amber-400' }].map(s => (
        <div key={s.label} className="bg-[#161B22] rounded-lg p-3 border border-white/5">
          <div className={`text-lg font-bold ${s.color}`}>{s.val}</div>
          <div className="text-[9px] text-zinc-500 mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
    <div className="bg-[#161B22] rounded-lg p-3 border border-white/5 flex-1">
      <div className="text-[9px] text-zinc-500 mb-2 uppercase tracking-wider">Recent Activity</div>
      {[
        { action: 'Member record updated', user: 'admin@nexus', time: '2m ago', dot: 'bg-blue-500' },
        { action: 'Role assigned: Editor', user: 'r.sharma', time: '14m ago', dot: 'bg-emerald-500' },
        { action: 'New record imported', user: 'system', time: '1h ago', dot: 'bg-purple-500' },
        { action: 'Report generated', user: 'k.patel', time: '3h ago', dot: 'bg-amber-500' },
      ].map((row, i) => (
        <div key={i} className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0">
          <div className={`w-1.5 h-1.5 rounded-full ${row.dot} shrink-0`}></div>
          <span className="text-[10px] text-zinc-300 flex-1 truncate">{row.action}</span>
          <span className="text-[9px] text-zinc-600 shrink-0">{row.time}</span>
        </div>
      ))}
    </div>
    <div className="bg-[#161B22] rounded-lg p-3 border border-white/5">
      <div className="text-[9px] text-zinc-500 mb-2">RBAC Permission Matrix</div>
      <div className="grid grid-cols-4 gap-1 text-[8px] text-center">
        {['Admin', 'Editor', 'Member', 'Guest'].map(r => (
          <div key={r} className="bg-zinc-800 rounded px-1 py-0.5 text-zinc-300">{r}</div>
        ))}
        {[true, true, false, false].map((v, i) => (
          <div key={i} className={`rounded px-1 py-0.5 ${v ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/10 text-red-500'}`}>{v ? '✓' : '✗'}</div>
        ))}
      </div>
    </div>
  </div>
);

const TerraVisual = () => (
  <div className="w-full h-full bg-[#0D1117] p-5 flex flex-col gap-3 font-mono">
    <div className="flex items-center gap-2 mb-1">
      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
      <span className="ml-2 text-[10px] text-zinc-500">sensor-feed.ts — TerraSense Live</span>
    </div>
    <div className="grid grid-cols-2 gap-2">
      {[
        { label: 'Soil Moisture', val: '68%', status: 'Optimal', color: 'text-emerald-400', bar: 'bg-emerald-500' },
        { label: 'Air Temp (°C)', val: '24.3', status: 'Normal', color: 'text-blue-400', bar: 'bg-blue-500' },
        { label: 'Humidity', val: '71%', status: 'High', color: 'text-amber-400', bar: 'bg-amber-500' },
        { label: 'N-P-K Level', val: '142', status: 'Monitor', color: 'text-purple-400', bar: 'bg-purple-500' },
      ].map(s => (
        <div key={s.label} className="bg-[#161B22] rounded-lg p-3 border border-white/5">
          <div className="text-[9px] text-zinc-500 mb-1">{s.label}</div>
          <div className={`text-xl font-bold ${s.color} mb-1`}>{s.val}</div>
          <div className="w-full h-1 bg-zinc-800 rounded-full">
            <div className={`h-full rounded-full ${s.bar}`} style={{ width: '65%' }}></div>
          </div>
          <div className="text-[8px] text-zinc-600 mt-1">{s.status}</div>
        </div>
      ))}
    </div>
    <div className="bg-[#161B22] rounded-lg p-3 border border-white/5 flex-1">
      <div className="text-[9px] text-zinc-500 mb-2 flex justify-between"><span>IRRIGATION PREDICTION</span><span className="text-emerald-400">▲ 30% saved</span></div>
      <div className="flex items-end gap-1 h-16">
        {[40, 60, 45, 80, 55, 70, 35, 90, 65, 50, 75, 42].map((h, i) => (
          <div key={i} className="flex-1 rounded-sm bg-emerald-500/30 hover:bg-emerald-500/60 transition-colors" style={{ height: `${h}%` }}></div>
        ))}
      </div>
      <div className="flex justify-between text-[8px] text-zinc-600 mt-1"><span>Mon</span><span>→</span><span>Sun</span></div>
    </div>
    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
      <span className="text-[10px] text-emerald-400 font-semibold">12 sensors live · Next irrigation: 6h 20m</span>
    </div>
  </div>
);

const TalentVisual = () => (
  <div className="w-full h-full bg-[#0D1117] p-5 flex flex-col gap-3 font-mono">
    <div className="flex items-center gap-2 mb-1">
      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
      <span className="ml-2 text-[10px] text-zinc-500">marketplace.tsx — TalentBridge</span>
    </div>
    <div className="bg-[#161B22] rounded-lg p-3 border border-white/5">
      <div className="text-[9px] text-zinc-500 mb-2">ACTIVE TALENT MATCHES</div>
      {[
        { name: 'Priya S.', skill: 'React / Node.js', rate: '$85/hr', match: '98%', color: 'text-emerald-400' },
        { name: 'James K.', skill: 'AWS DevOps', rate: '$110/hr', match: '95%', color: 'text-blue-400' },
        { name: 'Ana M.', skill: 'UI/UX Design', rate: '$70/hr', match: '91%', color: 'text-purple-400' },
      ].map((t, i) => (
        <div key={i} className="flex items-center gap-2 py-2 border-b border-white/5 last:border-0">
          <img src={`https://i.pravatar.cc/40?img=${i + 20}`} className="w-7 h-7 rounded-full object-cover" alt={t.name} />
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-zinc-200 font-semibold">{t.name}</div>
            <div className="text-[9px] text-zinc-500">{t.skill}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[9px] text-zinc-300">{t.rate}</div>
            <div className={`text-[9px] font-bold ${t.color}`}>{t.match}</div>
          </div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-[#161B22] rounded-lg p-3 border border-white/5">
        <div className="text-[9px] text-zinc-500 mb-1">Escrow Secured</div>
        <div className="text-lg font-bold text-emerald-400">$2.4M</div>
        <div className="text-[8px] text-zinc-600">This quarter</div>
      </div>
      <div className="bg-[#161B22] rounded-lg p-3 border border-white/5">
        <div className="text-[9px] text-zinc-500 mb-1">Active Contracts</div>
        <div className="text-lg font-bold text-blue-400">847</div>
        <div className="text-[8px] text-zinc-600">Across 32 countries</div>
      </div>
    </div>
    <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2">
      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
      <span className="text-[10px] text-blue-400 font-semibold">10,241 concurrent users · p99 latency: 48ms</span>
    </div>
  </div>
);

const projectVisuals = [null, <NexusVisual />, <TerraVisual />, <TalentVisual />];

export default function Portfolio() {
  const projects = [
    { 
      title: 'YatraMind', 
      category: 'AI Web App (PWA)', 
      desc: 'An AI-powered travel planning web application generating personalized itineraries and recommendations. Integrates LLM APIs inside an instant progressive web app architecture.',
      roi: 'Achieved 40% higher organic retention through AI itinerary mapping and slashed manual planning cycles by 85%.',
      link: 'https://www.yatramind.app/',
      image: '/images/yatramind_dashboard.png'
    },
    { 
      title: 'Nexus Community Platform', 
      category: 'Enterprise Dashboard', 
      desc: 'A full-stack community management system digitizing organizational record-keeping. Features complex role-based access control and high-speed data operations.',
      roi: 'Replaced 4 fragmented legacy tools, saving administrative teams over 20 hours per week.',
    },
    { 
      title: 'TerraSense IoT', 
      category: 'Precision Agriculture', 
      desc: 'A real-time environmental monitoring interface visualising live metrics from hardware sensors to drive predictive irrigation strategies.',
      roi: 'Reduced farm water waste by 30% through predictive sensor analytics.',
    },
    { 
      title: 'TalentBridge Marketplace', 
      category: 'Gig Economy Platform', 
      desc: 'A freelance marketplace connecting enterprises with specialized talent. Features escrow payment routing and algorithmic matching.',
      roi: 'Scaled to support 10,000+ concurrent users with sub-second latency on distributed cloud architecture.',
    }
  ];

  return (
    <div className="overflow-x-hidden text-zinc-900 dark:text-zinc-100 pt-4 pb-12 sm:pt-6 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SEO title="Portfolio" description="Explore past engineering case studies by Mindx Technologies." />

      <section className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <FadeIn direction="down" delay={100}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-semibold mb-3">
            Engineering Case Studies
          </div>
        </FadeIn>
        <FadeIn direction="up" delay={200}>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-zinc-900 dark:text-white">Our Work</h1>
        </FadeIn>
        <FadeIn direction="up" delay={300}>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Explore a selection of our flagship engineering deployments. We build high-concurrency, beautifully executed software platforms for global partners.
          </p>
        </FadeIn>
      </section>

      <section className="space-y-6">
        {projects.map((project, i) => {
          const isEven = i % 2 === 0;
          return (
            <FadeIn key={i} direction="up" staggerIndex={i} delay={150}>
              <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group hover:border-blue-500/30">
                <div className={`p-6 sm:p-8 lg:col-span-7 flex flex-col justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5 block">{project.category}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">{project.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">{project.desc}</p>
                  
                  <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/50 border-l-3 border-l-blue-600 mb-5 w-fit">
                    <div className="flex items-center gap-1.5 font-semibold text-xs text-zinc-900 dark:text-white mb-0.5">
                      <TrendingUp size={14} className="text-blue-600 dark:text-blue-400" /> Measured Impact:
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-300 leading-relaxed">{project.roi}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link to={`/portfolio/${project.title.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-xs font-semibold transition-all shadow-sm hover:-translate-y-0.5">
                      Read Case Study <ArrowRight size={14} className="ml-1.5" />
                    </Link>
                    {project.link && (
                      <Link to={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Live App <ExternalLink size={13} />
                      </Link>
                    )}
                  </div>
                </div>

                <div className={`lg:col-span-5 bg-[#0D1117] relative min-h-[280px] lg:min-h-full overflow-hidden border-t lg:border-t-0 ${isEven ? 'lg:order-2 lg:border-l' : 'lg:order-1 lg:border-r'} border-zinc-800`}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-transparent pointer-events-none z-10"></div>
                  {project.image ? (
                    <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full transition-transform duration-700 group-hover:scale-[1.02]">
                      {projectVisuals[i]}
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </section>
    </div>
  );
}

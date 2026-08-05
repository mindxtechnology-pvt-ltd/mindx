import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import FadeIn from '../layout/FadeIn';
import { useState, useEffect } from 'react';
import { fetchTeam } from '../../utils/api';

const TEAM_MEMBERS = [
  { 
    id: 1, 
    name: 'Nawaraj Karki', 
    role: 'Founder',
    img: '/images/nawaraj_karki.png',
    stack: ['React', 'Node.js', 'AWS'],
    github: 'https://github.com/Nawarajkarki30',
    email: 'nawarajkarki803@gmail.com'
  },
  { 
    id: 2, 
    name: 'Prabesh Bhandari', 
    role: 'Co-Founder',
    img: '/images/prabesh_bhandari.jpg',
    stack: ['MongoDB', 'Express', 'React'],
    github: 'https://github.com/PrabeshBhandari7',
    email: 'prabeshb635@gmail.com'
  },
  { 
    id: 3, 
    name: 'Bibash Pandey', 
    role: 'Engineering Lead & CTO',
    img: '/images/bibash_pandey.jpg',
    stack: ['Django', 'AI / ML', 'Data Analytics'],
    github: 'https://github.com/bibash007',
    email: 'bibashpandey46@gmail.com',
    linkedin: 'https://www.linkedin.com/in/bibash-pandey-b53888258'
  },
  { 
    id: 4, 
    name: 'Tanuja Subedi', 
    role: 'Marketing Head & QA Lead',
    img: '/images/tanuja_subedi.jpg',
    stack: ['Marketing', 'QA & Testing', 'Debugging'],
    github: 'https://github.com/tanuja737',
    email: 'tanujasubedi2063@gmail.com'
  }
];

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTeam() {
      try {
        const data = await fetchTeam();
        const formatted = data.map(member => ({
          ...member,
          stack: member.stack ? member.stack.split(',').map(s => s.trim()) : []
        }));
        setTeamMembers(formatted);
      } catch (err) {
        console.error('Failed to fetch team from backend, falling back to local data', err);
        setTeamMembers(TEAM_MEMBERS);
      } finally {
        setIsLoading(false);
      }
    }
    loadTeam();
  }, []);

  return (
    <section className="pt-12 pb-32 mb-12 relative w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white flex flex-col items-center">
      
      <div className="w-full max-w-7xl px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <FadeIn direction="up" delay={200}>
            <h2 className="text-[3rem] sm:text-[3.5rem] font-serif font-medium leading-[1.1] text-[#111] dark:text-white mb-6 tracking-tight">
              Engineering Excellence
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={300}>
            <p className="text-[15px] font-medium text-[#666] dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
              Our industry-leading team of architects and researchers turning complex logic into beautiful, scalable products.
            </p>
          </FadeIn>
        </div>

        {/* Modern Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => {
            let animProps = { direction: "up" };
            if (index === 0) animProps = { direction: "left" };
            else if (index === 1) animProps = { direction: "down" };
            else if (index === 2) animProps = { scale: true };
            else if (index === 3) animProps = { direction: "right" };

            return (
            <FadeIn key={member.id} {...animProps} delay={200 + index * 100} className="relative group perspective-[1000px]">
              
              <div className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden bg-white dark:bg-zinc-900 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5 dark:border-zinc-800/80 isolate">
                
                {/* Background Image with Hover Scale */}
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                />

                {/* Subtle Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                {/* Default Text State */}
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center transition-transform duration-500 ease-out group-hover:-translate-y-4">
                  <h3 className="font-serif font-medium text-2xl text-white drop-shadow-sm mb-1.5">
                    {member.name}
                  </h3>
                  <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-white/80 drop-shadow-sm">
                    {member.role}
                  </p>
                </div>

                {/* Glassmorphic Slide-Up Panel (Hidden by default) */}
                <div className="absolute inset-x-4 bottom-4 translate-y-[120%] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="backdrop-blur-xl bg-white/90 dark:bg-zinc-900/90 border border-white/50 dark:border-zinc-800/80 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
                    
                    {/* Tech Stack Pills */}
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#999] dark:text-zinc-400 mb-2 text-center">Core Stack</p>
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {member.stack.map(tech => (
                          <span key={tech} className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-[#111] dark:text-zinc-200 border border-transparent dark:border-zinc-700/50">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-[1px] w-full bg-black/5 dark:bg-white/10" />

                    {/* Social Links */}
                    <div className="flex justify-center gap-3">
                      <a href={member.linkedin || "#"} target={member.linkedin ? "_blank" : undefined} rel={member.linkedin ? "noopener noreferrer" : undefined} className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 border border-black/5 dark:border-zinc-700 text-[#111] dark:text-zinc-200 hover:bg-[#111] dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                      </a>
                      <a href={member.github || "#"} target={member.github ? "_blank" : undefined} rel={member.github ? "noopener noreferrer" : undefined} className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 border border-black/5 dark:border-zinc-700 text-[#111] dark:text-zinc-200 hover:bg-[#111] dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors shadow-sm" title={member.github || undefined}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                      </a>
                      <a href={member.email ? `mailto:${member.email}` : "#"} className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 border border-black/5 dark:border-zinc-700 text-[#111] dark:text-zinc-200 hover:bg-[#111] dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors shadow-sm" title={member.email || undefined}>
                        <Mail size={14} strokeWidth={2.5} />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </FadeIn>
          )})}
        </div>

      </div>
    </section>
  );
}

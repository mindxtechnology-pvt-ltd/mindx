import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, ExternalLink, MapPin } from 'lucide-react';

export default function PremiumTeamCard({ member, isHovered, onHover }) {
  const cardRef = useRef(null);
  
  // 3D Parallax Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  // Flip State
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsFlipped(false);
    onHover(false);
  };

  const handleMouseEnter = () => {
    setIsFlipped(true);
    onHover(true);
  };

  // Backface reveal staggering
  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.05, duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        perspective: '1800px',
        rotateX: isFlipped ? 0 : rotateX,
        rotateY: isFlipped ? 0 : rotateY,
        transformStyle: 'preserve-3d',
        zIndex: isHovered ? 20 : 10,
        filter: (isHovered === false) ? 'blur(4px) brightness(0.95)' : 'none',
      }}
      className="relative w-full aspect-[3/4] rounded-[28px] cursor-pointer transition-[filter] duration-500 ease-out"
    >
      <motion.div
        className="w-full h-full relative"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        
        {/* FRONT FACE */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-[28px] overflow-hidden bg-white shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-black/5"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img 
            src={member.img} 
            alt={member.name} 
            className="w-full h-full object-cover scale-[1.01] transition-transform duration-700 ease-out group-hover:scale-[1.03]" 
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* Floating Label */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex justify-between items-center transform transition-transform duration-500 hover:scale-[1.02]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#111] leading-none mb-1">{member.name}</h3>
                <p className="font-sans text-[10px] uppercase tracking-wider text-black/60 font-bold">{member.role}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div 
          className="absolute inset-0 w-full h-full rounded-[28px] overflow-hidden bg-[#FCFBF8] shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-black/5 flex flex-col p-8"
          style={{ 
            backfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg)' 
          }}
        >
          <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
            <motion.h3 custom={0} variants={variants} animate={isFlipped ? "visible" : "hidden"} className="font-serif font-medium text-2xl text-[#111] leading-none mb-1">{member.name}</motion.h3>
            <motion.p custom={1} variants={variants} animate={isFlipped ? "visible" : "hidden"} className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#666] mb-6">{member.role}</motion.p>
            
            <motion.p custom={2} variants={variants} animate={isFlipped ? "visible" : "hidden"} className="text-[13px] text-[#666] leading-relaxed mb-6">
              {member.bio}
            </motion.p>

            <motion.div custom={3} variants={variants} animate={isFlipped ? "visible" : "hidden"} className="w-full h-[1px] bg-black/5 mb-6" />

            {/* Stats Row */}
            <motion.div custom={4} variants={variants} animate={isFlipped ? "visible" : "hidden"} className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-[10px] font-bold text-[#999] uppercase tracking-wider mb-1">Experience</p>
                <p className="font-serif font-medium text-lg text-[#111]">{member.experience}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#999] uppercase tracking-wider mb-1">Projects</p>
                <p className="font-serif font-medium text-lg text-[#111]">{member.projects}</p>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div custom={5} variants={variants} animate={isFlipped ? "visible" : "hidden"} className="mb-6">
              <p className="text-[10px] font-bold text-[#999] uppercase tracking-wider mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {member.skills.map(skill => (
                  <span key={skill} className="px-2.5 py-1 rounded-full bg-white border border-black/5 text-[10px] font-semibold text-[#111] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Location & Availability */}
            <motion.div custom={6} variants={variants} animate={isFlipped ? "visible" : "hidden"} className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-1.5 text-[#666]">
                 <MapPin size={12} />
                 <span className="text-[11px] font-semibold">{member.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                 <span className="text-[11px] font-semibold text-[#666]">{member.availability}</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Actions */}
          <motion.div custom={7} variants={variants} animate={isFlipped ? "visible" : "hidden"} className="pt-4 border-t border-black/5 flex items-center justify-between mt-auto">
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center text-[#111] hover:bg-[#111] hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
              <a href="#" className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center text-[#111] hover:bg-[#111] hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></a>
              <a href="#" className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center text-[#111] hover:bg-[#111] hover:text-white transition-colors"><Mail size={13} /></a>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111] text-white text-[11px] font-bold hover:bg-black/80 transition-colors shadow-md">
              View Profile <ExternalLink size={12} />
            </button>
          </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
}

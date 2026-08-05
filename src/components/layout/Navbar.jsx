import { Link, useLocation, useNavigate } from 'react-router-dom';
import FadeIn from './FadeIn';
import { Menu, X, Sun, Moon, ArrowRight, Code, Smartphone, BrainCircuit, Cloud, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const servicesMenu = [
  { label: 'Web & SaaS Engineering', icon: Code, desc: 'React, Next.js, Node.js', to: '/services#web-saas' },
  { label: 'Native Mobile Apps', icon: Smartphone, desc: 'iOS, Android, React Native', to: '/services#mobile' },
  { label: 'AI & LLM Integrations', icon: BrainCircuit, desc: 'OpenAI, Gemini, RAG pipelines', to: '/services#ai-llm' },
  { label: 'Cloud Infrastructure', icon: Cloud, desc: 'AWS, GCP, Kubernetes', to: '/services#cloud' },
];


function DropdownMenu({ items }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-xl p-2 z-50">
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-zinc-900 border-l border-t border-zinc-200/80 dark:border-zinc-800/80 rotate-45"></div>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            to={item.to}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Icon size={15} className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="text-xs font-semibold text-zinc-900 dark:text-white">{item.label}</div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400">{item.desc}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'services' | 'company' | null
  const dropdownTimeout = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleLogoClick = (e) => {
    const currentTime = Date.now();
    // Click within 1.5 seconds
    if (currentTime - lastClickTime < 1500) {
      const newCount = clickCount + 1;
      setClickCount(newCount);
      if (newCount >= 4) {
        e.preventDefault();
        setClickCount(0);
        navigate('/admin');
      }
    } else {
      setClickCount(0);
    }
    setLastClickTime(currentTime);
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    const isDarkMode = theme === 'dark';
    setIsDark(isDarkMode);
    document.documentElement.setAttribute('data-theme', theme);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Scroll-aware shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleMouseEnter = (menu) => {
    clearTimeout(dropdownTimeout.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path) =>
    `relative px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1 ${isActive(path)
      ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800'
      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50'
    }`;

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        {/* Main Navbar Pill */}
        <FadeIn direction="down" delay={50}>
          <nav className={`bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 rounded-full px-5 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300 ${scrolled ? 'shadow-xl shadow-zinc-900/10 dark:shadow-zinc-950/40' : 'shadow-md'
            }`}>
            {/* Logo */}
            <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white shrink-0">
              <img src="/logo-icon-light.png" alt="MindX Icon" className="h-8 w-auto object-contain block dark:hidden" />
              <img src="/logo-icon-dark.png" alt="MindX Icon" className="h-8 w-auto object-contain hidden dark:block" />
              <span>MindX<span className="text-blue-600 dark:text-blue-400">.</span></span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {/* Services with dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
              >
                <button className={navLinkClass('/services')}>
                  Services
                  <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                  {isActive('/services') && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400"></span>}
                </button>
                {activeDropdown === 'services' && <DropdownMenu items={servicesMenu} />}
              </div>

              <Link to="/products" className={navLinkClass('/products')}>
                Products
                {isActive('/products') && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400"></span>}
              </Link>

              <Link to="/about" className={navLinkClass('/about')}>
                About
                {isActive('/about') && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400"></span>}
              </Link>

              <Link to="/blog" className={navLinkClass('/blog')}>
                Blog
                {isActive('/blog') && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400"></span>}
              </Link>

              <Link to="/contact" className={navLinkClass('/contact')}>
                Contact
                {isActive('/contact') && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400"></span>}
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <Link
                to="/start-project"
                className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-1.5 group"
              >
                Start Project <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <button
                className="p-2 rounded-full text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </FadeIn>

        {/* Mobile Dropdown Card */}
        {isOpen && (
          <FadeIn direction="down" delay={0}>
            <div className="md:hidden mt-2 p-3 bg-white/97 dark:bg-zinc-900/97 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-xl flex flex-col gap-1">
              {[
                { label: 'Services', to: '/services' },
                { label: 'Products', to: '/products' },

                { label: 'About Us', to: '/about' },
                { label: 'Careers', to: '/careers' },
                { label: 'Blog', to: '/blog' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${isActive(link.to)
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                      : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                >
                  {link.label}
                  {isActive(link.to) && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>}
                </Link>
              ))}

              <div className="pt-2 mt-1 border-t border-zinc-200/60 dark:border-zinc-800/60">
                <Link
                  to="/start-project"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 text-white text-center text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 transition-all"
                >
                  Start Project <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </header>
  );
}

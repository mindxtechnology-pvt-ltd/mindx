import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <FadeIn direction="up">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            <div className="sm:col-span-2">
              <Link to="/" className="inline-flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2.5">
                <img src="/logo-icon-light.png" alt="MindX Icon" className="h-8 w-auto object-contain block dark:hidden" />
                <img src="/logo-icon-dark.png" alt="MindX Icon" className="h-8 w-auto object-contain hidden dark:block" />
                <span>MindX<span className="text-blue-600 dark:text-blue-400">.</span></span>
              </Link>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed mb-5 font-normal">
                Dual-force technology powerhouse engineering mission-critical enterprise solutions and launching proprietary SaaS ecosystems globally.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> All Systems Operational
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-3">Company</h4>
              <ul className="space-y-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</Link></li>
                <li><Link to="/portfolio" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Portfolio</Link></li>
                <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-3">Services</h4>
              <ul className="space-y-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                <li><Link to="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Web Development</Link></li>
                <li><Link to="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mobile Apps</Link></li>
                <li><Link to="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Generative AI</Link></li>
                <li><Link to="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cloud Architecture</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-3">Legal</h4>
              <ul className="space-y-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                <li><Link to="/privacy-policy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500 dark:text-zinc-400">
            <p>&copy; {new Date().getFullYear()} Mindx Technologies Pvt. Ltd. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Engineering excellence. Every line.</span>
            </div>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}

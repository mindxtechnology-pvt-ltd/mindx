import SEO from '../components/seo/SEO';
import FadeIn from '../components/layout/FadeIn';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="overflow-x-hidden text-zinc-900 dark:text-zinc-100 min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <SEO title="404 Page Not Found" />
      <FadeIn direction="scale">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl sm:text-7xl font-black text-blue-600 dark:text-blue-400 tracking-tight mb-2">404</div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3">Endpoint Not Found</h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
            The requested routing address does not exist or has been relocated within our architecture.
          </p>
          <Link to="/" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-black text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-xs font-semibold transition-all shadow-sm">
            <ArrowLeft size={14} className="mr-1.5" /> Return to Homepage
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}

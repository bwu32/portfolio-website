import { Metadata } from 'next';
import PortfolioContent from './PortfolioContent';
import MobilePortfolio from './MobilePortfolio';

export const metadata: Metadata = {
  title: 'All Projects',
  description: 'Brian Wu\'s Project Portfolio',
};

export default function Portfolio() {
  return (
    <main className="min-h-screen w-full relative">

      {/* 2. DESKTOP VIEW - Rendered on md screens and up */}
      <div className="hidden md:block relative z-10 w-full">
        <PortfolioContent />
      </div>

      {/* 3. MOBILE VIEW - Rendered on small screens only */}
      <div className="md:hidden relative z-10 w-full">
        <MobilePortfolio />
      </div>
    </main>
  );
}
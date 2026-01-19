import { Metadata } from 'next';
import PortfolioContent from './PortfolioContent';

export const metadata: Metadata = {
  title: 'All Projects',
  description: 'Brian Wu\'s Project Portfolio',
};

export default function Portfolio() {
  return <PortfolioContent />;
}
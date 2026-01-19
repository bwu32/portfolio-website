import { Metadata } from 'next';
import LegoContent from './LegoContent';

export const metadata: Metadata = {
  title: 'LEGO Collection',
  description: 'Brian Wu\'s LEGO collection',
};

export default function LegoPage() {
  return <LegoContent />;
}
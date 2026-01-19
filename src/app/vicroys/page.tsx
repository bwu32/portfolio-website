import { Metadata } from 'next';
import VictoryRoyalesContent from './VictoryRoyalesContent';

export const metadata: Metadata = {
  title: 'Victory Royales',
  description: 'Brian Wu\'s Fortnite victory royale gallery',
};

export default function VictoryRoyalesPage() {
  return <VictoryRoyalesContent />;
}
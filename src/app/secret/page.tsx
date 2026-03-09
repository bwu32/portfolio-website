import { Metadata } from 'next';
import SecretContent from './SecretContent';

export const metadata: Metadata = {
  title: '???',
  description: '...',
};

export default function SecretPage() {
  return <SecretContent />;
}

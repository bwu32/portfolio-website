import { Metadata } from 'next';
import GuestbookContent from './GuestbookContent';

export const metadata: Metadata = {
  title: 'Guestbook',
  description: 'Sign Brian Wu\'s guestbook',
};

export default function GuestbookPage() {
  return <GuestbookContent />;
}
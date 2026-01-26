import { Metadata } from 'next';
import Mediums from './Mediums'

export const metadata: Metadata = {
    title: 'Creative Mediums',
    description: 'These are all the mediums I use to create!',
};

export default function MediumsPage() {
    return <Mediums />
}
'use client';
import { Map } from '@/components/Map/Map';
import { useLoadScript } from '@react-google-maps/api';

export default function AboutPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API ?? '',
    libraries: ['places'],
  });
  if (!isLoaded) return '...loading';
  return <Map />;
}

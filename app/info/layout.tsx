import { Searchbar } from '@/components/Search/Searchbar';
import { Text } from '@/components/Text/Text';
import React from 'react';

export default function infoLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams?: {
    query?: string;
  };
}) {
  console.log(searchParams, 'searchparams layout');
  return (
    <div>
      <Text as="h1" fontFamily="cormorant">
        INFO DOG
      </Text>
      <Searchbar />
      {children}
    </div>
  );
}

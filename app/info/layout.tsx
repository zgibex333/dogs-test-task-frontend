import { Searchbar } from '@/components/Search/Searchbar';
import { Text } from '@/components/Text/Text';
import styles from './layout.module.scss';

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
    <div className={styles.container}>
      <Text as="h1" fontFamily="cormorant" classname={styles.title}>
        INFO DOG
      </Text>
      <Searchbar />
      {children}
    </div>
  );
}

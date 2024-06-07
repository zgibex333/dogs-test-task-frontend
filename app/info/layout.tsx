import { Searchbar } from '@/components/Search/Searchbar';
import { Text } from '@/components/Text/Text';
import styles from './layout.module.scss';

export default function infoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

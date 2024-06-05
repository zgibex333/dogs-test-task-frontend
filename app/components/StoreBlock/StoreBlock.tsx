import { Text } from '@/components/Text/Text';
import { type StoreItem } from '@/constants/types';
import Image from 'next/image';
import styles from './StoreBlock.module.scss';
import cx from 'classnames';
import { Button } from '@/components/Button/Button';

interface Props {
  title: string;
  items: StoreItem[];
  buttonText: string;
}

export const StoreBlock = ({ items, title, buttonText }: Props) => {
  return (
    <section className={styles.container}>
      <Text as="h3" fontFamily="cormorant" classname={styles.sectionTitle}>
        {title}
      </Text>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.imageSrc} className={styles.item}>
            <div className={cx('cardImageContainer', styles.imageContainer)}>
              <Image
                src={item.imageSrc}
                alt={item.description.slice(0, 10)}
                fill
              />
            </div>

            <div className={styles.details}>
              <div>
                <Text as="p" fontFamily="cormorant">
                  {item.description.split('\n')[0]}
                </Text>
                <Text as="p" fontFamily="cormorant">
                  {item.description.split('\n')[1]}
                </Text>
              </div>
              <Text as="p" fontFamily="cormorant" classname={styles.price}>
                CA ${item.price}
              </Text>
            </div>
          </li>
        ))}
      </ul>
      <Button className={styles.button}>{buttonText}</Button>
    </section>
  );
};

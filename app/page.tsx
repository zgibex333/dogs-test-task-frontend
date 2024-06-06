import { Text } from '@/components/Text/Text';
import styles from './page.module.scss';
import { Button } from '@/components/Button/Button';
import Image from 'next/image';
import cx from 'classnames';
import { carryOns, collars } from '@/constants/storeData';
import { StoreBlock } from '@/components/StoreBlock/StoreBlock';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <Text as="h1" fontFamily="cormorant">
              Book your doggy spa day!
            </Text>

            <Link href="/book-appointment">
              <Button className={styles.heroBtn}>Book Appointment</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.store}>
        <div className="container">
          <section className={styles.storeDetails}>
            <div className={cx('cardImageContainer', styles.storeImage)}>
              <Image src="/images/dog-bath.png" alt="dog-bath" fill />
            </div>
            <div className={styles.storeDetailsTextContainer}>
              <Text as="p" fontFamily="cormorant" classname={styles.cardTitle}>
                Doggy Facial and Fur Cleanse Treatment $269
              </Text>
              <Text as="p" fontFamily="cormorant" classname={styles.cardText}>
                Dogs receive a facial with our vegan, cruelty free face products
                and cleansing of any dirt left hiding in their beautiful fur
                (comes with a take home face products and animal treats).
              </Text>
            </div>
          </section>
          <StoreBlock
            items={collars}
            title="Dog Collars"
            buttonText="See More Dog Collars"
          />
          <StoreBlock
            items={carryOns}
            title="Animal Carry Ons"
            buttonText="See More Carry Ons"
          />
        </div>
      </section>
    </>
  );
}

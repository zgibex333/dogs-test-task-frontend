import { PaymentForm } from './components/PaymentForm/PaymentForm';
import { BookingForm } from './components/BookingForm/BookingForm';
import styles from './page.module.scss';

export default function page() {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <BookingForm />
        <PaymentForm />
      </div>
      <div className={styles.mapsContainer}></div>
    </div>
  );
}

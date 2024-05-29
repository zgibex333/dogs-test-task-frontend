import { Form } from './components/Form';
import styles from './page.module.scss';

export default function page() {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Form />
      </div>
      <div className={styles.mapsContainer}></div>
    </div>
  );
}

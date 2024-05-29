'use client';
import { Input } from '@/components/Input/Input';
import { Text } from '@/components/Text/Text';
import { Timeslots } from './Timeslots';
import { AppCalendar } from '@/components/Calendar/AppCalendar';
import styles from './Form.module.scss';
import { Textarea } from '@/components/Textarea/Textarea';
import { Button } from '@/components/Button/Button';
import { useFormState } from 'react-dom';
import { bookingData } from 'app/book-appointment/actions';

export const Form = () => {
  const [state, action] = useFormState(bookingData, { message: '' });
  return (
    <form className={styles.form} action={action}>
      <Text as="h2" fontFamily="cormorant" classname={styles.formTitle}>
        Enter your information here
      </Text>
      <div className={styles.inputsContainer}>
        <div className={styles.inputsRow}>
          <Input
            name="name"
            placeholder="First name"
            validationErrorText={state.errors?.name}
          />
          <Input
            name="lastname"
            placeholder="Last name"
            validationErrorText={state.errors?.lastname}
          />
        </div>
        <div className={styles.inputsRow}>
          <Input
            name="email"
            placeholder="Email"
            validationErrorText={state.errors?.email}
          />
          <Input
            name="phoneNumber"
            placeholder="Phone number"
            validationErrorText={state.errors?.phoneNumber}
          />
        </div>
      </div>
      <div className={styles.slotsContainer}>
        <Timeslots validationError={state.errors?.timeslot} />
        <AppCalendar validationError={state.errors?.date} />
      </div>
      <div>
        <Textarea
          placeholder="Any special requests for your pet(s)..."
          name="message"
          rows={2}
          validationErrorText={state.errors?.message}
        />
      </div>
      <Button type="submit" className={styles.submitBtn}>
        Book Appointment
      </Button>
    </form>
  );
};

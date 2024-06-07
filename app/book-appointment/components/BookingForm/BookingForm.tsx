'use client';
import { Input } from '@/components/Input/Input';
import { Text } from '@/components/Text/Text';
import { Timeslots } from '../Timeslots/Timeslots';
import { AppCalendar } from '@/components/Calendar/AppCalendar';
import styles from './BookingForm.module.scss';
import { Textarea } from '@/components/Textarea/Textarea';
import { Button } from '@/components/Button/Button';
import { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { BookingDialog } from '../BookingDialog/BookingDialog';
import { TIMESLOTS } from '@/constants/timeslots';
import { type BookingFormState } from '@/constants/types';
import { useFormState, useFormStatus } from 'react-dom';
import { checkBookingInfo } from '../../actions';

const getDefaultFormState = (): BookingFormState => ({
  name: '',
  lastname: '',
  email: '',
  phoneNumber: '',
  timeslot: TIMESLOTS[0],
  date: new Date(),
  message: '',
});

export const BookingForm = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [state, action] = useFormState(checkBookingInfo, { isValid: false });

  const [formState, setFormState] = useState(getDefaultFormState);

  useEffect(() => {
    if (state.isValid) {
      router.push(pathname + '?booking=y');
    }
  }, [state.isValid, router, pathname]);

  const onChangeInputField =
    <T extends keyof BookingFormState>(key: T) =>
    (value: BookingFormState[T]) => {
      setFormState((prev) => ({ ...prev, [key]: value }));
    };

  const resetFormFields = () => {
    setFormState(getDefaultFormState());
  };

  return (
    <>
      <Suspense fallback="...">
        <BookingDialog {...formState} resetForm={resetFormFields} />
      </Suspense>

      <form className={styles.form} data-testid="booking-form" action={action}>
        <Text as="h2" fontFamily="cormorant" classname={styles.formTitle}>
          Enter your information here
        </Text>
        <div className={styles.inputsContainer}>
          <div className={styles.inputsRow}>
            <Input
              name="name"
              placeholder="First name"
              onValueChange={onChangeInputField('name')}
              value={formState.name}
              validationErrorText={state.errors?.name}
              data-testid="input-firstname"
            />
            <Input
              name="lastname"
              placeholder="Last name"
              onValueChange={onChangeInputField('lastname')}
              value={formState.lastname}
              validationErrorText={state.errors?.lastname}
              data-testid="input-lastname"
            />
          </div>
          <div className={styles.inputsRow}>
            <Input
              name="email"
              placeholder="Email"
              onValueChange={onChangeInputField('email')}
              value={formState.email}
              validationErrorText={state.errors?.email}
              data-testid="input-email"
            />
            <Input
              name="phoneNumber"
              placeholder="Phone number"
              onValueChange={onChangeInputField('phoneNumber')}
              value={formState.phoneNumber}
              validationErrorText={state.errors?.phoneNumber}
              data-testid="input-phoneNumber"
            />
          </div>
        </div>
        <div className={styles.slotsContainer}>
          <Timeslots
            name="timeslot"
            validationError={state.errors?.timeslot}
            onValueChange={onChangeInputField('timeslot')}
            value={formState.timeslot}
          />
          <AppCalendar
            name="date"
            validationError={state.errors?.date}
            value={formState.date}
            onChange={onChangeInputField('date')}
          />
        </div>
        <div>
          <Textarea
            onValueChange={onChangeInputField('message')}
            placeholder="Any special requests for your pet(s)..."
            name="message"
            rows={2}
            validationErrorText={state.errors?.message}
            value={formState.message}
            data-testid="input-message"
          />
        </div>
        <FormButton />
      </form>
    </>
  );
};

const FormButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className={styles.submitBtn}
      disabled={pending}
      data-testid="book-button"
    >
      Book Appointment
    </Button>
  );
};

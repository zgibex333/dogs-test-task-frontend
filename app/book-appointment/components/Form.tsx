'use client';
import { Input } from '@/components/Input/Input';
import { Text } from '@/components/Text/Text';
import { Timeslots } from './Timeslots';
import { AppCalendar } from '@/components/Calendar/AppCalendar';
import styles from './Form.module.scss';
import { Textarea } from '@/components/Textarea/Textarea';
import { Button } from '@/components/Button/Button';
import { type FormEvent, useEffect, useState } from 'react';
import { date, object, string, ValidationError } from 'yup';
import { flushSync } from 'react-dom';
import { usePathname, useRouter } from 'next/navigation';
import { FormSubmittedDialogue } from './FormSubmittedDialogue';
import { TIMESLOTS } from '@/constants/timeslots';

const FormSchema = object({
  name: string().required('Required field'),
  lastname: string().required('Required field'),
  email: string().email('Must be a valid email').required('Required field'),
  phoneNumber: string().required('Required field'),
  message: string().required('Required field'),
  timeslot: string().required('Choose timeslot'),
  date: date()
    .test('Validate date', 'Choose not past date', (value) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (!value) return false;
      if (value.getTime() < today.getTime()) return false;
      return true;
    })
    .required('Date is required'),
});

interface FormState {
  name: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  timeslot: string;
  date: Date;
  message: string;
}

const defaultFormState = {
  name: '',
  lastname: '',
  email: '',
  phoneNumber: '',
  timeslot: TIMESLOTS[0],
  date: new Date(),
  message: '',
};

export const Form = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [formState, setFormState] = useState<FormState>(defaultFormState);

  const [attemptedToSubmit, setAttemptedToSubmit] = useState(false);

  const [validationErrors, setValidationErrors] = useState<
    Record<string, null | string>
  >({});

  useEffect(() => {
    const validateFields = async () => {
      try {
        await FormSchema.validate(formState, { abortEarly: false });
        setValidationErrors({});
      } catch (e) {
        if (e instanceof ValidationError) {
          const errors: Record<string, string | null> = {};
          e.inner.forEach((el) => el.path && (errors[el.path] = el.message));
          setValidationErrors(() => ({ ...errors }));
        }
      }
    };
    validateFields();
  }, [formState]);

  const onChangeInputField =
    <T extends keyof FormState>(key: T) =>
    (value: FormState[T]) => {
      setFormState((prev) => ({ ...prev, [key]: value }));
    };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    flushSync(() => {
      setAttemptedToSubmit(true);
    });
    if (Object.keys(validationErrors).length) {
      return;
    }
    const params = new URLSearchParams(Object.entries(formState));
    setFormState(defaultFormState);
    setAttemptedToSubmit(false);
    router.push(pathname + '?showDialog=y' + `&${params.toString()}`);
  };

  return (
    <>
      <FormSubmittedDialogue />
      <form className={styles.form} onSubmit={onFormSubmit}>
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
              validationErrorText={
                attemptedToSubmit ? validationErrors.name ?? '' : ''
              }
            />
            <Input
              name="lastname"
              placeholder="Last name"
              onValueChange={onChangeInputField('lastname')}
              value={formState.lastname}
              validationErrorText={
                attemptedToSubmit ? validationErrors.lastname ?? '' : ''
              }
            />
          </div>
          <div className={styles.inputsRow}>
            <Input
              name="email"
              placeholder="Email"
              onValueChange={onChangeInputField('email')}
              value={formState.email}
              validationErrorText={
                attemptedToSubmit ? validationErrors.email ?? '' : ''
              }
            />
            <Input
              name="phoneNumber"
              placeholder="Phone number"
              onValueChange={onChangeInputField('phoneNumber')}
              value={formState.phoneNumber}
              validationErrorText={
                attemptedToSubmit ? validationErrors.phoneNumber ?? '' : ''
              }
            />
          </div>
        </div>
        <div className={styles.slotsContainer}>
          <Timeslots
            validationError={
              attemptedToSubmit ? validationErrors.timeslot ?? '' : ''
            }
            onValueChange={onChangeInputField('timeslot')}
            value={formState.timeslot}
          />
          <AppCalendar
            validationError={
              attemptedToSubmit ? validationErrors.date ?? '' : ''
            }
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
            validationErrorText={
              attemptedToSubmit ? validationErrors.message ?? '' : ''
            }
            value={formState.message}
          />
        </div>
        <Button type="submit" className={styles.submitBtn}>
          Book Appointment
        </Button>
      </form>
    </>
  );
};

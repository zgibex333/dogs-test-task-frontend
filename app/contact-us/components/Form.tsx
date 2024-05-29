'use client';

import { Input } from '@/components/Input/Input';
import styles from './Form.module.scss';
import { Textarea } from '@/components/Textarea/Textarea';
import { Button } from '@/components/Button/Button';
import { useFormState } from 'react-dom';
import { sendContactData } from './actions';
import { Text } from '@/components/Text/Text';

export const Form = () => {
  const [state, formAction] = useFormState(sendContactData, {
    errors: {},
    message: '',
  });

  if (state.message === 'Success') return <p>SUCCESS</p>;

  return (
    <form action={formAction} className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={styles.inputWithError}>
          <Input type="text" name="name" placeholder="Name" />
          {state.errors && (
            <Text as="span" fontFamily="cormorant">
              {state.errors.name}
            </Text>
          )}
        </div>
        <div className={styles.inputWithError}>
          <Input type="text" name="lastname" placeholder="Lastname" />
          {state.errors?.lastname && (
            <Text as="span" fontFamily="cormorant">
              {state.errors.lastname}
            </Text>
          )}
        </div>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputWithError}>
          <Input type="text" name="email" placeholder="Email" />
          {state.errors?.email && (
            <Text as="span" fontFamily="cormorant">
              {state.errors.email}
            </Text>
          )}
        </div>
        <div className={styles.inputWithError}>
          <Input type="text" name="phoneNumber" placeholder="Phone Number" />
          {state.errors?.phoneNumber && (
            <Text as="span" fontFamily="cormorant">
              {state.errors.phoneNumber}
            </Text>
          )}
        </div>
      </div>
      <div className={styles.inputWithError}>
        <Textarea name="message" rows={10} placeholder="Message" />
        {state.errors?.message && (
          <Text as="span" fontFamily="cormorant">
            {state.errors.message}
          </Text>
        )}
      </div>

      <Button type="submit" className={styles.submitButton}>
        Submit
      </Button>
    </form>
  );
};

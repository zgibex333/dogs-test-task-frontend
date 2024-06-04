'use client';

import { Input } from '@/components/Input/Input';
import styles from './PaymentForm.module.scss';
import { Text } from '@/components/Text/Text';
import { Button } from '@/components/Button/Button';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import PaymentDialog from '../PaymentDialog/PaymentDialog';
import { useFormState, useFormStatus } from 'react-dom';
import { checkPaymentInfo } from '../../actions';

export const PaymentForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [state, action] = useFormState(checkPaymentInfo, { isValid: false });
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  useEffect(() => {
    if (state.isValid) {
      router.push(pathname + '?payment=y');
    }
  }, [state.isValid, pathname, router]);

  const onCardChange = (value: string) => {
    const clearValue = value.replace(/\D/g, '');
    if (clearValue.length > 16) return;
    setCardNumber(clearValue.replace(/(.{4})/g, '$1 ').trim());
  };

  const onExpirationChange = (value: string) => {
    const clearValue = value.replace(/\D/g, '');
    if (clearValue.length > 4) return;
    setExpiration(
      value.length <= 2
        ? clearValue
        : clearValue.replace(/^(\d{2})(\d{0,2})$/, '$1/$2')
    );
  };

  const onCardHolderChange = (value: string) => {
    setCardHolder(value);
  };

  const onCvcChange = (value: string) => {
    const clearValue = value.replace(/\D/g, '');
    if (clearValue.length > 3) return;
    setCvc(clearValue);
  };

  const resetFormState = () => {
    setCardNumber('');
    setExpiration('');
    setCvc('');
    setCardHolder('');
  };

  return (
    <>
      <PaymentDialog
        cardHolder={cardHolder}
        cardNumber={cardNumber}
        expiration={expiration}
        cvc={cvc}
        resetForm={resetFormState}
      />
      <form className={styles.form} action={action}>
        <Text as="h2" fontFamily="cormorant">
          Enter your payment information
        </Text>
        <div className={styles.inputRow}>
          <Input
            placeholder="Credit Card Number"
            className={styles.input}
            value={cardNumber}
            onValueChange={onCardChange}
            name="cardNumber"
            validationErrorText={state.errors?.cardNumber ?? ''}
          />
        </div>
        <div className={styles.inputRow}>
          <Input
            placeholder="Expiry Date"
            className={styles.input}
            value={expiration}
            onValueChange={onExpirationChange}
            name="expiration"
            validationErrorText={state.errors?.expiration ?? ''}
          />
          <Input
            placeholder="CVC"
            className={styles.input}
            value={cvc}
            onValueChange={onCvcChange}
            name="cvc"
            validationErrorText={state.errors?.cvc ?? ''}
          />
        </div>
        <div className={styles.inputRow}>
          <Input
            placeholder="Name on Card"
            className={styles.input}
            value={cardHolder}
            onValueChange={onCardHolderChange}
            name="cardHolder"
            validationErrorText={state.errors?.cardHolder ?? ''}
          />
          <SubmitButton />
        </div>
      </form>
    </>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Pay
    </Button>
  );
};

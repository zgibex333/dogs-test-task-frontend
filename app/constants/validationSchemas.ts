import { date, object, string } from 'yup';

export const BookingFormSchema = object({
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

export const ContactUsFormSchema = object({
  name: string().required('Required field'),
  lastname: string().required('Required field'),
  email: string().email('Must be a valid email').required('Required field'),
  phoneNumber: string().required('Required field'),
  message: string().required('Required field'),
});

export const PaymentInfoSchema = object({
  cardNumber: string()
    .test('Check credit card', 'Invalid card number', (value) => {
      if (!value) return true;
      return /^\d{16}$/.test(value.replace(/\D/g, ''));
    })
    .required('Required field'),
  expiration: string()
    .test('Check expiration date', 'Invalid expiration date', (value) => {
      if (!value) return true;
      return /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value);
    })
    .required('Required field'),
  cvc: string()
    .test('Check credit card', 'Invalid cvc', (value) => {
      if (!value) return true;
      return /^\d{3}$/.test(value.replace(/\D/g, ''));
    })
    .required('Required field'),
  cardHolder: string().required('Required field'),
});

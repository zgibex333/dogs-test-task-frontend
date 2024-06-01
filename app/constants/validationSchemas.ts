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

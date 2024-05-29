'use server';
import { date, object, string, ValidationError } from 'yup';

export interface State {
  errors?: {
    name?: string;
    lastname?: string;
    email?: string;
    phoneNumber?: string;
    message?: string;
  };
  message?: string | null;
}

export async function bookingData(prevState: State, formData: FormData) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formDate = new Date(formData.get('date')?.toString() ?? '1980-01-01');

  const FormSchema = object({
    name: string().required('Required field'),
    lastname: string().required('Required field'),
    email: string().email('Must be a valid email').required('Required field'),
    phoneNumber: string().required('Required field'),
    message: string().required('Required field'),
    timeslot: string().required('Choose timeslot'),
    date: date().min(today, 'Choose today or later'),
  });

  const rawFormData = {
    name: formData.get('name'),
    lastname: formData.get('lastname'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
    message: formData.get('message'),
    timeslot: formData.get('timeslot'),
    date: formDate,
  };

  const errors: {
    name?: string;
    lastname?: string;
    email?: string;
    phoneNumber?: string;
    message?: string;
    date?: string;
    timeslot?: string;
  } = {};

  try {
    await FormSchema.validate(rawFormData, {
      abortEarly: false,
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      e.inner.forEach(
        (el) => (errors[el.path as keyof typeof errors] = el.message)
      );
    }
  }

  if (Object.keys(errors).length) {
    return {
      errors,
      message: 'Validation Error',
    };
  }
  return {
    message: 'Success',
  };
}

'use server';
import { ValidationError } from 'yup';
import {
  BookingFormSchema,
  PaymentInfoSchema,
} from '@/constants/validationSchemas';

export interface PaymentFormState {
  errors?: {
    cardNumber?: string;
    expiration?: string;
    cvc?: string;
    cardHolder?: string;
  };
  isValid: boolean;
}

export interface BookingFormState {
  errors?: {
    name?: string;
    lastname?: string;
    email?: string;
    phoneNumber?: string;
    timeslot?: string;
    date?: string;
    message?: string;
  };
  isValid: boolean;
}

export async function checkBookingInfo(
  prevState: BookingFormState,
  formData: FormData
) {
  const rawFormData = {
    name: formData.get('name'),
    lastname: formData.get('lastname'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
    timeslot: formData.get('timeslot'),
    date: formData.get('date'),
    message: formData.get('message'),
  };

  console.log(rawFormData);

  const errors: {
    name?: string;
    lastname?: string;
    email?: string;
    phoneNumber?: string;
    timeslot?: string;
    date?: string;
    message?: string;
  } = {};

  try {
    await BookingFormSchema.validate(rawFormData, {
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
      isValid: false,
    };
  }

  return {
    isValid: true,
  };
}

export async function checkPaymentInfo(
  prevState: PaymentFormState,
  formData: FormData
) {
  const rawFormData = {
    cardNumber: formData.get('cardNumber'),
    expiration: formData.get('expiration'),
    cvc: formData.get('cvc'),
    cardHolder: formData.get('cardHolder'),
  };

  const errors: {
    cardNumber?: string;
    expiration?: string;
    cvc?: string;
    cardHolder?: string;
  } = {};

  try {
    await PaymentInfoSchema.validate(rawFormData, {
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
      isValid: false,
    };
  }

  return {
    isValid: true,
  };
}

'use server';
import { object, string, ValidationError } from 'yup';
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/EmailTemplate/EmailTemplate';

const FormSchema = object({
  name: string().required('Required field'),
  lastname: string().required('Required field'),
  email: string().email('Must be a valid email').required('Required field'),
  phoneNumber: string().required('Required field'),
  message: string().required('Required field'),
});

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

const resend = new Resend(process.env.NEXT_RESEND_API);

export async function sendContactData(prevState: State, formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    lastname: formData.get('lastname'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
    message: formData.get('message'),
  };

  const errors: {
    name?: string;
    lastname?: string;
    email?: string;
    phoneNumber?: string;
    message?: string;
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

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['vvideolalal@gmail.com'],
    subject: 'Hello world',
    react: EmailTemplate({ firstName: 'John' }),
    text: 'RANDOM MOTHFCKA',
  });

  console.log(data, 'DATA SUCCESS');
  console.log(error, 'ERROR ERROR');

  return {
    message: 'Success',
  };
}

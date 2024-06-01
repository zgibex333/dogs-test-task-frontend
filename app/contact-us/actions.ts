'use server';
import { ValidationError } from 'yup';
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/EmailTemplate/EmailTemplate';
import { ContactUsFormSchema } from '@/constants/validationSchemas';

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
    await ContactUsFormSchema.validate(rawFormData, {
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
    subject: `From ${rawFormData.email?.toString()}`,
    react: EmailTemplate({ message: rawFormData.message?.toString() ?? '' }),
    text: 'Hi, you have a message from your customer',
  });

  console.log(data, 'DATA SUCCESS');
  console.log(error, 'ERROR ERROR');

  if (error) {
    return {
      message: rawFormData.message?.toString() ?? 'Unexpected error',
    };
  }

  return {
    message: 'Successfully sent',
  };
}

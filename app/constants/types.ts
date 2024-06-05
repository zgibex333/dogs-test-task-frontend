export interface BookingFormState {
  name: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  timeslot: string;
  date: Date;
  message: string;
}

export interface StoreItem {
  price: string;
  description: string;
  imageSrc: string;
}

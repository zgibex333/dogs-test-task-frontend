export interface Route {
  path: string;
  name: string;
}

export const routes: Record<string, Route> = {
  home: {
    path: '/',
    name: 'Home',
  },
  info: {
    path: '/info',
    name: 'Info',
  },
  spa: {
    path: '/spa-services',
    name: 'Spa Services',
  },
  booking: {
    path: '/book-appointment',
    name: 'Book Appointment',
  },
  blog: {
    path: '/blog',
    name: 'Blog',
  },
  about: {
    path: '/about',
    name: 'About Us',
  },
  contact: {
    path: '/contact-us',
    name: 'Contact Us',
  },
};

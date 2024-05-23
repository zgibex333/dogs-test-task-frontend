import { Text } from '@/components/Text/Text';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './Footer.module.scss';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';

const customerServiceItems = [
  'Blog',
  'Cancellations',
  'Track Your Animal',
  'Luxe’s Annual Spa Day 2021',
  'Payment Options',
];

const navigationItems = [
  'Home',
  'About us',
  'Contact Us',
  'FAQs',
  'Help with navigation',
];

const socialsWithLinks = [
  {
    path: '/icons/instagram.svg',
    link: 'https://instagram.com',
    iconSize: {
      height: 29,
      width: 37,
    },
  },
  {
    path: '/icons/facebook.svg',
    link: 'https://facebook.com',
    iconSize: {
      height: 28,
      width: 19,
    },
  },
  {
    path: '/icons/pinterest.svg',
    link: 'https://pinterest.com',
    iconSize: {
      height: 28,
      width: 27,
    },
  },
  {
    path: '/icons/twitter.svg',
    link: 'https://twitter.com',
    iconSize: {
      height: 28,
      width: 37,
    },
  },
  {
    path: '/icons/snapchat.svg',
    link: 'https://snapchat.com',
    iconSize: {
      height: 28,
      width: 37,
    },
  },
];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className="left">
          <Text as="h6" fontFamily="cormorant" classname={styles.sectionTitle}>
            Customer Service
          </Text>
          <ul className={styles.textList}>
            {customerServiceItems.map((name) => (
              <li key={name}>
                <Text
                  as="span"
                  fontFamily="cormorant"
                  classname={styles.listItem}
                >
                  {name}
                </Text>
              </li>
            ))}
          </ul>
        </div>
        <div className="middle">
          <div>
            <Text
              as="h6"
              fontFamily="cormorant"
              classname={styles.sectionTitle}
            >
              Subscribe to our Newsletter
            </Text>
            <form className={styles.form}>
              <Input placeholder="Email" className={styles.inputEmail} />
              <Button>Submit</Button>
            </form>
          </div>
          <div>
            <Text
              as="h6"
              fontFamily="cormorant"
              classname={styles.sectionTitle}
            >
              Connect With Us On Social Media
            </Text>
            <ul className={styles.socialsList}>
              {socialsWithLinks.map(
                ({ link, path, iconSize: { height, width } }) => (
                  <li key={path}>
                    <Link href={link} target="_blank">
                      <Image
                        src={path}
                        alt="link"
                        width={width}
                        height={height}
                      />
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="right">
          <Text as="h6" fontFamily="cormorant" classname={styles.sectionTitle}>
            Navigation
          </Text>
          <ul className={styles.textList}>
            {navigationItems.map((name) => (
              <li key={name}>
                <Text
                  as="span"
                  fontFamily="cormorant"
                  classname={styles.listItem}
                >
                  {name}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="copyright"></div>
    </footer>
  );
};

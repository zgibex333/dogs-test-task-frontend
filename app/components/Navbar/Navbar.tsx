'use client';

import { routes } from '@/constants/router';
import Link from 'next/link';
import styles from './Navbar.module.scss';
import { Text } from '@/components/Text/Text';
import { usePathname } from 'next/navigation';
import cx from 'classnames';
import { Button } from '../Button/Button';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const onMenuButtonClickHandler = () => {
    setShowMobileMenu((prev) => !prev);
  };

  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  return (
    <nav className={styles.navbar}>
      <Button className={styles.menuButton} onClick={onMenuButtonClickHandler}>
        Menu
      </Button>
      <ul className={cx(styles.list, { [styles.isMenuShown]: showMobileMenu })}>
        {Object.keys(routes).map((routeName) => {
          const { name, path } = routes[routeName];
          const isActive = pathname === path;
          return (
            <li key={name}>
              <Link
                href={path}
                className={cx(styles.link, { [styles.isActive]: isActive })}
                data-testid={`navlink-${path}`}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={styles.banner}>
        <Text as="h4" fontFamily="cormorant" classname={styles.bannerText}>
          Get 20% OFF When You Book A Spa Day For Your Animal Today!
        </Text>{' '}
      </div>
    </nav>
  );
};

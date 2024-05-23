import { type ReactNode } from 'react';
import styles from './Text.module.scss';
import cx from 'classnames';

type TextTag = Pick<
  JSX.IntrinsicElements,
  'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
>;

type FontStyle =
  | 'cormorant'
  | 'cormorantGaramond'
  | 'cinzelDecorative'
  | 'tangerine';

interface Props {
  as: keyof TextTag;
  fontFamily: FontStyle;
  children: ReactNode;
  classname?: string;
}

export const Text = ({ as, fontFamily, children, classname }: Props) => {
  const Tag = as;
  return <Tag className={cx(styles[fontFamily], classname)}>{children}</Tag>;
};

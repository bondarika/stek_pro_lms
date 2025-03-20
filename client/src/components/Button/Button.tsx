import { ReactElement } from 'react';
import { ButtonProps } from './types';
import styles from './Button.module.scss';

const Button = ({ children, ...props }: ButtonProps): ReactElement => {
  return (
    <button style={styles} {...props}>
      {children}
    </button>
  );
};

export default Button;

import HeaderProps from '../../types/props/HeaderProps';
import styles from './Header.module.scss';
import lms_logo from '../../assets/icons/lms_logo.svg';

const Header = ({ pageTitle }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <img src={lms_logo} alt="логотип" />
      {pageTitle}
    </header>
  );
};

export default Header;

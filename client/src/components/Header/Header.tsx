import HeaderProps from '../../types/props/HeaderProps';
import styles from './Header.module.scss';
import lms_logo from '../../assets/icons/lms_logo.svg';
import { useNavigate } from 'react-router-dom';

const Header = ({ pageTitle, navigation }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <img src={lms_logo} alt="логотип" />
      <button
        onClick={() => navigate(navigation)}
        className={styles.header_title}
      >
        {pageTitle}
      </button>
    </header>
  );
};

export default Header;

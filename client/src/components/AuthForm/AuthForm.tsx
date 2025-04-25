import { observer } from 'mobx-react-lite';
import { Context } from '../../main';
import Button from '../Button/Button';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import styles from './AuthForm.module.scss';
import { FC, useContext, useState } from 'react';
import info from '@/assets/icons/info-pink.svg';
import stek_pro from '@/assets/icons/stek_pro.svg';
import lms from '@/assets/icons/lms.svg';
import '@/styles/variables.scss';

type AuthTab = 'login' | 'registration';

const AuthForm: FC = function AuthForm() {
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = await store.login(email, password);
    if (success) {
      window.location.href = '/courses';
    }
  };

  const handleTabChange = (tab: AuthTab) => {
    setActiveTab(tab);
    store.clearError();
  };

  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(Context);

  return (
    <div className={styles.container}>
      <div className="rotation-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="958"
          height="1000"
          viewBox="0 0 1058 1100"
          fill="rgba(28, 189, 175, 1)"
          className="svg_ellipse svg_ellipse_1"
        >
          <path
            d="M694.671 1093.03C357.14 1151.19 307.094 791.641 76.8124 470.583C-153.469 149.526 195.144 117.527 387.464 40.1577C559.457 -29.0348 702.192 -4.09551 859.035 94.746C1193.3 305.398 1084.04 1025.95 694.671 1093.03Z"
            fill="#1CBDAF"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1201"
          height="938"
          viewBox="0 0 1301 1038"
          fill="rgba(28, 189, 175, 1)"
          className="svg_ellipse svg_ellipse_2"
        >
          <path
            d="M1300.61 724.523C1300.61 1119.63 1110.5 1028.32 715.4 1028.32C320.295 1028.32 0 708.027 0 312.923C0 -82.1819 190.103 9.12256 585.208 9.12256C980.312 9.12256 1300.61 329.418 1300.61 724.523Z"
            fill="#1CBDAF"
          />
        </svg>
      </div>

      <div className={styles.authform_links}>
        <div className={styles.authform_links_stekPro}>
          <img src={stek_pro} className={styles.authform_links_stekPro_text} />
        </div>
        <div className={styles.authform_links_line}></div>
        <div className={styles.authform_links_stekPro}>
          <img src={lms} className={styles.authform_links_stekPro_logo} />
        </div>
      </div>

      <div className={styles.authform_lines}>
        <div className={styles.authform_line}></div>
        <div className={styles.authform_line}></div>
      </div>

      <div className={styles.authform}>
        <div className={styles.authform_tabs}>
          <h1
            className={activeTab === 'login' ? styles.active : ''}
            onClick={() => handleTabChange('login')}
          >
            ВХОД
          </h1>
          <h1
            className={activeTab === 'registration' ? styles.active : ''}
            onClick={() => handleTabChange('registration')}
          >
            РЕГИСТРАЦИЯ
          </h1>
        </div>
        {store.error && (
          <div className={styles.authform_error}>
            <img src={info} />
            {store.error}
          </div>
        )}
        {activeTab === 'login' ? (
          <form onSubmit={handleLogin}>
            <div className={styles.authform_input}>
              <input
                id="userEmail"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                // placeholder=" "
                placeholder="электро почта"
                value={email}
                required
              />
              {/* <label htmlFor="userEmail">&nbsp;электро почта&nbsp;</label> */}
            </div>
            <div className={styles.authform_input}>
              <input
                id="userPassword"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="пароль"
                value={password}
                required
              />
              {/* <label htmlFor="userPassword">&nbsp;пароль&nbsp;</label> */}
            </div>

            <Button type="submit">войти</Button>
          </form>
        ) : (
          <RegistrationForm />
        )}
      </div>
    </div>
  );
};

const ObservedAuthForm = observer(AuthForm);
export default ObservedAuthForm;

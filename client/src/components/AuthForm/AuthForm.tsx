import Button from '../Button/Button';
import styles from './AuthForm.module.scss';
import { FC, useState } from 'react';

type AuthTab = 'login' | 'registration';

const AuthForm: FC = () => {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div className={styles.authform}>
      <div className={styles.authform_tabs}>
        <h1
          className={activeTab === 'login' ? styles.active : ''}
          onClick={() => setActiveTab('login')}
        >
          ВХОД
        </h1>
        <h1
          className={activeTab === 'registration' ? styles.active : ''}
          onClick={() => setActiveTab('registration')}
        >
          РЕГИСТРАЦИЯ
        </h1>
      </div>

      {activeTab === 'login' ? (
        <form>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="электронная почта"
            value={email}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="пароль"
            value={password}
          />
          <Button>войти</Button>
        </form>
      ) : (
        <form>
          <input type="text" placeholder="код из набора" />
          <Button>проверить код</Button>
        </form>
      )}
    </div>
  );
};

export default AuthForm;

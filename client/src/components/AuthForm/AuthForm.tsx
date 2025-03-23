import { observer } from 'mobx-react-lite';
import { Context } from '../../main';
import Button from '../Button/Button';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import styles from './AuthForm.module.scss';
import { FC, useContext, useState } from 'react';

type AuthTab = 'login' | 'registration';

const AuthForm: FC = function AuthForm() {
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await store.login(email, password);
  };

  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(Context);

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
        <form onSubmit={handleLogin}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="электронная почта"
            value={email}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="пароль"
            value={password}
          />
          <Button type="submit">войти</Button>
        </form>
      ) : (
        <RegistrationForm />
      )}
    </div>
  );
};

const ObservedAuthForm = observer(AuthForm);
export default ObservedAuthForm;

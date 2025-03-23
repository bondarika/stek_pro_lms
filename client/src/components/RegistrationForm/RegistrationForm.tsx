import { observer } from 'mobx-react-lite';
import { FC, useContext, useState } from 'react';
import Button from '../Button/Button';
import styles from './RegistrationForm.module.scss';
import { Context } from '../../main';

const RegistrationForm: FC = observer(() => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(Context);
  const [code, setCodeInput] = useState<string>('');

  const handleCodeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.validation(code);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.registration(email, password);
  };

  switch (store.step) {
    case 1:
      return (
        <form onSubmit={handleCodeSubmit}>
          <input
            type="text"
            placeholder="код из набора"
            value={code}
            onChange={(e) => setCodeInput(e.target.value)}
          />
          <Button type="submit">проверить код</Button>
        </form>
      );
    case 2:
      return (
        <div className={styles.buttons}>
          <Button onClick={() => store.nextStep()}>
            продолжить регистрацию
          </Button>
          <Button onClick={() => store.prevStep()}>активировать позже</Button>{' '}
          {/* спросить куда эта кнопка должна перенаправлять */}
        </div>
      );
    case 3:
      return (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="электронная почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">зарегистрироваться</Button>
        </form>
      );
  }
});

export default RegistrationForm;

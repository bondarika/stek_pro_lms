import { observer } from 'mobx-react-lite';
import { FC, useContext, useEffect, useState } from 'react';
import Button from '../Button/Button';
import styles from './RegistrationForm.module.scss';
import { Context } from '../../main';
import info from '@/assets/icons/info-gray.svg';

const RegistrationForm: FC = observer(() => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  const { store } = useContext(Context);
  const [code, setCodeInput] = useState<string>('');

  useEffect(() => {
    const allFieldsFilled =
      name.trim() !== '' &&
      surname.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '';
    setIsSubmitDisabled(!allFieldsFilled);
    // setIsSubmitDisabled(!(allFieldsFilled && passwordsMatch));
    // }, [name, surname, email, password, confirmPassword]);
  }, [name, surname, email, password]);

  const handleCodeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.validation(code);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.registration(name, surname, email, password);
  };

  switch (store.step) {
    case 1:
      return (
        <>
          {!store.error && (
            <div className={styles.message}>
              <img src={info} />
              <p>регистрация доступна только при наличии специального кода</p>
            </div>
          )}
          <form onSubmit={handleCodeSubmit}>
            <input
              type="text"
              placeholder="код из набора"
              value={code}
              onChange={(e) => setCodeInput(e.target.value)}
            />
            <Button type="submit">проверить код</Button>
          </form>
          <div className={styles.message_support}>
            <p>
              в случае возникновения проблем — смело пишите на&nbsp;
              <a
                className={styles.message_support_mail}
                href="mailto:stekprost@yandex.ru.com"
              >
                stekprost@yandex.ru
              </a>
            </p>
          </div>
        </>
      );
    case 2:
      return (
        <div className={styles.buttons}>
          <div className={styles.message}>
            <img src={info} />
            <p>код подошёл! вы можете продолжить регистрацию</p>
          </div>
          <Button onClick={() => store.nextStep()}>
            продолжить регистрацию
          </Button>
          <Button
            onClick={() => store.prevStep()}
            className={styles.buttons_later}
          >
            активировать позже
          </Button>
          {/* спросить куда эта кнопка должна перенаправлять */}
        </div>
      );
    case 3:
      return (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="фамилия"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <input
            type="text"
            placeholder="имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            id="userEmail"
            type="email"
            placeholder="электронная почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="userPassword"
            type="password"
            placeholder="пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <input
            type="password"
            placeholder="повторите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          /> */}
          <Button type="submit" disabled={isSubmitDisabled}>
            зарегистрироваться
          </Button>
        </form>
      );
  }
});

export default RegistrationForm;

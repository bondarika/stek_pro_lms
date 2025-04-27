import { useParams } from 'react-router-dom';
import { FC, useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import styles from './ResetPasswordForm.module.scss';
import info_pink from '@/assets/icons/info-pink.svg';
// import info_gray from '@/assets/icons/info-gray.svg';
import stek_pro from '@/assets/icons/stek_pro.svg';
import lms from '@/assets/icons/lms.svg';

const ResetPasswordForm: FC = function ResetPasswordForm() {
  const { store } = useContext(Context);
  const { resetLink } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetLink) {
      setMessage('Ссылка для сброса пароля недействительна');
      return;
    }
    try {
      await store.resetPassword(resetLink, email, newPassword);
      setMessage('Пароль успешно изменён');
    } catch (error) {
      console.log(error);
      setMessage('Ошибка при сбросе пароля');
    }
  };

  useEffect(() => {
    const allFieldsFilled =
      newPassword.trim() !== '' && confirmPassword.trim() !== '';
    const passwordsMatch = newPassword === confirmPassword;
    if (!passwordsMatch && confirmPassword.trim() !== '') {
      setPasswordError('Пароли не совпадают');
    } else {
      setPasswordError('');
    }

    setIsSubmitDisabled(!(allFieldsFilled && passwordsMatch));
  }, [newPassword, confirmPassword]);

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

      <div className={styles.resetPasswordForm_links}>
        <div className={styles.resetPasswordForm_links_stekPro}>
          <img
            src={stek_pro}
            className={styles.resetPasswordForm_links_stekPro_text}
          />
        </div>
        <div className={styles.resetPasswordForm_links_line}></div>
        <div className={styles.resetPasswordForm_links_stekPro}>
          <img
            src={lms}
            className={styles.resetPasswordForm_links_stekPro_logo}
          />
        </div>
      </div>

      <div className={styles.resetPasswordForm_lines}>
        <div className={styles.resetPasswordForm_line}></div>
        <div className={styles.resetPasswordForm_line}></div>
      </div>

      <div className={styles.resetPasswordForm}>
        <h1>ЗАБЫЛИ ПАРОЛЬ</h1>
        {passwordError && (
          <p className={styles.error}>
            <img src={info_pink} />
            {passwordError}
          </p>
        )}
        {message ? (
          <p className={styles.error}>{message}</p>
        ) : (
          <form onSubmit={handleReset}>
            <input
              type="email"
              placeholder="электронная почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="новый пароль"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="повторите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" disabled={isSubmitDisabled}>
              сохранить пароль
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;

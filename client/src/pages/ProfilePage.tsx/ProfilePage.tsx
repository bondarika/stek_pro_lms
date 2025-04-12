import { observer } from 'mobx-react-lite';
import Button from '../../components/Button/Button';
import { useContext } from 'react';
import { Context } from '../../main';
import Header from '../../components/Header/Header';
import styles from './ProfilePage.module.scss';

const ProfilePage = observer(() => {
  const { store } = useContext(Context);

  return (
    <>
      <Header navigation="/courses" pageTitle="Курсы" />
      <div className={styles.profilePage}>
        <h1>
          {store.user.isActivated
            ? 'Аккаунт активирован'
            : 'Аккаунт не активирован'}
        </h1>
        <Button onClick={() => store.logout()}>выйти</Button>
      </div>
    </>
  );
});

export default ProfilePage;

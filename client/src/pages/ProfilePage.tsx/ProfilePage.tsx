import { observer } from 'mobx-react-lite';
import Button from '../../components/Button/Button';
import { useContext } from 'react';
import { Context } from '../../main';

const ProfilePage = observer(() => {
  const { store } = useContext(Context);
  return (
    <>
      <h1>
        {store.user.isActivated
          ? 'Аккаунт активирован'
          : 'Аккаунт не активирован'}
      </h1>
      <Button onClick={() => store.logout()}>выйти</Button>
    </>
  );
});

export default ProfilePage;

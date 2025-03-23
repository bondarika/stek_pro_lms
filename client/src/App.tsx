import { useContext, useEffect } from 'react';
import { Context } from './main';
import { observer } from 'mobx-react-lite';
import Button from './components/Button/Button';
import ObservedAuthForm from './components/AuthForm/AuthForm';

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoading) {
    return null;
  }
  //можно добавить загрузку

  if (!store.isAuth)
    return (
      <>
        <ObservedAuthForm />
      </>
    );

  return (
    <>
    <h1>{store.user.isActivated ? 'Аккаунт активирован' : 'Аккаунт не активирован'}</h1>
      <Button onClick={() => store.logout()}>выйти</Button>
    </>
  );
}

const ObservedApp = observer(App);
export default ObservedApp;

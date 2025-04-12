import { useContext, useEffect } from 'react';
import { Context } from './main';
import { observer } from 'mobx-react-lite';
import ObservedAuthForm from './components/AuthForm/AuthForm';
import ProfilePage from './pages/ProfilePage.tsx/ProfilePage';

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
      <ProfilePage />
    </>
  );
}

const ObservedApp = observer(App);
export default ObservedApp;

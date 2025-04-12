import { useContext, useEffect } from 'react';
import { Context } from './main';
import { observer } from 'mobx-react-lite';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ObservedAuthForm from './components/AuthForm/AuthForm';
import ProfilePage from './pages/ProfilePage.tsx/ProfilePage';
import CoursesPage from './pages/CoursesPage.tsx/CoursesPage';

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/courses" element={<CoursesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const ObservedApp = observer(App);
export default ObservedApp;

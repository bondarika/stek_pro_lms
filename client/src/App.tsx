import { useContext, useEffect, useState } from 'react';
import { Context } from './main';
import { observer } from 'mobx-react-lite';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ObservedAuthForm from './components/AuthForm/AuthForm';
import ProfilePage from './pages/ProfilePage.tsx/ProfilePage';
import CoursesPage from './pages/CoursesPage.tsx/CoursesPage';
import NoMobile from './components/NoMobile/NoMobile';
import ResetPasswordForm from './components/ResetPasswordForm/ResetPasswordForm';

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  const [isScreenLocked, setIsScreenLocked] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 520) {
        setIsScreenLocked(true);
      } else {
        setIsScreenLocked(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  if (isScreenLocked) {
    return <NoMobile />;
  }

  if (store.isLoading) {
    return null;
  }
  //можно добавить загрузку

  if (!store.isAuth)
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ObservedAuthForm />} />
            <Route
              path="/reset-password/:resetLink"
              element={<ResetPasswordForm />}
            />
          </Routes>
        </BrowserRouter>
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

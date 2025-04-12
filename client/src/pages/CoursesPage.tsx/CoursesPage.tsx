import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../main';
import Header from '../../components/Header/Header';
import styles from './CoursesPage.module.scss';

const CoursesPage = observer(() => {
  const { store } = useContext(Context);
  return (
    <>
      <Header navigation="/" pageTitle="Профиль" />
    </>
  );
});

export default CoursesPage;

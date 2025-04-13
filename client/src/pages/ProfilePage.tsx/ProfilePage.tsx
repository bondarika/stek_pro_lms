import { observer } from 'mobx-react-lite';
import Button from '../../components/Button/Button';
import { useContext } from 'react';
import { Context } from '../../main';
import Header from '../../components/Header/Header';
import styles from './ProfilePage.module.scss';
import CourseButton from '../../components/CourseButton/CourseButton';

const ProfilePage = observer(() => {
  const { store } = useContext(Context);

  return (
    <>
      <Header pageTitle="Профиль" navigation="/" />
      <div className={styles.profilePage}>
        <h1>
          {store.user.isActivated
            ? 'Аккаунт активирован'
            : 'Аккаунт не активирован'}
        </h1>
        <Button onClick={() => store.logout()}>выйти</Button>
      </div>
      <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div className={styles.profilePage_courseButtons}>
          {store.courses.map((course) => (
            <CourseButton
              key={course.id}
              navigation="/courses"
              name={store.courses[course.id - 1].name}
            ></CourseButton>
          ))}
        </div>
      </div>
    </>
  );
});

export default ProfilePage;

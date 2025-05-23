﻿import { observer } from 'mobx-react-lite';
import Button from '../../components/Button/Button';
import { useContext } from 'react';
import { Context } from '../../main';
import Header from '../../components/Header/Header';
import styles from './ProfilePage.module.scss';
import CourseButton from '../../components/CourseButton/CourseButton';
import DOMPurify from 'dompurify';

const ProfilePage = observer(() => {
  const { store } = useContext(Context);

  return (
    <div
      style={{
        height: '100vh',
        overflowY: 'hidden'
      }}
    >
      <Header pageTitle="Профиль" navigation="/" />
      <div>
        {/* <h1>
          {store.user.isActivated
            ? 'Аккаунт активирован'
            : 'Аккаунт не активирован'}
        </h1> */}
      </div>
      <div className={styles.profilePage}>
        <div className={styles.profilePage_courseButtons}>
          {store.courses.map((course) => (
            <CourseButton key={course.id} navigation="/courses">
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(store.courses[course.id - 1].name)
                }}
              />
            </CourseButton>
          ))}
        </div>
        <Button onClick={() => store.logout()}>выйти</Button>
      </div>
    </div>
  );
});

export default ProfilePage;

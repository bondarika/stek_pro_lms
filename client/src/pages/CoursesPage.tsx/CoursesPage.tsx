import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Context } from '../../main';
import Header from '../../components/Header/Header';
import styles from './CoursesPage.module.scss';

const lessons: Record<string, { default: string }> = import.meta.glob(
  '@/assets/modules/course_main/*/*.webp',
  {
    eager: true
  }
);

const lessonsArray = Object.values(lessons).map(
  (img) => (img as { default: string }).default
);

const lessonTitles = [
  '1. Мигалка',
  '2. Очень длинное название для занятия',
  '3. Мигалка снова'
];

const CoursesPage = observer(() => {
  const { store } = useContext(Context);
  const [selectedLesson, setSelectedLesson] = useState(0);

  return (
    <>
      <Header pageTitle="Профиль" navigation="/" />
      <div className={styles.coursesPage}>
        {/* Навигация слева */}
        <aside>
          <h3>Управление светом 💡</h3>
          {lessonTitles.map((title, index) => (
            <div
              key={index}
              onClick={() => setSelectedLesson(index)}
              style={{
                marginBottom: '12px',
                padding: '10px',
                cursor: 'pointer',
                background: selectedLesson === index ? '#e0f7f7' : '#fff',
                borderRadius: '6px',
                fontWeight: selectedLesson === index ? 'bold' : 'normal'
              }}
            >
              {title}
              <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                <span
                  style={{
                    background: '#ddd',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}
                >
                  ТЕОРИЯ
                </span>
                <span
                  style={{
                    background: '#ddd',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}
                >
                  СБОРКА
                </span>
                <span
                  style={{
                    background: '#ddd',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}
                >
                  ПРОГРАММИРОВАНИЕ
                </span>
              </div>
            </div>
          ))}
        </aside>

        {/* Контент по центру */}
        <main style={{ flexGrow: 1, padding: '40px' }}>
          {lessonsArray[selectedLesson] ? (
            <img
              src={lessonsArray[selectedLesson]}
              alt={`Lesson ${selectedLesson + 1}`}
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
          ) : (
            <p>Контент пока недоступен</p>
          )}
        </main>
      </div>
    </>
  );
});

export default CoursesPage;

import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { Context } from '../../main';
import Header from '../../components/Header/Header';
import { groupedLessons } from '../../utils/groupLessons';
import styles from './CoursesPage.module.scss';
import { capitalizeText } from '../../utils/capitalizeText';
import Next from '@/assets/icons/next/next.svg?react';
import Prev from '@/assets/icons/prev/prev.svg?react';

const CoursesPage = observer(() => {
  const { store } = useContext(Context);

  const [selectedModule, setSelectedModule] = useState<number | null>(1);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(1);
  const [selectedSection, setSelectedSection] = useState<string>('теория');
  const [currentStep, setCurrentStep] = useState<number>(0);

  const lessonData =
    selectedModule !== null && selectedLesson !== null
      ? groupedLessons.get(selectedModule)?.get(selectedLesson)
      : null;

  const sectionImages = lessonData?.sections.get(selectedSection) || [];
  const currentImage = sectionImages[currentStep]?.image;

  const sectionOrder = ['теория', 'сборка', 'программирование'];
  const allModules = Array.from(groupedLessons.keys()).sort((a, b) => a - b);
  const currentModuleIndex = allModules.indexOf(selectedModule!);
  const currentLessonMap = groupedLessons.get(selectedModule!)!;
  const allLessons = Array.from(currentLessonMap.keys()).sort((a, b) => a - b);
  const currentLessonIndex = allLessons.indexOf(selectedLesson!);
  const currentLesson = currentLessonMap.get(selectedLesson!)!;
  const currentSectionIndex = sectionOrder.indexOf(selectedSection!);

  return (
    <>
      <Header pageTitle="Профиль" navigation="/" />

      <div className={styles.coursesPage}>
        {/* Навигация */}
        <div className={styles.coursesPage_navigation}>
          <p className={styles.coursesPage_title}>курсы/введение в IOT/</p>
          {Array.from(groupedLessons.entries()).map(([mod, lessonsMap]) => (
            <div key={mod} style={{ marginBottom: 16 }}>
              <div>
                <button className={styles.coursesPage_module}>
                  Модуль {mod}
                </button>
              </div>

              <div className={styles.coursesPage_lessonTitle}>
                <h3>Управление светом 💡</h3>
              </div>

              {/* Глава */}
              {Array.from(lessonsMap.entries()).map(([lesson, lessonData]) => (
                <div key={lesson} className={styles.coursesPage_chapterBlock}>
                  <button
                    className={styles.coursesPage_chapter}
                    onClick={() => {
                      setSelectedModule(mod);
                      setSelectedLesson(lesson);
                      setCurrentStep(1);
                    }}
                  >
                    {lesson}. {capitalizeText(lessonData.lessonName)}
                  </button>
                  {/* Секция */}
                  <div className={styles.coursesPage_section}>
                    {Array.from(lessonData.sections.keys())
                      .sort((a, b) => {
                        const order = ['теория', 'сборка', 'программирование'];
                        return order.indexOf(a) - order.indexOf(b);
                      })
                      .map((sec) => (
                        <div key={sec}>
                          <button
                            style={{
                              backgroundColor:
                                selectedSection === sec
                                  ? 'rgba(100, 110, 120, 1)'
                                  : ' rgba(100, 110, 120, 0.6)'
                            }}
                            className={styles.coursesPage_section_block}
                            onClick={() => {
                              setSelectedModule(mod);
                              setSelectedLesson(lesson);
                              setSelectedSection(sec);
                              setCurrentStep(0);
                            }}
                          >
                            {sec}
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Содержимое */}
        <div className={styles.coursesPage_content}>
          <>
            <img
              src={currentImage}
              alt="slide"
              className={styles.coursesPage_image}
            />
            <div style={{ marginTop: 20 }}>
              <div className={styles.coursesPage_navigationButtons}>
                <button
                  disabled={
                    currentStep === 0 &&
                    currentSectionIndex === 0 &&
                    currentLessonIndex === 0 &&
                    currentModuleIndex === 0
                  }
                  className={styles.coursesPage_navigationButton}
                  onClick={() => {
                    if (currentStep > 0) {
                      setCurrentStep(currentStep - 1);
                    } else {
                      if (currentSectionIndex > 0) {
                        const newSection =
                          sectionOrder[currentSectionIndex - 1];
                        const images = currentLesson.sections.get(newSection)!;
                        setSelectedSection(newSection);
                        setCurrentStep(images.length - 1);
                      } else if (currentLessonIndex > 0) {
                        const newLessonId = allLessons[currentLessonIndex - 1];
                        const newLesson = currentLessonMap.get(newLessonId)!;
                        const newSection =
                          sectionOrder[sectionOrder.length - 1];
                        const images = newLesson.sections.get(newSection)!;
                        setSelectedLesson(newLessonId);
                        setSelectedSection(newSection);
                        setCurrentStep(images.length - 1);
                      } else if (currentModuleIndex > 0) {
                        const newModuleId = allModules[currentModuleIndex - 1];
                        const newLessonMap = groupedLessons.get(newModuleId)!;
                        const newLessons = Array.from(newLessonMap.keys()).sort(
                          (a, b) => a - b
                        );
                        const newLessonId = newLessons[newLessons.length - 1];
                        const newLesson = newLessonMap.get(newLessonId)!;
                        const newSection =
                          sectionOrder[sectionOrder.length - 1];
                        const images = newLesson.sections.get(newSection)!;
                        setSelectedModule(newModuleId);
                        setSelectedLesson(newLessonId);
                        setSelectedSection(newSection);
                        setCurrentStep(images.length - 1);
                      }
                    }
                  }}
                >
                  <Prev
                    className={styles.coursesPage_navigationIcon}
                    style={{
                      fill:
                        currentStep === 0 &&
                        currentSectionIndex === 0 &&
                        currentLessonIndex === 0 &&
                        currentModuleIndex === 0
                          ? 'rgba(77, 77, 77, 0.6)'
                          : 'rgba(255, 251, 255, 1)'
                    }}
                  />
                </button>
                <span className={styles.coursesPage_currentStep}>
                  {selectedSection}/{currentStep + 1}
                </span>
                <button
                  disabled={
                    currentStep === sectionImages.length - 1 &&
                    currentSectionIndex === sectionOrder.length - 1 &&
                    currentLessonIndex === allLessons.length - 1 &&
                    currentModuleIndex === allModules.length - 1
                  }
                  className={styles.coursesPage_navigationButton}
                  onClick={() => {
                    if (currentStep < sectionImages.length - 1) {
                      setCurrentStep(currentStep + 1);
                    } else {
                      if (currentSectionIndex < sectionOrder.length - 1) {
                        const newSection =
                          sectionOrder[currentSectionIndex + 1];
                        setSelectedSection(newSection);
                        setCurrentStep(0);
                      } else if (currentLessonIndex < allLessons.length - 1) {
                        const newLessonId = allLessons[currentLessonIndex + 1];
                        setSelectedLesson(newLessonId);
                        setSelectedSection(sectionOrder[0]);
                        setCurrentStep(0);
                      } else if (currentModuleIndex < allModules.length - 1) {
                        const newModuleId = allModules[currentModuleIndex + 1];
                        const newLessonMap = groupedLessons.get(newModuleId)!;
                        const newLessonId = Array.from(
                          newLessonMap.keys()
                        ).sort((a, b) => a - b)[0];
                        setSelectedModule(newModuleId);
                        setSelectedLesson(newLessonId);
                        setSelectedSection(sectionOrder[0]);
                        setCurrentStep(0);
                      }
                    }
                  }}
                >
                  <Next
                    className={styles.coursesPage_navigationIcon}
                    style={{
                      fill:
                        currentStep === sectionImages.length - 1 &&
                        currentSectionIndex === sectionOrder.length - 1 &&
                        currentLessonIndex === allLessons.length - 1 &&
                        currentModuleIndex === allModules.length - 1
                          ? 'rgba(77, 77, 77, 0.6)'
                          : 'rgba(255, 251, 255, 1)'
                    }}
                  />
                </button>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
});

export default CoursesPage;

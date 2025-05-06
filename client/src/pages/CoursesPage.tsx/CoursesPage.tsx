import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import Header from '../../components/Header/Header';
import { groupedLessons } from '../../utils/groupLessons';
import styles from './CoursesPage.module.scss';
import { capitalizeText } from '../../utils/capitalizeText';
import Next from '@/assets/icons/next/next.svg?react';
import Prev from '@/assets/icons/prev/prev.svg?react';
import { useNavigation } from '../../hooks/useNavigation';

const sectionOrder = ['теория', 'сборка', 'программирование'];
const moduleNames = ['Управление светом', 'Контроль движения']

const CoursesPage = observer(() => {
  const [selectedModule, setSelectedModule] = useNavigation<number | null>(
    'selectedModule',
    1
  );
  const [selectedLesson, setSelectedLesson] = useNavigation<number | null>(
    'selectedLesson',
    1
  );
  const [selectedSection, setSelectedSection] = useNavigation<string>(
    'selectedSection',
    'теория'
  );
  const [currentStep, setCurrentStep] = useNavigation<number>('currentStep', 0);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [selectedModule, selectedLesson, selectedSection, currentStep]);

  const goToSlide = (
    mod: number,
    lesson: number,
    section: string,
    step: number
  ) => {
    setSelectedModule(mod);
    setSelectedLesson(lesson);
    setSelectedSection(section);
    setCurrentStep(step);
  };

  const lessonData =
    selectedModule !== null && selectedLesson !== null
      ? groupedLessons.get(selectedModule)?.get(selectedLesson)
      : null;

  const sectionImages = lessonData?.sections.get(selectedSection) || [];
  const currentImage = sectionImages[currentStep]?.image;

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
        <div className={styles.coursesPage_navigation}>
          <p className={styles.coursesPage_title}>курсы/введение в IOT/</p>

          {selectedModule !== null &&
            (() => {
              const lessonsMap = groupedLessons.get(selectedModule)!;
              return (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <div className={styles.coursesPage_module}>
                      <h2>Модуль {selectedModule}</h2>
                      {/* Кнопки перехода между модулями */}
                      <div className={styles.coursesPage_moduleButtons}>
                        <button
                          className={styles.coursesPage_navigationButton}
                          disabled={currentModuleIndex === 0}
                          onClick={() => {
                            const newModuleId =
                              allModules[currentModuleIndex - 1];
                            const newLessonMap =
                              groupedLessons.get(newModuleId)!;
                            const newLessonId = Array.from(
                              newLessonMap.keys()
                            )[0];
                            goToSlide(
                              newModuleId,
                              newLessonId,
                              sectionOrder[0],
                              0
                            );
                          }}
                        >
                          <Prev
                            className={styles.coursesPage_navigationIcon}
                            style={{
                              fill:
                                currentModuleIndex === 0
                                  ? 'rgba(77, 77, 77, 0.6)'
                                  : 'rgba(43, 43, 43, 1)'
                            }}
                          />
                        </button>

                        <button
                          className={styles.coursesPage_navigationButton}
                          disabled={
                            currentModuleIndex === allModules.length - 1
                          }
                          onClick={() => {
                            const newModuleId =
                              allModules[currentModuleIndex + 1];
                            const newLessonMap =
                              groupedLessons.get(newModuleId)!;
                            const newLessonId = Array.from(
                              newLessonMap.keys()
                            )[0];
                            goToSlide(
                              newModuleId,
                              newLessonId,
                              sectionOrder[0],
                              0
                            );
                          }}
                        >
                          <Next
                            className={styles.coursesPage_navigationIcon}
                            style={{
                              fill:
                                currentModuleIndex === allModules.length - 1
                                  ? 'rgba(77, 77, 77, 0.6)'
                                  : 'rgba(43, 43, 43, 1)'
                            }}
                          />
                        </button>
                      </div>
                    </div>

                    <div className={styles.coursesPage_lessonTitle}>
                      <h3>{moduleNames[currentModuleIndex]}</h3>
                    </div>

                    {Array.from(lessonsMap.entries()).map(
                      ([lesson, lessonData]) => (
                        <div
                          key={lesson}
                          className={styles.coursesPage_lessonBlock}
                        >
                          <button
                            className={styles.coursesPage_lesson}
                            onClick={() =>
                              goToSlide(selectedModule, lesson, 'теория', 0)
                            }
                          >
                            {lesson}. {capitalizeText(lessonData.lessonName)}
                          </button>
                          <div className={styles.coursesPage_section}>
                            {Array.from(lessonData.sections.keys())
                              .sort(
                                (a, b) =>
                                  sectionOrder.indexOf(a) -
                                  sectionOrder.indexOf(b)
                              )
                              .map((sec) => {
                                const isCurrent =
                                  selectedLesson === lesson &&
                                  selectedSection === sec;

                                const totalSteps =
                                  lessonData.sections.get(sec)?.length ?? 0;

                                return (
                                  <div key={sec}>
                                    <button
                                      style={{
                                        backgroundColor: isCurrent
                                          ? 'rgba(100, 110, 120, 1)'
                                          : ' rgba(100, 110, 120, 0.6)'
                                      }}
                                      className={
                                        styles.coursesPage_section_block
                                      }
                                      onClick={() =>
                                        goToSlide(
                                          selectedModule,
                                          lesson,
                                          sec,
                                          0
                                        )
                                      }
                                    >
                                      {sec}
                                      {isCurrent && (
                                        <p>
                                          {currentStep + 1}/{totalSteps}
                                        </p>
                                      )}
                                    </button>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </>
              );
            })()}
        </div>

        <div className={styles.coursesPage_content} ref={contentRef}>
          <>
            <img
              src={currentImage}
              alt="slide"
              className={styles.coursesPage_image}
            />
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
                  } else if (currentSectionIndex > 0) {
                    const newSection = sectionOrder[currentSectionIndex - 1];
                    const images = currentLesson.sections.get(newSection)!;
                    setSelectedSection(newSection);
                    setCurrentStep(images.length - 1);
                  } else if (currentLessonIndex > 0) {
                    const newLessonId = allLessons[currentLessonIndex - 1];
                    const newLesson = currentLessonMap.get(newLessonId)!;
                    const newSection = sectionOrder[sectionOrder.length - 1];
                    const images = newLesson.sections.get(newSection)!;
                    goToSlide(
                      selectedModule!,
                      newLessonId,
                      newSection,
                      images.length - 1
                    );
                  } else if (currentModuleIndex > 0) {
                    const newModuleId = allModules[currentModuleIndex - 1];
                    const newLessonMap = groupedLessons.get(newModuleId)!;
                    const newLessons = Array.from(newLessonMap.keys()).sort(
                      (a, b) => a - b
                    );
                    const newLessonId = newLessons[newLessons.length - 1];
                    const newLesson = newLessonMap.get(newLessonId)!;
                    const newSection = sectionOrder[sectionOrder.length - 1];
                    const images = newLesson.sections.get(newSection)!;
                    goToSlide(
                      newModuleId,
                      newLessonId,
                      newSection,
                      images.length - 1
                    );
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
                  } else if (currentSectionIndex < sectionOrder.length - 1) {
                    const newSection = sectionOrder[currentSectionIndex + 1];
                    goToSlide(selectedModule!, selectedLesson!, newSection, 0);
                  } else if (currentLessonIndex < allLessons.length - 1) {
                    const newLessonId = allLessons[currentLessonIndex + 1];
                    goToSlide(selectedModule!, newLessonId, sectionOrder[0], 0);
                  } else if (currentModuleIndex < allModules.length - 1) {
                    const newModuleId = allModules[currentModuleIndex + 1];
                    const newLessonMap = groupedLessons.get(newModuleId)!;
                    const newLessonId = Array.from(newLessonMap.keys()).sort(
                      (a, b) => a - b
                    )[0];
                    goToSlide(newModuleId, newLessonId, sectionOrder[0], 0);
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
          </>
        </div>
      </div>
    </>
  );
});

export default CoursesPage;

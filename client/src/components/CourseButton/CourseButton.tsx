import { ReactElement } from 'react';
import { CourseButtonProps } from './types';
import styles from './CourseButton.module.scss';
import { useNavigate } from 'react-router-dom';

const CourseButton = ({ navigation, children }: CourseButtonProps): ReactElement => {
  const navigate = useNavigate();
  return (
    <button
      className={styles.courseButton}
      onClick={() => navigate(navigation)}
    >
      {children}
    </button>
  );
};

export default CourseButton;

import { ReactElement } from 'react';
import { CourseButtonProps } from './types';
import styles from './CourseButton.module.scss';
import { useNavigate } from 'react-router-dom';

const CourseButton = ({
  navigation,
  name
}: CourseButtonProps): ReactElement => {
  const navigate = useNavigate();
  return (
    <button
      className={styles.courseButton}
      onClick={() => navigate(navigation)}
    >
      {name}
    </button>
  );
};

export default CourseButton;

import styles from './NoMobile.module.scss';

const NoMobile = () => {
  return (
    <div className={styles.noMobile}>
      <p className={styles.noMobile__text}>Сайт пока недоступен</p>
      <p className={styles.noMobile__text}>в мобильной версии</p>
    </div>
  );
};

export default NoMobile;

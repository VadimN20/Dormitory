import { useState } from "react";
import styles from "./MainPage.module.css";

export const MainPage = () => {
  const [kutuzMap, setKutuzMap] = useState(false);
  const [studMap, setStudMap] = useState(true);
  return (
    <main className={styles.main_wrap}>
      {/* <div className={styles.container_wrap}>
        <div className={styles.container}>Как проводится заселение</div>
        <div className={styles.container}>Как происходит оплата</div>
        <div className={styles.container}>Коротко о нас</div>
      </div> */}
      <div className={styles.contacts}>
        <div className={styles.info}>
          <h3>Контактная информация</h3>
          <p>Телефон: +8(977)541-61-69</p>
          <p>Почта: v.v.nifontov@mail.ru</p>
        </div>
        <div className={styles.map}>
          <h3>Как пройти</h3>
          <div className={styles.slider}>
            <div className={styles.btn_slider}>
              <button
                className={
                  studMap ? styles.btn_navMap_active : styles.btn_navMap
                }
                onClick={() => {
                  setStudMap(true);
                  setKutuzMap(false);
                }}
              >
                От М. Студенческая
              </button>
              <button
                className={
                  kutuzMap ? styles.btn_navMap_active : styles.btn_navMap
                }
                onClick={() => {
                  setKutuzMap(true);
                  setStudMap(false);
                }}
              >
                От М. Кутузовская
              </button>
            </div>
            <img
              className={
                studMap ? styles.map_img_stud_left : styles.map_img_stud_ridth
              }
              src="/images/mainPage/map/Stud-Dormitory.png"
              alt="Карта прохода от Метро - Студенческая"
            />
            <img
              className={
                kutuzMap
                  ? styles.map_img_kutuz_right
                  : styles.map_img_kutuz_left
              }
              src="/images/mainPage/map/Kutuza-Dormitory.png"
              alt="Карта прохода от Метро - Кутузовская"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

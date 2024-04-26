import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import { CountStudents } from "./CountStudents";

import styles from "./Floor.module.css";

const URLdataBase = "http://localhost:8080/floors";

export const Floor = () => {
  const { numFloor } = useParams();
  const [floor, setFloor] = useState([]);
  const [students, setStudents] = useState();

  const getFloorInfo = async (number) => {
    const URL = URLdataBase + "/" + number;
    const response = await fetch(URL).then((response) => response.json());

    setFloor(response.rooms);
  };

  useEffect(() => {
    getFloorInfo(numFloor, setFloor);
  }, [numFloor]);

  return (
    <div className={styles.wrapper_floor}>
      <h1>Выбор комнаты:</h1>
      <div className={styles.wrapper_rooms}>
        {floor.map((room) => {
          for (let key in room) {
            return (
              <div className={styles.room} key={room[key].number}>
                <div className={styles.about_room}>
                  <div className={styles.wrapper_num_room}>
                    <p className={styles.num_room}>{room[key].number}</p>
                  </div>
                  <p className={styles.students_room}>
                    Комната на {room[key].countStudent} человека
                  </p>
                </div>
                <div className={styles.students}></div>
                <Link to={`room/${room[key].number}`}>Перейти в комнату</Link>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

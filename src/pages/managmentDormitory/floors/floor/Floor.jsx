import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { FaUserPlus } from "react-icons/fa6";
import { AddStudent } from "./addStudent/AddStudent";

import styles from "./Floor.module.css";

const URLdataBase = "http://localhost:8080/floor/get/";

export const Floor = () => {
  const { token } = useAuth();
  const { numFloor } = useParams();
  const [floor, setFloor] = useState();
  const [clickStudentAdd, setClickStudentAdd] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");

  const getApiData = async (number) => {
    const response = await fetch(URLdataBase + number, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const json = await response.json();
    setFloor(json);
    return json;
  };

  useEffect(() => {
    getApiData(numFloor);
  }, []);

  const VisibleFloor = () => {
    if (floor) {
      return floor.rooms.map((room) => (
        <div className={styles.room} key={room.number}>
          <div className={styles.about_room}>
            <div className={styles.wrapper_num_room}>
              <Link className={styles.num_room}>{room.number}</Link>
            </div>
            <p className={styles.room_maxCount}>
              Комната на {room.maxCountStudent} человека
            </p>
          </div>

          <div className={styles.students}>
            <button
              className={
                room.students.length === room.maxCountStudent
                  ? styles.add_student_none
                  : styles.add_student
              }
              onClick={() => {
                setRoomNumber(room.number);
                setClickStudentAdd(!clickStudentAdd);
              }}
            >
              <FaUserPlus />
            </button>
            {room.students.length === room.maxCountStudent ? (
              room.students.map((student, index) => (
                <Link
                  to={"/managmentStudents/student/" + student.studentId}
                  title={student.firstname + " " + student.lastname}
                  className={styles.student}
                  key={student.studentId}
                >
                  {student.photo ? (
                    <img
                      id="user_photo"
                      className={styles.student_photo}
                      src={`data:image/jpeg;base64, ${student.photo.data}`}
                      alt="Фото профиля студента"
                    />
                  ) : (
                    <img
                      className={styles.student_photo}
                      src="/images/myAccount/userPhoto.png"
                      alt="Базовое фото профиля"
                    />
                  )}
                  {student.firstname + " " + student.lastname}
                </Link>
              ))
            ) : room.maxCountStudent - room.students.length > 0 ? (
              room.students.map((student, index) => (
                <Link
                  to={"/managmentStudents/student/" + student.studentId}
                  title={student.firstname + " " + student.lastname}
                  className={styles.student}
                  key={student.studentId}
                >
                  {student.photo ? (
                    <img
                      id="user_photo"
                      className={styles.student_photo}
                      src={`data:image/jpeg;base64, ${student.photo.data}`}
                      alt="Фото профиля студента"
                    />
                  ) : (
                    <img
                      className={styles.student_photo}
                      src="/images/myAccount/userPhoto.png"
                      alt="Базовое фото профиля"
                    />
                  )}
                  {student.firstname + " " + student.lastname}
                </Link>
              ))
            ) : (
              <p>Ошибка</p>
            )}
          </div>
        </div>
      ));
    }
  };

  return (
    <div className={styles.wrapper_floor}>
      <h3 className={styles.page_title}>Комнаты: {numFloor}-го этажа</h3>
      <div className={styles.wrapper_rooms}>
        <VisibleFloor />
      </div>
      {roomNumber ? (
        <AddStudent
          clickStudAdd={clickStudentAdd}
          roomNumber={roomNumber}
          setClickStudAdd={setClickStudentAdd}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

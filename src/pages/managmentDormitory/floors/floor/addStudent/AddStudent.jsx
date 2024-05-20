import { useAuth } from "../../../../../hooks/useAuth";
import { useEffect, useState } from "react";

import styles from "./AddStudent.module.css";

export const AddStudent = ({ clickStudAdd, roomNumber, setClick }) => {
  const URLdataBase = "http://localhost:8080/student/getNonResident";
  const { token } = useAuth();
  const [listStudent, setListStudent] = useState();

  const getApiData = async () => {
    const response = await fetch(URLdataBase, {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    });
    const json = await response.json();
    setListStudent(json.students);
  };

  useEffect(() => {
    getApiData();
  }, []);

  const roomAddStudent = async (student_id) => {
    const response = await fetch(
      "http://localhost:8080/room/attach/" + student_id + "/" + roomNumber,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json",
        },
      }
    );
  };

  return (
    <div
      className={
        clickStudAdd
          ? styles.window_add_student
          : styles.window_add_student_none
      }
    >
      Выбор студента:
      <ul className={styles.list_student_add}>
        {listStudent ? (
          listStudent.map((student, index) => (
            <li
              key={index}
              onClick={() => {
                roomAddStudent(student.studentId);
              }}
              className={styles.student_add}
            >
              <div className={styles.photo_fio}>
                <img
                  className={styles.photo_student}
                  src="/images/myAccount/userPhoto.png"
                  alt="У студента нет фото"
                />
                {student.lastname +
                  " " +
                  student.firstname +
                  " " +
                  student.middlename}
              </div>
              <span>{student.studentId}</span>
            </li>
          ))
        ) : (
          <span>Все студенты заселены</span>
        )}
      </ul>
    </div>
  );
};

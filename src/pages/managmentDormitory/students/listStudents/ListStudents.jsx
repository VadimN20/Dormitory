import { Link } from "react-router-dom";

import styles from "./ListStudents.module.css";
import { useAuth } from "../../../../hooks/useAuth";
import { useState, useEffect } from "react";

export const ListStudents = () => {
  const { token } = useAuth();
  const [listStudents, setListStudents] = useState("");
  const URLdataBase = "http://localhost:8080/student/getAll";

  const getApiData = async () => {
    const response = await fetch(URLdataBase, {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    });
    const json = await response.json();
    setListStudents(json.students);
    return json;
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div className={styles.list_students_wrapper}>
      <h3>Список студентов</h3>
      {listStudents &&
        listStudents.map((student, index) => (
          <Link
            className={styles.student_link}
            to={`student/${student.studentId}`}
            key={index}
          >
            <div className={styles.student_info_link}>
              <span>
                {student.lastname +
                  " " +
                  student.firstname +
                  " " +
                  student.middlename}
              </span>
              <span>{student.room ? student.room.number : "Ожидает"}</span>
            </div>
          </Link>
        ))}
      {/* <Link to={`student/st-120073`}>Студент ST-120073</Link> */}
    </div>
  );
};

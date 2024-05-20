import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../../../../../hooks/useAuth";

import { StudentDocuments } from "../studentAccount/studentDocuments/StudentDocuments";
import { InventoryStudent } from "./inventoryStudent/InventoryStudent";

import styles from "./StudentAccount.module.css";

export const StudentAccount = () => {
  const URLdataBase = "http://localhost:8080/student/";

  const { token } = useAuth();

  const { student_id } = useParams();

  const [infoUser, setInfoUser] = useState("");

  const getApiData = async () => {
    const response = await fetch(URLdataBase + "get/" + student_id, {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    });
    const json = await response.json();
    setInfoUser(json);
    return json;
  };

  useEffect(() => {
    getApiData();
  }, []);

  const VisibleInfoUser = () => {
    if (infoUser) {
      return (
        <div className={styles.main_wrapper}>
          <div className={styles.profile} id={styles.wrapper_section}>
            <div className={styles.img_section}>
              {infoUser.photo ? (
                <img
                  id="user_photo"
                  className={styles.profile_photo}
                  src={`data:image/jpeg;base64, ${infoUser.photo.data}`}
                  alt="Фото профиля студента"
                />
              ) : (
                <img
                  className={styles.profile_photo}
                  src="/images/myAccount/userPhoto.png"
                  alt="Базовое фото профиля"
                />
              )}
            </div>
            <ul className={styles.list_info}>
              <li>
                <h3>
                  {infoUser.lastname +
                    " " +
                    infoUser.firstname +
                    " " +
                    infoUser.middlename}
                </h3>
              </li>
              <li>{"Номер студенческого билета: " + infoUser.studentId}</li>
              <li>Пол: {infoUser.gender === "MALE" ? "мужской" : "женский"}</li>
              <li>
                Этаж: {infoUser.room ? infoUser.room.floor.number : "Ожидает"}
              </li>
              <li>
                Номер комнаты:{" "}
                {infoUser.room ? infoUser.room.number : "Ожидает"}
              </li>

              <ul>
                <h3>Контактные данные:</h3>

                <li>Телефон: {infoUser.phone}</li>
                <li>Почта: {infoUser.email}</li>
              </ul>
            </ul>
          </div>

          <StudentDocuments student_id={student_id} />
          <InventoryStudent infoUser={infoUser} />
        </div>
      );
    }
  };

  return <VisibleInfoUser />;
};

import { useEffect, useState } from "react";
import styles from "./MyAccount.module.css";
import { useAuth } from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

const URLdataBase = "http://localhost:8080/student/get";

export const MyAccount = () => {
  // const { token } = useAuth();
  // const decoded = jwtDecode(token);

  const [infoUser, setInfoUser] = useState("");
  const data = {
    firstname: "Вадим",
    lastname: "Нифонтов",
    middlename: "Вячеславович",
    gender: "MALE",
    phone: "+79995419191",
    email: "vvnifontov@mail.ru",
    studentId: "st621813",
    room: {
      floor: {
        number: "3",
      },
      number: "307",
    },
  };

  useEffect(() => {
    setInfoUser(data);
  }, []);

  // const getApiData = async () => {
  //   const response = await fetch(URLdataBase + "/" + decoded.sub, {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  //  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdC0xMjAwNzMiLCJyb2xlIjoiU1RVREVOVCIsImV4cCI6MTcxNDA1NDQzMCwiaWF0IjoxNzE0MDUwODMwfQ.C6RosllN_QLulUI2cFzOWBpvVMauR0VTmoTl0Mg9POc
  //   const json = await response.json();
  //   setInfoUser(json);
  //   return json;
  // };

  // useEffect(() => {
  //   getApiData();
  // }, []);

  const VisibleInfoUser = () => {
    if (infoUser)
      return (
        <div className={styles.main_wrapper}>
          <div className={styles.main_info}>
            <img
              className={styles.personalPhoto}
              src="/images/myAccount/userPhoto.png"
              alt="Ваше фото"
            />

            <div className={styles.information}>
              <div className={styles.fio_numberId}>
                <h3 className={styles.fio}>
                  {infoUser.lastname +
                    " " +
                    infoUser.firstname +
                    " " +
                    infoUser.middlename}
                </h3>
                <h3 className={styles.studentIdNumber}>
                  Номер студенческого билета:
                  {infoUser.studentId}
                </h3>
              </div>
              <div>
                <p>Пол: {infoUser.gender === "MALE" ? "Мужской" : "Женский"}</p>
                <p>Этаж: {infoUser.room.floor.number}</p>
                <p>Номер комнаты: {infoUser.room.number}</p>
              </div>
              <div className={styles.contacts}>
                <ul>
                  Мои контакты:
                  <li>Телефон: {infoUser.phone}</li>
                  <li>Почта: {infoUser.email}</li>
                </ul>
              </div>
              <div className={styles.inventory}>
                <h4>Мой инвентарь:</h4>
                <div>
                  <ul>
                    <li>Пододеяльник</li>
                    <li>Наволочка</li>
                    <li>Простыня</li>
                    <li>Полотенце</li>
                    <li>Плед</li>
                    <li>Одеяло</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.wrapper_other_info}>
            <div className={styles.documents}>
              <h4>Документы</h4>
            </div>
            <div className={styles.checks}>
              <h4>Чеки</h4>
            </div>
          </div>
        </div>
      );
  };

  return <VisibleInfoUser />;
};

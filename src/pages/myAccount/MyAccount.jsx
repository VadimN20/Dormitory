import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import InputMask from "react-input-mask";

import { useAuth } from "../../hooks/useAuth";
import { AddPhoto } from "../../components/addPhoto/AddPhoto";
import { Documents } from "./documents/Documents";
import { Inventory } from "./inventory/Inventory";

import styles from "./MyAccount.module.css";
import { FaPlus, FaEdit } from "react-icons/fa";

const URLdataBase = "http://localhost:8080/student/";

export const MyAccount = () => {
  const { token } = useAuth();
  const decoded = jwtDecode(token);
  const phoneRef = useRef();
  const emailRef = useRef();

  const [infoUser, setInfoUser] = useState("");
  const [isChangeInfo, setIsChangeInfo] = useState(false);
  const [addPhoto, setAddPhoto] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // const data = {
  //   asd: "asd",
  //   firstname: "Вадим",
  //   lastname: "Нифонтов",
  //   middlename: "Вячеславович",
  //   gender: "MALE",
  //   phone: "+79995419191",
  //   email: "vvnifontov@mail.ru",
  //   studentId: "st621813",
  //   room: {
  //     floor: {
  //       number: "3",
  //     },
  //     number: "307",
  //   },
  //   inventories: ["Пододельяник", "Простыня", "Плед"],
  // };

  // useEffect(() => {
  //   setInfoUser(data);
  // }, []);
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const saveChanges = () => {
    const data = {
      phone: phoneRef.current.value,
      email: emailRef.current.value,
    };

    if (data.phone.includes("_")) {
      setErrorMessage("В номере телефона должно быть 11 цифр");
    } else if (!isValidEmail(data.email) || data.email === 0) {
      setErrorMessage("Email is invalid");
    } else {
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      };
      setErrorMessage(null);
      fetch(URLdataBase + "update/" + infoUser.studentId, requestOptions);
      setIsChangeInfo(!isChangeInfo);
    }
  };

  const getApiData = async () => {
    const response = await fetch(URLdataBase + "get/" + decoded.sub, {
      headers: {
        Authorization: "Bearer " + token,
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
          {/* {!isChangeInfo ? ( */}
          <div className={styles.profile} id={styles.wrapper_section}>
            <div className={styles.img_section}>
              {infoUser.photo ? (
                <img
                  id="user_photo"
                  className={styles.profile_photo}
                  src={`data:image/jpeg;base64, ${infoUser.photo.data}`}
                  alt="Ваше фото профиля"
                />
              ) : (
                <img
                  className={styles.profile_photo}
                  src="/images/myAccount/userPhoto.png"
                  alt="Базовое фото профиля"
                />
              )}
              <button
                className={styles.add_photo}
                onClick={() => {
                  setAddPhoto(!addPhoto);
                }}
              >
                <FaPlus />
              </button>
              <AddPhoto addPhoto={addPhoto} />
            </div>
            <ul className={styles.list_info}>
              <li>
                <h3>{infoUser.lastname + " " + infoUser.firstname}</h3>
              </li>
              <li>{"Номер студенческого билета: " + infoUser.studentId}</li>
              <li>Пол: {infoUser.gender === "MALE" ? "мужской" : "женский"}</li>
              <li>Этаж: {infoUser.room.floor.number}</li>
              <li>Номер комнаты: {infoUser.room.number}</li>

              <ul>
                <h3>
                  Мои контакты:
                  <button
                    className={styles.btn_change_contacts}
                    onClick={() => {
                      setIsChangeInfo(!isChangeInfo);
                    }}
                    type="button"
                  >
                    <FaEdit />
                  </button>
                </h3>
                {isChangeInfo ? (
                  <>
                    <li>
                      Телефон:
                      <InputMask
                        mask="+7(999)999-99-99"
                        className={styles.input_field}
                        type="text"
                        placeholder={infoUser.phone}
                        //Если пустой номер сохранить, то такой и перейдет
                        required
                        ref={phoneRef}
                      ></InputMask>
                    </li>
                    <li>
                      Почта:
                      <input
                        className={styles.input_field}
                        type="text"
                        placeholder={infoUser.email}
                        required
                        ref={emailRef}
                      />
                    </li>
                    <div
                      className={
                        errorMessage ? styles.error_msg : styles.error_msg_none
                      }
                    >
                      {errorMessage}
                    </div>
                    <button
                      className={styles.btn_save_changes}
                      type="button"
                      onClick={saveChanges}
                    >
                      Сохранить
                    </button>
                  </>
                ) : (
                  <>
                    <li>Телефон: {infoUser.phone}</li>
                    <li>Почта: {infoUser.email}</li>
                  </>
                )}
              </ul>
            </ul>
          </div>

          <Documents />
          {/* <div className={styles.documents} id={styles.wrapper_section}>
            <h3>Документы</h3>
            <ul className={styles.list_info}></ul>
          </div> */}
          <Inventory infoUser={infoUser} />
        </div>
      );
    }
  };

  return <VisibleInfoUser />;
};

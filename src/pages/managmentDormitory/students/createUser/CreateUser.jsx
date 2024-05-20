import { useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";

import styles from "./CreateUser.module.css";

export const CreateUser = () => {
  const { token } = useAuth();
  const [studentId, setStudentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("MALE");

  const handleCreate = (event) => {
    event.preventDefault();

    const data = {
      lastname: lastName,
      firstname: firstName,
      middlename: middleName,
      studentId: studentId,
      phone: phone,
      email: email,
      gender: gender,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:8080/student/create", requestOptions).then(
      (result) => console.log(result)
    );
  };

  return (
    <form className={styles.form_create} onSubmit={handleCreate}>
      <h3>Добавить студента</h3>
      <input
        tabIndex={1}
        className={styles.input_field}
        type="text"
        value={lastName}
        name="lastName"
        placeholder="Фамилия"
        required
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        tabIndex={2}
        className={styles.input_field}
        type="text"
        value={firstName}
        name="firstName"
        placeholder="Имя"
        required
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        tabIndex={3}
        className={styles.input_field}
        type="text"
        value={middleName}
        name="middleName"
        placeholder="Отчество"
        required
        onChange={(e) => setMiddleName(e.target.value)}
      />
      <input
        tabIndex={4}
        className={styles.input_field}
        type="text"
        value={studentId}
        name="studentId"
        placeholder="Номер зачетной книжки"
        required
        onChange={(e) => setStudentId(e.target.value)}
      />
      <input
        tabIndex={5}
        className={styles.input_field}
        type="text"
        value={phone}
        name="phone"
        placeholder="Телефон"
        required
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        tabIndex={6}
        className={styles.input_field}
        type="text"
        value={email}
        name="email"
        placeholder="Почта"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <select
        className={styles.input_field}
        name="gender"
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="MALE">Мужской</option>
        <option value="FEMALE">Женский</option>
      </select>

      <button className={styles.btn_add_student} type="submit">
        Создать
      </button>
    </form>
  );
};

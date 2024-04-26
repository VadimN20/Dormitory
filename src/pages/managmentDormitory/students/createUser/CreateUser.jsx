import { useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";

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

    fetch("http://localhost:8080/student/create", requestOptions)
      //.then(response => response.json())
      //.then(response => console.log(response));
      .then((result) => console.log(result));
  };

  return (
    <form onSubmit={handleCreate}>
      <input
        type="text"
        value={lastName}
        name="lastName"
        placeholder="Фамилия"
        required
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        value={firstName}
        name="firstName"
        placeholder="Имя"
        required
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        value={middleName}
        name="middleName"
        placeholder="Отчество"
        required
        onChange={(e) => setMiddleName(e.target.value)}
      />
      <input
        type="text"
        value={studentId}
        name="studentId"
        placeholder="Номер зачетной книжки"
        required
        onChange={(e) => setStudentId(e.target.value)}
      />
      <input
        type="text"
        value={phone}
        name="phone"
        placeholder="Телефон"
        required
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        value={email}
        name="email"
        placeholder="Почта"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <select name="gender" onChange={(e) => setGender(e.target.value)}>
        <option value="MALE">Мужской</option>
        <option value="FEMALE">Женский</option>
      </select>

      <button type="submit">Создать</button>
    </form>
  );
};

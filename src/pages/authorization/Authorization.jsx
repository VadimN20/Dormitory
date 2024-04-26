import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import styles from "./Authorization.module.css";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
// import axios from "axios";

export const Authorization = () => {
  const { setToken, setRole } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisiblePas, setIsVisiblePas] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ login: username, password: password }),
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        if (data !== null) {
          setToken(data["token"]), setRole(data["role"]);
          navigate(
            data["role"] === "STUDENT" ? "../myAccount" : "../managmentFloors"
          );
        } else {
          setToken(null);
          setRole(null);
        }
      });
  };

  return (
    <div className={styles.main}>
      <Link className={styles.main_btn} to={"/"}>
        На главную
      </Link>
      <form className={styles.authorization} onSubmit={handleLogin}>
        <h2 className={styles.name_form}>Авторизация</h2>
        <div className={styles.input_box}>
          <input
            className={styles.input_field}
            id="login"
            type="login"
            value={username}
            name="username"
            required
            autoComplete="new-login"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className={styles.input_label} htmlFor="login">
            Логин
          </label>
        </div>
        <div className={styles.input_box}>
          <input
            className={styles.input_field}
            id="password"
            type={isVisiblePas ? "text" : "password"}
            value={password}
            name="password"
            required
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className={styles.input_label} htmlFor="password">
            Пароль
          </label>
          <button
            className={styles.btn_eye}
            type="button"
            onClick={() => {
              setIsVisiblePas(!isVisiblePas);
            }}
          >
            {isVisiblePas ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        </div>
        <div>
          <label className={styles.switch}>
            <input className={styles.checkBox} type="checkbox" />
            Запомнить меня
            <div className={styles.slider_round}></div>
          </label>
        </div>
        <button className={styles.btn_login} type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

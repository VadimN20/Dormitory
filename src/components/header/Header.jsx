import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { HiMenu } from "react-icons/hi";

import styles from "./Header.module.css";

export const Header = () => {
  const { role } = useAuth();
  const [logOutClick, setLogOutClick] = useState(false);
  const [roleChange, setRoleChange] = useState(localStorage.getItem("role"));
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const setWrapperVisNav = roleChange
    ? styles.wrapper_nav
    : styles.wrapper_nav_none;
  const setWrapperVisEntry = roleChange
    ? styles.wrapper_entry_none
    : styles.wrapper_entry;
  const setWrapperVisOut = roleChange
    ? styles.wrapper_out
    : styles.wrapper_out_none;

  const setLogOut = () => {
    // delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRoleChange(null);
    navigate("/authorization", { replace: true });
  };

  useEffect(() => {
    if (role && logOutClick) {
      setRoleChange(null);
    } else {
      setRoleChange(role);
    }
  });

  return (
    <header className={styles.header}>
      <img
        className={styles.logo}
        src="../../images/header/logo.png"
        alt="Логотип"
      />
      <nav className={setWrapperVisNav}>
        <div className={styles.navigation}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.nav_item_active}` : `${styles.nav_item}`
            }
            to={role === "ADMIN" ? "managmentFloors" : "myAccount"}
          >
            {role === "ADMIN" ? "Управление общежитием" : "Мой аккаунт"}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.nav_item_active}` : `${styles.nav_item}`
            }
            to={role === "ADMIN" ? "managmentStudents" : "notifications"}
          >
            {role === "ADMIN" ? "Студенты" : "Уведомления"}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.nav_item_active}` : `${styles.nav_item}`
            }
            to={"payment"}
          >
            Оплата
          </NavLink>
        </div>
      </nav>
      <div className={setWrapperVisEntry}>
        <Link className={styles.btn_in} to={"/authorization"}>
          ВХОД
        </Link>
      </div>
      <div className={setWrapperVisOut}>
        <button
          className={styles.btn_out}
          onClick={() => {
            setLogOut();
            setLogOutClick(true);
          }}
        >
          Выход
        </button>
      </div>
      <div className={styles.burger}>
        <div className={styles.display_none}>
          <Link to={"/authorization"}>ВХОД</Link>
        </div>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <HiMenu />
        </button>
        <nav
          className={
            isOpen ? styles.wrapperVisMobNav : styles.wrapperVisMobNav_none
          }
        >
          <NavLink to={role === "ADMIN" ? "managmentFloors" : "myAccount"}>
            {role === "ADMIN" ? "Управление общежитием" : "Мой аккаунт"}
          </NavLink>
          <NavLink
            to={role === "ADMIN" ? "managmentStudents" : "notifications"}
          >
            {role === "ADMIN" ? "Студенты" : "Уведомления"}
          </NavLink>
          <NavLink to={"payment"}>Оплата</NavLink>
          <button
            onClick={() => {
              setLogOut();
              setLogOutClick(true);
            }}
          >
            Выход
          </button>
        </nav>
      </div>
    </header>
  );
};

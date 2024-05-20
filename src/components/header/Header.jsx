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

  const setLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
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
      <nav
        className={roleChange ? styles.wrapper_nav : styles.wrapper_nav_none}
      >
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
            оплата
          </NavLink>
        </div>
      </nav>
      <div
        className={roleChange ? styles.wrapper_out : styles.wrapper_out_none}
      >
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
      <div
        className={
          roleChange ? styles.wrapper_entry_none : styles.wrapper_entry
        }
      >
        <Link className={styles.btn_out} to={"/authorization"}>
          Вход
        </Link>
      </div>
      <div className={role ? styles.burger : styles.display_none}>
        <button
          className={styles.burger_btn}
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
          <NavLink
            className={styles.burger_item}
            to={role === "ADMIN" ? "managmentFloors" : "myAccount"}
          >
            {role === "ADMIN" ? "Управление общежитием" : "Мой аккаунт"}
          </NavLink>
          <NavLink
            className={styles.burger_item}
            to={role === "ADMIN" ? "managmentStudents" : "notifications"}
          >
            {role === "ADMIN" ? "Студенты" : "Уведомления"}
          </NavLink>
          <NavLink className={styles.burger_item} to={"payment"}>
            Оплата
          </NavLink>
          <button
            className={styles.burger_out}
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

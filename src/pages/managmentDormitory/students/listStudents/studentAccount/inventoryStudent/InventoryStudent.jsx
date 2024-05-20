import { useEffect, useState } from "react";
import { GiCheckMark } from "react-icons/gi";

import { inventoryList } from "../../../../../myAccount/inventory/inventoryList";
import { useAuth } from "../../../../../../hooks/useAuth";
import styles from "./InventoryStudent.module.css";

export const InventoryStudent = ({ infoUser }) => {
  const URLdataBase = "http://localhost:8080/student/saveInventory/";
  const { token } = useAuth();
  const temp = new Array(inventoryList.length).fill(false);
  const [inventoryBd, setInventoryBd] = useState(
    infoUser.inventories.length === 0 ? "" : infoUser.inventories
  );

  const changeData = () => {
    if (inventoryBd) {
      inventoryList.map(({ title, isHaving }, index) => {
        inventoryBd.map((item) => {
          if (title === item) {
            inventoryList[index].isHaving = true;
            temp[index] = true;
          }
        });
      });
    }
  };

  changeData();
  const [checkedState, setCheckedState] = useState(temp);

  const data = { inventories: [] };

  const saveInventory = () => {
    inventoryList.map(({ title, isHaving }, index) => {
      if (checkedState[index]) {
        data.inventories.push(title);
      }
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const responce = fetch(URLdataBase + infoUser.studentId, requestOptions);
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  return (
    <div className={styles.inventory} id={styles.wrapper_section}>
      <div className={styles.inventory_section}>
        <h3>Инвентарь: </h3>
        <form className={styles.list_inventory}>
          {inventoryList.map(({ title, isHaving }, index) =>
            isHaving ? (
              <label key={index}>
                {checkedState[index] ? <GiCheckMark /> : ""}
                <input
                  type="checkbox"
                  className={styles.input_check}
                  name=""
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index)}
                />
                {title}
              </label>
            ) : (
              <label key={index}>
                {checkedState[index] ? <GiCheckMark /> : ""}
                <input
                  type="checkbox"
                  className={styles.input_check}
                  name=""
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index)}
                />
                {title}
              </label>
            )
          )}
        </form>
        <button
          onClick={() => {
            saveInventory();
          }}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};

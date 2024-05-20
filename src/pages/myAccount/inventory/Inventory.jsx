import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";

import { inventoryList } from "./inventoryList";
import styles from "./Inventory.module.css";

export const Inventory = ({ infoUser }) => {
  const [inventoryBd, setInventoryBd] = useState(
    infoUser.inventories.length === 0 ? "" : infoUser.inventories
  );

  const changeData = () => {
    if (inventoryBd) {
      inventoryList.map(({ title, isHaving }, index) => {
        inventoryBd.map((item) => {
          if (title === item) {
            inventoryList[index].isHaving = true;
          }
        });
      });
    }
  };

  changeData();

  return (
    <div className={styles.inventory} id={styles.wrapper_section}>
      <div className={styles.inventory_section}>
        <h3>Инвентарь:</h3>
        <ul className={styles.list_inventory}>
          {inventoryList.map(({ title, isHaving }, index) =>
            isHaving ? (
              <li key={index}>
                {title}
                <GiCheckMark />
              </li>
            ) : (
              <li key={index}>{title}</li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

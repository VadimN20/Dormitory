import styles from "./ManagmentFloors.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RoofOfDormitory } from "./RoofOfDormitory";

export const ManagmentFloors = () => {
  const [floors, setFloors] = useState([]);

  const getApiData = async () => {
    const response = await fetch("http://localhost:8080/floors").then(
      (response) => response.json()
    );

    setFloors(response);
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div className={styles.main}>
      {floors.map((floor) =>
        floor.floor !== floors.length ? (
          <Link
            to={`floor/${floor.floor}`}
            className={styles.floors}
            key={floor.floor}
          >
            <label className={styles.floorNumber}>
              {`Этаж: ${floor.floor}`}
            </label>
            <div className={styles.floor}>
              <img
                className={styles.svg_style}
                src={floor.img}
                alt="Этаж"
              ></img>
            </div>
          </Link>
        ) : (
          <RoofOfDormitory floor={floor} key={floor.floor} />
        )
      )}
      <h2>Выбор этажа</h2>
    </div>
  );
};

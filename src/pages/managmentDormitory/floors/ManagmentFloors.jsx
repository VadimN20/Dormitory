import styles from "./ManagmentFloors.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RoofOfDormitory } from "./RoofOfDormitory";
import { useAuth } from "../../../hooks/useAuth";

export const ManagmentFloors = () => {
  const { token } = useAuth();
  const URLdataBase = "http://localhost:8080/floor/getCount";

  const [floors, setFloors] = useState([]);

  const getApiData = async () => {
    const response = await fetch(URLdataBase, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const json = await response.json();
    setFloors(Array(json + 1).fill(json));
    return json;
  };

  useEffect(() => {
    getApiData();
  }, []);

  // useEffect(() => {
  //   setFloors(Array(7).fill(7));
  // }, []);

  return (
    <div className={styles.main}>
      {floors.map((index, floor) =>
        floor + 1 !== floors.length ? (
          <Link
            to={`floor/${floor + 1}`}
            className={styles.floors}
            key={floor + 1}
          >
            <label className={styles.floorNumber}>{`Этаж: ${floor + 1}`}</label>
            <div className={styles.floor}>
              <img
                className={styles.svg_style}
                src={
                  floor === 0
                    ? "/images/floors/FirstFloor.svg"
                    : "/images/floors/StandartFloor.svg"
                }
                alt="Этаж"
              ></img>
            </div>
          </Link>
        ) : (
          <RoofOfDormitory floor={floor} key={floor + 1} />
        )
      )}
      <h2>Выбор этажа</h2>
    </div>
  );
};

import styles from "./ManagmentFloors.module.css";

export const RoofOfDormitory = (floor) => {
  return (
    <div className={styles.floors}>
      <label className={styles.floorNumber}>Крыша</label>
      <div className={styles.floor}>
        <img
          className={styles.svg_style_roof}
          src={floor.floor.img}
          alt="Крыша"
        ></img>
      </div>
    </div>
  );
};

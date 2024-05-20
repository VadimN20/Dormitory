import styles from "./ManagmentFloors.module.css";

export const RoofOfDormitory = (floor) => {
  return (
    <div className={styles.roof}>
      <label className={styles.floorNumber}>Крыша</label>
      <div className={styles.floor}>
        <img
          className={styles.svg_style_roof}
          src={"/images/floors/RoofFloor.svg"}
          alt="Крыша"
        ></img>
      </div>
    </div>
  );
};

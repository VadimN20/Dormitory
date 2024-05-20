import { CreateUser } from "./createUser/CreateUser";
import { ListStudents } from "./listStudents/ListStudents";

import styles from "./ManagmentStudents.module.css";

export const ManagmentStudents = () => {
  return (
    <div className={styles.managment_students_wrapper}>
      <CreateUser />
      <ListStudents />
    </div>
  );
};

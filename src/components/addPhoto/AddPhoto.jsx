import { jwtDecode } from "jwt-decode";
import styles from "./AddPhoto.module.css";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const URLdataBase = "http://localhost:8080/student/";

export const AddPhoto = ({ addPhoto }) => {
  const { token } = useAuth();
  const decoded = jwtDecode(token);
  const [drag, setDrag] = useState(false);
  const [visibleDrag, setVisibleDrag] = useState(addPhoto);

  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHadler(e) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e) {
    e.preventDefault();
    let photo = [e.dataTransfer.files];
    setDrag(false);
    setVisibleDrag(false);
    const formData = new FormData();
    formData.append("file", photo[0][0]);
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    };

    fetch(URLdataBase + "uploadPhoto/" + decoded.sub, requestOptions).then(
      (response) => {
        if (response.status == 200) {
          alert("Ваше фото загружено, просьба обновить страницу");
        } else {
          alert("При загрузке фото произошла ошибка");
        }
      }
    );
  }

  return (
    <div className={visibleDrag ? styles.win_addPhoto : styles.display_none}>
      {drag ? (
        <div
          className={styles.drop_area_active}
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHadler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => onDropHandler(e)}
        >
          Отпустите фото, чтобы загрузить
        </div>
      ) : (
        <div
          className={styles.drop_area}
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHadler(e)}
          onDragOver={(e) => dragStartHandler(e)}
        >
          Перетащите фото, чтобы загрузить его
        </div>
      )}
    </div>
  );
};

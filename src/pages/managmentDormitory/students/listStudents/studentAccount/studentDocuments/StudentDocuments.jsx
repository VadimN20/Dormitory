import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";

import { useAuth } from "../../../../../../hooks/useAuth";

import styles from "./StudentDocuments.module.css";

export const StudentDocuments = () => {
  const URLdataBase = "http://localhost:8080/document/attach/";
  const { token } = useAuth();
  const { student_id } = useParams();
  const [file, setFile] = useState("");
  const [listDocuments, setListDocuments] = useState("");

  const downloadFile = (documentName) => {
    const requestOptions = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    fetch(
      "http://localhost:8080/document/download/" +
        student_id +
        "/" +
        documentName,
      requestOptions
    ).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "nameFileChange.pdf"; //Name file for download
        alink.click();
      });
    });
  };

  const deleteFile = (documentName) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    fetch(
      "http://localhost:8080/document/delete/" +
        student_id +
        "/" +
        documentName,
      requestOptions
    );
  };

  function uploadFile(e) {
    setFile(e.target.files[0]);
  }

  const handleSubmission = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", file);
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    };

    await fetch(URLdataBase + student_id + "/Паспорт", requestOptions).then(
      (response) => {
        if (response.status == 200) {
          alert("Документ был успешно загружен");
        } else {
          alert("При загрузке документа произошла ошибка");
        }
      }
    );
  };

  const getApiData = async () => {
    const response = await fetch(
      "http://localhost:8080/document/getFilename/" + student_id,
      {
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json",
        },
      }
    );
    const json = await response.json();
    json.filenames.length === 0
      ? setListDocuments("")
      : setListDocuments(json.filenames);
    return json;
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div className={styles.documents} id={styles.wrapper_section}>
      <h3>Документы</h3>
      <ul className={styles.list_info}>
        {listDocuments ? (
          listDocuments.map((document) => (
            <li>
              {document}
              <button
                onClick={() => {
                  downloadFile(document);
                }}
              >
                <FaDownload />
              </button>
              <button
                onClick={() => {
                  deleteFile(document);
                }}
              >
                <MdDelete />
              </button>
            </li>
          ))
        ) : (
          <li>Документы отсутствуют </li>
        )}
      </ul>

      <form onSubmit={handleSubmission}>
        <label>Паспорт</label>
        <input
          type="file"
          accept=".pdf"
          name="file"
          id="upload-file"
          onChange={uploadFile}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

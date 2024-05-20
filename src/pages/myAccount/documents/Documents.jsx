import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import styles from "./Documents.module.css";
import { useAuth } from "../../../hooks/useAuth";

export const Documents = () => {
  const { token } = useAuth();
  const decoded = jwtDecode(token);
  const [listDocuments, setListDocuments] = useState("");

  const downloadFile = (documentName) => {
    const requestOptions = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    fetch(
      "http://localhost:8080/document/download/" +
        decoded.sub +
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

  const getApiData = async () => {
    const response = await fetch(
      "http://localhost:8080/document/getFilename/" + decoded.sub,
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
                Скачать файл
              </button>
            </li>
          ))
        ) : (
          <li>Документы отсутствуют </li>
        )}
      </ul>
    </div>
  );
};

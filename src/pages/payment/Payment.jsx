import styles from "./Payment.module.css";

export const Payment = () => {
  const downloadFile = () => {
    fetch("/documents/test.pdf").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "nameFileChange.pdf"; //Name file for download
        alink.click();
      });
    });
  };
  return (
    <div className={styles.payment_wrapper}>
      <div className={styles.checks} id={styles.wrapper_section}>
        <h4>Чеки</h4>
        <ul className={styles.list_info}>
          <li>
            Файл01
            <button
              onClick={() => {
                downloadFile();
              }}
            >
              Скачать файл
            </button>
          </li>
          <li>
            Файл02
            <button
              onClick={() => {
                downloadFile();
              }}
            >
              Скачать файл
            </button>
          </li>
          <li>
            Файл03
            <button
              onClick={() => {
                downloadFile();
              }}
            >
              Скачать файл
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

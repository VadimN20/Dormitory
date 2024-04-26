// const URLdataBase = "http://localhost:3000/";

// import { useAuth } from "../../hooks/useAuth";

// const { user } = useAuth();

// const getStudentInfo = async (info = null, setInfo = null, log = null) => {
//   try {
//     const URL = URLdataBase + "" + log;
//     const response = await fetch(URL);

//     if (!response.ok) throw new Error(response.statusText);

//     const json = await response.json();
//     !info && setInfo(json);
//     return json;
//   } catch (err) {
//     console.error(err.message || err);
//   }
// };

// export { getStudentInfo };

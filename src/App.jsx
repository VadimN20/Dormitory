import { Routes, Route, Link } from "react-router-dom";
import { Layout } from "./components/Layout";
import { MyAccount } from "./pages/myAccount/MyAccount";
import { ManagmentFloors } from "./pages/managmentDormitory/floors/ManagmentFloors";
import { Floor } from "./pages/managmentDormitory/floors/floor/Floor";
import { CreateUser } from "./pages/managmentDormitory/students/createUser/CreateUser";
import { Authorization } from "./pages/authorization/Authorization.jsx";
import { MainPage } from "./pages/mainPage/MainPage.jsx";
import { Payment } from "./pages/payment/Payment.jsx";
import { ManagmentStudents } from "./pages/managmentDormitory/students/ManagmentStudents.jsx";
import { StudentAccount } from "./pages/managmentDormitory/students/listStudents/studentAccount/StudentAccount.jsx";

import { ProtectedRoute } from "./hoc/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth.jsx";

import styles from "/index.module.css";

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/authorization" element={<Authorization />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route
            path="myAccount"
            element={
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="managmentFloors"
            element={
              <ProtectedRoute>
                <ManagmentFloors />
              </ProtectedRoute>
            }
          />
          <Route
            path="managmentFloors/floor"
            element={
              <ProtectedRoute>
                <Floor />
              </ProtectedRoute>
            }
          />
          <Route
            path="managmentFloors/floor/:numFloor"
            element={
              <ProtectedRoute>
                <Floor />
              </ProtectedRoute>
            }
          />
          <Route
            path="notifications"
            element={
              <ProtectedRoute>
                <h1>Уведомления</h1>
              </ProtectedRoute>
            }
          />
          <Route
            path="managmentStudents"
            element={
              <ProtectedRoute>
                <ManagmentStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="managmentStudents?:query"
            element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="managmentStudents/student/:student_id"
            element={
              <ProtectedRoute>
                <StudentAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

import { Routes, Route, Link } from "react-router-dom";
import { Layout } from "./components/Layout";
import { MyAccount } from "./pages/myAccount/MyAccount";
import { ManagmentFloors } from "./pages/managmentDormitory/floors/ManagmentFloors";
import { Floor } from "./pages/managmentDormitory/floors/floor/Floor";
import { CreateUser } from "./pages/managmentDormitory/students/createUser/CreateUser";
import { Authorization } from "./pages/authorization/Authorization.jsx";
import { MainPage } from "./pages/mainPage/MainPage.jsx";

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
          <Route path="managmentFloors" element={<ManagmentFloors />} />
          <Route path="managmentFloors/floor" element={<Floor />} />
          <Route path="managmentFloors/floor/:numFloor" element={<Floor />} />
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
                <CreateUser />
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
            path="payment"
            element={
              <ProtectedRoute>
                <h1>Оплата</h1>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

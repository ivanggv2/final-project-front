import { Navigate, Route, Routes } from "react-router-dom";
import ItemList from "./components/ItemList/ItemList";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RegisterPage from "./pages/ResgisterPage/RegisterPage";
const App = (): JSX.Element => {
  return (
    /*<>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/home" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </>*/
    <ItemList />
  );
};

export default App;

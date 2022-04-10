import Login from "./screens/Login.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./screens/Register.js";
import "react-toastify/dist/ReactToastify.css";
import ProfileScreen from "./screens/ProfileScreen.js";
import ProfileScreenEdit from "./screens/ProfileScreenEdit.js";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        theme="dark"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<ProfileScreen />} />
        <Route path="/profile/edit/:id" element={<ProfileScreenEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

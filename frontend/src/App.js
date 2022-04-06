import Login from "./screens/Login.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./screens/Register.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import { Auth } from "./Reducers.js";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

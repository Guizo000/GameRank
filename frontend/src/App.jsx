import { Routes, Route } from 'react-router';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import Admin from './pages/Admin/Admin.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}



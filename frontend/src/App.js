import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Content from './layout/Content';
import LoginPage from './page/auth/LoginPage';
import RegisterPage from './page/auth/RegisterPage';
import MainLayout from './layout/Mainlayout';
import LostItemDetail from './page/lost/LostItemDetail';
import Dashboard from './page/admin/Dashboard';
import LayoutAdmin from './layout/LayoutAdmin';
import Report from './page/admin/Report';
import ProtectedRoute from './routes/ProtectedRoute';
import Roles from './page/admin/Roles';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutAdmin />} allowedRoles={["admin"]}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/roles" element={<Roles />} />
          </Route>
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Content />} />
          <Route path="/detail/:id" element={<LostItemDetail />} />
        </Route>
        <Route path="/" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

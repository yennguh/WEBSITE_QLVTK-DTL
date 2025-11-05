import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Content from './layout/Content';
import LoginPage from './page/auth/LoginPage';
import RegisterPage from './page/auth/RegisterPage';
import MainLayout from './layout/Mainlayout';
import LostItemDetail from './page/lost/LostItemDetail';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />



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

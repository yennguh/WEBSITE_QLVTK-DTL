import React from 'react';
import './App.css';
import Header from './layout/Header';
import Home from './page/home/Home';
import Footer from './layout/Footer';

function App() {
  return (
    <div className="site">
      <Header />

      <div className="site-body">
        <Home />
      </div>

      <Footer />
    </div>
  );
}

export default App;

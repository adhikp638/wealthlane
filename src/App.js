import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import ProductPage from './components/pages/ProductPage';
import Header from './components/Header';

const App = () => {
  return (
    <>
    <Header/>
    <Router>
      <Routes>
        {/* Define your routes using the Route component */}
        <Route path="/" element={<HomePage />} />
        <Route path="/ProductPage" element={<ProductPage />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import ProductPage from './components/pages/ProductPage';
import DataMapper from './components/pages/DataMapper';
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
        <Route path="/DataMapper" element={<DataMapper />} />

      </Routes>
    </Router>
    </>
  );
};

export default App;

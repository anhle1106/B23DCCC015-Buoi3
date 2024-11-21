// /src/pages/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './ProductPage';

const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ProductPage />} />
    </Routes>
  </Router>
);

export default AppRouter;

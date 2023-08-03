import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './HomePage';
import IngredientsList from './IngredientsList';
import RecipesList from './RecipesList';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ingredients" element={<IngredientsList />} />
          <Route path="/recipes" element={<RecipesList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
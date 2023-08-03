import React, { useState, useEffect } from 'react';

const IngredientsList = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/project/ingredients')
      .then((response) => response.json())
      .then((data) => setIngredients(data))
      .catch((error) => console.error('Greška pri dohvatanju podataka:', error));
  }, []);

  return (
    <div>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <strong>{ingredient.name}</strong> - {ingredient.unit}
            <br />
            ID: {ingredient.id}, Calories: {ingredient.calories}, Carbs: {ingredient.carbs}, Fats: {ingredient.fats},
            Proteins: {ingredient.proteins}, Sugars: {ingredient.sugars}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsList;
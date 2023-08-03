import React, { useState, useEffect } from 'react';

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/project/recipe')
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Greška pri dohvatanju podataka:', error));
  }, []);

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <strong>{recipe.name}</strong>
            {recipe.description}
            <br />
            ID: {recipe.id}, Amount: {recipe.amount}, Steps: {recipe.steps}, Time: {recipe.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesList;
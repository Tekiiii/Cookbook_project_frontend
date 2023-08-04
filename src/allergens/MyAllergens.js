import React, { useState, useEffect } from 'react';

const MyAllergens = () => {
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/project/allergens')
      .then((response) => response.json())
      .then((data) => {
        setAllergens(data);
      })
      .catch((error) => {
        console.error('Error fetching allergens:', error);
      });
  }, []);

  return (
    <div>
      <ul>
        {allergens.map((allergen) => (
          <li key={allergen.id}>{allergen.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default MyAllergens;

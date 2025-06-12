import React, { useState } from 'react';

const ingredientsList = {
  bread: ['White', 'Wheat', 'Multigrain'],
  meat: ['Turkey', 'Ham', 'Chicken'],
  cheese: ['Cheddar', 'Swiss', 'American'],
  veggies: ['Lettuce', 'Tomato', 'Onions', 'Pickles'],
  sauces: ['Mayo', 'Mustard', 'Chipotle']
};

function App() {
  const [ingredients, setIngredients] = useState({});
  const [response, setResponse] = useState('');

  const handleSelect = (category, item) => {
    setIngredients((prev) => ({ ...prev, [category]: item }));
  };

  const handleSubmit = async () => {
    const apiUrl = "https://zk1eddn3ee.execute-api.us-east-1.amazonaws.com/prod/sandwich"; // Replace with your actual API Gateway URL
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients })
      });
      const data = await res.json();
      setResponse(data.message + ' ID: ' + data.sandwichId);
    } catch (error) {
      setResponse('Error saving sandwich.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Perfect Sandwich Builder</h1>
      {Object.entries(ingredientsList).map(([category, options]) => (
        <div key={category}>
          <h3>{category.toUpperCase()}</h3>
          {options.map(opt => (
            <button key={opt} onClick={() => handleSelect(category, opt)}>
              {opt}
            </button>
          ))}
        </div>
      ))}
      <br />
      <button onClick={handleSubmit}>Save Sandwich</button>
      <p>{response}</p>
    </div>
  );
}

export default App;

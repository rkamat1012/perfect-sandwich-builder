import React, { useState } from 'react';

const ingredientsList = {
  bread: ['White', 'Wheat', 'Multigrain', 'Rye', 'Sour dough'],
  meat: ['Turkey', 'Ham', 'Chicken', 'Roast Beef', 'Egg'],
  cheese: ['Cheddar', 'Swiss', 'American', 'Pepper Jack'],
  veggies: ['Lettuce', 'Tomato', 'Onions', 'Pickles', 'Spinach', 'Jalepaneos', 'Olives', 'Banana Peppers', 'Avacado'],
  sauces: ['Mayo', 'Mustard', 'Chipotle', 'Honey Mustard', 'Spicy Siracha']
};

function App() {
  const [ingredients, setIngredients] = useState({});
  const [response, setResponse] = useState('');

  const toggleIngredient = (category, item) => {
    setIngredients(prev => {
      const prevItems = prev[category] || [];
      const newItems = prevItems.includes(item)
        ? prevItems.filter(i => i !== item)
        : [...prevItems, item];
      return { ...prev, [category]: newItems };
    });
  };

  const handleSubmit = async () => {
    const apiUrl = "https://5a73jmzefh.execute-api.us-east-1.amazonaws.com/prod/sandwich"; // REPLACE with your real API URL

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setResponse(`✅ Sandwich saved! ID: ${data.sandwichId}`);
    } catch (error) {
      console.error(error);
      setResponse(`❌ Error saving sandwich: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Perfect Sandwich Builder</h1>
      {Object.entries(ingredientsList).map(([category, items]) => (
        <div key={category}>
          <h3>{category.toUpperCase()}</h3>
          {items.map(item => (
            <button
              key={item}
              onClick={() => toggleIngredient(category, item)}
              style={{
                margin: '5px',
                backgroundColor:
                  ingredients[category]?.includes(item) ? 'lightgreen' : ''
              }}
            >
              {item}
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


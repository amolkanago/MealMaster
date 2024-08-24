import  { useEffect, useState } from 'react';
import axios from 'axios';
import Singlerecipe from './components/Singlerecipe';

function App() {
  const [recipelist, setRecipelist] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    getRecipe();
  }, []);

  const getRecipe = () => {
    axios
      .get('https://dummyjson.com/recipes')
      .then((res) => res.data)
      .then((finalres) => {
        setRecipelist(finalres.recipes);
      });
  };

  const selectSingleRecipe = (recipe_id) => {
    axios
      .get(`https://dummyjson.com/recipes/${recipe_id}`)
      .then((res) => res.data)
      .then((finalres) => {
        setSelectedRecipe(finalres);
      });
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="py-8 px-4 md:px-0 max-w-[1320px] mx-auto">
      <h1 className="text-3xl font-bold underline text-center text-blue-400 mb-8">RECIPE LIST</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {recipelist.map((recipe, index) => (
          <div key={index} className="shadow-md rounded-lg overflow-hidden">
            <img className="w-full h-auto" src={recipe.image} alt={recipe.name} />
            <div className="p-4">
              <p className="text-center font-bold mb-2">{recipe.name}</p>
              <p className="text-center font-bold">{recipe.cuisine}</p>
              <button
                onClick={() => {
                  selectSingleRecipe(recipe.id);
                }}
                className="block w-full mt-4 bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedRecipe && <Singlerecipe selectedRecipe={selectedRecipe} onClose={closeModal} />}
    </div>
  );
}

export default App;

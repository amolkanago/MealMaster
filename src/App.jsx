import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 py-6'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/recipe/:id"
            element={<RecipeDetails />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
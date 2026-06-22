import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Navbar from './components/Navbar';


function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className='max-w-7xl mx-auto px-4 py-6'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/recipe/:id"
            element={<RecipeDetails />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
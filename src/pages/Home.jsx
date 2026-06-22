import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import CategoryFilter from '../components/CategoryFilter';

function HomePage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] =
        useState('All');

    const categories = [
        'All',
        'Chicken',
        'Dessert',
        'Lamb',
        'Miscellaneous',
        'Pasta',
        'Pork',
        'Seafood',
        'Side',
        'Starter',
        'Vegan',
        'Vegetarian',
        'Breakfast',
        'Goat',
    ];

    useEffect(() => {
        fetchRecipes();
    }, []);

    const formatMeals = (meals) => {
        return (meals || []).map((meal) => ({
            id: meal.idMeal,
            name: meal.strMeal,
            image: meal.strMealThumb,
            cuisine: meal.strArea,
            category: meal.strCategory,
        }));
    };

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            setError('');

            const res = await fetch(
                'https://www.themealdb.com/api/json/v1/1/search.php?f=a'
            );

            if (!res.ok) {
                throw new Error('Failed to fetch recipes');
            }

            const data = await res.json();

            setRecipes(formatMeals(data.meals));
        } catch (err) {
            console.error(err);
            setError(
                'Unable to load recipes. Please try again later.'
            );
        } finally {
            setLoading(false);
        }
    };

    const searchRecipes = async (query) => {
        try {
            setLoading(true);

            const res = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
            );

            const data = await res.json();

            setRecipes(formatMeals(data.meals));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filterByCategory = async (category) => {
        try {
            setSelectedCategory(category);

            if (category === 'All') {
                fetchRecipes();
                return;
            }

            setLoading(true);

            const res = await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
            );

            const data = await res.json();

            const meals = (data.meals || []).map((meal) => ({
                id: meal.idMeal,
                name: meal.strMeal,
                image: meal.strMealThumb,
                cuisine: '',
                category,
            }));

            setRecipes(meals);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);

        if (!value.trim()) {
            fetchRecipes();
            return;
        }

        searchRecipes(value);
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12 text-center">
                <h1 className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
                    Recipe Collection
                </h1>

                <p className="mt-3 text-sm text-gray-500 sm:text-base">
                    Discover delicious recipes from around the world
                </p>
            </div>

            <SearchBar
                searchTerm={searchTerm}
                onSearch={handleSearch}
            />

            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={filterByCategory}
            />

            {error && (
                <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-red-700 shadow-sm">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-20 text-xl font-semibold">
                    Loading recipes...
                </div>
            ) : (
                <>
                    <div className="mb-6 text-sm text-gray-500">
                        Showing {recipes.length} recipe
                        {recipes.length !== 1 ? 's' : ''}
                    </div>

                    {recipes.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-gray-300 py-16 text-center">
                            <h2 className="text-xl font-semibold text-gray-700">
                                No recipes found
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Try another search term.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {recipes.map((recipe) => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default HomePage;
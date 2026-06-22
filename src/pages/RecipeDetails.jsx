import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function RecipeDetails() {
    const { id } = useParams();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRecipe();
    }, [id]);

    const fetchRecipe = async () => {
        try {
            setLoading(true);
            setError('');

            const res = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );

            if (!res.ok) {
                throw new Error('Failed to fetch recipe');
            }

            const data = await res.json();
            const meal = data.meals?.[0];

            if (!meal) {
                throw new Error('Recipe not found');
            }

            const ingredients = [];

            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];

                if (ingredient && ingredient.trim()) {
                    ingredients.push({
                        ingredient,
                        measure,
                    });
                }
            }

            setRecipe({
                id: meal.idMeal,
                name: meal.strMeal,
                image: meal.strMealThumb,
                cuisine: meal.strArea,
                category: meal.strCategory,
                instructions: meal.strInstructions,
                youtube: meal.strYoutube,
                ingredients,
            });
        } catch (err) {
            console.error(err);
            setError('Unable to load recipe.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center text-xl font-semibold">
                Loading recipe...
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto max-w-4xl p-6">
                <div className="rounded-xl bg-red-50 p-4 text-red-600">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8">
                {/* Back Button */}
                <Link
                    to="/"
                    className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow hover:bg-gray-100"
                >
                    ← Back to Recipes
                </Link>

                {/* Hero Section */}
                <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
                    <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="h-112.5 w-full object-cover"
                    />

                    <div className="p-8">
                        <h1 className="text-4xl font-bold text-gray-900">
                            {recipe.name}
                        </h1>

                        <div className="mt-4 flex flex-wrap gap-3">
                            <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
                                {recipe.cuisine}
                            </span>

                            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                                {recipe.category}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="mt-8 grid gap-8 lg:grid-cols-3">
                    {/* Ingredients */}
                    <div className="rounded-3xl bg-white p-6 shadow">
                        <h2 className="mb-6 text-2xl font-bold">
                            Ingredients
                        </h2>

                        <ul className="space-y-3">
                            {recipe.ingredients.map(
                                (item, index) => (
                                    <li
                                        key={index}
                                        className="rounded-xl bg-gray-50 p-3"
                                    >
                                        <span className="font-semibold">
                                            {item.measure}
                                        </span>{' '}
                                        {item.ingredient}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Instructions */}
                    <div className="rounded-3xl bg-white p-6 shadow lg:col-span-2">
                        <h2 className="mb-6 text-2xl font-bold">
                            Instructions
                        </h2>

                        <p className="whitespace-pre-line leading-8 text-gray-700">
                            {recipe.instructions}
                        </p>

                        {recipe.youtube && (
                            <a
                                href={recipe.youtube}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-8 inline-block rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
                            >
                                Watch on YouTube
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetails;
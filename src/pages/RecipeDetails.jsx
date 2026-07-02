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
            <div className="flex items-center justify-center min-h-screen text-xl font-semibold">
                Loading recipe...
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl p-6 mx-auto">
                <div className="p-4 text-red-600 rounded-xl bg-red-50">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
            <div className="px-4 py-8 mx-auto max-w-7xl">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white shadow rounded-xl hover:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-800"
                >
                    ← Back to Recipes
                </Link>

                {/* Hero Section */}
                <div className="overflow-hidden transition-all duration-300 bg-white border shadow-xl rounded-3xl border-slate-200 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">

                    {/* Hero Image */}
                    <div className="relative overflow-hidden">
                        <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="h-[500px] w-full object-cover transition-transform duration-700 hover:scale-105"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute flex flex-wrap gap-3 top-6 left-6">
                            <span className="px-4 py-2 text-sm font-semibold text-white border rounded-full bg-white/20 backdrop-blur-md border-white/20">
                                🍽 {recipe.cuisine}
                            </span>

                            <span className="px-4 py-2 text-sm font-semibold text-white rounded-full shadow-lg bg-emerald-500/90">
                                {recipe.category}
                            </span>
                        </div>

                        {/* Recipe Title */}
                        <div className="absolute bottom-8 left-8 right-8">
                            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                                {recipe.name}
                            </h1>

                            <p className="max-w-2xl mt-2 text-lg text-slate-200">
                                A delicious {recipe.cuisine.toLowerCase()}{" "}
                                {recipe.category.toLowerCase()} recipe that is perfect for any
                                occasion.
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-8">

                        {/* Quick Info */}
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                            <div className="p-5 text-center rounded-2xl bg-slate-50 dark:bg-slate-800">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Cuisine
                                </p>
                                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                                    {recipe.cuisine}
                                </p>
                            </div>

                            <div className="p-5 text-center rounded-2xl bg-slate-50 dark:bg-slate-800">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Category
                                </p>
                                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                                    {recipe.category}
                                </p>
                            </div>

                            <div className="p-5 text-center rounded-2xl bg-slate-50 dark:bg-slate-800">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Difficulty
                                </p>
                                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                                    Medium
                                </p>
                            </div>

                            <div className="p-5 text-center rounded-2xl bg-slate-50 dark:bg-slate-800">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Rating
                                </p>
                                <p className="mt-1 font-semibold text-amber-500">
                                    ⭐ 4.8
                                </p>
                            </div>

                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                                About this Recipe
                            </h2>

                            <p className="leading-8 text-slate-600 dark:text-slate-300">
                                {recipe.description ||
                                    "This recipe combines fresh ingredients with authentic flavors to create a delightful meal that's easy to prepare and perfect for sharing with family and friends."}
                            </p>
                        </div>

                    </div>

                </div>

                {/* Content */}
                <div className="grid gap-8 mt-10 lg:grid-cols-12">

                    {/* Ingredients */}
                    <aside className="lg:col-span-4">
                        <div className="sticky p-8 bg-white border shadow-xl top-24 rounded-3xl border-slate-200 dark:border-slate-800 dark:bg-slate-900">

                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex items-center justify-center w-12 h-12 text-2xl rounded-2xl bg-emerald-100 dark:bg-emerald-900/30">
                                    🥬
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Ingredients
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        {recipe.ingredients.length} Items
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">

                                {recipe.ingredients.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 p-4 transition-all border group rounded-2xl border-slate-100 bg-slate-50 hover:border-emerald-200 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/20"
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full shrink-0 bg-emerald-500">
                                            {index + 1}
                                        </div>

                                        <div>
                                            <p className="font-semibold text-slate-900 dark:text-white">
                                                {item.ingredient}
                                            </p>

                                            <p className="text-sm text-slate-500">
                                                {item.measure}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                            </div>

                        </div>
                    </aside>

                    {/* Instructions */}
                    <section className="lg:col-span-8">

                        <div className="p-8 bg-white border shadow-xl rounded-3xl border-slate-200 dark:border-slate-800 dark:bg-slate-900">

                            <div className="flex items-center gap-3 mb-8">

                                <div className="flex items-center justify-center w-12 h-12 text-2xl bg-indigo-100 rounded-2xl dark:bg-indigo-900/30">
                                    👨‍🍳
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Cooking Instructions
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Follow each step carefully
                                    </p>
                                </div>

                            </div>

                            <div className="space-y-6">

                                {recipe.instructions
                                    .split(". ")
                                    .filter(Boolean)
                                    .map((step, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-5"
                                        >
                                            <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-indigo-600 rounded-full shadow-lg shrink-0">
                                                {index + 1}
                                            </div>

                                            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800">
                                                <p className="leading-8 text-slate-700 dark:text-slate-300">
                                                    {step.endsWith(".") ? step : `${step}.`}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                            </div>

                            {recipe.youtube && (
                                <div className="p-6 mt-10 text-white rounded-2xl bg-gradient-to-r from-red-600 to-red-500">

                                    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">

                                        <div>
                                            <h3 className="text-xl font-bold">
                                                Need a Visual Guide?
                                            </h3>

                                            <p className="mt-1 text-red-100">
                                                Watch the complete cooking process on YouTube.
                                            </p>
                                        </div>

                                        <a
                                            href={recipe.youtube}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-6 py-3 font-semibold text-red-600 transition bg-white rounded-xl hover:scale-105 hover:shadow-lg"
                                        >
                                            ▶ Watch Recipe
                                        </a>

                                    </div>

                                </div>
                            )}

                        </div>

                    </section>

                </div>
            </div>
        </div>
    );
}

export default RecipeDetails;
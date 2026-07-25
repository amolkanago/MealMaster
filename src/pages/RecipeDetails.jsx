import useRecipe from "../hooks/userRecipe.js";
import { Link, useParams } from "react-router-dom";

function RecipeDetails() {
    const { id } = useParams();
    const { recipe, loading, error, retry } = useRecipe(id);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 animate-pulse">
                <div className="px-4 py-8 mx-auto max-w-7xl lg:px-8">
                    <div className="mb-8 h-11 w-44 rounded-2xl bg-slate-200 dark:bg-slate-800" />

                    <div className="overflow-hidden bg-white border shadow-sm rounded-3xl border-slate-200 dark:border-slate-800 dark:bg-slate-900">
                        <div className="h-[420px] w-full bg-slate-200 dark:bg-slate-800" />

                        <div className="p-8 space-y-8">
                            <div className="w-2/3 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
                            <div className="w-1/2 h-5 rounded-xl bg-slate-200 dark:bg-slate-800" />

                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-800"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-8 mt-10 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <div className="p-8 bg-white border rounded-3xl border-slate-200 dark:border-slate-800 dark:bg-slate-900">
                                <div className="w-40 h-8 mb-6 rounded-xl bg-slate-200 dark:bg-slate-800" />

                                <div className="space-y-4">
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="h-16 rounded-2xl bg-slate-200 dark:bg-slate-800"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="p-8 bg-white border rounded-3xl border-slate-200 dark:border-slate-800 dark:bg-slate-900">
                                <div className="w-56 h-8 mb-8 rounded-xl bg-slate-200 dark:bg-slate-800" />

                                <div className="space-y-6">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-800"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center px-4">
                <div className="max-w-md p-8 text-center bg-white border border-red-200 shadow-lg rounded-3xl dark:border-red-900 dark:bg-slate-900">
                    <div className="mb-5 text-5xl">⚠️</div>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Something went wrong
                    </h2>

                    <p className="mt-3 text-slate-600 dark:text-slate-300">
                        {error}
                    </p>

                    <button
                        onClick={retry}
                        className="px-6 py-3 mt-8 font-semibold text-white transition bg-red-600 rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Recipe not found
                    </h2>

                    <Link
                        to="/"
                        className="inline-flex px-6 py-3 mt-6 font-semibold text-white transition bg-orange-500 rounded-xl hover:bg-orange-600"
                    >
                        Back to Recipes
                    </Link>
                </div>
            </div>
        );
    }

    const instructionSteps = recipe.instructions
        .split(". ")
        .filter(Boolean);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="px-4 py-8 mx-auto max-w-7xl lg:px-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-5 py-3 mb-8 text-sm font-semibold transition bg-white border shadow-sm rounded-xl border-slate-200 text-slate-700 hover:-translate-x-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                    ← Back to Recipes
                </Link>

                <article className="overflow-hidden bg-white border shadow-xl rounded-4xl border-slate-200 dark:border-slate-800 dark:bg-slate-900">
                    <div className="relative">
                        <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="object-cover w-full h-105 lg:h-140"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                        <div className="absolute flex flex-wrap gap-3 left-6 top-6">
                            {recipe.cuisine && (
                                <span className="px-4 py-2 text-sm font-semibold text-white border rounded-full border-white/20 bg-white/15 backdrop-blur-md">
                                    🍽 {recipe.cuisine}
                                </span>
                            )}

                            {recipe.category && (
                                <span className="px-4 py-2 text-sm font-semibold text-white rounded-full shadow-lg bg-emerald-500">
                                    {recipe.category}
                                </span>
                            )}
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-5xl">
                                {recipe.name}
                            </h1>

                            <p className="max-w-3xl mt-4 text-lg leading-8 text-slate-200">
                                {recipe.description ||
                                    `A delicious ${recipe.cuisine.toLowerCase()} ${recipe.category.toLowerCase()} recipe made with authentic flavors and fresh ingredients.`}
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 p-6 border-t border-slate-200 bg-slate-50 md:grid-cols-4 dark:border-slate-800 dark:bg-slate-950/50">
                        {[
                            {
                                title: "Cuisine",
                                value: recipe.cuisine,
                            },
                            {
                                title: "Category",
                                value: recipe.category,
                            },
                            {
                                title: "Difficulty",
                                value: "Medium",
                            },
                            {
                                title: "Rating",
                                value: "⭐ 4.8",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="p-5 text-center bg-white border shadow-sm rounded-2xl border-slate-200 dark:border-slate-800 dark:bg-slate-900"
                            >
                                <p className="text-sm font-medium text-slate-500">
                                    {item.title}
                                </p>

                                <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </article>

                <div className="grid gap-8 mt-10 lg:grid-cols-12">
                    <aside className="lg:col-span-4">
                        <div className="sticky p-8 bg-white border shadow-lg top-24 rounded-3xl border-slate-200 dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center justify-center text-2xl h-14 w-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30">
                                    🥬
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Ingredients
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        {recipe.ingredients.length} items
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {recipe.ingredients.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 p-4 transition border rounded-2xl border-slate-200 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-emerald-800"
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

                    <section className="lg:col-span-8">
                        <div className="p-8 bg-white border shadow-lg rounded-3xl border-slate-200 dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="flex items-center justify-center text-2xl bg-indigo-100 h-14 w-14 rounded-2xl dark:bg-indigo-900/30">
                                    👨‍🍳
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Cooking Instructions
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Follow the steps in order
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {instructionSteps.map((step, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-5"
                                    >
                                        <div className="flex items-center justify-center font-bold text-white rounded-full shadow-lg h-11 w-11 shrink-0 bg-gradient-to-br from-indigo-600 to-violet-600">
                                            {index + 1}
                                        </div>

                                        <div className="flex-1 p-5 border rounded-2xl border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                                            <p className="leading-8 text-slate-700 dark:text-slate-300">
                                                {step.endsWith(".")
                                                    ? step
                                                    : `${step}.`}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {recipe.youtube && (
                                <div className="p-8 mt-10 text-white shadow-xl rounded-3xl bg-gradient-to-r from-red-600 to-red-500">
                                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <h3 className="text-2xl font-bold">
                                                Watch the Recipe
                                            </h3>

                                            <p className="mt-2 text-red-100">
                                                Prefer learning visually? Follow the
                                                complete cooking process on YouTube.
                                            </p>
                                        </div>

                                        <a
                                            href={recipe.youtube}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center px-6 py-3 font-semibold text-red-600 transition bg-white rounded-2xl hover:scale-105 hover:shadow-lg"
                                        >
                                            ▶ Watch Now
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
import { useCallback, useEffect, useState } from "react";
import { getRecipe } from "../api/recipeApi";

const cache = new Map();

export default function useRecipe(id) {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchRecipe = useCallback(async (signal) => {
        if (!id) return;

        try {
            setLoading(true);
            setError("");

            // Return cached data immediately
            if (cache.has(id)) {
                setRecipe(cache.get(id));
                return;
            }

            const meal = await getRecipe(id, signal);

            if (!meal) {
                throw new Error("Recipe not found.");
            }

            const ingredients = [];

            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`]?.trim();
                const measure = meal[`strMeasure${i}`]?.trim();

                if (ingredient) {
                    ingredients.push({
                        ingredient,
                        measure: measure || "",
                    });
                }
            }

            const formattedRecipe = {
                id: meal.idMeal,
                name: meal.strMeal,
                image: meal.strMealThumb,
                cuisine: meal.strArea || "",
                category: meal.strCategory || "",
                instructions: meal.strInstructions || "",
                youtube: meal.strYoutube || "",
                source: meal.strSource || "",
                tags: meal.strTags || "",
                ingredients,
            };

            cache.set(id, formattedRecipe);
            setRecipe(formattedRecipe);
        } catch (err) {
            if (err.name !== "AbortError") {
                setError(err.message || "Failed to load recipe.");
                setRecipe(null);
            }
        } finally {
            if (!signal?.aborted) {
                setLoading(false);
            }
        }
    }, [id]);

    useEffect(() => {
        const controller = new AbortController();

        fetchRecipe(controller.signal);

        return () => controller.abort();
    }, [fetchRecipe]);

    const retry = useCallback(() => {
        cache.delete(id);

        const controller = new AbortController();
        fetchRecipe(controller.signal);
    }, [fetchRecipe, id]);

    return {
        recipe,
        loading,
        error,
        retry,
    };
}
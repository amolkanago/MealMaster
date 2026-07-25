export async function getRecipe(id, signal) {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        { signal }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch recipe");
    }

    const data = await response.json();

    if (!data.meals) {
        throw new Error("Recipe not found");
    }

    return data.meals[0];
}
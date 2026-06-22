import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
    return (
        <article className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900">
            <div className="relative overflow-hidden">
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    loading="lazy"
                    className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            <div className="space-y-4 p-5">
                <div>
                    <h2 className="line-clamp-1 text-xl font-bold text-gray-900 dark:text-slate-100">
                        {recipe.name}
                    </h2>

                    {recipe.cuisine && (
                        <p className="mt-2 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-200">
                            {recipe.cuisine}
                        </p>
                    )}

                    {recipe.category && (
                        <p className="mt-2 ml-2 inline-flex rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-950/50 dark:text-green-200">
                            {recipe.category}
                        </p>
                    )}
                </div>

                <Link
                    to={`/recipe/${recipe.id}`}
                    className="block w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-center font-medium text-white transition-all duration-300 hover:from-indigo-700 hover:to-violet-700"
                >
                    View Details
                </Link>
            </div>
        </article>
    );
}

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        cuisine: PropTypes.string,
        category: PropTypes.string,
    }).isRequired,
};

export default RecipeCard;
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
    return (
        <article className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-3xl hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900">
            <div className="relative overflow-hidden">
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    loading="lazy"
                    className="object-cover w-full transition duration-500 h-60 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            <div className="p-5 space-y-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 line-clamp-1 dark:text-slate-100">
                        {recipe.name}
                    </h2>

                    {recipe.cuisine && (
                        <p className="inline-flex px-3 py-1 mt-2 text-sm font-medium text-indigo-700 rounded-full bg-indigo-50 dark:bg-indigo-950/50 dark:text-indigo-200">
                            {recipe.cuisine}
                        </p>
                    )}

                    {recipe.category && (
                        <p className="inline-flex px-3 py-1 mt-2 ml-2 text-sm font-medium text-green-700 rounded-full bg-green-50 dark:bg-green-950/50 dark:text-green-200">
                            {recipe.category}
                        </p>
                    )}
                </div>

                <Link
                    to={`/recipe/${recipe.id}`}
                    className="block w-full px-4 py-3 font-medium text-center text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
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
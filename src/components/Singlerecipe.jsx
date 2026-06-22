
import PropTypes from 'prop-types';
import { useEffect } from 'react';

function Singlerecipe({ selectedRecipe, onClose }) {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    if (!selectedRecipe) return null;

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300"
                onClick={onClose}
                aria-hidden="true"
            />

            <div className="flex min-h-screen items-center justify-center p-4">
                <div
                    className="relative w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/90 px-6 py-4 backdrop-blur">
                        <div>
                            <h2
                                id="modal-title"
                                className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl"
                            >
                                {selectedRecipe.name}
                            </h2>

                            {selectedRecipe.cuisine && (
                                <p className="mt-1 text-sm text-gray-500">
                                    {selectedRecipe.cuisine} Cuisine
                                </p>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-500 transition-all duration-200 hover:bg-red-50 hover:text-red-500"
                            aria-label="Close recipe modal"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Content */}
                    <div className="max-h-[85vh] overflow-y-auto">
                        <div className="grid gap-8 p-6 md:grid-cols-2">
                            {/* Left Side - Image */}
                            <div>
                                {selectedRecipe.image && (
                                    <div className="overflow-hidden rounded-2xl shadow-lg">
                                        <img
                                            src={selectedRecipe.image}
                                            alt={selectedRecipe.name}
                                            className="h-full max-h-125 w-full object-cover transition duration-500 hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Right Side - Details */}
                            <div>
                                {/* Stats */}
                                <div className="mb-6 grid grid-cols-3 gap-3">
                                    <div className="rounded-2xl bg-orange-50 p-4 text-center">
                                        <p className="text-xs uppercase tracking-wide text-gray-500">
                                            Prep Time
                                        </p>
                                        <p className="mt-1 font-bold text-orange-600">
                                            {selectedRecipe.prepTimeMinutes ||
                                                '--'}{' '}
                                            min
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-green-50 p-4 text-center">
                                        <p className="text-xs uppercase tracking-wide text-gray-500">
                                            Calories
                                        </p>
                                        <p className="mt-1 font-bold text-green-600">
                                            {selectedRecipe.caloriesPerServing ||
                                                '--'}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-yellow-50 p-4 text-center">
                                        <p className="text-xs uppercase tracking-wide text-gray-500">
                                            Rating
                                        </p>
                                        <p className="mt-1 font-bold text-yellow-600">
                                            ⭐ {selectedRecipe.rating || '--'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {/* Cuisine */}
                                    {selectedRecipe.cuisine && (
                                        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                                            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                                                Cuisine
                                            </h3>
                                            <p className="text-lg font-medium text-gray-800">
                                                {selectedRecipe.cuisine}
                                            </p>
                                        </div>
                                    )}

                                    {/* Ingredients */}
                                    {selectedRecipe.ingredients?.length > 0 && (
                                        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                                                Ingredients
                                            </h3>

                                            <div className="flex flex-wrap gap-2">
                                                {selectedRecipe.ingredients.map(
                                                    (ingredient) => (
                                                        <span
                                                            key={ingredient}
                                                            className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                                                        >
                                                            {ingredient}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Instructions */}
                                    {selectedRecipe.instructions && (
                                        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                                                Instructions
                                            </h3>

                                            {Array.isArray(
                                                selectedRecipe.instructions
                                            ) ? (
                                                <ol className="space-y-3">
                                                    {selectedRecipe.instructions.map(
                                                        (step, index) => (
                                                            <li
                                                                key={index}
                                                                className="flex gap-3"
                                                            >
                                                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                                                                    {index + 1}
                                                                </span>

                                                                <span className="leading-7 text-gray-700">
                                                                    {step}
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                    {selectedRecipe.youtube && (
                                                        <a
                                                            href={selectedRecipe.youtube}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-block rounded-xl bg-red-600 px-4 py-2 text-white"
                                                        >
                                                            Watch on YouTube
                                                        </a>
                                                    )}
                                                </ol>
                                            ) : (
                                                <p className="whitespace-pre-line leading-7 text-gray-700">
                                                    {
                                                        selectedRecipe.instructions
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t bg-gray-50 px-6 py-4">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg"
                            >
                                Close Recipe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Singlerecipe.propTypes = {
    selectedRecipe: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        image: PropTypes.string,
        name: PropTypes.string.isRequired,
        cuisine: PropTypes.string,
        category: PropTypes.string,
        youtube: PropTypes.string,
        ingredients: PropTypes.arrayOf(PropTypes.string),
        instructions: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
};

export default Singlerecipe;

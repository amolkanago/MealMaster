import PropTypes from 'prop-types';
import { useEffect } from 'react';

function Singlerecipe({ selectedRecipe, onClose }) {
    useEffect(() => {
        // This will run when the component mounts and unmounts
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    if (!selectedRecipe) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="sm:flex sm:items-start">
                            <div className="sm:w-1/2 mx-auto flex-shrink-0 flex items-center justify-center sm:mx-0 sm:h-auto">
                                {selectedRecipe.image && <img className="h-auto w-full object-cover rounded" src={selectedRecipe.image} alt={selectedRecipe.name} />}
                            </div>
                            <div className="sm:w-1/2 mt-4 sm:mt-0 sm:ml-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    {selectedRecipe.name}
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500 font-semibold">
                                        Ingredients:
                                    </p>
                                    <ul className="text-sm text-gray-900 list-disc list-inside">
                                        {selectedRecipe.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                    </ul>
                                    <p className="text-sm text-gray-500 mt-4 font-semibold">
                                        Cooking Instructions:
                                    </p>
                                    <p className="text-sm text-gray-900">
                                        {selectedRecipe.instructions}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-4 font-semibold">
                                        Calories Per Serving:
                                    </p>
                                    <p className="text-sm text-gray-900">
                                        {selectedRecipe.caloriesPerServing}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            onClick={onClose}
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            aria-label="Close recipe modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Singlerecipe.propTypes = {
    selectedRecipe: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string.isRequired,
        ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
        instructions: PropTypes.string.isRequired,
        caloriesPerServing: PropTypes.number,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Singlerecipe;

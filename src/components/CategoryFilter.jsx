import PropTypes from 'prop-types';

function CategoryFilter({
    categories,
    selectedCategory,
    onSelectCategory,
}) {
    return (
        <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() =>
                            onSelectCategory(category)
                        }
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${selectedCategory === category
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-white text-gray-700 shadow hover:bg-gray-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}

CategoryFilter.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.string
    ).isRequired,
    selectedCategory: PropTypes.string.isRequired,
    onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
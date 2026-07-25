import PropTypes from "prop-types";

function CategoryFilter({
    categories,
    selectedCategory,
    onSelectCategory,
}) {
    return (
        <section
            aria-label="Recipe Categories"
            className="mb-10"
        >
            <div className="flex flex-wrap items-center justify-center gap-3">
                {categories.map((category) => {
                    const isActive = selectedCategory === category;

                    return (
                        <button
                            key={category}
                            type="button"
                            onClick={() => onSelectCategory(category)}
                            aria-pressed={isActive}
                            className={`group rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950 ${isActive
                                    ? "border-orange-500 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25"
                                    : "border-slate-200 bg-white text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-orange-500 dark:hover:bg-slate-800 dark:hover:text-orange-400"
                                }`}
                        >
                            {category}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

CategoryFilter.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedCategory: PropTypes.string.isRequired,
    onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
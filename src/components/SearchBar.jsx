import PropTypes from 'prop-types';

function SearchBar({ searchTerm, onSearch }) {
    return (
        <div className="relative mx-auto mb-8 max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
            </span>

            <input
                type="text"
                value={searchTerm}
                placeholder="Search recipes..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200"
            />
        </div>
    );
}

SearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
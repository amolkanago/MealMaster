import { Link } from "react-router-dom";

const Navbar = ({ theme, toggleTheme }) => {
    const nextMode = theme === 'dark' ? 'light' : 'dark';

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 transition-colors duration-300 dark:bg-slate-900/90 dark:border-slate-700">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-2xl font-extrabold"
                >
                    <span>🍽️</span>
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        MealMaster
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <Link
                        to="/"
                        className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-orange-300"
                    >
                        Home
                    </Link>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${nextMode} mode`}
                        className="relative inline-flex h-11 w-20 items-center rounded-full border border-gray-200 bg-slate-100 p-1 text-gray-700 transition-colors duration-300 hover:border-orange-300 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-orange-400 dark:hover:bg-slate-700"
                    >
                        <span className={`absolute left-1 top-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-sm transition-all duration-300 ${theme === 'dark' ? 'translate-x-9' : 'translate-x-0'}`}>
                            {theme === 'dark' ? '🌙' : '☀️'}
                        </span>
                        <span className="sr-only">Toggle dark mode</span>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
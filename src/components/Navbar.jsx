import { PropTypes } from "proptype";
import { Link } from "react-router-dom";



const Navbar = ({ theme, toggleTheme }) => {
    const isDark = theme === "dark";
    const nextMode = isDark ? "light" : "dark";

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl supports-backdrop-filter:bg-white/70dark:border-slate-800 dark:bg-slate-950/75">
            <nav className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <Link
                    to="/"
                    aria-label="MealMaster Home"
                    className="flex items-center gap-3 group"
                >
                    <div className="flex items-center justify-center w-10 h-10 text-lg text-white transition-transform duration-300 shadow-md rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-orange-500/20 group-hover:scale-105">
                        🍽️
                    </div>

                    <span className="text-xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-red-500 bg-clip-text sm:text-2xl">
                        MealMaster
                    </span>
                </Link>

                <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                        to="/"
                        className="px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-xl text-slate-700 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-orange-400 dark:focus:ring-offset-slate-950"
                    >
                        Home
                    </Link>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${nextMode} mode`}
                        aria-pressed={isDark}
                        className="relative flex h-11 w-[78px] items-center rounded-full border border-slate-200 bg-slate-100 p-1 shadow-sm transition-all duration-300 hover:border-orange-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-orange-500"
                    >
                        <span
                            className={`absolute flex h-9 w-9 items-center justify-center rounded-full bg-white text-base shadow transition-transform duration-300 dark:bg-slate-800 ${isDark ? "translate-x-9" : "translate-x-0"
                                }`}
                        >
                            {isDark ? "🌙" : "☀️"}
                        </span>

                        <span className="flex w-full justify-between px-1.5 text-sm">
                            <span
                                className={`transition-opacity ${isDark
                                        ? "opacity-40"
                                        : "opacity-100 text-amber-500"
                                    }`}
                            >
                                ☀️
                            </span>

                            <span
                                className={`transition-opacity ${isDark
                                        ? "opacity-100 text-indigo-300"
                                        : "opacity-40"
                                    }`}
                            >
                                🌙
                            </span>
                        </span>
                    </button>
                </div>
            </nav>
        </header>
    );
};

Navbar.propTypes = {
    theme: PropTypes.oneOf(["light", "dark"]).isRequired,
    toggleTheme: PropTypes.func.isRequired,
};

export default Navbar;
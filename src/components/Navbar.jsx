import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
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

                <Link
                    to="/"
                    className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition"
                >
                    Home
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;
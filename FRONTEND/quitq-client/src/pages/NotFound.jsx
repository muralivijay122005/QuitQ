import { Link } from "react-router-dom";
import { FiHome, FiAlertCircle } from "react-icons/fi";

function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100  duration-300">
            <div className="text-center p-8 max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xl">
                <FiAlertCircle className="w-16 h-16 text-spotify mx-auto mb-4" />
                <h1 className="text-6xl font-black tracking-tight text-neutral-900 dark:text-white">
                    404
                </h1>
                <p className="mt-4 text-neutral-550 dark:text-neutral-400 font-medium">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 mt-8 bg-spotify hover:bg-spotify-hover text-neutral-950 font-bold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-spotify/20"
                >
                    <FiHome className="w-4.5 h-4.5" />
                    <span>Go Back Home</span>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
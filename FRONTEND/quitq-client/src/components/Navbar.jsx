import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import { getCart } from "../services/cartService";

import {
    FiShoppingCart,
    FiPackage,
    FiLayers,
    FiLogOut,
    FiMoon,
    FiSun,
    FiHeart,
    FiSearch,
    FiUser
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useFavorites } from "../context/FavoriteContext";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);

    const { logout, isAuthenticated, isAdmin } = useAuth();
    const { toggleTheme, isDark } = useTheme();
    const { favorites } = useFavorites();

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [cartCount, setCartCount] = useState(0);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIdx, setSelectedIdx] = useState(-1);
    const [showDropdown, setShowDropdown] = useState(false);
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        setSuggestions([]);
        setSelectedIdx(-1);
    }, [location.search]);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        if (!debouncedSearch.trim()) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const response = await api.get(`/products/suggestions?keyword=${debouncedSearch}`);
                setSuggestions(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSuggestions();
    }, [debouncedSearch]);

    useEffect(() => {
        async function fetchCart() {
            try {
                const data = await getCart();
                setCartCount(data?.items?.length || 0);
            } catch (error) {
                console.error(error);
            }
        }

        if (isAuthenticated) {
            fetchCart();
            fetchProfilePic();
        }
    }, [isAuthenticated]);

    const fetchProfilePic = async () => {
        try {
            const res = await api.get("/auth/me");
            setProfilePic(res.data.profileImageUrl || null);
        } catch (e) {
            console.error(e);
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
        setShowDropdown(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        navigate(`/products?search=${encodeURIComponent(search)}`);
    };

    const handleKeyDown = (e) => {
        if (!suggestions.length) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIdx((prev) => (prev + 1) % suggestions.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIdx((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === "Enter") {
            if (selectedIdx >= 0) {
                e.preventDefault();
                const selected = suggestions[selectedIdx];
                setSearch("");
                setSuggestions([]);
                setSelectedIdx(-1);
                navigate(`/products?search=${encodeURIComponent(selected)}`);
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-spotify">
                    QuitQ
                </Link>

                {/* Search */}
                {isAuthenticated && (
                    <form onSubmit={handleSearch} className="flex items-center w-full max-w-xl mx-8">
                        <div className="relative w-full">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-spotify"
                            />
                            {suggestions.length > 0 && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg overflow-hidden z-50">
                                    {suggestions.map((item, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className="block w-full text-left px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                            onClick={() => {
                                                setSearch("");
                                                setSuggestions([]);
                                                setSelectedIdx(-1);
                                                navigate(`/products?search=${encodeURIComponent(item)}`);
                                            }}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </form>
                )}

                {/* Right Section */}
                <div className="flex items-center gap-5">
                    <Link to="/products" className="hover:text-spotify flex items-center gap-1.5">
                        <FiPackage className="text-xl" />
                        Products
                    </Link>

                    <Link to="/cart" className="relative">
                        <FiShoppingCart className="text-xl" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 border-3 border-white dark:border-neutral-950 w-3 h-3 bg-green-500 rounded-full" />
                        )}
                    </Link>

                    <Link to="/favorites" className="relative">
                        <FiHeart className="text-xl" />
                        {favorites.length > 0 && (
                            <span className="absolute -top-1 -right-1 border-3 border-white dark:border-neutral-950 w-3 h-3 bg-green-500 rounded-full" />
                        )}
                    </Link>

                    <button onClick={toggleTheme}>
                        {isDark ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
                    </button>

                    {isAuthenticated && (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden border-2 border-neutral-300 dark:border-neutral-700 hover:border-spotify transition-all duration-200"
                            >
                                {profilePic ? (
                                    <img
                                        src={profilePic}
                                        alt="Profile"
                                        className="w-full h-full object-cover rounded-full"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div className={`w-full h-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center rounded-full ${profilePic ? 'hidden' : ''}`}>
                                    <FiUser className="text-xl text-neutral-600 dark:text-neutral-400" />
                                </div>
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg py-2 z-50">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <FiUser /> Profile
                                    </Link>

                                    {isAdmin && (
                                        <Link
                                            to="/admin"
                                            className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            <FiLayers /> Admin
                                        </Link>
                                    )}

                                    <Link
                                        to="/orders"
                                        className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <FiPackage /> Orders
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2 text-red-600 dark:text-red-400"
                                    >
                                        <FiLogOut /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
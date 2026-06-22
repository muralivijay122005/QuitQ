import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import api from "../api/axios";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await api.post("/auth/login", formData);
            login(response.data.token);
            alert("Login Successful!");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert(error.response?.data || "Invalid Credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4  duration-300 relative overflow-hidden">
            {/* Visual background elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-spotify/5 dark:bg-spotify/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-neutral-200/50 dark:shadow-neutral-950/50 relative z-10">
                <div className="text-center mb-8">
                    <span className="inline-flex items-center justify-center bg-spotify text-neutral-950 font-black text-2xl w-12 h-12 rounded-full mb-4 shadow-lg shadow-spotify/20">
                        Q
                    </span>
                    <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                        Welcome Back
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm">
                        Please sign in to your account to continue
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Email Address</label>
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-600 w-5 h-5" />
                            <input
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl pl-12 pr-4 py-3.5 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-spotify focus:ring-1 focus:ring-spotify "
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Password</label>
                        <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-600 w-5 h-5" />
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl pl-12 pr-4 py-3.5 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-spotify focus:ring-1 focus:ring-spotify "
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-2xl bg-spotify hover:bg-spotify-hover disabled:bg-neutral-700 disabled:text-neutral-400 text-neutral-950 font-bold transition-all duration-200 hover:shadow-lg hover:shadow-spotify/25 active:scale-99 flex items-center justify-center gap-2 cursor-pointer shadow-md mt-6"
                    >
                        <span>{loading ? "Signing In..." : "Sign In"}</span>
                        {!loading && <FiArrowRight className="w-4.5 h-4.5" />}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-850 text-center">
                    <p className="text-sm text-neutral-500 dark:text-neutral-450">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-spotify hover:underline font-bold ">
                            Sign up today
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
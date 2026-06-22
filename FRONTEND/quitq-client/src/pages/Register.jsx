import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiArrowRight } from "react-icons/fi";
import api from "../api/axios";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    });
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const validatePassword = (password) => {
        if (password.length < 8)
            return "Password must be at least 8 characters";

        if (!/[A-Z]/.test(password))
            return "Password must contain at least one uppercase letter";

        if (!/[a-z]/.test(password))
            return "Password must contain at least one lowercase letter";

        if (!/[0-9]/.test(password))
            return "Password must contain at least one number";

        return "";
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validatePassword(formData.password);

        if (error) {
            setPasswordError(error);
            return;
        }

        setPasswordError("");
        const passwordValidation =
            validatePassword(formData.password);

        if (passwordValidation) {
            setPasswordError(passwordValidation);
            return;
        }

        setPasswordError("");
        try {
            const passwordValidation =
                validatePassword(formData.password);

            if (passwordValidation) {
                setPasswordError(passwordValidation);
                return;
            }

            setPasswordError("");
            setLoading(true);
            await api.post("/auth/register", {
                ...formData,
                role: "USER",
            });
            alert("Registration Successful!");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert(error.response?.data || "Registration Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4 py-12  duration-300 relative overflow-hidden">
            {/* Background blur decorative elements */}
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-spotify/5 dark:bg-spotify/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-neutral-200/50 dark:shadow-neutral-950/50 relative z-10">
                <div className="text-center mb-8">
                    <span className="inline-flex items-center justify-center bg-spotify text-neutral-950 font-black text-2xl w-12 h-12 rounded-full mb-4 shadow-lg shadow-spotify/20">
                        Q
                    </span>
                    <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                        Create Account
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-sm">
                        Join QuitQ today and start shopping
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Full Name</label>
                        <div className="relative">
                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-600 w-5 h-5" />
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl pl-12 pr-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-spotify focus:ring-1 focus:ring-spotify "
                            />
                        </div>
                    </div>

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
                                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl pl-12 pr-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-spotify focus:ring-1 focus:ring-spotify "
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
                                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl pl-12 pr-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-spotify focus:ring-1 focus:ring-spotify "
                            />
                            {
                                passwordError && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {passwordError}
                                    </p>
                                )
                            }
                        </div>
                    </div>
                    <p className="text-xs text-neutral-500">
                        Minimum 8 characters,
                        1 uppercase,
                        1 lowercase,
                        1 number
                    </p>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Phone Number</label>
                        <div className="relative">
                            <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-600 w-5 h-5" />
                            <input
                                type="text"
                                name="phone"
                                placeholder="+91 98765 43210"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl pl-12 pr-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-spotify focus:ring-1 focus:ring-spotify "
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">Default Address</label>
                        <div className="relative">
                            <FiMapPin className="absolute left-4 top-4 text-neutral-400 dark:text-neutral-600 w-5 h-5" />
                            <textarea
                                name="address"
                                rows="2"
                                placeholder="123 Main St, Apartment 4B..."
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl pl-12 pr-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-spotify focus:ring-1 focus:ring-spotify  resize-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-2xl bg-spotify hover:bg-spotify-hover disabled:bg-neutral-700 disabled:text-neutral-400 text-neutral-950 font-bold transition-all duration-200 hover:shadow-lg hover:shadow-spotify/25 active:scale-99 flex items-center justify-center gap-2 cursor-pointer shadow-md mt-6"
                    >
                        <span>{loading ? "Creating Account..." : "Create Account"}</span>
                        {!loading && <FiArrowRight className="w-4.5 h-4.5" />}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-850 text-center">
                    <p className="text-sm text-neutral-550 dark:text-neutral-450">
                        Already have an account?{" "}
                        <Link to="/login" className="text-spotify hover:underline font-bold ">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
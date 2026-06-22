import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
    getProfile,
    updateProfile,
    uploadProfileImage,
    changePassword
} from "../services/userService";

function Profile() {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        profileImageUrl: ""
    });

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [passwordLoading, setPasswordLoading] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await getProfile();
            setProfile({
                name: data.name || "",
                email: data.email || "",
                phone: data.phone || "",
                address: data.address || "",
                profileImageUrl: data.profileImageUrl || ""
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await updateProfile({
                name: profile.name,
                phone: profile.phone,
                address: profile.address
            });
            alert("Profile updated successfully");
        } catch (error) {
            console.error(error);
            alert("Update failed");
        } finally {
            setLoading(false);
        }
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const handleImageUpload = async () => {
        if (!image) return;

        try {
            setUploading(true);
            const result = await uploadProfileImage(image);

            setProfile(prev => ({
                ...prev,
                profileImageUrl: result.profileImageUrl || result.imageUrl || prev.profileImageUrl
            }));

            setImage(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            alert("Image uploaded successfully");
        } catch (error) {
            console.error(error);
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords do not match");
            return;
        }

        if (passwordData.newPassword.length < 8) {
            alert("Password must be at least 8 characters");
            return;
        }

        try {
            setPasswordLoading(true);
            await changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
                confirmPassword: passwordData.confirmPassword
            });

            alert("Password changed successfully");
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Password change failed");
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
            <Navbar />

            <main className="max-w-3xl mx-auto w-full px-6 py-12 flex-grow">
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8">
                    <h1 className="text-3xl font-bold mb-8">My Profile</h1>

                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center mb-10">
                        <img
                            src={profile.profileImageUrl || "https://dummyimage.com/150x150/1f2937/ffffff&text=User"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-neutral-200 dark:border-neutral-700"
                        />

                        <div className="mt-6 flex flex-col items-center gap-3">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-2.5 rounded-full font-medium"
                            >
                                Choose Image
                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageSelect}
                            />

                            {image && (
                                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Selected: {image.name}
                                </div>
                            )}

                            <button
                                onClick={handleImageUpload}
                                disabled={!image || uploading}
                                className="bg-spotify hover:bg-spotify-hover disabled:bg-neutral-400 px-6 py-2.5 rounded-full font-semibold text-neutral-950 transition-colors"
                            >
                                {uploading ? "Uploading..." : "Upload Image"}
                            </button>
                        </div>
                    </div>

                    {/* Profile Update Form */}
                    <form onSubmit={handleUpdate} className="space-y-5">
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            placeholder="Name"
                            className="w-full border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 focus:outline-none focus:border-spotify"
                        />

                        <input
                            type="email"
                            value={profile.email}
                            disabled
                            className="w-full border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 bg-neutral-100 dark:bg-neutral-800"
                        />

                        <input
                            type="text"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            placeholder="Phone"
                            className="w-full border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 focus:outline-none focus:border-spotify"
                        />

                        <textarea
                            rows="4"
                            value={profile.address}
                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                            placeholder="Address"
                            className="w-full border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 focus:outline-none focus:border-spotify"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-spotify hover:bg-spotify-hover disabled:bg-neutral-400 px-8 py-3 rounded-full font-bold text-neutral-950 transition-colors w-full sm:w-auto"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </form>

                    {/* Change Password Section */}
                    <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                        <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                className="w-full border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 focus:outline-none focus:border-spotify"
                                required
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                className="w-full border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 focus:outline-none focus:border-spotify"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                className="w-full border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 focus:outline-none focus:border-spotify"
                                required
                            />
                            <button
                                type="submit"
                                disabled={passwordLoading}
                                className="bg-red-600 hover:bg-red-700 disabled:bg-neutral-400 px-8 py-3 rounded-full font-bold text-white transition-colors w-full sm:w-auto"
                            >
                                {passwordLoading ? "Changing..." : "Change Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Profile;
"use client";
import { use, useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    // const [error, setError] = useState("");
    // const [loading, setLoading] = useState(false);
    // const [success, setSuccess] = useState(false);
    // const [token, setToken] = useState("");

    // const handleChange = 

    return (
        <div className="flex items-center justify-center h-screen">
        <div className="bg-blue-200 p-8 rounded shadow-md w-150 ">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                type="email"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter your email"
                />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                type="password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter your password"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            >
                Login
            </button>
            </form>
        </div>
        </div>
    );
}
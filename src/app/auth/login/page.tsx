
"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import API from '@/lib/Api';

const LoginPage = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<any>({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        general: ""
    });
    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };
    const handleLogin = async (e: any) => {
        e.preventDefault();
        let formValid = true;

        if (!formData.email) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "Email is Required",
            }));
            formValid = false;
        }

        if (!formData.password) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "Password is Required",
            }));
            formValid = false;
        }

        if (!formValid) {
            return;
        }

        try {
            const response: any = await API.post('login-user', formData)
            if (response.status == 200) {
                console.log(response, "response");
                router.push("/dashBoard")
                localStorage.setItem("token", response.accessToken)
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    general: response.error || "Login failed",
                }));
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your Email"
                            value={formData.email || ""}
                            onChange={(e: any) => handleChange(e)}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your password"
                            value={formData.password || ""}
                            onChange={(e: any) => handleChange(e)}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>
                    {errors.general && (
                        <p className="text-red-500 text-sm mt-1 mb-1">{errors.general}</p>
                    )}
                    <button
                        type="submit"
                        onClick={handleLogin}
                        className="w-full bg-[#A05] text-white p-3 rounded-md hover: bg-[#A06] focus:outline-none focus: bg-[#A05]"
                    >
                        Login
                    </button>
                    <div className="flex justify-between">
                        <h4 className="block text-gray-700 text-sm font-medium m-2">Back ?</h4>
                        <h4 className="text-gray-700 text-sm font-medium m-2">
                            <Link href="/auth/Registration" className="hover:text-blue-500">Go to Registration Page </Link>
                        </h4>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;



"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import API from '@/lib/Api';

const LoginPage = () => {
    const router = useRouter()

    const [formData, setFormData] = useState<any>({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        mobile: ""
    })
    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await API.post('user', formData);

            if (response.status == 200) {
                router.push("/auth/login")
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-xl"> {/* Adjust max-width as needed */}
                <h2 className="text-2xl font-semibold mb-6 text-center">User Registration</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username || ""}  // Ensure the value is controlled by state
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your Username"
                            onChange={(e: any) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email || ""}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your Email"
                            onChange={(e: any) => handleChange(e)}

                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password || ""}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your password"
                            onChange={(e: any) => handleChange(e)}

                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-2">
                            First Name
                        </label>
                        <input
                            type="firstName"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName || ""}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your First Name"
                            onChange={(e: any) => handleChange(e)}

                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-2">
                            Last Name
                        </label>
                        <input
                            type="lastName"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName || ""}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your Last Name"
                            onChange={(e: any) => handleChange(e)}

                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="mobile" className="block text-gray-700 text-sm font-medium mb-2">
                            Mobile Number
                        </label>
                        <input
                            type="mobile"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile || ""}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your Mobile Number"
                            onChange={(e: any) => handleChange(e)}

                        />
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-[#A05] text-white p-3 rounded-md hover:bg-[#A06] focus:outline-none focus: bg-[#A05]"
                    >
                        Register
                    </button>
                    <div className="flex justify-between">
                        <h4 className="block text-gray-700 text-sm font-medium m-2">Already Registered?</h4>
                        <h4 className="text-gray-700 text-sm font-medium m-2">
                            <Link href="/auth/login" className="hover:text-blue-500">Go to Login Page </Link>
                        </h4>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default LoginPage;


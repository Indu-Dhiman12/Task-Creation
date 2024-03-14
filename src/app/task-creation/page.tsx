
"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import API from '@/lib/Api';

const TaskCreation = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<any>({
        task: "",
        description: "",
        file: ""
    })
    const [errors, setErrors] = useState({
        task: "",
        description: "",
        general: "",
        file: ""

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
    const handelAdd = async (e: any) => {
        e.preventDefault();
        let formValid = true;

        if (!formData.task) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                task: "Task is Required",
            }));
            formValid = false;
        }

        if (!formData.description) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                description: "Description is Required",
            }));
            formValid = false;
        }
        if (!formData.file) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                file: "Image Upload is Required",
            }));
            formValid = false;
        }

        if (!formValid) {
            return;
        }

        try {
            const response: any = await API.post('addTask', formData)
            if (response.status == 201) {

                setFormData({});
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
                <h2 className="text-2xl font-semibold mb-6 text-center">Add your Task</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="task" className="block text-gray-700 text-sm font-medium mb-2">
                            Task Name
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            name="task"
                            placeholder="Enter Task"
                            value={formData.task || ""}
                            onChange={(e: any) => handleChange(e)}

                        />
                        {errors.task && (
                            <p className="text-red-500 text-sm mt-1">{errors.task}</p>
                        )}                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter Description"
                            value={formData.description || ""}
                            onChange={(e: any) => handleChange(e)}
                            rows={5}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="file" className="block text-gray-700 text-sm font-medium mb-2">
                            Image Upload
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            value={formData.file || ""}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            onChange={(e: any) => handleChange(e)}
                        />
                        {errors.file && (
                            <p className="text-red-500 text-sm mt-1">{errors.file}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        onClick={handelAdd}
                        // onKeyDown={(e) => {
                        //     if (e.key === 'Enter') {
                        //         handleAddTask();
                        //     }
                        // }}
                        className="w-full bg-[#A05] text-white p-3 rounded-md hover: bg-[#A06] focus:outline-none focus: bg-[#A05]"
                    >
                        Add
                    </button>
                    <div className="flex justify-between">
                        <h4 className="block text-gray-700 text-sm font-medium m-2">Want Task List ?</h4>
                        <h4 className="text-gray-700 text-sm font-medium m-2">
                            <Link href="/task-creation-list" className="hover:text-blue-500">All Task List </Link>
                        </h4>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskCreation;


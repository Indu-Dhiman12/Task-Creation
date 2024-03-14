"use client"
import React, { useEffect, useState } from 'react';

const EditPopup = ({ task, onSave, onCancel }: any) => {
    const [editedTask, setEditedTask] = useState({
        task: "",
        description: ""
    });
    const [error, setError] = useState({
        task: "",
        description: ""
    });

    useEffect(() => {
        if (task) {
            setEditedTask(task);
        }
    }, [task]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        if (!editedTask.task.trim()) {
            setError({ task: "Task cannot be empty", description: "" });
        } else {
            setError({ task: "", description: "" });
            onSave(task.id, editedTask);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-opacity-80 bg-black absolute inset-0"></div>
            <div className="bg-white w-96 p-4 rounded-md z-10">
                <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                <input
                    type="text"
                    name="task"
                    value={editedTask.task || ""}
                    onChange={(e) => handleChange(e)}
                    className="w-full border border-gray-300 p-2 mb-4 rounded-md focus:outline-none"
                />
                {error.task && <p className="text-red-500 mb-2">{error.task}</p>}

                <input
                    type="text"
                    name="description"
                    value={editedTask.description || ""}
                    onChange={(e) => handleChange(e)}
                    className="w-full border border-gray-300 p-2 mb-4 rounded-md focus:outline-none"
                />

                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="bg-[#A05] text-white py-2 px-4 mr-2 rounded-md"
                    >
                        Save
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPopup;

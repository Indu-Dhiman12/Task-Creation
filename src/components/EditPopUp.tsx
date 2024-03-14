"use client"
import React, { useEffect, useState } from 'react';

const EditPopup = ({ task, onSave, onCancel }: any) => {
    const [editedTask, setEditedTask] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {
        setEditedTask(task)
    }, [task])

    const handleSave = () => {
        if (editedTask.trim() === "") {
            setError("Task cannot be empty");
        } else {
            setError("");
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
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSave();
                        }
                    }}
                    className="w-full border border-gray-300 p-2 mb-4 rounded-md focus:outline-none"
                />
                {error && <p className="text-red-500 mb-2">{error}</p>}

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

export default EditPopup

"use client"
import EditPopup from '@/components/EditPopUp';
import React, { useEffect, useState } from 'react';
import API from '@/lib/Api';

const TaskManager = () => {
    const [tasks, setTasks] = useState<any>([]);
    const [task, setTask] = useState<any>('');
    const [editTask, setEditTask] = useState([])
    const [error, setErrors] = useState<any>("")
    const [Id, setId] = useState<any>("")
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState<any>([]);

    useEffect(() => {
        fetchTasks()
    }, [])

    useEffect(() => {
        if (selectedTasks.length > 0 && selectedTasks.length == tasks.length) {
            setSelectAll(true)
        }
        else {
            setSelectAll(false)
        }
    }, [selectedTasks, tasks])

    const handleAddTask = async () => {
        try {
            if (!task) {
                setErrors("Add Task is Required");
                return;
            }

            const response: any = await API.post('addTask', { task })

            if (response.status == 201) {
                fetchTasks();
                setErrors("");
                setTask('');

            }
            else {
                setErrors(response.error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTasks = async () => {
        try {
            const response: any = await API.get('getTask')

            if (response) {
                setTasks(response);
            } else {
                console.error('Fetching tasks failed');
            }
        } catch (error) {
            console.error('Error during fetching tasks:', error);
        }
    };

    const handleEdit = async (taskId: number) => {
        try {
            const response = await fetch(`http://localhost:5000/getTask/${taskId}`);

            if (response.ok) {
                const taskData = await response.json();
                setEditTask(taskData.task);
                setId(taskData.id)
                setShowEditPopup(true);
            }
        } catch (error) {
            console.error('Error during editing task:', error);
        }
    };
    const handleEditSave = async (id: any, task: any) => {
        try {

            const response = await fetch(`http://localhost:5000/task/${Id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: task, id: Id }),
            });

            if (response.ok) {
                const responseData = await response.json();
                setEditTask(responseData.task);
                setShowEditPopup(false)
                fetchTasks()

            } else {
                console.error('Error updating task:', response.statusText);
            }
        } catch (error) {
            console.error('Error during task update:', error);
        }
    };


    const handleDeleteTask = async (taskId: number) => {
        try {
            const response = await fetch(`http://localhost:5000/deleteTask/${taskId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchTasks()
            }
        } catch (error) {
        }
    };
    const handleCancelEdit = () => {
        setShowEditPopup(false)
    }
    const selectedAll = () => {
        setSelectAll(!selectAll);
        const newSelectedTasks = selectAll ? [] : tasks.map((task: any) => task.id);
        setSelectedTasks(newSelectedTasks);


    };

    const handleCheckboxChange = (taskId: any) => {
        const newSelectedTasks = selectedTasks.includes(taskId)
            ? selectedTasks.filter((id: any) => id !== taskId)
            : [...selectedTasks, taskId];

        setSelectedTasks(newSelectedTasks);

        // const data = tasks.filter((item: any) => newSelectedTasks.includes(item.id));

        // setSelectedData(data)

    };

    const handleCompleteTask = async () => {
        if (selectedTasks && selectedTasks.length > 0) {
            try {

                const response: any = await API.post('completeTask', { id: selectedTasks })
                if (response) {
                    fetchTasks()
                }
            }
            catch (err) {

            }

        }
    }
    return (
        <>
            {showEditPopup && (
                <EditPopup
                    task={editTask}
                    onEdit={handleEdit}
                    onSave={handleEditSave}
                    onCancel={handleCancelEdit}
                />
            )}
            <div className="max-w-screen-xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
                <div className="flex items-center mb-4">
                    <input
                        className="flex-grow border-b-2 border-gray-300 py-2 px-3 focus:outline-none focus:border-blue-500"
                        type="text"
                        name="task"
                        placeholder="Enter task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleAddTask();
                            }
                        }}
                    />

                    <button
                        className="ml-2 bg-[#A05] text-white py-2 px-4 rounded-md"
                        onClick={handleAddTask}
                    >
                        Add Task</button>
                </div>
                {error && (
                    <div className="text-red-500 mb-4">
                        {error}
                    </div>
                )}
                <table className="w-full text-center">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4">S No.</th>
                            <th className="py-2 px-4">Task</th>
                            <th className="py-2 px-4">Action</th>
                            <th className="py-2 px-4">
                                <input type="checkbox" className='mr-8' onClick={selectedAll} onChange={() => { }} checked={selectAll} />
                                Select
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        {tasks.map((task: any, index: any) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} >
                                <td className="py-2 px-4 ">{index + 1}</td>
                                <td className="py-2 px-4 ">{task.task}</td>
                                <td className="py-2 px-4">
                                    <button
                                        className="bg-yellow-500 text-white py-1 px-2 mr-2 rounded-md"
                                        onClick={() => {
                                            handleEdit(task.id);
                                            setShowEditPopup(true);
                                        }}

                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white py-1 px-2 rounded-md"
                                        onClick={() => handleDeleteTask(task.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    <input type="checkbox" className="mr-20"
                                        checked={selectedTasks.includes(task.id) || ''}
                                        onChange={() => handleCheckboxChange(task.id)} />
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
                <div className='flex justify-end'>
                    <button className="ml-2 bg-[#A05] text-white py-2 px-4 rounded-md mt-4 "
                        onClick={handleCompleteTask}>
                        Complete Task
                    </button>
                </div>

            </div>
        </>
    );
};


export default TaskManager;




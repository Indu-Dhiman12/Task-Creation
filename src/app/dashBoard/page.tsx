"use client"
import API from '@/lib/Api';
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function Dashboard() {
    const router = useRouter()
    const [tasks, setTasks] = useState<any>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
        }
    }, []);
    useEffect(() => {
        fetchTasks()
    }, [])

    const fetchTasks = async () => {
        try {
            const response: any = await API.get('getcompleteTask')

            if (response) {
                setTasks(response);
            } else {
                console.error('Fetching tasks failed');
            }
        } catch (error) {
            console.error('Error during fetching tasks:', error);
        }
    };
    const LogOut = () => {
        localStorage.removeItem("token")
        router.push("/auth/login")
    }
    return (
        <>
            <div className="py-2 px-4 text-center  " style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p> Welcome To the DashBoard!  You have done this tasks</p>

                <div>
                    <button className="bg-[#A05] text-white py-2 px-4 rounded-md mt-4"><Link href="/task-creation">Create New Task  </Link></button>

                    <button onClick={LogOut} className="bg-[#A05] text-white py-2 px-4 rounded-md mt-4 ml-4">Log Out</button>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
                <div className="flex items-center mb-4">
                    <table className="w-full text-center">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4">S No.</th>
                                <th className="py-2 px-4">Task</th>
                            </tr>
                        </thead>
                        <tbody >
                            {tasks.map((task: any, index: any) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} >
                                    <td className="py-2 px-4 ">{index + 1}</td>
                                    <td className="py-2 px-4 ">{task.task}</td>
                                </tr>
                            ))}

                        </tbody>

                    </table>
                </div>
            </div>
        </>
    )
}

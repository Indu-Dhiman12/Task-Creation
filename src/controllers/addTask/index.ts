import { Request, Response, NextFunction } from "express";
import taskCreation from "../../models/taskCreation.model";
import { checkAccessToken } from "../../util/auth";
import { Op } from "sequelize";

const addTask = async (req: Request, res: Response) => {
    const authToken: any = req.header("authorization")?.replace("Bearer ", "");

    const { data }: any = await checkAccessToken(authToken)
    try {
        const taskName = req.body.task;
        const existingTask = await taskCreation.findOne({ where: { task: taskName, user: data.user._id.toString() } });

        if (existingTask) {
            return res.status(400).json({ error: "Task already Exists" });
        }
        const createTask = {
            task: taskName,
            user: data.user._id
        };
        const user = await taskCreation.create(createTask);
        return res.status(201).json({ data: user, status: 201 });
    } catch (error: any) {
        console.error("Error appending data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
const getTask = async (req: Request, res: Response) => {
    const authToken: any = req.header("authorization")?.replace("Bearer ", "");
    const { data }: any = await checkAccessToken(authToken)
    try {
        const tasks = await taskCreation.findAll({
            where: {
                user: data.user._id.toString(),
                status: false
            },
        });
        return res.status(200).json(tasks);
    } catch (error: any) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getSingleTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const task = await taskCreation.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        return res.status(200).json(task);
    } catch (error: any) {
        console.error("Error fetching single task:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id; // Assuming you pass the task ID as a route parameter
        const task = await taskCreation.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        await task.destroy();
        return res.status(204).json({ success: true, message: "Task successfully deleted" });
    } catch (error: any) {
        console.error("Error deleting task:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const editTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const { task: updatedTaskName, id: id } = req.body;
        const task = await taskCreation.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        task.task = updatedTaskName;
        task.id = id;
        await task.save();

        return res.status(200).json({ success: true, message: "Task successfully updated", task: updatedTaskName });
    } catch (error: any) {
        console.error("Error updating task:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const completeTask = async (req: Request, res: Response) => {
    try {
        // const tasksArray = req.body.id;

        const status = await taskCreation.update({
            status: true
        },
            { where: { id: { [Op.in]: req.body.id } } }
        );
        return res.status(200).json({ status: status, message: 'Tasks completed successfully' });
        //         else {
        //     return res.status(400).json({ error: 'Invalid input or empty array' });
        // }
    } catch (error: any) {
        console.error("Error updating tasks:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getcompleteTask = async (req: Request, res: Response) => {
    const authToken: any = req.header("authorization")?.replace("Bearer ", "");
    const { data }: any = await checkAccessToken(authToken)
    try {
        const tasks = await taskCreation.findAll({
            where: {
                user: data.user._id.toString(),
                status: true
            },
        });
        return res.status(200).json(tasks);
    } catch (error: any) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export { addTask, getTask, deleteTask, editTask, getSingleTask, completeTask, getcompleteTask };

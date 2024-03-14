import { addTask, getTask, deleteTask, editTask, getSingleTask, completeTask, getcompleteTask } from "../../controllers/addTask/index"
import { Router } from "express";

const router = Router();
router.post("/addTask", addTask);
router.post("/completeTask", completeTask);
router.get("/getTask", getTask);
router.get("/getcompleteTask", getcompleteTask);
router.delete("/deleteTask/:id", deleteTask);
router.put("/task/:id", editTask)
router.get("/getTask/:id", getSingleTask);



export default router;
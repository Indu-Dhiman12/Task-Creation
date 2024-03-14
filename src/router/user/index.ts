import { createUser, getUsers, deleteUser, loginUser } from "../../controllers/user/index";
import { Router } from "express";

const router = Router();
router.post("/user", createUser);
router.post("/login-user", loginUser);
router.get("/user", getUsers);
router.delete("/user/:id", deleteUser);

export default router;

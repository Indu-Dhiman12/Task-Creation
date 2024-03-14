import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import User from "../../models/user.model";
import { generateTokens } from "../../util/auth";
import * as bcrypt from 'bcrypt';

const createUser = async (req: Request, res: Response) => {
    try {
        const emailExists = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (emailExists) {
            return res.status(400).json({ error: "Email already exists", status: 400 });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const usernameExists = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (usernameExists) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const userCreated = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            firstname: req.body.firstName || "",
            lastname: req.body.lastName || "",
            mobile: req.body.mobile || "",
            role: "User",
        };
        const user = await User.create(userCreated);
        // return res.status(201).json(user);
        return res.status(200).json({ user, status: 200 });

    } catch (error: any) {
        console.error("Error appending data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(401).json({ error: 'Email Not Found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password Not Matched' });
        }
        var { accessToken } = await generateTokens(user.dataValues.id, user.dataValues.role);
        return res.status(200).json({ user, accessToken, status: 200 });
    } catch (error: any) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
        console.log(users, "sgdfd");

    } catch (error: any) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.destroy();

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export { createUser, getUsers, deleteUser, loginUser };

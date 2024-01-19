import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../providers/user.provider";
import { compareSync, hashSync } from "bcryptjs";
import { createUserSession } from "../providers/userSession.provider";

export const signup = async ( req: Request, res: Response ) => {
    const { lastName, firstName, nickname, email, password } = req.body

    const newUser = await createUser(lastName, firstName, nickname, email, hashSync(password, 10))

    res.status(201).json({message: "User successfully create", user: newUser})
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await getUserByEmail(email);
    
    if(!user) {
        res.status(400).json("Email or password is incorrect");
    } else {
        const passwordConnect = compareSync(password, user.password);

        if(!passwordConnect) {
            res.status(400).json("Email or password is incorrect");
        } else {
            try {
                const newSession = await createUserSession(user.id)
                res.json({user, session: newSession})
            } catch (error) {
                res.status(500).json({error: error})
            }
        }
    }
}
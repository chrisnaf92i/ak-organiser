import { Router } from "express";
import { login, signup } from "../controller/user.controller";

const router = Router()

router.post("/sign-up", signup);
router.post("/login", login)

export default router
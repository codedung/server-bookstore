import express, { IRouter } from "express";
import userRouter from "./users.routes";
const router: IRouter = express.Router();

router.use("/users", userRouter);

export default router;

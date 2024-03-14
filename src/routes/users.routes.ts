import express, { IRouter } from "express";
import { userRegSignup } from "../controller/users.controller";

const router: IRouter = express.Router();

router.post("/signup", userRegSignup);
router.post("/login");
router.post("/reset");
router.put("/reset/:id");

export default router;

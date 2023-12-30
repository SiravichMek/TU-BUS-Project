import express from "express";
import "dotenv/config";
import insertstudentController from "../controller/insert_student_controller.js";

const router_student_add = express.Router()

router_student_add.post('/',insertstudentController.validate_student,insertstudentController.insert_student_account);

export default router_student_add ; 
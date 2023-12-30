import express from "express";
import studenttableController from "../controller/table_student_controller.js";

const router_student = express.Router()

router_student.get('/', studenttableController.show_student);

export default router_student ; 

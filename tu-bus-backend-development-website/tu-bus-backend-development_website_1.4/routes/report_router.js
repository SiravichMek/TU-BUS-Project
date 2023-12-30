import express from "express";
import reportController from "../controller/report_controller.js";

const router_report = express.Router()

router_report.get('/', reportController.show_report);

export default router_report;
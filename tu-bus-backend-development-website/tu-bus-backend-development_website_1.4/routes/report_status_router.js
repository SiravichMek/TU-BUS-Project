import express from "express";
import reportstatusController from "../controller/report_status_controller.js";

const router_report_status = express.Router()

router_report_status.put('/resolved/:id', reportstatusController.resolved_report);

router_report_status.put('/rejected/:id', reportstatusController.rejected_report);

export default router_report_status;
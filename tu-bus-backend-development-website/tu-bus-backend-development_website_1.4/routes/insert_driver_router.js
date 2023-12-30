import express from "express";
import insertdriverController from "../controller/insert_driver_controller.js";

const router_driver_add = express.Router();

router_driver_add.post('/',insertdriverController.validate_driver,insertdriverController.insert_driver_account);

export default router_driver_add ; 


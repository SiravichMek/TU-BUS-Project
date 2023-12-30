import express from "express";
import "dotenv/config";
import insertparentController from "../controller/insert_parent_controller.js";

const router_parent_add = express.Router()

router_parent_add.post('/',insertparentController.validate_parent, insertparentController.insert_parent_account);

export default router_parent_add ; 
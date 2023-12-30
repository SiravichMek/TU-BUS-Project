import express from "express";
import "dotenv/config";
import router_student from "./routes/table_student_router.js";
import router_driver from "./routes/table_driver_router.js";
import router_student_add from "./routes/insert_student_router.js";
import router_parent_add from "./routes/insert_parent_router.js";
import router_driver_add from "./routes/insert_driver_router.js";
import router_report from "./routes/report_router.js";
import router_report_status from "./routes/report_status_router.js";
import bodyParser from "body-parser";
import cors from "cors";
import get_session from "./Utils/get_session.js";
import { unknown_endpoint,session_middleware } from "./Utils/middleware.js";
    
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Middleware
app.use(cors());
app.use(session_middleware);

//Router 
app.use('/Table/Student',router_student);       // Student Table Page
app.use('/Table/Driver',router_driver);         // Driver Table Page
app.use('/Insert/Student',router_student_add);  // Student Insert Page
app.use('/Insert/Parent',router_parent_add);   // Parent Insert Page
app.use('/Insert/Driver',router_driver_add);    // Driver Insert Page
app.use('/Report',router_report);               // Report Recording Page
app.use('/Report/Status',router_report_status); // Update Report Status 

// set route for retrieving data from session
app.get('/api/session',get_session);

// set unexpected endpoint
app.use(unknown_endpoint);

app.listen(3000, () => {
  console.log(`> Ready on http://localhost:3000`);
});

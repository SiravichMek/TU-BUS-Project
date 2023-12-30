import studentinsertModel from "../model/insert_student_model.js";
import get_current_time from "../Utils/date.js";
import clear_session from "../Utils/clear_session.js";

const insertstudentController =  {
    // Validation inputs function
    async validate_student(req,res,next){
        
        const {name,surname,id,grade,bus_no,address} = req.body;
        // store input in sessions
        req.session.form_student = {name,surname,id,grade,bus_no,address};
        
        // Find all of bus No. in database 
        const Arr_obj_bus = await studentinsertModel.fetch_driver_bus_no();
        if (!Array.isArray(Arr_obj_bus)) {
            return res.status(400).json({ error: Arr_obj_bus });
          }
        const bus_array = Arr_obj_bus.map(obj => obj.bus_no); //create the array which contains the bus No.

        // Find all of student ID in database
        const Arr_obj_id = await studentinsertModel.fetch_student_id();
        if (!Array.isArray(Arr_obj_id)) {
            return res.status(400).json({ error: Arr_obj_id });
          }
        const id_array = Arr_obj_id.map(obj => obj.id); //create the array which contains the student ID.
        
        try{
           // validate inputs via checking conditions
          const validationRules = [
            { field: name, fieldName: 'Name', validation: (value) => value && value.trim() !== '' },
            { field: surname, fieldName: 'Surname', validation: (value) => value && value.trim() !== '' },
            { field: id, fieldName: 'ID', validation: (value) => value && Number.isInteger(Number(value)) && !(id_array.includes( value )) }, // Check input ID not duplicate with ID in database
            { field: grade, fieldName: 'Grade', validation: (value) => value && Number.isInteger(Number(value)) && value >= 1 && value <= 6 },
            { field: bus_no, fieldName: 'Bus number', validation: (value) => value && bus_array.includes( value )  }, // Check input bus No. not duplicate with bus No. in database
            { field: address, fieldName: 'Address', validation: (value) => value && value.trim() !== '' }
            ];
    
          // Array of the error inputs
          const errors = [];
    
          validationRules.forEach(({ field, fieldName, validation }) => {
          // push the error validate in the errors array
          if (!validation(field)) {
            errors.push(`${fieldName} is invalid or missing.`);
            }
          });
    
          // return the json array of error
          if (errors.length > 0) {
            return res.status(400).json({ error: errors });
          }
        }
        catch(error){return res.status(500).json({ error: ['Failed to retrieve the request body. Please check the body type as it may be incorrect.' ]});}
        
      next();
      }  ,
 
    // Insert student function
    async insert_student_account (req, res) {   
        
        // Check wheter inputs data from previous page are exist
        if(Object.keys(!req.session.form_student || req.session.form_student).length === 0){
            return res.status(400).json({ error: "The inputs haven't existed. Please recreate the form." })}
        // set the object input student from the session
        const form_input_student = req.session.form_student;
        const date = get_current_time();
        const result = await studentinsertModel.insert_student(form_input_student.name,form_input_student.surname,form_input_student.id
          ,form_input_student.grade,form_input_student.bus_no,form_input_student.address,date);
        // delete the session
        clear_session(req,res);
        Array.isArray(result) === false ? res.json({error : result}).status(400)  
        :  res.json({complete : "Create Complete"}).status(200);}

}

export default insertstudentController;
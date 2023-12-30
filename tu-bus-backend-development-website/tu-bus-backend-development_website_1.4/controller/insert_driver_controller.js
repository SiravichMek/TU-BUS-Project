import driverinsertModel from "../model/insert_driver_model.js";
import get_current_time from "../Utils/date.js";
import clear_session from "../Utils/clear_session.js";

const insertdriverController =  {
    // Validation inputs function
    async validate_driver (req,res,next){
    
        const {name,surname,car_license,line_id,tel} = req.body;
        // store input in sessions
        req.session.form_driver = {name,surname,car_license,line_id,tel};
        
        try{
          // validate inputs via checking conditions
          const validationRules = [
            { field: name, fieldName: 'Name', validation: (value) => value && value.trim() !== '' },
            { field: surname, fieldName: 'Surname', validation: (value) => value && value.trim() !== '' },
            { field: car_license, fieldName: 'Car License', validation: (value) => value && value.trim() !== '' },
            { field: line_id, fieldName: 'Line ID', validation: (value) => value && value.trim() !== '' },
            { field: tel, fieldName: 'Tel.', validation: (value) => value && value.trim() !== '' }
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
            return res.status(400).json({ error:errors });
          }
        }
        catch(error){return res.status(500).json({ error: ['Failed to get the request body, the type of some body may be incorrect']})}
      
      next();
    } ,

    // Insert driver function
    async insert_driver_account (req,res){
        
        if(Object.keys(!req.session.form_driver || req.session.form_driver).length === 0){
          return res.status(400).json({ error: "The form input has expired. Please recreate the form." })}
        // set the object input student from the session
        const form_input_driver = req.session.form_driver;
        
        // Check all bus No. in database.
        const Arr_obj_bus_no = await driverinsertModel.fetch_driver_bus_no();
        if (!Array.isArray(Arr_obj_bus_no)) {
            return res.status(400).json({ error: Arr_obj_bus_no });
          }
        // assign new bus_no
        const bus_no = Math.max(...Arr_obj_bus_no.map(n => n.bus_no))+1;
        // set the creating time
        const date = get_current_time();
        
        const result = await driverinsertModel.insert_driver(form_input_driver.name,form_input_driver.surname,bus_no,form_input_driver.car_license
          ,form_input_driver.line_id,form_input_driver.tel,date);
        // delete the session
        clear_session(req,res)  
        Array.isArray(result) === false ? res.json({error : result}).status(400) 
        : (res.json({complete : "Create Complete"}).status(200),console.log(result) );}

}

export default insertdriverController;
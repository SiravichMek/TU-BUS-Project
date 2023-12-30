import parentinsertModel from "../model/insert_parent_model.js";
import get_current_time from "../Utils/date.js";
import clear_session from "../Utils/clear_session.js";

const insertparentController =  {
    
    // Validation inputs function  
    async validate_parent(req,res,next){
        
        const {name_parent,surname_parent,line_id,parent_tel,Arr_student_id} = req.body;
        // store input in sessions
        req.session.form_parent = {name_parent,surname_parent,line_id,parent_tel,Arr_student_id};
        
        try{
           // validate inputs via checking conditions
          const validationRules = [
            { field: name_parent, fieldName: 'Name', validation: (value) => value && value.trim() !== '' },
            { field: surname_parent, fieldName: 'Surname', validation: (value) => value && value.trim() !== '' },
            { field: line_id, fieldName: 'Line ID', validation: (value) => value && value.trim() !== '' },
            { field: parent_tel, fieldName: 'Tel.', validation: (value) => value && value.trim() !== '' },
            { field: Arr_student_id, fieldName: 'Student ID', validation: (value) => Array.isArray(value) && value !== [] }
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
      }  ,
    
      // Insert parent function
      async insert_parent_account (req, res) {
        if(Object.keys(!req.session.form_parent || req.session.form_parent).length === 0){
          return res.status(400).json({ error: "The form input has expired. Please recreate the form." })}
        // set the object input parent from the session
        const form_input_parent = req.session.form_parent;
        
        // Find all of parent ID in database
        const Arr_obj_id = await parentinsertModel.fetch_parent();
        if (!Array.isArray(Arr_obj_id)) {
            return res.status(400).json({ error: Arr_obj_id });
          }
        // assign new parent id
        const id_parent = Math.max(...Arr_obj_id.map(n => n.id))+1;
        // set the creating time
        const date = get_current_time();
        
        const result = await parentinsertModel.insert_parent(form_input_parent.name_parent,form_input_parent.surname_parent,
          id_parent,form_input_parent.line_id,form_input_parent.parent_tel,date);
        
        await parentinsertModel.link_student_parent(id_parent,form_input_parent.Arr_student_id);
        
        Array.isArray(result) === false ?  res.json({error : result}).status(400) : res.json({complete : "Create Complete"}).status(200); } 
 
}

export default insertparentController;
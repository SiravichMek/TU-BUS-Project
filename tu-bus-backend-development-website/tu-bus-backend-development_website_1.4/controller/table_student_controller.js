import studenttableModel from "../model/table_student_model.js";

const studenttableController = {
    
    // Retrieving student data function and checking the data wheter it's array or not.
    async show_student(req,res){
        const result = await studenttableModel.fetch_student();
        Array.isArray(result) === false ? res.json({error : result}).status(400) : res.json({data:result}).status(200); 
    }

}

export default studenttableController;
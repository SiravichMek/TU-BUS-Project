import reportModel from "../model/report_model.js";

const reportController = {
    
    // Retrieving report data function and checking the data wheter it's array or not.
    async show_report(req,res){
        const result = await reportModel.fetch_report();
        Array.isArray(result) === false ? res.json({error : result}).status(400) : res.json({data:result}).status(200); 
    }

}

export default reportController;
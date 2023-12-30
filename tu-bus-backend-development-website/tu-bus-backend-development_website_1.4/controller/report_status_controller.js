import reportstatusModel from "../model/report_status_model.js";

const reportstatusController = {
    
    // 
    async resolved_report(req,res){
        const {id} = req.params;
        const update_result = await reportstatusModel.update_resolved(id);
        Array.isArray(update_result) === false ? res.json({error : update_result}).status(400) : res.json({data:update_result}).status(200); 
    } ,

    async rejected_report(req,res){
        const {id} = req.params;
        const update_result = await reportstatusModel.update_rejected(id);
        Array.isArray(update_result) === false ? res.json({error : update_result}).status(400) : res.json({data:update_result}).status(200); 
    }

}

export default reportstatusController;
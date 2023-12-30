import drivertableModel from "../model/table_driver_model.js"

const drivertableController = {
    
    // Retrieving driver data function and checking the data wheter it's array or not.
    async show_driver(req,res){
        const result = await drivertableModel.fetch_driver();
        Array.isArray(result) === false ? res.json({error : result}).status(400) : res.json({data:result}).status(200); 
    }

}

export default drivertableController;
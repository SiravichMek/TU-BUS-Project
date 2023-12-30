import supabase from "../Utils/supabase.js";

const reportstatusModel = {
    // UPDATE
    async update_resolved(id) { 
        var { data, error } = await supabase.from("reports")
        .update({status:'resolved'}).eq('id',id);
        if (error) {
            const err_message = error.message; 
            console.error('Error updating status:', err_message);
            return err_message;
          }
        else{
            let { data, error } = await supabase.from("reports").select('*').eq("id",id);
            return data;
        }
    } ,

    async update_rejected(id) { 
        var { data, error } = await supabase.from("reports")
        .update({status:'rejected'}).eq('id',id);
        if (error) {
            const err_message = error.message; 
            console.error('Error updating status:', err_message);
            return err_message;
          }
        else{
            let { data, error } = await supabase.from("reports").select('*').eq("id",id);
            return data;
        }
    }
}

export default reportstatusModel;
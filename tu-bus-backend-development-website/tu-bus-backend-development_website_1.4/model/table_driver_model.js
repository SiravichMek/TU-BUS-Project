import supabase from "../Utils/supabase.js";

const drivertableModel = {
    
    async fetch_driver() {
        var { data, error } = await supabase.from("drivers").select('*');
        if (error) {
            const err_message = error.message;
            console.error('Error retrieving drivers:', err_message);
            return err_message;
        }
        else{
            console.log(data);
            return data;
        }
    }
}

export default drivertableModel;
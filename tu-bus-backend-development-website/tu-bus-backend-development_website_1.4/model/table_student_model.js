import supabase from "../Utils/supabase.js";

const studenttableModel = {

    async fetch_student() {
        var { data, error } = await supabase.from("students").select('*');
        if (error) {
            const err_message = error.message;
            console.error('Error retrieving students:', err_message);
            return err_message;
          }
        else{
            console.log(data);
            return data;
        }
    }
}

export default studenttableModel;
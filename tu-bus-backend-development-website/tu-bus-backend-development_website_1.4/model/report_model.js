import supabase from "../Utils/supabase.js";

const reportModel = {
    // FETCH
    async fetch_report() { 
        var { data, error } = await supabase.from("reports")
        .select('parents(parent_name_eng) , students(student_name_eng) , drivers(driver_name_eng) , report_type , report_message , status , data_date');
        if (error) {
            const err_message = error.message; 
            console.error('Error retrieving parent ID:', err_message);
            return err_message;
          }
        else{
            return data;
        }
    }
}

export default reportModel;
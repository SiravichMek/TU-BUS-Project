import supabase from "../Utils/supabase.js";

const studentinsertModel = {
    
    // FETCH
    async fetch_student_id() { //fetch only student id
        var { data, error } = await supabase.from("students").select('id');
        if (error) {
            const err_message = error.message;
            console.error('Error retrieving student ID:', err_message);
            return err_message;
          }
        else{
            return data;
        }
    }  ,

    async fetch_driver_bus_no() {
        var { data, error } = await supabase.from("drivers").select('bus_no');
        if (error) {
            const err_message = error.message;
            console.error('Error retrieving drivers:', err_message);
            return err_message;
          }
        else{
            return data;
        }
    }  ,

    // INSERT

    async insert_student(name,surname,id,grade,bus_no,address,date) {
        let { data,error } = await supabase.from('students').insert([{student_name_eng : name,
            student_surname_eng:surname, id:id, grade:grade ,bus_no: bus_no, address : address, data_date:date }]);
        if (error) {
            const err_message = error.message;
            console.error('Error creating student:', err_message);
            return err_message;
          }
        else{
            let { data, error } = await supabase.from("students").select('*').eq("id",id);
            console.log(`create student complete!!`);
            return data;
        }
    }  
}

export default studentinsertModel;
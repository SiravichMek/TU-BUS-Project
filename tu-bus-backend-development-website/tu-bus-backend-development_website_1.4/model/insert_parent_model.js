import supabase from "../Utils/supabase.js";

const parentinsertModel = {
    
    // FETCH
    async fetch_parent() { //fetch only parent id
        var { data, error } = await supabase.from("parents").select('id');
        if (error) {
            const err_message = error.message;
            console.error('Error retrieving parent ID:', err_message);
            return err_message;
          }
        else{
            return data;
        }
    }  ,

    // INSERT
    async insert_parent(name_parent,surname_parent,id_parent,line_id,parent_tel,date) {
        let { data,error } = await supabase.from('parents').insert([{parent_name_eng : name_parent,
            parent_surname_eng:surname_parent, id: id_parent, line_id:line_id, parent_tel:parent_tel,data_date:date }]);
        if (error) {
            const err_message = error.message;
            console.error('Error creating parent:', err_message);
            return err_message;
          }
        else{
            let { data, error } = await supabase.from("parents").select('*').eq("id",id_parent);
            console.log(`create parent complete!!`); 
            return data;
        }
    }  ,


    // MODIFY
    /*async modify_parent_id(deleted_id) {
        let { data,error } = await supabase.from('parents').select('*').gt('id',deleted_id);
        var Arr_parents = data;
        
        if (error) {
            const err_message = error.message;
            console.error('Error finding parents who has greater ID:', err_message);
            return err_message;
          }
        else{
            for(let i=1; i<=Arr_parents.length; i++){
                let{ data,error } = await supabase.from('students').update({'parent_id':deleted_id+i-1}).eq('parent_id',deleted_id+i);
            }
            
            console.log(`Modify the parent ID !!`);
        }
    } ,*/

    // LINK FOREIGN KEY
    async link_student_parent(parent_id,Arr_student_id) {
        const Arr_length = Arr_student_id.length;
        for(let i=0; i<Arr_length; i++){
            const student_id = Arr_student_id.pop();
            console.log(student_id);
            let { data,error } = await supabase.from('parent_student').insert({parent_id: parent_id,student_id: student_id });
            if (error) {
                const err_message = error.message;
                console.error('Error linking data:', err_message);
                return err_message;
            }
            else{ 
                console.log(`Link the parent id ${parent_id} with the student id ${student_id}`);
            }
        } 
    }
}

export default parentinsertModel;
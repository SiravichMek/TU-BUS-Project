import supabase from "../Utils/supabase.js";

// FETCH
async function fetch_student() {
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

async function fetch_parent() { //fetch only parent id
    var { data, error } = await supabase.from("parents").select('id');
    if (error) {
        const err_message = error.message;
        console.error('Error retrieving parent ID:', err_message);
        return err_message;
      }
    else{
        return data;
    }
}

async function fetch_specific_parent(id) { //specific id
    var { data, error } = await supabase.from("parents").select('*').eq("id",id);
    if (error) {
        const err_message = error.message;
        console.error('Error retrieving parent:', err_message);
        return err_message;
      }
    else{
        console.log(data);
        return data;
    }
}
//
async function fetch_driver() {
    var { data, error } = await supabase.from("drivers").select('*');
    if (error) {
        const err_message = error.message;
        console.error('Error retrieving drivers:', err_message);
        return err_message;
      }
    else{
        //console.log(data);
        return data;
    }
}

async function fetch_driver_bus_no() {
    var { data, error } = await supabase.from("drivers").select('bus_no');
    if (error) {
        const err_message = error.message;
        console.error('Error retrieving drivers:', err_message);
        return err_message;
      }
    else{
        return data;
    }
}

// INSERT
async function insert_student(name,surname,id,grade,bus_no,address,id_parent,date) {
    let { data,error } = await supabase.from('students').insert([{student_name_eng : name,
        student_surname_eng:surname, id:id, grade:grade ,bus_no: bus_no, address : address, parent_id: id_parent, data_date:date }]);
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

async function insert_parent(name_parent,surname_parent,id_parent,line_id,parent_tel,date) {
    let { data,error } = await supabase.from('parents').insert([{parent_name_eng : name_parent,
        parent_surname_eng:surname_parent, id: id_parent, line_id:line_id, parent_tel:parent_tel,data_date:date }]);
    if (error) {
        const err_message = error.message;
        console.error('Error creating parent:', err_message);
        return err_message;
      }
    else{
        let { data, error } = await supabase.from("students").select('*').eq("id",id_parent);
        console.log(`create parent complete!!`);
        return data;
    }
}

async function insert_driver(name,surname,bus_no,line_id,car_license,tel,date) {
    let { data,error } = await supabase.from('drivers').insert([{driver_name_eng : name,
        driver_surname_eng:surname, bus_no: bus_no, line_id:line_id, car_license:car_license , driver_tel:tel ,data_date:date}]);
    if (error) {
        const err_message = error.message;
        console.error('Error creating driver:', err_message);
        return err_message;
      }
    else{
        let { data, error } = await supabase.from("drivers").select('*').eq("bus_no",bus_no);
        console.log(`create driver complete!!`);
        return data;
    }
}

//MODIFY
async function modify_parent_id(deleted_id) {
    let { data,error } = await supabase.from('parents').select('*').gt('id',deleted_id);
    var Arr_parents = data;
    
    if (error) {
        const err_message = error.message;
        console.error('Error finding parents who has greater ID:', err_message);
        return err_message;
      }
    else{
        for(let i=1; i<=Arr_parents.length; i++){
            let{ data,error } = await supabase.from('parents').update({'id':deleted_id+i-1}).eq('id',deleted_id+i);
        }
        
        console.log(`Modify the parent ID !!`);
    }
}

async function modify_bus_no(deleted_no) {
    let { data,error } = await supabase.from('drivers').select('*').gt('bus_no',deleted_no);
    var Arr_drivers = data;
    
    if (error) {
        const err_message = error.message;
        console.error('Error finding drivers who has greater ID:', err_message);
        return err_message;
      }
    else{
        for(let i=1; i<=Arr_drivers.length; i++){
            let{ data,error } = await supabase.from('parents').update({'bus_no':deleted_no+i-1}).eq('bus_no',deleted_no+i);
        }
        
        console.log(`Modify the Bus No. !!`);
    }
}

// DELETE
async function delete_parent(id) {
    let { data,error } = await supabase.from('parents').delete().eq('id',id);
    if (error) {
        const err_message = error.message;
        console.error('Error deleting parent:', err_message);
        return err_message;
      }
    else{ 
        console.log(`Delete the parent id ${id} !!`);
        modify_parent_id(id);
    }
}

async function delete_driver(no) {
    let { data,error } = await supabase.from('drivers').delete().eq('bus_no',no);
    if (error) {
        const err_message = error.message;
        console.error('Error deleting driver:', err_message);
        return err_message;
      }
    else{ 
        console.log(`Delete the bus No. ${no} !!`);
        modify_bus_no(no);
    }
}

export {fetch_student,fetch_parent,fetch_specific_parent,fetch_driver,fetch_driver_bus_no,
    insert_student,insert_parent,insert_driver,delete_parent};
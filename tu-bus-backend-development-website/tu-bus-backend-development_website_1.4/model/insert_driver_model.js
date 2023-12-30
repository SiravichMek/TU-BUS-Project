import supabase from "../Utils/supabase.js";

const driverinsertModel = {
    
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
    
    async insert_driver(name,surname,bus_no,line_id,car_license,tel,date) {
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
}

export default driverinsertModel;
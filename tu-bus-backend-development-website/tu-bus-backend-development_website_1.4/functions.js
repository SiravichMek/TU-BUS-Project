
import supabase from "./Utils/supabase.js";
import "dotenv/config";

 async function testDeploy(){
    app.use( async (req, res) => {
        const {data, error} = await supabase
            .from('Student')
            .select('id')
        res.send(data);
    });
    
    app.listen(3000, () => {
        console.log(`> Ready on http://localhost:3000`);
    });
    }
    //testDeploy()
    
    
     async function testCall() {
      
    let { data, error } = await supabase.from("students").select("bus_no"); 
    /*for(let x in data){
      console.log(Object.values(data[x])[0]);
    }*/
    if (!error) { return console.log(data.map(obj => obj.bus_no));}
      else  console.log(error);
    }
    //testCall();


    /*async function testCall(Arr,arr) {
      let array=[',Name_Surname',',id',',Driver_ID'];
      for(let i=0;i<=Arr.length;i++){
        if(Arr[i]==false){array[i]=""}
      }
      let x= `${array[0]}${array[1]}${array[2]},Grade`;
      x=x.slice(1);
      
      let array2=['1','2','3'];let j=1;
      for(let i=0;i<=array2.length;i++){
        if(arr[i]==false){
          array2.splice(array2.indexOf((j).toString()),1);
        }
        j++;
      }
      
      let { data, error } = await supabase.from("Student").select(x).in('Grade',array2);
      if (!error) {console.log(data); return data;}
      else console.log(error);
    }*/
    //testCall([true,true,true],[true,false,true])

     
    async function testInsert(id,name) { //เพิ่มrowใหม่
        const { data, error } = await supabase
        .from('Student')
        .insert([
        { id: id ,Name_Surname:name},
        ])
    }
      //testInsert(33,"uuu");
    
      
       async function testUpdate(id,name) { //เปลี่ยนข้อมูลในdata
        const { error } = await supabase
      .from('Student')
      .update({ Name_Surname: name })
      .eq('id', id)
    }
    //testUpdate(87,'poop');

    
    async function testDelete(id) {
        const { data, error } = await supabase
        .from('student')
        .delete()
        .eq('id',id)
    }
    //testDelete(333)

    async function insertOrder(studentId, parentId) {
      const { data, error } = await supabase.from('Student').insert([
        { id :studentId ,Driver_ID: parentId },
      ]);
      if (error) {
        console.error('Error inserting order:', error);
        return;
      }
      console.log('Order inserted successfully:', data);
    }
    //insertOrder(9, 1);

    async function fetch_report() { 
      const { data, error } = await supabase.from("reports").select('id,students(student_name_eng)');
      if (error) {
          const err_message = error.message;
          console.error('Error retrieving parent ID:', err_message);
          return err_message;
        }
      else{
          return console.log(data);
      }
  }
  //fetch_report();
    

   // export  {testDeploy,testCall,testInsert,testUpdate,testDelete};
// Retrieving the session data
const get_session = async(req, res) => {
    
    try{
        const sessionData = await req.session;    
        res.json({input_data: sessionData });
    }
    catch(error){
        res.json({error: "Can't retrieving the data from session" });
    }
  
}

export default get_session;
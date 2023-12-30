import express from "express";
import drivertableController from "../controller/table_driver_controller.js";

const router_driver = express.Router()

router_driver.get('/', drivertableController.show_driver);

  /*app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
  
    const { data, error } = await supabase
      .from(tableName)
      .update({ name, email })
      .eq('id', id);
  
    if (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Error updating user');
    } else if (data.length === 0) {
      res.status(404).send('User not found');
    } else {
      res.json(data[0]);
    }
  });*/

  /*app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
  
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
  
    if (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Error deleting user');
    } else {
      res.sendStatus(204);
    }
  });*/


export default router_driver ; 

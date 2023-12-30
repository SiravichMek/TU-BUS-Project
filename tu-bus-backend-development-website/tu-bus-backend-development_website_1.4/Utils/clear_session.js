// Deleting session function
const clear_session = (req, res) => {req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({error : 'Error destroying session.'});
    } else {
      console.log('Session destroyed successfully.');
    }
  })};

export default clear_session;
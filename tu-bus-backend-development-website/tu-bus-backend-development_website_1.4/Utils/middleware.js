// Adding error 404
const unknown_endpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

// Adding session middleware  
import session from 'express-session';
const session_middleware = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  name: 'input-form',
  cookie: {
    maxAge: 10 * 60 * 1000, // 10 minutes in milliseconds
  },
})  

export {unknown_endpoint,session_middleware};
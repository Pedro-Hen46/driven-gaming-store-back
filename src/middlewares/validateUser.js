import db from '../dbStategy/mongo.js';

async function validateUser(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const session = await db.collection('sessions').findOne({ token });
  
  if (!session) {
    return res.status(401).send("Token inválido.");
  }

  res.locals.session = session;

  next();
}

export default validateUser;
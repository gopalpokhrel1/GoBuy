const jwt = require('jsonwebtoken');

exports.generate_jwt = async (data)=>{
  try{
    const jwt_secret = process.env.JWT_SECRET;
    const token = jwt.sign({id:data.id, email:data.email}, jwt_secret, {expiresIn:'2h'});
    return(token);
  }
  catch(error){
    res.status(500);
  }
}
require("dotenv").config();
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.saltRounds);

create = async function(password){


  // generate a random (saltRounds) char string (salt);
  const salt = await bcrypt.genSalt(saltRounds);

  // hash the password, this can not be reversed
  const hashpassword = await bcrypt.hash(password, salt);
  return hashpassword;

}

verify = async function(dbpass,password){ 
  // use bcrypt to hash the password and compared it to our stored hash
  return await bcrypt.compare(password, dbpass);
  
}

module.exports={
    create,
    verify
}
const handlerSignin = (pg , bcrypt ) => (req , res ) =>{
  const {email , password} = req.body;
  if(!email || !password)
  {
    return res.status(400).json('incorrect form submission')
  }
  pg.select('email','hash').from('login')
    .where('email' , '=',email)
    .then(data => {
      const isValid = bcrypt.compareSync(password,data[0].hash)
      if(isValid) {
        return pg.select('*').from('users').where('email','=',email)
        .then(user => {
          res.json(user[0])
        })
        .catch(err => res.status(400).json('Not found'))
      }
      else {
        res.status(400).json('Wrong Credentials')
      }
    })
    .catch(err => res.status(400).json('Wrong Credentials'))
}


module.exports = {
  handlerSignin:handlerSignin
};

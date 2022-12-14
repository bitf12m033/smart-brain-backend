const handlerRegister = (req , res , pg , bcrypt ) => {
  const {name , email , password} = req.body;

  if(!email || !name || !password)
  {
    return res.status(400).json('incorrect form submission')
  }
  const hash = bcrypt.hashSync(password);
  pg.transaction(trx => {
    trx.insert({
      hash: hash,
      email:email
    })
    .into('login')
    .returning('email')
    .then(loginemail => {

      return trx('users')
          .returning('*')
          .insert({
            name:name,
            email:loginemail[0].email,
            joined: new Date()
          })
          .then( user => {
            res.json(user[0])
          })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('Unable to register'))
}


module.exports = {
  handlerRegister:handlerRegister
};

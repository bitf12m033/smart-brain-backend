const handlerProfile = (req , res , pg) => {
  const {id} = req.params;

  pg.select('*').from('users').where('id', id).then(user =>{
    console.log(user);
    if(user.length)
      res.json(user[0]);
    else
      res.status(400).json('Not found')
  })
  .catch(err =>res.status(400).json('Error getting user'))

}

module.exports = {
  handlerProfile:handlerProfile
}

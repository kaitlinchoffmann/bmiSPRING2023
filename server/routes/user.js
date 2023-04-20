const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.get('/test', async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.send(users); 
  } catch(err) {
    res.status(401).send({message: err})
  }
})

router.post('/login', async (req, res) => {
  try {
    console.log(req.body)
    let user = User.login(req.body); // {userName: "cathy123", password: "icecream"}
    res.send({...user, password: undefined})
  } catch(err) {
    res.status(401).send({message: err}) // "Username not found"
  }
})

module.exports = router;
const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await User.getAllUsers();
    console.log(users)
    res.send(users); 
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

router.post('/login', async (req, res) => {
  try {
    let user = await User.login(req.body); // {userName: "cathy123", password: "icecream"}
    res.send({...user, password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message}) // "Username not found"
  }
})

router.post('/register', async(req, res) => {
  try {
    let user = await User.register(req.body);
    res.send({...user, password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message}) // "Username not found"
  }
})

module.exports = router;
const User = require('../models/user')
let Helpers = require('../helpers/helpers')
let methods = {}
const jwt = require('jsonwebtoken')
const bCrypt = require('bcrypt')
const saltRounds = 10

methods.signUp = (req, res) => {
  let pwd = req.body.password
  let hash = bCrypt.hashSync(pwd, saltRounds)
  let newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: hash,
    email: req.body.email,
    role: req.body.role
  })

  newUser.save((err, record) => {
    if (err) res.json({err})
    console.log('Signup success', record);
    res.send(record)
  })
}

methods.signIn = (req, res) => {
  let pwd = req.body.password
  User.findOne({
    "username": req.body.username
  }, (err, record) => {
    if (bCrypt.compareSync(pwd, record.password)) {
      let token = jwt.sign({
        id: record._id,
        name: record.name,
        username: record.username,
        email: record.email,
        role: record.role
      }, process.env.SECRET_KEY, {expiresIn: '1d'})

      res.json({
        message: 'SignIn is success',
        id: record._id,
        name: record.name,
        username: record.username,
        role: record.role,
        token
      })
    } else {
      res.send('Password dont match')
    }
  })
}

methods.getAllUser = (req, res) => {
  if (req.body.role === "admin") {
    User.find({}, (err, records) => {
      if (err) res.json({err})
      console.log('get all user success');
      console.log(records);
      res.send(records)
    })
  } else {
    res.send('You are not authorized')
  }
}

methods.getDetailUser = (req, res) => {
  if (req.body.role === "admin" || req.body.role === "user") {
    User.findById(req.params.id, (err, record) => {
      if (err) res.json({err})
      console.log('get detail user success');
      console.log(record);
      res.send(record)
    })
  } else {
    res.send('You are not authorized')
  }
}

methods.editUser = (req, res) => {
  let decoded = Helpers.checkToken(req.headers.token)
  let pwd = req.body.password
  let hash = bCrypt.hashSync(pwd, saltRounds)
  User.findById(req.params.id, (err, record) => {
    if (err) res.json({err})
    if (record._id == decoded.id) {
      console.log('get detail user success');
      console.log(record);
      User.updateOne({
        "_id": record._id
      }, {
        $set: {
          "name": req.body.name || record.name,
          "username": req.body.username || record.username,
          "password": hash || record.password,
          "email": req.body.email || record.email
        }
      })
      .exec((err, result) => {
        console.log('Edit user success');
        res.send(record)
      })
    } else {
      res.send('You are not authorized')
    }
  })
}

methods.deleteUser = (req, res) => {
  if (req.body.role === "admin") {
    User.findById(req.params.id, (err, record) => {
      if (err) res.json({err})
      console.log('get detail user success');
      console.log(record);
      User.deleteOne({
        "_id": record._id
      }, (err, result) => {
        console.log('Delete user success');
        res.send(record)
      })
    })
  } else {
    res.send('You are not authorized')
  }
}

module.exports = methods
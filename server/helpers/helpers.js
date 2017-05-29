const jwt = require('jsonwebtoken')
let methods = {}

methods.checkToken = (token) => {
  try {
    let decoded = jwt.verify(token, process.env.SECRET_KEY)
    return decoded
  } catch(error){
    return ({error})
  }
}

methods.checkRole = (req, res, next) => {
  let token = req.headers.token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (decoded) {
      req.body.role = decoded.role
      next()
    } else {
      res.json({err})
    }
  })
}

module.exports = methods
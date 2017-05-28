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

module.exports = methods
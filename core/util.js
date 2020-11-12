const jwt = require('jsonwebtoken')
const config= require('../config/config')
//生成yonghutoken
const generateToken = function(uid,scope){
  const secretKey = config.security.secretKey
  const expiresIn = config.security.expiresIn
  const token = jwt.sign({
    uid,scope
  },secretKey,{
    expiresIn
  })
  return token
}

module.exports = {
  generateToken
}
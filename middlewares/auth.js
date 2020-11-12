const jwt = require('jsonwebtoken')
const config= require('../config/config')
class Auth {
  constructor(level){
    this.level = level||1
    Auth.USER = 8
    Auth.ADMIN = 16
  }
  get m(){
    return async (ctx,next)=>{
      const userToken = ctx.headers.token
      if(!userToken){
        throw new global.errs.Forbbiden()
      }
      try {
        var code = jwt.verify(userToken,config.security.secretKey)
      } catch (error) {
        if(error.name == 'TokenExpiredError'){
          throw new global.errs.Forbbiden('令牌过期')
        }
        throw new global.errs.Forbbiden('令牌不合法')
      }

      if(code.scope<this.level){
        throw new global.errs.Forbbiden('权限不足')
      }
      ctx.auth = {
        uid:code.uid,
        scope:code.scope,
      }
      await next()
    }
  }
}

module.exports = {
  Auth
}
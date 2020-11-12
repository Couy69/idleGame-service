//定义全局异常的处理

class httpException extends Error {
  constructor(msg = "服务器异常", errorCode = 10000, code = 400) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.msg = msg
  }
}
class ParameterException extends httpException {
  constructor(msg, errorCode) {
    super()
    this.code = 400
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || '10000'
  }
}

class NotFound extends httpException {
  constructor(msg, errorCode) {
    super()
    this.code = 404
    this.msg = msg || '未找到匹配项'
    this.errorCode = errorCode || '10000'
  }
}

class AuthFailed extends httpException {
  constructor(msg, errorCode) {
    super()
    this.code = 401
    this.msg = msg || '授权失败'
    this.errorCode = errorCode || '10004'
  }
}

class Forbbiden extends httpException {
  constructor(msg, errorCode) {
    super()
    this.code = 403
    this.msg = msg || '权限不足禁止访问'
    this.errorCode = errorCode || '10006'
  }
}

class Success extends httpException {
  constructor(msg,content) {
    super()
    this.code = 200
    this.content = content
    this.msg = msg || 'ok'
    this.errorCode = 20000 || '0'
  }
}

module.exports = {
  httpException,
  ParameterException,
  Success,
  NotFound,
  AuthFailed,
  Forbbiden
}
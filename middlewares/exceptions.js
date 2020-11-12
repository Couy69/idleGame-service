// 全局捕获错误
const catchError =async (ctx,next) =>{
  try {
    await next()
  } catch (error) {
    // throw error
    if(error instanceof global.errs.httpException){
      ctx.body = {
        error_code:error.errorCode,
        msg:error.msg,
        content:error.content,
        request:`${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    }
    else{
      ctx.body = {
        error_code:999,
        msg:'服务器内部错误',
        request:`${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
    
  }
}

module.exports = catchError
//初始化程序

const requireDirectoty = require('require-directory')
const Router = require('koa-router')
const Static = require('koa-static')
const path = require('path') 

class InitManager{
  static initCore(app){
    InitManager.app = app
    InitManager.initInitRouter()
    InitManager.loadHttpException()
    InitManager.loadKoaStatic()
  }
  static initInitRouter(){
    const modules = requireDirectoty(module,'../app/api',{visit:(obj)=>{
      if(obj instanceof Router){
        InitManager.app.use(obj.routes())
      }
    }})
  }

  static loadHttpException(){
    const errors = require('./http-exception')
    global.errs = errors
  }

  static loadKoaStatic(){
    const staticPath = '../static'
    InitManager.app.use(Static(
      path.join( __dirname,  staticPath)
    ))
  }
}

module.exports  = InitManager
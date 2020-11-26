const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/suggest'
})
const {
  Suggest
} = require('../../models/suggest')

router.post('/add', async (ctx) => {
  try {
    var body = ctx.request.body
    if(body.name.length>20||body.suggest.length>300){
      throw new global.errs.ParameterException('你输入的太长了，删一点？')
    }
    if(body.name=''||body.suggest==''){
      throw new global.errs.ParameterException('提交的时候请填写完整哦')
    }
    const suggest = {
      name: body.name,
      suggest:body.suggest
    }
    var r = await Suggest.create(suggest)
    throw new global.errs.Success('操作成功')
  } catch (error) {
    console.log(error)
    throw error
  }

})

module.exports = router
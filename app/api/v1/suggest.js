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
    if(body.name==''||body.suggest==''){
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

router.post('/get', async (ctx) => {
  try {
    var body = ctx.request.body
    const r = await Suggest.findAndCountAll({
      where: {
        name: {
          [Op.like]: '%' + body.name || '' + '%'
        },
      },
      order:[['created_at', 'DESC']],
      limit: parseInt(body.size || 10),
      offset: parseInt((body.size * (body.page-1)) || 0)
    })
    throw new global.errs.Success('操作成功', r)
  } catch (error) {
    console.log(error)
    throw error
  }
})

router.post('/getReviewed', async (ctx) => {
  try {
    var body = ctx.request.body
    const r = await Suggest.findAndCountAll({
      where: {
        standby2: '1',
      },
      order:[['created_at', 'DESC']],
      limit: parseInt(body.size || 10),
      offset: parseInt((body.size * (body.page-1)) || 0)
    })
    throw new global.errs.Success('操作成功', r)
  } catch (error) {
    console.log(error)
    throw error
  }
})

router.post('/reply', async (ctx) => {
  try {
    var body = ctx.request.body
    const r = await Suggest.findByPk(body.id);
    r.standby1 = body.reply
    r.standby2 = 1
    await r.save()
    throw new global.errs.Success('操作成功')
  } catch (error) {
    console.log(error)
    throw error
  }
})

router.post('/showOrHide', async (ctx) => {
  try {
    var body = ctx.request.body
    const r = await Suggest.findByPk(body.id);
    r.standby2 = body.showOrHide
    await r.save()
    throw new global.errs.Success('操作成功')
  } catch (error) {
    console.log(error)
    throw error
  }
})

module.exports = router
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/vip'
})
const {
  Vip
} = require('../../models/vip')

router.post('/add', async (ctx) => {
  try {
    var body = ctx.request.body
    const vip = {
      lv: body.lv,
      version:body.version
    }
    var r = await Vip.create(vip)
    throw new global.errs.Success('操作成功')
  } catch (error) {
    console.log(error)
    throw error
  }

})

router.post('/get', async (ctx) => {
  try {
    var body = ctx.request.body
    const r = await Vip.findAndCountAll({
      where: {
        lv: {
          [Op.like]: '%' + body.lv || '' + '%'
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
module.exports = router
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/userInfo'
})
const {
  UserInfo
} = require('../../models/userInfo')

router.post('/add', async (ctx) => {
  try {
    var body = ctx.request.body
    const userInfo = {
      name: body.name,
      endlessLv: body.endlessLv,
      password: body.password,
      playtime: body.playtime,
      saveData:body.saveData
    }
    var r = await UserInfo.create(userInfo)
    throw new global.errs.Success('操作成功')
  } catch (error) {
    console.log(error)
    throw error
  }

})
router.get('/get', async (ctx) => {
  try {
    var body = ctx.request.body
    const r = await UserInfo.findAndCountAll({
      where: {
        name: {
          [Op.like]: '%' + body.name || '' + '%'
        },
      },
      limit: parseInt(body.size || 10),
      offset: parseInt((body.size * (body.page - 1)) || 0)
    })
    throw new global.errs.Success('操作成功', r)
  } catch (error) {
    console.log(error)
    throw error
  }
})

router.put('/update', async (ctx) => {
  try {
    var body = ctx.request.body
    await UserInfo.update(
      {
        name: body.name,
        number: body.number,
        password: body.password,
        file: body.file,
      }, {
        'where': {
          'id': body.id
        }
      }
    );
    throw new global.errs.Success('操作成功')
  } catch (error) {
    console.log(error)
    throw error
  }
})

router.delete('/delete', async (ctx) => {
  try {
    var body = ctx.request.body
    await UserInfo.destroy(
       {
        'where': {
          'id': body.id
        }
      }
    );
    throw new global.errs.Success('删除成功')
  } catch (error) {
    console.log(error)
    throw error
  }
})

module.exports = router
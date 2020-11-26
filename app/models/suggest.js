//创建user用户表
const bcrypt = require('bcryptjs')
const {
  sequelize
} = require('../../core/db')
const {
  Sequelize,
  Model
} = require('sequelize')

class Suggest extends Model {
}

Suggest.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true, //主键
    autoIncrement: true //id是否自增
  },
  name: Sequelize.TEXT,
  suggest: Sequelize.TEXT,
  standby1:Sequelize.STRING,
  standby2:Sequelize.STRING,
  standby3:Sequelize.STRING,
}, {
  sequelize,
  tableName: 'suggest'
})

module.exports = {
  Suggest
}
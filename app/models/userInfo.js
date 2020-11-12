//创建user用户表
const bcrypt = require('bcryptjs')
const {
  sequelize
} = require('../../core/db')
const {
  Sequelize,
  Model
} = require('sequelize')

class UserInfo extends Model {
}

UserInfo.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true, //主键
    autoIncrement: true //id是否自增
  },
  name: Sequelize.STRING,
  endlessLv: Sequelize.STRING,
  playtime: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10) //加密
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password',psw)
    }
  },
  saveData:Sequelize.TEXT,
  standby1:Sequelize.STRING,
  standby2:Sequelize.STRING,
  standby3:Sequelize.STRING,
}, {
  sequelize,
  tableName: 'userInfo'
})

module.exports = {
  UserInfo
}
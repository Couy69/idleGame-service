//数据库连接

const Sequelize = require('sequelize')
const {
  dbName,
  username,
  password,
  port,
  host
} = require('../config/config').database

const sequelize = new Sequelize(dbName,username,password,{
  dialect:'mysql',
  host,
  port,
  logging:true,
  timezone:'+08:00',
  define:{
    timestamps:true,  //创建时间与更改时间
    paranoid: true,  //删除时间
    createdAt:'created_at',
    updatedAt:'updated_at',
    deletedAt:'deleted_at',
    underscored:true  //驼峰转为下划线
  }
})

sequelize.sync({
  force:false  //每次运行是否删除现有表，然后新增
})
module.exports = {
  sequelize
}
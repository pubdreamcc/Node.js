const mongoose = require('mongoose')
// 得到mongoose的 架构 Schema
const Schema = mongoose.Schema
// 连接mongodb
mongoose.connect('mongodb://localhost:27017/test', (err, ret) => {
  if (err) {
    console.log('连接失败' + err)
  } else {
    console.log('连接成功')
  }
})
// 创造一个架构，实质上就是设计文档结构
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
})
// 把架构发布为模型，利用mongoose.model()方法，
/**
 * mongoose.model()方法接收两个参数
 * 1. 大写开头的单数单词，mongoose会自动转换为小写复数单词，表示一个集合的名称
 * 2. 架构Schema
 * 返回值：模型构造函数
 */
const User = mongoose.model('User', userSchema)
// 利用User模型构造函数对user集合中的数据进行一系列的操作（CRUD）

// // 新增一条数据（文档）
// const user = new User({
//   name: 'wangzhan',
//   password: '1224',
//   email: '4343@QQ.CON'
// })
// // 将这条数据持久化保存
// user.save((err, ret) => {
//   if (err) {
//     console.log('保存失败')
//   } else {
//     console.log('保存成功')
//     // ret 表示刚刚新增的那一条数据
//     console.log(ret)
//   }
// })


// // 查询数据
User.findById('5ceff660e8d0fd25b4eccc38', (err, res) => {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(res)
  }
})


// // 删除数据
// User.remove({name: 'wangzhan'}, (err, ret) => {
//   if (err) {
//     console.log('删除失败' + err)
//   } else {
//     console.log('删除成功')
//     console.log(ret)
//   }
// })


// // 更新数据
// User.findByIdAndUpdate('5ceff660e8d0fd25b4eccc38', {name: 'pubdreamcc'}, (err, res) => {
//   if (err) {
//     console.log('更新失败')
//   } else {
//     console.log('更新成功')
//     console.log(res)
//   }
// })
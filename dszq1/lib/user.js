var mongoose = require('mongoose')
var UserModel = require('./model').UserModel
exports.save = async function(user){
  var user = new UserModel({username:user.username,password:md5(user.password)})
  try{
  	console.log(user)
  	await user.save()
  }catch(e){
	console.log(e)
  }
}
exports.login = async function(user){
  try{
  	var ans = await UserModel.findOne({username:user.username,password:md5(user.password)})
    return ans != null
  }catch(e){
  	console.log(e)
  }
  return false
}
function md5(str){
    return require('crypto').createHash('md5').update(str).digest("hex")
}
exports.changeAvatar = async function(username,fields){
  try{
    // var ans = await UserModel.findOne({username:username})
    // console.log('before,',ans,fields)
    // ans.avatar = 'fields.avator'
    // console.log('after,',ans)
    // await ans.save()
    var ans = await UserModel.findOneAndUpdate({username:username},{avator:fields.avator},{new:true})
    // console.log('after again,',ans)
    return true
  }catch(e){
    console.log(e)
  }
  return false 
}
exports.getAvatar = async function(username){
  try{
    var ans = await UserModel.findOne({username:username})
    return ans.avator
  }catch(e){
    console.log(e)
  }
  return undefined
}
exports.getByName= async function(username){
  try{
    return  await UserModel.findOne({username:username})
  }catch(e){
    console.log(e)
  }
  return undefined
}
exports.get= async function(id){
  try{
    return  await UserModel.findOne({_id:id})
  }catch(e){
    console.log(e)
  }
  return undefined
}
exports.hasAvatar= async function(username){
  try{
    return  exports.getByName(username).avator.length > 0
  }catch(e){
    console.log(e)
  }
  return undefined
}
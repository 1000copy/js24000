var todo = require('./todoCRUD.js')
(async()=>{
  
  // var todo = new TodoCRUD(connectionString)
  await todo.delete({ _id: 1 })
  await todo.delete({ _id: 2 })
  await todo.delete({ _id: 3 })
  await todo.insert({_id:1,name:"reco9"})
  await todo.insertMany([{_id:2,name:"reco2"},{_id:3,name:"reco3"}])
  await todo.update({_id:1},"reco7")
  // await ListTodo(connectionString).catch(err => console.error(err));
  
  var r = await todo.list()
  console.log(r);
})()

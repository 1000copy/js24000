const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb://localhost:27017';
// insert 
var insertTodo = async function(connectionString,obj){
  const client = await MongoClient.connect(connectionString,
      { useNewUrlParser: true });

  const dbo = client.db('todos');
  try {
     var res = await dbo.collection('todo').insertMany(
      [obj]);
     console.log("Number of documents inserted: " + res.insertedCount);
  }
  finally {
      client.close();
  }
}
var insertManyTodo = async function(connectionString,objs){
  const client = await MongoClient.connect(connectionString,
      { useNewUrlParser: true });

  const dbo = client.db('todos');
  try {
     var res = await dbo.collection('todo').insertMany(
      objs);
     console.log("Number of documents inserted: " + res.insertedCount);
  }
  finally {
      client.close();
  }
}
var updateTodo = async function(connectionString,filter,newTodo){
  const client = await MongoClient.connect(connectionString,
      { useNewUrlParser: true });

  const dbo = client.db('todos');
  try {
     var res = await dbo.collection('todo').updateOne(filter,{"$set":{"name":newTodo}});
     console.log("Number of documents updated: ", res.matchedCount);
  }
  finally {
      client.close();
  }
}
var deleteTodo = async (obj) => {
    const client = await MongoClient.connect(connectionString,
        { useNewUrlParser: true });

    const dbo = client.db('todos');
    try {
      var myquery = obj;
      var r = await dbo.collection("todo").deleteMany(myquery)
      console.log(r.deletedCount,"document(s) deleted");
    }
    finally {
        client.close();
    }
}
var ListTodo = async (connectionString) => {
    const client = await MongoClient.connect(connectionString,
        { useNewUrlParser: true });

    const dbo = client.db('todos');
    try {
       var r = await dbo.collection("todo").find().toArray()
       return r;
    }
    finally {
        client.close();
    }
}
class TodoCRUD {
  constructor(connectionString){
    this.connectionString = connectionString
  }
  async list(){
    return await ListTodo(this.connectionString).catch(err => console.error(err));
  }
  async delete(obj){
    return await deleteTodo(obj).catch(err => console.error(err));  
  }
  async insert(obj){
    return await insertTodo(this.connectionString,obj).catch(err => console.error(err));
  }
  async insertMany(objs){
    return await insertManyTodo(this.connectionString,objs).catch(err => console.error(err));
  }
  async update(filter,newValue){
    return await updateTodo(this.connectionString,filter,newValue).catch(err => console.error(err));
  }
}
module.exports = exports = new TodoCRUD(connectionString)
// (async()=>{
  
//   var todo = new TodoCRUD(connectionString)
//   await todo.delete({ _id: 1 })
//   await todo.delete({ _id: 2 })
//   await todo.delete({ _id: 3 })
//   await todo.insert({_id:1,name:"reco9"})
//   await todo.insertMany([{_id:2,name:"reco2"},{_id:3,name:"reco3"}])
//   await todo.update({_id:1},"reco7")
//   // await ListTodo(connectionString).catch(err => console.error(err));
  
//   var r = await todo.list()
//   console.log(r);
// })()


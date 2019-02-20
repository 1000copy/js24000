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
var ListTodo = async () => {
    const client = await MongoClient.connect(connectionString,
        { useNewUrlParser: true });

    const dbo = client.db('todos');
    try {
       var r = await dbo.collection("todo").find().toArray()
       console.log(r);
    }
    finally {
        client.close();
    }
}
(async()=>{
  await deleteTodo({ _id: 1 }).catch(err => console.error(err));
  await insertTodo(connectionString,{_id:1,name:"reco9"}).catch(err => console.error(err));
  await insertManyTodo(connectionString,[{_id:2,name:"reco2"},{_id:3,name:"reco3"}]).catch(err => console.error(err));
  await updateTodo(connectionString,{_id:1},"reco7").catch(err => console.error(err));
  await ListTodo().catch(err => console.error(err));
})()

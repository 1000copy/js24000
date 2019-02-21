var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/todos";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  var dbo = db.db("todos");
  // var myobj = { id: 1, name: "reco" };
  // dbo.collection("todo").insertOne(myobj, function(err, res) {
  //   if (err) throw err;
  //   console.log("1 document inserted");
  //   db.close();
  // });
   var myobj = [
    { id: 1, name: 'reco'},
    { id: 2, name: 'rita'},
  ];
  dbo.collection("todo").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    dbo.collection("todo").find({}).toArray(function(err, result) {
	    if (err) throw err;
	    console.log(result);
	      var myquery = { id: 1 };
		  dbo.collection("todo").deleteMany(myquery, function(err, obj) {
		    if (err) throw err;
		    console.log("document deleted");
		    db.close();
		  });
	  });    
  });
})

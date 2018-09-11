var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root1234",
  database:"pph"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var date = '2018-09-11'
  var sql = `select hour(sysc_time) as pp,count(*) as pph from tenant_access_records where date(sysc_time) = '${date}' group by hour(sysc_time);`
  con.query(sql, function (err, result,fields) {
    if (err) throw err;
    console.log("Result: " ,fields);
    for (var i = 0; i < result.length; i++) {
    	console.log(result[i].pp,result[i].pph)
    }
  });
});

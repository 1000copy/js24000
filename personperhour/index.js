#!/usr/bin/env node
var mysql = require('mysql');
if (process.argv.length === 2){
	console.log("Usage : pph host database username password datetime")
	return 
}
var con = mysql.createConnection({
  host: process.argv[2] || "localhost",
  database:process.argv[3] ||"pph",
  user: process.argv[4] || "root",
  password: process.argv[5] || "root1234",
  
});
con.connect(function(err) {
  if (err) {console.log(err.message);return};
  console.log("Connected!");
  var date = process.argv[6] || '2018-09-11'
  var sql = `select hour(sysc_time) as pp,count(*) as pph from tenant_access_records where date(sysc_time) = '${date}' group by hour(sysc_time);`
  con.query(sql, function (err, result,fields) {
    if (err) {console.log(err);return};
    for (var i = 0; i < result.length; i++) {
    	console.log(result[i].pp,result[i].pph)
    }
    con.end()
  });
});

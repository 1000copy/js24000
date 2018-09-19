#!/usr/bin/env node
var mysql = require('mysql');
if (process.argv.length === 2){
	console.log("Usage  : node pivot host database username password begindate enddate")
  console.log("Example: node pivot localhost pph root root1234 2018-09-10 2018-09-13")
	return 
}
var con = mysql.createConnection({
  host: process.argv[2] || "localhost",
  database:process.argv[3] ||"pph",
  user: process.argv[4] || "root",
  password: process.argv[5] || "root1234",
  
});
var MONTHSTART = 1
var MONTHEND = 31
function getColumns(){
  var a = []
  for (var index = MONTHSTART; index <= MONTHEND; index++) {
    var column = `sum(case when day(sysc_time)=${index} then 1 else 0 end) as "${index}"`
    a.push(column)
  }
  return a.join(",\n")
}
function getBetweenMonth(b,e){
  // var str = `between '2018-9-1' and '2018-9-31' `
  var str = `between '${b}' and '${e}' `
  return str
}
function logRow(row){
  var a = []
  a.push(row['hourinterval'])
  for (var index = MONTHSTART; index <= MONTHEND; index++) {
    a.push(row[`${index}`])
  }
  console.log(a.join(","))
}
function logHead(){
  var a = []
  a.push('h')
  for (var index = MONTHSTART; index <= MONTHEND; index++) {
    a.push(index)
  }
  console.log(a.join(','))
}
con.connect(function(err) {
  if (err) {console.log(err.message);return};
  console.log("Connected!");
  var b = process.argv[6] || '2018-09-10'
  var e = process.argv[7] || '2018-09-13'
  MONTHSTART = new Date(b).getDate()
  MONTHEND = new Date(e).getDate()-1
  var columns = getColumns()
  var betweenMonth = getBetweenMonth(b,e)
  var sql =`
              select  
              hour(sysc_time) as hourinterval,
              ${columns}
              from tenant_access_records 
              where sysc_time ${betweenMonth}
              group by hour(sysc_time) 
              order by hour(sysc_time) 
            `
  console.log(sql)
  con.query(sql, function (err, result,fields) {
    if (err) {console.log(err);return};
    logHead()
    for (var i = 0; i < result.length; i++) {
      logRow(result[i])
    }
    con.end()
  });
});

## error 

MySQL 8.0 - Client does not support authentication protocol requested by server; consider upgrading MySQL client

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

## skip some fields

awk -F'","|^"|"$' '{printf("\"%s\"\n",$5)}' ~/Documents/tenant20180920.csv >~/Documents/single.csv
mv ~/Documents/single.csv ./

## import from csv

 load data local infile '~/github/js24000/single.csv' into table tenant_access_records
 fields terminated by ','
 enclosed by '"'
 lines terminated by '\n'
 IGNORE 1 LINES
 (sysc_time)

 find the answer here.

mysql -uroot --local-infile pph

It's because the server variable local_infile is set to FALSE|0. Refer from the document.

You can verify by executing:

SHOW VARIABLES LIKE 'local_infile';
If you have SUPER privilege you can enable it (without restarting server with a new configuration) by executing:

SET GLOBAL local_infile = 1;


	select  count(*) from tenant_access_records 
## test

	select  
	hour(sysc_time),
	sum(case when day(sysc_time)=1 then 1 else 0 end) as "1", 
	sum(case when day(sysc_time)=2 then 1 else 0 end) as "2",
	sum(case when day(sysc_time)=3 then 1 else 0 end) as "3",
	sum(case when day(sysc_time)=4 then 1 else 0 end) as "4",
	sum(case when day(sysc_time)=5 then 1 else 0 end) as "5",
	sum(case when day(sysc_time)=6 then 1 else 0 end) as "6"
	from tenant_access_records 
	where sysc_time >= "2018-9-1" and sysc_time < "2018-9-7"
	group by hour(sysc_time) 
	order by hour(sysc_time) 

 # command 

 Usage   : node pivot host database username password begindate enddate
 example : node pivot localhost pph root root1234 2018-09-10 2018-09-13

-------------读到这里，就可以得到你想要的每月按时间分组的报表。
# pivot 

	select  
	hour(sysc_time),
	sum(case when day(sysc_time)=11 then 1 else 0 end) as "11", 
	sum(case when day(sysc_time)=12 then 1 else 0 end) as "12"
	from tenant_access_records 
	where sysc_time between '2018-9-1' and '2018-9-31'
	group by hour(sysc_time) 
	order by hour(sysc_time) 


# 用法

1. 安装node.js ,在这里下载 https://nodejs.org/en/
2. 解包给你的zip文件
3. 进入此zip解压后的目录，执行命令

npm install -g
安装完成。
4. 执行命令pph ,用法是

Usage : pph host database username password datetime


host 数据库主机名
database 数据库名
username 数据库用户名
password 数据库用户密码
datetime 统计时间

即可看到结果，像是这样：

	$ pph localhost pph root root1234 2018-09-11
	Connected!
	9 2
	10 2
	12 1
	13 2

# person per hour in some day

## create table
	create database pph;
	use pph;
	create table tenant_access_records (personname varchar(20),sysc_time datetime);
	select count(*) as pph from tenant_access_records where date(sysc_time) = ? group by hour(sysc_time);

	select hour(sysc_time),count(*) as pph from tenant_access_records where date(sysc_time) = '2018-09-11' group by hour(sysc_time);

## sample data

insert into tenant_access_records values('recoreco','2018-09-11 09:23:29');
insert into tenant_access_records values('recorec','2018-09-11 09:25:29');
insert into tenant_access_records values('recore','2018-09-11 10:23:29');
insert into tenant_access_records values('recor','2018-09-11 10:23:29');
insert into tenant_access_records values('reco','2018-09-11 12:23:29');
insert into tenant_access_records values('rec','2018-09-11 13:23:29');
insert into tenant_access_records values('re','2018-09-11 13:23:29');
insert into tenant_access_records values('r','2018-09-12 15:23:29');
insert into tenant_access_records values('r','2018-09-12 5:23:29');
insert into tenant_access_records values('r','2018-09-1 5:23:29');
insert into tenant_access_records values('r','2018-09-2 5:23:29');
insert into tenant_access_records values('r','2018-09-3 5:23:29');

## result for 2018-09-11

	9	2
	10  2
	12  1
	13  2

## test Password

root1234

sudo /usr/local/mysql/support-files/mysql.server start
sudo /usr/local/mysql/support-files/mysql.server stop
sudo /usr/local/mysql/support-files/mysql.server restart

## How do I install command line MySQL client on mac?

mysqlsh --sql

ERROR! The server quit without updating PID file (/usr/local/mysql/data/july.local.pid).


For me I had to reinstall mysql

brew reinstall mysql
and then below To have launchd start mysql now and restart at login:

brew services start mysql

sudo -i How can I switch back normal mode from sudo mode in Linux and Mac OS X?
Type exit. This will logout the super user and go back to your account.
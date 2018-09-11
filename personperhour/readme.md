
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
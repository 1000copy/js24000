https://medium.com/@gnakan/getting-started-with-apache-hbase-31182755331

## 安装

执行命令：

	brew install hadoop

brew安装hadoop遇到了问题，初始是 install 时 linked 不成功，导致后边hadoop不能用


	Warning: hadoop 2.8.1 is already installed, it's just not linked.
	You can use `brew link hadoop` to link this version.

解决方法：

	sudo mkdir /usr/local/sbin
	sudo chown -R `whoami`:admin /usr/local/sbin
	brew link hadoop


## 调整配置：

	ls  /usr/local/Cellar/hadoop/
	3.1.0


	cd  /usr/local/Cellar/hadoop/3.1.0/libexec/etc/hadoop/

## 启动

cd  /usr/local/Cellar/hadoop/3.1.0/sbin
sh start-all.sh

## 错误处理

localhost: ssh: connect to host localhost port 22: Connection refused

The Apple Mac OS X operating system has SSH installed by default but the SSH daemon is not enabled. This means you can't login remotely or do remote copies until you enable it.To enable it

1.  go to 'System Preferences'. there is a 'Sharing' icon. Run that. 
2.  In the list that appears, check the 'Remote Login' option.

This starts the SSH daemon immediately and you can remotely login using your username. The 'Sharing' window shows at the bottom the name and IP address to use. You can also find this out using 'whoami' and 'ifconfig' from the Terminal application.

sudo chmod 777 /etc/ssh/sshd_config

Additionally can you check if "PasswordAuthentication" parameter in /etc/ssh/sshd_config is set to "yes" 

配置无密码登录：

	Proceed with the following steps:

	Generate new keygen.

		ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa

	Register key gen:

		cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
验证无密码登录，如下命令应该不会问你密码：
    ssh localhost 
重启 ： 
	
	sudo launchctl unload /System/Library/LaunchDaemons/ssh.plist
	sudo launchctl load -w /System/Library/LaunchDaemons/ssh.plist

## 错误处理

	resourcemanager is running as process 43771.  Stop it first.

	action：

	sh stop-all.sh


## 警告处理 ，暂时不管

 WARN util.NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable

## 验证安装

	$ jps
	49268 DataNode
	49596 ResourceManager
	49165 NameNode
	49405 SecondaryNameNode
	49695 NodeManager
	50559 Jps
## 安装hbase

	brew install hbase

	 ls  /usr/local/Cellar/hbase/
	1.2.6.1

	 cd  /usr/local/Cellar/hbase/1.2.6.1//libexec/conf/

编辑 hbase-site.xml,设置rootdir：

	 <property> 
		<name>hbase.rootdir</name> 
		<value>hdfs://localhost:9000/hbase</value> 
		</property>

cd  /usr/local/Cellar/hbase/1.2.6.1/bin
sh start-hbase.sh


## 验证

使用HBase shell来验证（启动起来，还是有点慢，需要耐心）：

    ./bin/hbase shell

创建一个表。使用该“create”命令来创建一个新的表。您必须指定表名称和ColumnFamily名称：
    
    create 'test', 'cf'

创建表成功了。但是当
	put 'test', 'row1', 'cf:a', 'value1'

报错，当scan 'test'也报错，类似如下：

	ERROR: No server address listed in hbase:meta for region ...

## 验证

test就是要报错，但是奇妙的，当我测试此文章的时候，`https://akbarahmed.com/2012/08/13/hbase-command-line-tutorial/`，发现插入行是可行的！！！！


	create 'bar', 'vi'
	put 'bar', 'row1', 'vi:make', 'bmw'
	put 'bar', 'row1', 'vi:model', '5 series'
	put 'bar', 'row1', 'vi:year', '2012'
	put 'bar', 'row2', 'vi:make', 'mercedes'
	put 'bar', 'row2', 'vi:model', 'e class'
	put 'bar', 'row2', 'vi:year', '2012'

然后再次报错，和test一样。然后我重新启动hbase，好像有可以了。FUCk。




HBase建立在Hadoop文件系统（HDFS）之上的分布式、面向列的数据库。

毕竟HBase是抄的Google的，因此，会有和Goolge的技术有一些对应关系：

1. HBase作为Google Bigtable的开源实现
2. Google Bigtable利用GFS作为其文件存储系统类似，则HBase利用Hadoop HDFS作为其文件存储系统
3. Google通过运行MapReduce来处理Bigtable中的海量数据，同样，HBase利用Hadoop MapReduce来处理HBase中的海量数据
4. Google Bigtable利用Chubby作为协同服务，HBase利用Zookeeper作为对应。

# 安装

## 下载http://apache.claz.org/hbase/2.0.1/并解压：

    tar xfz FILE
    cd FILE

## 设置配置

配置文件在conf/hbase-site.xml内，粘贴内容：

    <configuration>
      <property>
        <name>hbase.rootdir</name>
        <value>file:///User/lcj/hbase</value>
      </property>
      <property>
        <name>hbase.zookeeper.property.dataDir</name>
        <value>/User/lcj/testuser/zookeeper</value>
      </property>
    </configuration>

到其中即可。其中的最后一级别目录，无需自己创建，Hbase会自动创建的。

## 设置环境变量

在你启动HBase之前，需要先设置`JAVA_HOME`环境变量。HBase提供了一个中心机制 conf/hbase-env.sh，编辑此文件，取消注释以下行`JAVA_HOME`，并将其设置为您的操作系统的适当位置。如果是MAC的话，可以使用`$(/usr/libexec/java_home)`来查找即可。

    export JAVA_HOME=$(/usr/libexec/java_home)

然后，启动HBase：

    conf/hbase-env.sh
    
应该可以看到如下输出：

    running master, logging to /Users/lcj/Downloads/hbase-2.0.1/bin/../logs/hbase-lcj-master-july.local.out
执行命令：

    jps
看到
    
    37004 HMaster

这说明HBase已经启动。要是看不到，请看troubleshooting一节。

##验证
使用HBase shell来验证（启动起来，还是有点慢，需要耐心）：

    ./bin/hbase shell

创建一个表。使用该“create”命令来创建一个新的表。您必须指定表名称和ColumnFamily名称：
    
    create 'test', 'cf'

列出关于您的表的信息，通过使用“list”命令来实现：

    list 'test'
    
把数据放到你的表中

    put 'test', 'row1', 'cf:a', 'value1'
    put 'test', 'row2', 'cf:b', 'value2'
    put 'test', 'row3', 'cf:c', 'value3' 
    
一次扫描表中的所有数据
    
    scan 'test'
    
获取一行的数据:
    
    get 'test', 'row1'
删除表:
    drop 'test'

停止服务：
    
    ./bin/stop-hbase.sh

trouble shooting :

1. 要是启动hbase失败，它并不会在命令行提示，而是在hbase-lcj-master-july.local.log内输出错误消息，因此需要留意此文件内的错误。比如我曾经把conf/hbase-site.xml内的目录配错，导致hbase启动不了。

查找ip addr本地的方法：

    ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}' 
错误的处理:

    zookeeper.ClientCnxn: Opening socket connection to server localhost/127.0.0.1:2181. Will not attempt to authenticate using SASL
    
评价：这个安装的方法，真的是一堆问题，放弃。！
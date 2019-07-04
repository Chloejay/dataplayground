<h4><strong>Data science playground- 20190126 Coderbunker workshop</strong></h4> 
<h6> General info</h6> :information_desk_person: 
This workshop will talks about the data science pipeline, play fun with the some open source tools from data fetching, ETL to data analytics (data processing), data visualization(data insight generation), in the end I will show how to use simple machine leanring library to run one modeling (predictive analysis).  

![picture alt](https://pbs.twimg.com/media/DYaocvHU8AAIYYW.jpg)  
"Spark with Zeppelin are great combination" 

<h6> Getting started: </h6> 
<ul>
	<li>loopback:v5.0.0 generator-loopback:v6.0.2 loopback-workspace:v4.5.0 </li>
	<li>node: v11.3.0 </li>
	<li>Python: v3.6.5</li>
	<li>MySQL (of course feel free to use PostgreSQL, we know we love it!) :smiley:</li>
	<Li>PySpark</li>
	<Li><a href= 'https://zeppelin.apache.org/docs/0.6.0/install/install.html'>Zeppelin</a></li>
	<li><a href='https://pypi.org/project/Keras/'>Keras</a></li> 
	<li>Hadoop 2.9.2</li> 
	<li>Maven</li>  
	<li>libprotoc 2.5.0</li>
	<li>openssl/1.0.2o_2/</li> 
	<li>aws-java-sdk-1.7.4</li>
	<li>hadoop-aws-2.7.1<li> 
</ul> 

<h6>Setup </h6>
To start this workshop, install it locally using npm and pip: (before plan to use docker but my mac low storage will strike in high frequency)</br> 
The article I wrote before on Medium about how to set up Loopback, please find <a href= https://medium.com/@chloejiy/use-nodejs-loopback-for-the-fullstack-engineering-a0e470c8f801'>here</a>, might helpful if you just start loopback.   

```html 
$ npm install
$ npm install -g loopback-cli (https://loopback.io/doc/en/lb3/) 
$ npm install loopback-connector-mysql --save  (https://www.npmjs.com/package/loopback-connector-mysql) 
$ install Anaconda (https://repo.continuum.io/archive)
$ install Apache Spark 
$ install Java 
$ pip install Keras  
#install hadoop 2.9.2  
$ brew install hadoop (Hadoop was installed under /usr/local/Cellar/hadoop) 
or $ wget http://www.eu.apache.org/dist/hadoop/common/hadoop-2.9.2/hadoop-2.9.2-src.tar.gz (I recommend this one, otherwise there are so much bugs after when we build the env with Hadoop) 

#config the hadoop 
$ cd /usr/local/opt/hadoop
$ hadoop-env.sh 
export HADOOP_OPTS="$HADOOP_OPTS -Djava.net.preferIPv4Stack=true" 

export HADOOP_OPTS="$HADOOP_OPTS -Djava.net.preferIPv4Stack=true -Djava.security.krb5.realm= -Djava.security.krb5.kdc="
export JAVA_HOME="/Library/Java/JavaVirtualMachines/<ADD_JDK_VERSION_HERE>/Contents/Home" 

$ core-site.xml 
# later when we connect with AWS S3 bucket, we need add IAM info on the property 
<configuration>
  <property>
    <name>hadoop.tmp.dir</name>
    <value>/usr/local/Cellar/hadoop/hdfs/tmp</value>
    <description>A base for other temporary directories</description>             
  </property>
  <property>
    <name>fs.default.name</name>
    <value>hdfs://localhost:8020</value>
  </property>
</configuration>
	
# mapred-site.xml 
<configuration>
  <property>
    <name>mapred.job.tracker</name>
    <value>localhost:8021</value>
  </property>
</configuration>

# hdfs-site.xml 
<configuration>
  <property>
    <name>dfs.replication</name>
    <value>1</value>
  </property>
</configuration>

$ hdfs namenode -format 
$ /usr/local/opt/hadoop/sbin (HDFS service) 
$ ./start-dfs.sh 
	
#install Maven 
# build the Hadoop env 
$ mvn package -Pdist,native -DskipTests -Dtar 
#from some bugs and configuration 
![picture alt](https://github.com/Chloejay/dataplayground/blob/master/Screen%20Shot%202019-07-03%20at%2020.59.51.png?raw=true) 
#to  
![picture alt](https://github.com/Chloejay/dataplayground/blob/master/Screen%20Shot%202019-07-03%20at%2021.41.46.png?raw=true) 
``` 
<h6>Install Spark on Mac</h6>
<ul> 
	<li>First download <a href= 'https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html'>Java</a> </li>
	note: please don't install Java version more than 8, which will created much bugs later such as java.lang.IllegalArgumentException, Unsupported class file major version 55, so better install from <a href= 'https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html'>Java SE Development Kit 8 </a>site and choose your os system and config.  
	<li>Go to the <a href= 'http://spark.apache.org/downloads.html'>Apache Spark </a> website  </li>
	<li>Choose a Spark release and directly download </li>
	<li>Go to your home directory (command in bold below) <br /> 
        <code>
        $ cd ~
	</code> 
	  </li> 
	<li>Unzip the folder in your home directory using the following command </li> <br /> 
<code> 
$ tar -zxvf spark-2.4.0-bin-hadoop2.7.tgz
</code> 
	<li>Use the following command to see that you have a .bash_profile</li> <br /> 
<code>
$ ls -a
</code> 
	<li>Config Spark to edit .bash_profile </li> <br /> 
<code > 
$ vim .bash_profile 
	
export SPARK_PATH=~/spark-2.4.0-bin-hadoop2.7
export PYSPARK_DRIVER_PYTHON="jupyter" 
export PYSPARK_DRIVER_PYTHON_OPTS="notebook" 
#For python 3, have to add the line below or will get an error export PYSPARK_PYTHON=python3 
alias jupyter_notebook='$SPARK_PATH/bin/pyspark --master local[2]'
export JAVA_HOME=$(/usr/libexec/java_home)
export JAVA_LIBRARY_PATH=$HADOOP_HOME/lib/native:$JAVA_LIBRARY_PATH

export HADOOP_HOME=/usr/local/Cellar/hadoop/3.1.2/libexec
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native
export HADOOP_OPTS="-Djava.library.path=$HADOOP_HOME/lib" 

$ source .bash_profile 
</code> 
	<li>then run the code to check if the pyspark installed </li> 
<code>  
$ jupyter_notebook 
</code>
<li>open jupyter notebook from command line </li>
<code>
$ cd spark-2.4.0-bin-hadoop2.7 
$ bin/pyspark 
</code>
</ul>  

what is Spark 
data processing engine, focus on in-memory distributed computing use case 
basic operations: transformation and actions
- Transformations are operations on RDDs that return a new RDD, map() and filter(). 
- Actions are operations that return a result to the driver program or write it to storage, and kick off a computation, count() and first() for a new data types. 

Zeppelin 
Basic operators: maps, joins, filters, etc.
Spark as a tool for data exploration: notebooks and workflow 

<h6>Further reading material :green_book:</h6>  
<blockquote> SQL </blockquote>  
<ul>
	<li><a href='https://kva.es/Rampant-Tech-Press/Advanced.SQL.Database.Programmers.Handbook.pdf'>Advanced SQL for database programmer</a></li> 
</ul>
<blockquote>Nodejs  </blockquote> 
<ul>
	<li><a href='https://github.com/sindresorhus/awesome-nodejs'>Awesome Nodejs</a></li>  
	<li><a href= 'https://github.com/LeCoupa/awesome-cheatsheets/blob/master/backend/node.js'>Nodejs Cheatsheet</a></li> 
</ul>
<blockquote>Spark </blockquote> 
<ul>
	<li><a href='http://stanford.edu/~rezab/slides/sparksummit2015/lec2.pdf'>Spark Summit from DataBricks</a></li> 
</ul>
<blockquote>Machine leanring </blockquote> 
<ul>
	<li><a href= 'https://web.stanford.edu/class/cs20si/lectures/march9guestlecture.pdf'>Keras introduction by Francois Chollet</a></li>
	<li><a href='http://www.zhanjunlang.com/resources/tutorial/Deep%20Learning%20with%20Keras.pdf'>Deep learning with Keras</a></li> 
</ul>  

// Import React
import React from 'react';
//example image list below 
import pizza from './pizza.jpeg' 
import spark from './sparkimg.png'
import spark1 from './spark1.png'
import spark2 from './spark2.png' 
import spark3 from './spark3.png'
import spark4 from './spark4.png' 
import spark5 from './spark5.png' 
import spark_core from './spark_core.png' 
import rdd_structure from './rdd_structure.png' 
import rdd_sc from './rdd_sparkcontext.png' 
import dl from './dl.png'
import transfer_learning from './transfer learning.png'
import macpooling from './maxpooling.png'
import feedforward from './feedforward_net.png' 
import loss from './loss.png'
import loss_func from './loss_func.png' 
import activation_func from './activation_func.png' 
import transformation from './transformation.png' 
import action from './action.png' 
import sgd from './sgd.png' 
import overfit from './overfit.png'
import dropout from './dropout.png' 
import early_stop from './early_stop.png' 

// add the Apache Saprk general concept and theory here 


// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
} from 'spectacle';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

// Require CSS
require('normalize.css');

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quaternary: '#CECECE',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  }
);
  

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['zoom', 'slide']}
        transitionDuration={500}
        theme={theme}
      >
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={2} fit caps lineHeight={2} textColor="secondary">
            Spark Pizza Workshop @July 8th 6-7 PM <br/> 
          </Heading> 
          
          <img style={{width: '360px', height: '360px'}} src={pizza} alt='pizza' />  
          
          <img style={{width: '360px', height: '360px'}} src={spark} alt='spark' />   
        </Slide> 
        
        <Slide transition={['fade']} bgColor="primary" textColor="tertiary">
          <Heading transition={['fade']} bgColor="secondary" textColor="primary"></Heading>
          <h4 style= {{fontSize:'21px'}}>Agenda (from data fetching -> processing-> modeling-> insight)</h4>   
          
          <ul style={{fontSize:'21px', textAlign:'left',listStyleType: "none"}}> 
          <li><a href='https://loopback.io/'>NodeJS Loopback API</a> for data fetching</li> 
          <li>Apache Spark concept intro</li> 
          <li>Abstraction RDD</li> 
          <li>Spark SQL</li>
          <li>Spark for DL (image recognition task)</li> 
          <li>Exclude the other distributed Entities: accumulators & broadcast</li>
          <li>Exclude: Hadoop YARN, Apache Mesos,Standalone cluster manager</li> 
          <li>Exclude: Spark Streaming</li>    
          </ul>  

        </Slide>

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
        what you need for set up? 
        <ul style= {{fontSize:'18px', textAlign:'left'}}>
          <li>
          loopback:v5.0.0 generator-loopback:v6.0.2 loopback-workspace:v4.5.0
          </li>
          <li>
          node: v11.3.0
          </li>
          <li>
          Python: v3
          </li>
          <li>
          MySQL (of course feel free to use PostgreSQL) 😃
          </li>
          <li>
          Apache Spark (PySpark)  
          </li>
          <li>
          <a href='https://zeppelin.apache.org/'>Zeppelin</a>(maybe will cover this big data BI tool)
          </li>
          <li>
          Keras
          </li>
          <li>
            Tensorflow
          </li>
          <li>
          Hadoop 2.9.2 (recommend this version for its most mature) 
          </li>
          <li>
          Maven
          </li>
          <li>
          libprotoc 2.5.0
          </li>
          <li>
          openssl/1.0.2o_2/
          </li>
          <li>
          aws-java-sdk-1.7.4
          </li>
          <li>
          hadoop-aws-2.7.1 
          </li>
        </ul> 

        </Slide>  

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
         <h4 style= {{float:'left'}}>What is Loopback API and how to use it with MySQL? </h4>
         <ul style= {{fontSize:'18px', textAlign:'left', float:'left',listStyleType: "none"}}>
         <li >A framework for creating APIs on the frontend for data distributed and connect them with backend datasource. Loopback is all about serve side but it attaches client side to your serve.</li><br/> 
         <li >It is built on the top of Express and can take a data model definition, easily generate a fully functional end-to-end REST API
         that can be called by any client. </li>
         <li ><a href='http://localhost:3000/Explorer/#!/profileModel/profileModel_create'>LoopBack API Explorer </a> that can play around how to use HTTP GET/POST/ etc methods in the client side. </li>
         <li >
          $npm install
          </li>
          <li >
          $ npm install -g loopback-cli  
          $ lb (to init and config the model name) 
          </li>
          <li >Connect to DataSource MySQL</li> 
          $ npm install --save loopback-connector-mongodb 
          $ lb datasource mysql --connector mysql 
          $ mysql -u root -h localhost -p  
          <li >
          $ lb model (Set up model) 
          </li> 
          <li>$ lb acl (Config the ACL)</li>  

         </ul> 
        
        </Slide> 

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
        <ul style={{display:"flex"}}> 
        </ul>  
        Spark Core concept (with Saprk driver, spark master/worker, stage, jobs, tasks..)
        Why? - Reuse, speedy, containability, mostly important its open source! <br/>  
        <ul style={{'display':'flex',listStyleType: "none"}} >
        <li>
        <img style={{width: '420px', height: '320px'}} src={spark_core} alt='spark_core' />
        </li>
         <li>
         <img style={{'width':'420px','height':'320px'}} src={spark3} alt='spark3' /> 
         </li>
        </ul>4
        
        </Slide>

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
        From logical to physical space 
        <ul style={{'display':'flex',listStyleType: "none"}} >
        <li>
        <img style={{width: '500px', height: '420px'}} src={spark4} alt='spark4' />
        </li>
        Job-> Stage-> Task 
         <li>
         <img style={{'width':'500px','height':'420px'}} src={spark2} alt='spark2' /> 
         </li>
         </ul> 
        </Slide>

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
         How to set up the Apache Spark 
         and good Internet 
        </Slide>

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
         Spark RDD 
         <ul style={{fontSize:'18px', textAlign:'left','display':'flex',listStyleType: "none"}}>
           <li>
           Transformations-> create a new dataset from an existing one,lazy, immutable, fault-tolerant, cacheable and parallize and partitionized to speed up 
             data processing in memory 
           <br/> 
           </li>
           <li>
           Actions -> return a value to the driver program after running a computation on the dataset  
           </li>
         </ul> 
         <img style={{'width':'420px','height':'320px'}} src={rdd_sc} alt='rdd_sc' /> 
         <img style={{'width':'420px','height':'320px'}} src={rdd_structure} alt='rdd_structure' />

         <p style={{fontSize:'18px'}} > 
         Most useful case: sc.parallelize() useful case for runing dataset in different partitions; cluster is expandable <br/>  
         RDD storage: When you call persist() or cache(), its partitions will be stored in memory buffers only. <br/> 
         </p>
        </Slide>

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
        <a href='https://spark.apache.org/docs/0.8.1/api/core/org/apache/spark/rdd/RDD.html'>List </a>of RDD methods 
        <ul style={{fontSize:'18px', textAlign:'left','display':'flex',listStyleType: "none"}}>
          <li>
          <img style={{'width':'420px','height':'320px'}} src={transformation} alt='transformation' /> 
          </li>
          <li>
          <img style={{'width':'420px','height':'320px'}} src={action} alt='action' /> 
          </li>
        </ul> 
        </Slide> 

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
        <a href='http://localhost:4040/jobs/'>Spark UI</a> for the job/task performance tracking or debuging 
        </Slide> 

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
         Spark SQL 
        </Slide> 

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
        Spark for DL
        what is deep learning? especially for the CV (Why?) <br/>  
        <img style={{'width':'540px','height':'440px'}} src={feedforward} alt='feedforward' />
        <a href='https://www.youtube.com/watch?v=AgkfIQ4IGaM&list=LLJiruwfCUPxxg6644ALKKZQ&index=125&t=95s'>Deep Visualization video</a>explained how the image learned in different layers  
  
        
        </Slide>  

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
        The real life when works in DL? training takes a lot of time, so we need to speed up <br/> 
        <img style={{width: '600px', height: '600px'}} src={dl} alt='dl' />  
        </Slide> 

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
         Deep learning Pipeline related to all the mathematical tunning 
        </Slide> 
        <img style={{'width':'600px','height':'500px'}} src={activation_func} alt='activation_func' /> 

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
       <img style={{'width':'600px','height':'500px'}} src={loss_func} alt='loss_func' />
        </Slide>  

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
         <img style={{'width':'600px','height':'500px'}} src={sgd} alt='sgd' />
        </Slide> 
        <img style={{'width':'600px','height':'600px'}} src={overfit} alt='overfit' />
        <img style={{'width':'600px','height':'600px'}} src={dropout} alt='dropout' />
        <img style={{'width':'600px','height':'600px'}} src={early_stop} alt='early_stop' />
        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
        Further resource: 
        <ul style={{fontSize:'18px', textAlign:'left',listStyleType: "none"}}> 
          <li>
          1. Resilient Distributed Datasets: A Fault-Tolerant Abstraction for 
        In-Memory Cluster Computing by Matei Zaharia https://cs.stanford.edu/~matei/papers/2012/nsdi_spark.pdf 
          </li>
          <li>
            2. Spark Programming Guide https://spark.apache.org/docs/2.1.1/programming-guide.html 
          </li>
          <li>
          3. Using Docker for Pyspark tutorial  https://levelup.gitconnected.com/using-docker-and-pyspark-134cd4cab867
          </li> 
          <li>
          Stanford CS class CS231n: Convolutional Neural Networks for Visual Recognition https://cs231n.github.io/ 
          </li>
        </ul> 
        Question? <br/> 
        Demo  
        </Slide> 

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
       Thank you! Pizza time :) 
        </Slide> 


      </Deck> 
    ); 
  }
}

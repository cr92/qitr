
**ENVIRONMENT:**

 - Node: v6.10.0 LTS
 - MySQL: 5.7.17
 - Ubuntu: 16.04.2 LTS


**CODE SETUP:**

 - git clone git@github.com:cr92/qitr.git
 - cd qitr
 - sudo npm install



**DATABASE SETUP:**

 - CREATE SCHEMA `qitr`; // Creates a database named qitr
 - Change user, password fields in config.js
 - Create position & trades table by running the given cmds

> CREATE TABLE `qitr`.`position` (
  `instrument_id` int(11) NOT NULL,
  `position` int(11) DEFAULT '0',
  PRIMARY KEY (`instrument_id`),
  UNIQUE KEY `instrument_id_UNIQUE` (`instrument_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

> CREATE TABLE `qitr`.`trades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `instrument_id` int(11) DEFAULT NULL,
  `trade_type` int(11) DEFAULT NULL,
  `trade_volume` int(11) DEFAULT NULL,
  `timestamp` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;


**START SERVER:**

 - npm start OR node qitr


**ABOUT THE APP:**

 - http://localhost:9090/
 - http://localhost:9090/enter
 - http://localhost:9090/showAll
 - http://localhost:9090/instrument/xxxxx

Top two links have form & view, while the other two are API endpoints.

To load data in database, go to http://localhost:9090/enter and use the form to submit as many rows of filllist as you want.

eg.
1473997674.817611 : 8=FIX.4.2|35=8|39=2|44=1340|48=54572|38=1000|151=0|32=1000|31=1340|11=110000072|37=1100000000081761|40=0|17=16673431|6=19644600|14=0|54=2|55=CIPLA|20=0|150=2|60=20160916-03:47:54|10=000|
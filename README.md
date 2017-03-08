CREATE TABLE `qitr`.`position` (
  `instrument_id` INT NOT NULL,
  `position` INT NULL DEFAULT 0,
  PRIMARY KEY (`instrument_id`),
  UNIQUE INDEX `instrument_id_UNIQUE` (`instrument_id` ASC));


CREATE TABLE `qitr`.`trades` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `instrument_id` INT NULL,
  `trade_type` INT NULL,
  `trade_volume` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));


CREATE SCHEMA `qitr`;

CREATE TABLE `qitr`.`position` (
  `instrument_id` int(11) NOT NULL,
  `position` int(11) DEFAULT '0',
  PRIMARY KEY (`instrument_id`),
  UNIQUE KEY `instrument_id_UNIQUE` (`instrument_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `qitr`.`trades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `instrument_id` int(11) DEFAULT NULL,
  `trade_type` int(11) DEFAULT NULL,
  `trade_volume` int(11) DEFAULT NULL,
  `timestamp` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

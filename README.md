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

CREATE DATABASE IF NOT EXISTS datawarehouse;
CREATE TABLE `users` (
    `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(40) NOT NULL,
    `lastname` VARCHAR (40) NOT NULL,
    `email` VARCHAR(320) NOT NULL UNIQUE,
    `admin` INT(1) NOT NULL,     
    `password` VARCHAR(20) NOT NULL
    
);
INSERT INTO `users`(`firstname`, `lastname`, `email`, `admin`, `password`) VALUES ("Luz", "Sallietti", "admin@rocket.com", 1, "acamica");
CREATE TABLE `regions` (
    `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL
);
CREATE TABLE `countries` (
    `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `region_id` INT(11) NOT NULL
);
ALTER TABLE `countries` ADD FOREIGN KEY (region_id) REFERENCES regions(id);
CREATE TABLE `cities` (
    `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `country_id` INT(11) NOT NULL
);
ALTER TABLE `cities` ADD FOREIGN KEY (country_id) REFERENCES countries(id);
CREATE TABLE `companies` (
    `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
    `address` VARCHAR(100) NOT NULL, 
    `email` VARCHAR(320) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `city_id` INT(11) NOT NULL
);
ALTER TABLE `companies` ADD FOREIGN KEY (city_id) REFERENCES cities(id);
CREATE TABLE `contacts` (
    `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(40) NOT NULL,
    `lastname` VARCHAR (40) NOT NULL,
    `email` VARCHAR(320) NOT NULL UNIQUE,
    `company_id` INT(11) NOT NULL,
    `address` VARCHAR(100),
    `city_id` INT(11) NOT NULL,
    `job_title` VARCHAR(20) NOT NULL,
    `interesting` INT(3) NOT NULL
);
ALTER TABLE `contacts` ADD FOREIGN KEY (city_id) REFERENCES cities(id);
ALTER TABLE `contacts` ADD FOREIGN KEY (company_id) REFERENCES companies(id);
CREATE TABLE `channels` (
    `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL
);
INSERT INTO `channels`(`name`) VALUES ("Teléfono");
INSERT INTO `channels`(`name`) VALUES ("Whatsapp");
INSERT INTO `channels`(`name`) VALUES ("Email");
INSERT INTO `channels`(`name`) VALUES ("Linkedin");
INSERT INTO `channels`(`name`) VALUES ("Instagram");
INSERT INTO `channels`(`name`) VALUES ("Facebook");

CREATE TABLE `contact_channels`(
    `id` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `channel_id` INT(11) NOT NULL,
    `contact_id` INT(11) NOT NULL,
    `value` VARCHAR(40) NOT NULL,
    `preference` VARCHAR(20) NOT NULL    
);
ALTER TABLE `contact_channels` ADD FOREIGN KEY (channel_id) REFERENCES channels(id);
ALTER TABLE `contact_channels` ADD FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE;
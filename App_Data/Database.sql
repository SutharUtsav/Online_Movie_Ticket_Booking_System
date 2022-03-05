-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: online_movie_ticket_booking_system
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_movie_id` int NOT NULL,
  `booking_screen_id` int NOT NULL,
  `booking_user_id` int NOT NULL,
  `booking_date` varchar(45) NOT NULL,
  `booking_snacks` varchar(100) DEFAULT NULL,
  `booking_price` double NOT NULL,
  `booking_payment_status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_screen_id_idx` (`booking_screen_id`),
  KEY `booking_user_id_idx` (`booking_user_id`),
  KEY `booking_movie_id_idx` (`booking_movie_id`),
  CONSTRAINT `booking_movie_id` FOREIGN KEY (`booking_movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `booking_screen_id` FOREIGN KEY (`booking_screen_id`) REFERENCES `screen` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `booking_user_id` FOREIGN KEY (`booking_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (20,3,34,15,'1646420412929','',360,'1'),(21,7,33,15,'1646420811253','popcorn + pepsi,',899,'1'),(22,7,33,23,'1646421374123','popcorn-large,popcorn-large,popcorn,',1457,'1');
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection`
--

DROP TABLE IF EXISTS `collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection` (
  `id` int NOT NULL AUTO_INCREMENT,
  `collection_movie_id` int NOT NULL,
  `collection_total_amount` double NOT NULL,
  `morning_collection_amount` double NOT NULL,
  `evening_collection_amount` double NOT NULL,
  `night_collection_amount` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `collection_movie_id_idx` (`collection_movie_id`),
  CONSTRAINT `collection_movie_id` FOREIGN KEY (`collection_movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `e_gift`
--

DROP TABLE IF EXISTS `e_gift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `e_gift` (
  `id` int NOT NULL AUTO_INCREMENT,
  `voucher_user_id` int NOT NULL,
  `voucher_code` varchar(45) NOT NULL,
  `voucher_amount` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `voucher_user_id_idx` (`voucher_user_id`),
  CONSTRAINT `voucher_user_id` FOREIGN KEY (`voucher_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `e_gift`
--

LOCK TABLES `e_gift` WRITE;
/*!40000 ALTER TABLE `e_gift` DISABLE KEYS */;
/*!40000 ALTER TABLE `e_gift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_name` varchar(45) NOT NULL,
  `movie_language` varchar(45) NOT NULL,
  `movie_hours` time NOT NULL,
  `movie_genre` varchar(45) NOT NULL,
  `movie_banner` varchar(45) NOT NULL,
  `movie_trailer_link` varchar(45) NOT NULL,
  `movie_release_date` date NOT NULL,
  `movie_description` text NOT NULL,
  `movie_image` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (3,'Pushpa - The Rise','Hindi','02:45:00','Action','pushpa_banner.jpg','https://youtu.be/pKctjlxbFDQ','2021-12-17','Pushpa: The Rise – Part 01 is a 2021 Indian Telugu-language action drama film written and directed by Sukumar. Produced by Mythri Movie Makers in association with Muttamsetty Media, it stars Allu Arjun as the titular character alongside Fahadh Faasil (in his Telugu debut) and Rashmika Mandanna while Jagadeesh Prathap Bandari, Sunil, Rao Ramesh, Dhananjaya, Anasuya Bharadwaj, Ajay and Ajay Ghosh play supporting roles. The first of two cinematic parts, the film depicts the rise of a coolie in the smuggling syndicate of red sandalwood, a rare wood that grows only in the Seshachalam Hills of Andhra Pradesh state.','Pushpa_image.jpg'),(4,'RRR-Rise Roar Revolt','Hindi','03:04:00','Action / Drama','RRR_banner.jpg','https://youtu.be/GY4BgdUSpbE','2022-03-25','RRR is an Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments. The film stars N. T. Rama Rao Jr. and Ram Charan in lead roles, while Ajay Devgn and Alia Bhatt make cameo appearances[5][6] while Samuthirakani, Alison Doody, Ray Stevenson, Olivia Morris and Shriya Saran play supporting roles. It is a fictional story about two Indian revolutionaries, Alluri Sitarama Raju (Charan) and Komaram Bheem (Rama Rao), who fought against the British Raj and Nizam of Hyderabad respectively.','RRR_image.jpg'),(5,'Bachhan Pandey','Hindi','02:35:00','Action / Comedy','Bachhan_Pandey_banner.jpg','https://youtu.be/4d8m59ct2wQ','2022-03-18','Bachchhan Paandey is an upcoming Indian Hindi-language action comedy film directed by Farhad Samji, written by Nischay Kuttanda and Farhad Samji and produced by Sajid Nadiadwala. It stars Akshay Kumar, Kriti Sanon, Jacqueline Fernandez and Arshad Warsi. It is a remake of the 2014 Tamil film Jigarthanda which itself was inspired by the 2006 South Korean movie A Dirty Carnival. The film is scheduled to be released theatrically on 18 March 2022.','Bachchan_Pandey_Image.jpeg'),(6,'Jersey','Hindi','02:50:00','Drama / Sports','Jersey_Poster.jpeg','https://youtu.be/BT0zd0kmTxM','2022-04-14','Jersey is an upcoming Indian Hindi-language sports drama film written and directed by Gowtam Tinnanuri, being his Hindi directorial debut and the remake of his 2019 Telugu film of the same title. It stars Shahid Kapoor as a former cricketer who returns to the game for his son\'s wish of a jersey, alongside Mrunal Thakur and Pankaj Kapoor. The film is produced by Geetha Arts, Dil Raju Production, Sithara Entertainments and Brat Films.','Jersey_Image.jpg'),(7,'Gangubai Kathiavadi','Hindi','02:35:00','Drama / Crime Film','Gangubai_Kathiavadi_banner.jfif','https://youtu.be/N1ZwRv3vJJY','2022-02-25','Gangubai Kathiawadi is a 2022 Indian Hindi-language biographical crime drama film directed by Sanjay Leela Bhansali and produced by Jayantilal Gada and Bhansali. The film stars Alia Bhatt as the title character while Shantanu Maheshwari, Vijay Raaz, Indira Tiwari and Seema Pahwa play pivotal roles with Ajay Devgn featuring in an extended cameo appearance. The narrative walks through the life of young Ganga who in no time marks her own territory and becomes Gangubai – a madame in the red light area of Kamathipura.','Gangubai_Kathiavadi_Image.jfif');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payment_booking_id` int NOT NULL,
  `payment_mehod` varchar(45) NOT NULL,
  `payment_user_id` int NOT NULL,
  `payment_date` date NOT NULL,
  `payment_description` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_booking_id_idx` (`payment_booking_id`),
  KEY `payment_user_id_idx` (`payment_user_id`),
  CONSTRAINT `payment_booking_id` FOREIGN KEY (`payment_booking_id`) REFERENCES `booking` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `payment_user_id` FOREIGN KEY (`payment_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `private_screen`
--

DROP TABLE IF EXISTS `private_screen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `private_screen` (
  `id` int NOT NULL AUTO_INCREMENT,
  `p_screen_id` int NOT NULL,
  `p_movie_id` int NOT NULL,
  `p_user_id` int NOT NULL,
  `p_time` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `p_screen_id_idx` (`p_screen_id`),
  KEY `p_movie_id_idx` (`p_movie_id`),
  KEY `p_user_id_idx` (`p_user_id`),
  CONSTRAINT `p_movie_id` FOREIGN KEY (`p_movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `p_screen_id` FOREIGN KEY (`p_screen_id`) REFERENCES `screen` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `p_user_id` FOREIGN KEY (`p_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `private_screen`
--

LOCK TABLES `private_screen` WRITE;
/*!40000 ALTER TABLE `private_screen` DISABLE KEYS */;
/*!40000 ALTER TABLE `private_screen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_title` varchar(45) NOT NULL,
  `role_description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (10,'Administrator','This is an Administrator'),(11,'Customer','This is a Customer');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screen`
--

DROP TABLE IF EXISTS `screen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `screen` (
  `id` int NOT NULL AUTO_INCREMENT,
  `screen_movie_id` int NOT NULL,
  `screen_show_start_time` varchar(45) NOT NULL,
  `private_screen_booking` tinyint NOT NULL,
  `screen_no` int NOT NULL,
  `screen_show_end_time` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `screen_movie_id` (`screen_movie_id`),
  CONSTRAINT `screen_movie_id_fk` FOREIGN KEY (`screen_movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screen`
--

LOCK TABLES `screen` WRITE;
/*!40000 ALTER TABLE `screen` DISABLE KEYS */;
INSERT INTO `screen` VALUES (30,3,'1646406015563',0,1,'1646416800000'),(31,7,'1646473545263',0,2,'1646484000000'),(32,7,'1646491526096',0,3,'1646503200000'),(33,7,'1646541012101',0,1,'1646551500000'),(34,3,'1646559950756',0,1,'1646569800000'),(35,3,'1646486137472',0,2,'1646496000000'),(36,7,'1646631959265',0,3,'1646642400000');
/*!40000 ALTER TABLE `screen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seat_price` double NOT NULL,
  `seat_show_id` int NOT NULL,
  `seat_type` varchar(45) NOT NULL,
  `seat_booking_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `seat_screen_id_idx` (`seat_show_id`),
  KEY `seat_booking_id_idx` (`seat_booking_id`),
  CONSTRAINT `seat_booking_id` FOREIGN KEY (`seat_booking_id`) REFERENCES `booking` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `seat_screen_id` FOREIGN KEY (`seat_show_id`) REFERENCES `screen` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (147,180,34,'B2',20),(148,180,34,'B3',20),(149,150,33,'C6',21),(150,150,33,'C5',21),(151,180,33,'B3',22),(152,180,33,'B2',22);
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `snack`
--

DROP TABLE IF EXISTS `snack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `snack` (
  `id` int NOT NULL AUTO_INCREMENT,
  `snack_amount` double NOT NULL,
  `snack_type` varchar(45) NOT NULL,
  `snack_description` text NOT NULL,
  `snack_offer` varchar(45) NOT NULL,
  `snack_image` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `snack`
--

LOCK TABLES `snack` WRITE;
/*!40000 ALTER TABLE `snack` DISABLE KEYS */;
INSERT INTO `snack` VALUES (1,299,'popcorn','salty popcorn','-','popcorn_small.jpg'),(2,399,'popcorn-large','large salty popcorn','-','popcorn_large.jpg'),(3,599,'popcorn + pepsi','combo of popcorn and coke','combo','combo.jpg');
/*!40000 ALTER TABLE `snack` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_role_id` int NOT NULL,
  `user_phone_number` varchar(12) NOT NULL,
  `user_email` varchar(45) NOT NULL,
  `user_password` char(60) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_role_id_idx` (`user_role_id`),
  CONSTRAINT `user_role_id` FOREIGN KEY (`user_role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (15,'utsav',11,'7069052544','utsavsuthar24@gmail.com','$2b$10$mKhCw.HPX5c77UKjKyTU6.Yy64Ne1uFK2gRKyh91TLi7mAqwkJTRu'),(18,'Admin',10,'0000000000','admin@gmail.com','$2b$10$/I6OT69z4B8focjD1Bwxdu0b6gbpV///K9JUQ.hJf00EwygI.BVaK'),(23,'rahil',11,'7069052542','rahil@gmail.com','$2b$10$0jwyqWpPu.q8HVCy4fjJUOqelvYFUXAGbtPUqB/MS.PbJozFYBduK'),(29,'admin1',10,'0000000001','admin@admin.com','admin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-05  8:35:38

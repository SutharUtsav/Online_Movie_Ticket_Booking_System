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
  CONSTRAINT `user_role_id` FOREIGN KEY (`user_role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (15,'utsav',11,'7069052544','utsavsuthar24@gmail.com','$2b$10$ZgF5/m9yNRzXlSR3t4.ahuGCqmsNYoA.eBBHwUgDzYhKIugqJHkeO'),(18,'Admin',10,'0000000000','admin@gmail.com','$2b$10$/I6OT69z4B8focjD1Bwxdu0b6gbpV///K9JUQ.hJf00EwygI.BVaK'),(23,'rahil',11,'7069052542','rahil@gmail.com','$2b$10$0jwyqWpPu.q8HVCy4fjJUOqelvYFUXAGbtPUqB/MS.PbJozFYBduK'),(29,'admin1',10,'0000000001','admin@admin.com','admin');
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

-- Dump completed on 2022-02-23  0:52:23

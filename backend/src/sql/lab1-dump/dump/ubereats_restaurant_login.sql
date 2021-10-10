-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: lab1237cmpe.cauvszlanaze.us-east-2.rds.amazonaws.com    Database: ubereats
-- ------------------------------------------------------
-- Server version	8.0.23

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Dumping data for table `restaurant_login`
--

LOCK TABLES `restaurant_login` WRITE;
/*!40000 ALTER TABLE `restaurant_login` DISABLE KEYS */;
INSERT INTO `restaurant_login` VALUES ('Paradise','paradise.sanfrancisco@paradise.com','$2b$10$jEwZWpiG1owSTOTlTYKMVut6kC04lKHzdHQKdVEeYqAq9JPo0eyYG','San Francisco, CA, USA',37.7749,-122.419,0,2147483647,'https://imageuploadlab1.s3-us-east-2.amazonaws.com/restaurant/null-restaurantPic.jpeg','Inidan , arabian, south asian dishes','09:00:00','18:00:00',0),('pickup1','pickup1@email.com','$2b$10$huFPCW6u.ISEmuKecx9F..4WgLw/62riwT7YCrrdQhOOr7TZqlQ3S','San Jose, CA, USA',37.3382,-121.886,0,2147483647,'https://imageuploadlab1.s3.us-east-2.amazonaws.com/defaults/restaurant.jpg','Located in san jose','09:00:00','18:00:00',1),('pickup2','pickup2@email.com','$2b$10$3cU8sisG4.nFFk3ciwGsLeXoeaJqYCGXnFlan0LJn3UDkymW5k.Lm','San Jose, CA, USA',37.3382,-121.886,0,2147483647,'https://imageuploadlab1.s3-us-east-2.amazonaws.com/restaurant/null-restaurantPic.jpeg','veg and non veg','00:00:00','18:00:00',1),('pickup3','pickup3@email.com','$2b$10$DxDO50FX0KGswlzaEvMskOqxmZvfKTNgaAmV1IdJ.A9Tg6E3jdThG','San Francisco, CA, USA',37.7749,-122.419,0,2147483647,'https://imageuploadlab1.s3-us-east-2.amazonaws.com/restaurant/null-restaurantPic.jpeg','sf pickup restaurant','09:00:00','18:00:00',1),('pickup4','pickup4@email.com','$2b$10$5HyYGkoiQkwycckvboWMxu9km39dDTNhoL.k9Py1yXATNuSH7d6Nq','San Francisco, CA, USA',37.7749,-122.419,0,2147483647,'https://imageuploadlab1.s3-us-east-2.amazonaws.com/restaurant/null-restaurantPic.jpeg','2nd pickup restaurant in sf','12:00:00','18:00:00',1),('pickup5','pickup5@email.com','$2b$10$JSZTlb2JbtTCOUDWQ8dhouuA99vwtV/jNuWcHjWZOhbivzl8TYuV2','Santa Clara, CA, USA',37.3541,-121.955,0,1230492342,'https://imageuploadlab1.s3-us-east-2.amazonaws.com/restaurant/null-restaurantPic.jpeg','pickup restaruant in santa clara','09:00:00','13:00:00',1),('pickup6','pickup6@email.com','$2b$10$gm/Ig2Q1eIKM7UAhttcHtuyzhD68Fimkw3G0tN9TiVi.hXkje8pQe','San Jose, CA, USA',37.3382,-121.886,0,2147483647,'https://imageuploadlab1.s3-us-east-2.amazonaws.com/restaurant/null-restaurantPic.jpeg','3rd pickup restaurant in san jose','09:00:00','18:00:00',1);
/*!40000 ALTER TABLE `restaurant_login` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-09 22:41:14

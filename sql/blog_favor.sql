-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: blog
-- ------------------------------------------------------
-- Server version	5.7.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `favor`
--

DROP TABLE IF EXISTS `favor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) COLLATE utf8_croatian_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_croatian_ci DEFAULT NULL,
  `phone` varchar(32) COLLATE utf8_croatian_ci NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `bookinfo` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=328 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favor`
--

LOCK TABLES `favor` WRITE;
/*!40000 ALTER TABLE `favor` DISABLE KEYS */;
INSERT INTO `favor` VALUES (316,'',NULL,'','2018-08-05 15:59:47','[{\"书名\": \"艺术\", \"作者\": \"作者：莫扎特\", \"出版社\": \"出版社：北邮\"}, {\"书名\": \"计算机\", \"作者\": \"作者：周树人\", \"出版社\": \"出版社：null\"}, {\"书名\": \"机械制图\", \"作者\": \"作者：何老师\", \"出版社\": \"出版社：null\"}]'),(317,'',NULL,'','2018-08-05 15:59:47','[{\"书名\": \"艺术\", \"作者\": \"作者：莫扎特\", \"出版社\": \"出版社：北邮\"}, {\"书名\": \"计算机\", \"作者\": \"作者：周树人\", \"出版社\": \"出版社：null\"}, {\"书名\": \"机械制图\", \"作者\": \"作者：何老师\", \"出版社\": \"出版社：null\"}]'),(318,'',NULL,'','2018-08-05 15:59:47','[{\"书名\": \"艺术\", \"作者\": \"作者：莫扎特\", \"出版社\": \"出版社：北邮\"}, {\"书名\": \"计算机\", \"作者\": \"作者：周树人\", \"出版社\": \"出版社：null\"}, {\"书名\": \"机械制图\", \"作者\": \"作者：何老师\", \"出版社\": \"出版社：null\"}]'),(319,'',NULL,'','2018-08-05 16:00:56','[{\"书名\": \"艺术\", \"作者\": \"作者：莫扎特\", \"出版社\": \"出版社：北邮\"}]'),(320,'',NULL,'','2018-08-05 16:00:56','[{\"书名\": \"艺术\", \"作者\": \"作者：莫扎特\", \"出版社\": \"出版社：北邮\"}]'),(321,'',NULL,'','2018-08-05 16:00:56','[{\"书名\": \"艺术\", \"作者\": \"作者：莫扎特\", \"出版社\": \"出版社：北邮\"}]'),(322,'',NULL,'','2018-08-05 16:02:54','[{\"书名\": \"艺术\", \"作者\": \"作者：莫扎特\", \"出版社\": \"出版社：北邮\"}]'),(323,'',NULL,'','2018-08-05 16:03:32','[{\"书名\": \"艺术\", \"作者\": \"作者：莫扎特\", \"出版社\": \"出版社：北邮\"}]'),(324,'ssssssssssss',NULL,'sssssssssssss','2018-08-17 13:32:18','{\"NaN\": {\"书名\": \"机械制图\", \"作者\": \"何老师\", \"出版社\": \"null\"}}'),(325,'ddddd',NULL,'ddddddddddddddddd','2018-08-17 13:34:22','{\"NaN\": {\"书名\": \"机械制图\", \"作者\": \"何老师\", \"出版社\": \"null\"}}'),(326,'aaaaa',NULL,'sdddddsdsdssd','2018-08-18 00:58:39','{\"11\": {\"书名\": \"计算机\", \"作者\": \"周树人\", \"出版社\": \"null\"}, \"12\": {\"书名\": \"机械制图\", \"作者\": \"何老师\", \"出版社\": \"null\"}}'),(327,'33333',NULL,'333333333333333333333','2018-08-18 01:13:26','{\"10\": {\"书名\": \"模具\", \"作者\": \"李老师\", \"出版社\": \"null\"}, \"11\": {\"书名\": \"体育\", \"作者\": \"李老师\", \"出版社\": \"null\"}}');
/*!40000 ALTER TABLE `favor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-19 23:55:44

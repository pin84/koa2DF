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
-- Table structure for table `banner_table`
--

DROP TABLE IF EXISTS `banner_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banner_table` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL COMMENT '大标题',
  `description` varchar(300) NOT NULL COMMENT '描述文字',
  `href` varchar(300) NOT NULL COMMENT '点击链接',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banner_table`
--

LOCK TABLES `banner_table` WRITE;
/*!40000 ALTER TABLE `banner_table` DISABLE KEYS */;
INSERT INTO `banner_table` VALUES (5,'特斯拉的中国独资工厂将在上海临港落户 ','据了解gsdfsd','http://tech.163.cosds'),(6,'阿里腾讯继续争霸共享单车，烧钱能维持多久','网易科技讯 7月10日消息，《南华早报》（SCMP）发布文章称，共享单车是中国两大互联网巨头围绕电商主导地位的争斗的新战线。阿里巴巴和腾讯均大举押注共享单车市场，来将消费者圈到各自的电商生态圈当中。','http://tech.163.com/18/0710/01/DMAKA1IQ00097U7R.html'),(7,'对标iPad！微软发布入门级平板Surface Go','网易科技讯 据外媒综合消息，微软于北京时间7月10日早上推出了平板电脑Surface Go，这是一款体积较小、功能也较Pro系列弱的Surface设备，也是继Surface 3之后推出的又一廉价Surface设备。Surface Go采用10英寸屏幕，集成支架，Windows 10以及与Surface Pro类似的设计，起价为399美元。Surface Go从7月10日开始接受预订，并将在8月发货。 Surface Go并没有改变微软的Surface设计理念——它实际上看起来就像是自2014年的Surface Pro 3以来一直存在的Surface Pro设计的小改款。','http://tech.163.com/18/0710/14/DMC1FCD800097U7T.html'),(8,'香港共享单车Gobee.bike宣布结束运营 活了15个月','Gobee.Bike指出，由于业务未能取得盈利，且庞大的单车维修费用使得运营困难，于是有此决定。用户可以在1周之内继续使用单车，至7月17日正式结束运营。用户可在一个月内申请全数退款。','http://tech.163.com/18/0710/14/DMC22LCR00097U7R.html'),(10,'sfsd','sdfdsf','dfsf');
/*!40000 ALTER TABLE `banner_table` ENABLE KEYS */;
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

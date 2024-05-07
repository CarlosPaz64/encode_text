CREATE DATABASE  IF NOT EXISTS `encode_text` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `encode_text`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: encode_text
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `conversiones_con_usuario`
--

DROP TABLE IF EXISTS `conversiones_con_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversiones_con_usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `texto_por_convertir_usuario` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `texto_criptado_usuario` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `algoritmo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `clave_con_usuario` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `fecha_encode_con_usuario` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `conversiones_con_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversiones_con_usuario`
--

LOCK TABLES `conversiones_con_usuario` WRITE;
/*!40000 ALTER TABLE `conversiones_con_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversiones_con_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversiones_sin_usuario`
--

DROP TABLE IF EXISTS `conversiones_sin_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversiones_sin_usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `texto_por_convertir` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `texto_criptado` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `algoritmo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `clave_sin_usuario` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `fecha_encode_sin_usuario` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversiones_sin_usuario`
--

LOCK TABLES `conversiones_sin_usuario` WRITE;
/*!40000 ALTER TABLE `conversiones_sin_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversiones_sin_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido_pat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido_mat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contrasenia_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_unique` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veces_login`
--

DROP TABLE IF EXISTS `veces_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veces_login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `veces_login_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veces_login`
--

LOCK TABLES `veces_login` WRITE;
/*!40000 ALTER TABLE `veces_login` DISABLE KEYS */;
/*!40000 ALTER TABLE `veces_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veces_logout`
--

DROP TABLE IF EXISTS `veces_logout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veces_logout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `fecha_logout` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veces_logout`
--

LOCK TABLES `veces_logout` WRITE;
/*!40000 ALTER TABLE `veces_logout` DISABLE KEYS */;
/*!40000 ALTER TABLE `veces_logout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'encode_text'
--

--
-- Dumping routines for database 'encode_text'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-06 22:56:32

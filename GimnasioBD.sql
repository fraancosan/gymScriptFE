CREATE DATABASE  IF NOT EXISTS `gimnasio` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gimnasio`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: gimnasio
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `actividad`
--

DROP TABLE IF EXISTS `actividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividad` (
  `idActividad` int NOT NULL AUTO_INCREMENT,
  `nombreAct` varchar(45) NOT NULL,
  `descripcionAct` varchar(45) NOT NULL,
  PRIMARY KEY (`idActividad`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad`
--

LOCK TABLES `actividad` WRITE;
/*!40000 ALTER TABLE `actividad` DISABLE KEYS */;
/*!40000 ALTER TABLE `actividad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checkin`
--

DROP TABLE IF EXISTS `checkin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkin` (
  `idCheckIn` int NOT NULL AUTO_INCREMENT,
  `idCli` int NOT NULL,
  `idSede` int NOT NULL,
  `fechaHora` datetime NOT NULL,
  PRIMARY KEY (`idCheckIn`),
  UNIQUE KEY `idCli_UNIQUE` (`idCli`),
  KEY `fk_idSede_idx` (`idSede`),
  CONSTRAINT `fk_cli_check` FOREIGN KEY (`idCli`) REFERENCES `cliente` (`idCliente`),
  CONSTRAINT `fk_idSede` FOREIGN KEY (`idSede`) REFERENCES `sede` (`idSede`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkin`
--

LOCK TABLES `checkin` WRITE;
/*!40000 ALTER TABLE `checkin` DISABLE KEYS */;
/*!40000 ALTER TABLE `checkin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `dniCli` int NOT NULL,
  `nombreCli` varchar(45) NOT NULL,
  `apellidoCli` varchar(45) NOT NULL,
  `telefonoCli` int DEFAULT NULL,
  `mailCli` varchar(60) NOT NULL,
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `constraseña` varchar(45) NOT NULL,
  `rol` varchar(45) NOT NULL,
  PRIMARY KEY (`idCliente`),
  UNIQUE KEY `mailCli_UNIQUE` (`mailCli`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuota`
--

DROP TABLE IF EXISTS `cuota`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuota` (
  `fechaPagoCuota` date NOT NULL,
  `importeCuota` float NOT NULL,
  `fechaVencCuota` date DEFAULT NULL,
  `idCouta` int NOT NULL AUTO_INCREMENT,
  `idInscripcion` int NOT NULL,
  PRIMARY KEY (`idCouta`),
  UNIQUE KEY `idInscripcion_UNIQUE` (`idInscripcion`),
  UNIQUE KEY `fechaPagoCuota_UNIQUE` (`fechaPagoCuota`),
  KEY `fk_insc_couta_idx` (`idInscripcion`),
  CONSTRAINT `fk_insc_couta` FOREIGN KEY (`idInscripcion`) REFERENCES `inscripcion` (`idInscripcion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuota`
--

LOCK TABLES `cuota` WRITE;
/*!40000 ALTER TABLE `cuota` DISABLE KEYS */;
/*!40000 ALTER TABLE `cuota` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entrenador`
--

DROP TABLE IF EXISTS `entrenador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entrenador` (
  `idEntrenador` int NOT NULL AUTO_INCREMENT,
  `nombreEnt` varchar(45) NOT NULL,
  `apellidoEnt` varchar(45) NOT NULL,
  `telefono` int DEFAULT NULL,
  `horarioTrabajoEnt` varchar(45) NOT NULL,
  PRIMARY KEY (`idEntrenador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrenador`
--

LOCK TABLES `entrenador` WRITE;
/*!40000 ALTER TABLE `entrenador` DISABLE KEYS */;
/*!40000 ALTER TABLE `entrenador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horario`
--

DROP TABLE IF EXISTS `horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horario` (
  `horaDia` datetime NOT NULL,
  `duracion` time NOT NULL,
  `idSedeAct` int NOT NULL,
  `idHorario` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idHorario`),
  UNIQUE KEY `horaDia_UNIQUE` (`horaDia`),
  UNIQUE KEY `idSedeAct_UNIQUE` (`idSedeAct`),
  CONSTRAINT `fk_sa_h` FOREIGN KEY (`idSedeAct`) REFERENCES `sedes_actividades` (`idSedes_actividades`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horario`
--

LOCK TABLES `horario` WRITE;
/*!40000 ALTER TABLE `horario` DISABLE KEYS */;
/*!40000 ALTER TABLE `horario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripcion`
--

DROP TABLE IF EXISTS `inscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripcion` (
  `idPlan` int NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date NOT NULL,
  `idSede` int NOT NULL,
  `idInscripcion` int NOT NULL AUTO_INCREMENT,
  `idCliente` int NOT NULL,
  PRIMARY KEY (`idInscripcion`),
  UNIQUE KEY `idUsuario_UNIQUE` (`idCliente`),
  UNIQUE KEY `idPlan_UNIQUE` (`idPlan`),
  KEY `fk_idPlan_idx` (`idPlan`),
  KEY `fk_sede-insc_idx` (`idSede`),
  CONSTRAINT `fk_cli_insc` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`),
  CONSTRAINT `fk_plan-Insc` FOREIGN KEY (`idPlan`) REFERENCES `plan` (`idPlan`) ON UPDATE CASCADE,
  CONSTRAINT `fk_sede-insc` FOREIGN KEY (`idSede`) REFERENCES `sede` (`idSede`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripcion`
--

LOCK TABLES `inscripcion` WRITE;
/*!40000 ALTER TABLE `inscripcion` DISABLE KEYS */;
/*!40000 ALTER TABLE `inscripcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localidad`
--

DROP TABLE IF EXISTS `localidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localidad` (
  `idLocalidad` int NOT NULL AUTO_INCREMENT,
  `nombreLoc` varchar(45) NOT NULL,
  `idProvincia` int NOT NULL,
  `codPostal` varchar(45) NOT NULL,
  PRIMARY KEY (`idLocalidad`),
  UNIQUE KEY `codPostal_UNIQUE` (`codPostal`),
  KEY `fk_idProvincia_idx` (`idProvincia`),
  CONSTRAINT `fk_idProvincia` FOREIGN KEY (`idProvincia`) REFERENCES `provincia` (`idProvincia`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localidad`
--

LOCK TABLES `localidad` WRITE;
/*!40000 ALTER TABLE `localidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `localidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan`
--

DROP TABLE IF EXISTS `plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan` (
  `idPlan` int NOT NULL AUTO_INCREMENT,
  `nombrePlan` varchar(45) NOT NULL,
  `descripcionPlan` varchar(45) NOT NULL,
  `precioMensualPlan` float NOT NULL,
  PRIMARY KEY (`idPlan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan`
--

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
/*!40000 ALTER TABLE `plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan-actividad`
--

DROP TABLE IF EXISTS `plan-actividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan-actividad` (
  `idActividad` int NOT NULL,
  `idPlan` int NOT NULL,
  `idPlanAct` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idPlanAct`),
  UNIQUE KEY `idActividad_UNIQUE` (`idActividad`),
  UNIQUE KEY `idPlan_UNIQUE` (`idPlan`),
  KEY `fk_plan-act_idx` (`idPlan`),
  CONSTRAINT `fk_act-plan` FOREIGN KEY (`idActividad`) REFERENCES `actividad` (`idActividad`),
  CONSTRAINT `fk_plan-act` FOREIGN KEY (`idPlan`) REFERENCES `plan` (`idPlan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan-actividad`
--

LOCK TABLES `plan-actividad` WRITE;
/*!40000 ALTER TABLE `plan-actividad` DISABLE KEYS */;
/*!40000 ALTER TABLE `plan-actividad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provincia`
--

DROP TABLE IF EXISTS `provincia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provincia` (
  `idProvincia` int NOT NULL AUTO_INCREMENT,
  `nombreProv` varchar(45) NOT NULL,
  PRIMARY KEY (`idProvincia`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provincia`
--

LOCK TABLES `provincia` WRITE;
/*!40000 ALTER TABLE `provincia` DISABLE KEYS */;
/*!40000 ALTER TABLE `provincia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salon`
--

DROP TABLE IF EXISTS `salon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salon` (
  `idSalon` int NOT NULL AUTO_INCREMENT,
  `descripcionSal` varchar(60) NOT NULL,
  `capacidadSal` int NOT NULL,
  `nroSalon` varchar(45) NOT NULL,
  PRIMARY KEY (`idSalon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salon`
--

LOCK TABLES `salon` WRITE;
/*!40000 ALTER TABLE `salon` DISABLE KEYS */;
/*!40000 ALTER TABLE `salon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sede`
--

DROP TABLE IF EXISTS `sede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sede` (
  `idSede` int NOT NULL AUTO_INCREMENT,
  `direccionSede` varchar(60) NOT NULL,
  `idLocalidad` int NOT NULL,
  PRIMARY KEY (`idSede`),
  KEY `fk_idLocalidad_idx` (`idLocalidad`),
  CONSTRAINT `fk_idLocalidad` FOREIGN KEY (`idLocalidad`) REFERENCES `localidad` (`idLocalidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sede`
--

LOCK TABLES `sede` WRITE;
/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
/*!40000 ALTER TABLE `sede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sede-act_entrenadores`
--

DROP TABLE IF EXISTS `sede-act_entrenadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sede-act_entrenadores` (
  `idEntrenador` int NOT NULL,
  `idSedeActEnt` int NOT NULL AUTO_INCREMENT,
  `idSedeAct` int NOT NULL,
  PRIMARY KEY (`idSedeActEnt`),
  UNIQUE KEY `idSedeAct_UNIQUE` (`idSedeAct`),
  UNIQUE KEY `idEntrenador_UNIQUE` (`idEntrenador`),
  KEY `fk_ent_idx` (`idEntrenador`),
  CONSTRAINT `fk_ent` FOREIGN KEY (`idEntrenador`) REFERENCES `entrenador` (`idEntrenador`),
  CONSTRAINT `fk_sa_ent` FOREIGN KEY (`idSedeAct`) REFERENCES `sedes_actividades` (`idSedes_actividades`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sede-act_entrenadores`
--

LOCK TABLES `sede-act_entrenadores` WRITE;
/*!40000 ALTER TABLE `sede-act_entrenadores` DISABLE KEYS */;
/*!40000 ALTER TABLE `sede-act_entrenadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sedes_actividades`
--

DROP TABLE IF EXISTS `sedes_actividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sedes_actividades` (
  `idSede` int NOT NULL,
  `idActividad` int NOT NULL,
  `idSalon` int NOT NULL,
  `idSedes_actividades` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idSedes_actividades`),
  UNIQUE KEY `idSede_UNIQUE` (`idSede`),
  UNIQUE KEY `idActividad_UNIQUE` (`idActividad`),
  KEY `fk_idSalon_idx` (`idSalon`),
  KEY `fk_act-sa_idx` (`idActividad`),
  CONSTRAINT `fk_act-sa` FOREIGN KEY (`idActividad`) REFERENCES `actividad` (`idActividad`),
  CONSTRAINT `fk_salon-sa` FOREIGN KEY (`idSalon`) REFERENCES `salon` (`idSalon`),
  CONSTRAINT `fk_sede-sa` FOREIGN KEY (`idSede`) REFERENCES `sede` (`idSede`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sedes_actividades`
--

LOCK TABLES `sedes_actividades` WRITE;
/*!40000 ALTER TABLE `sedes_actividades` DISABLE KEYS */;
/*!40000 ALTER TABLE `sedes_actividades` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-06 20:56:26

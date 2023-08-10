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
  `decripcionAct` varchar(45) NOT NULL,
  PRIMARY KEY (`idActividad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `dniCli` int NOT NULL,
  `idSede` int NOT NULL,
  `fechaHora` datetime NOT NULL,
  PRIMARY KEY (`idCheckIn`,`dniCli`),
  KEY `fk_dniCliente_idx` (`dniCli`),
  KEY `fk_idSede_idx` (`idSede`),
  CONSTRAINT `fk_dniCliente` FOREIGN KEY (`dniCli`) REFERENCES `cliente` (`dniCli`),
  CONSTRAINT `fk_idSede` FOREIGN KEY (`idSede`) REFERENCES `sede` (`idSede`)
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
  `dniCli` int NOT NULL AUTO_INCREMENT,
  `nombreCli` varchar(45) NOT NULL,
  `apellidoCli` varchar(45) NOT NULL,
  `telefonoCli` int DEFAULT NULL,
  `mailCli` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`dniCli`)
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
  `dniCli` int NOT NULL,
  `idPlan` int NOT NULL,
  `fechaPagoCuota` date NOT NULL,
  `importeCuota` float NOT NULL,
  `fechaVencCuota` date DEFAULT NULL,
  PRIMARY KEY (`dniCli`,`idPlan`),
  CONSTRAINT `fk_couta-Insc` FOREIGN KEY (`dniCli`, `idPlan`) REFERENCES `inscripcion` (`dniCli`, `idPlan`)
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
  `idActividad` int NOT NULL,
  `horaDia` datetime NOT NULL,
  `duracion` time NOT NULL,
  `idSede` int NOT NULL,
  KEY `fk_horario-sa_idx` (`idActividad`,`idSede`),
  CONSTRAINT `fk_horario-sa` FOREIGN KEY (`idActividad`, `idSede`) REFERENCES `sedes_actividades` (`idActividad`, `idSede`)
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
  `dniCli` int NOT NULL,
  `idPlan` int NOT NULL,
  `fechaAlta` date NOT NULL,
  `fechaBaja` date NOT NULL,
  `idSede` int NOT NULL,
  PRIMARY KEY (`dniCli`,`idPlan`),
  KEY `fk_idPlan_idx` (`idPlan`),
  KEY `fk_sede-insc_idx` (`idSede`),
  CONSTRAINT `fk_cli-Insc` FOREIGN KEY (`dniCli`) REFERENCES `cliente` (`dniCli`),
  CONSTRAINT `fk_plan-Insc` FOREIGN KEY (`idPlan`) REFERENCES `plan` (`idPlan`),
  CONSTRAINT `fk_sede-insc` FOREIGN KEY (`idSede`) REFERENCES `sede` (`idSede`)
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
  PRIMARY KEY (`idLocalidad`),
  KEY `fk_idProvincia_idx` (`idProvincia`),
  CONSTRAINT `fk_idProvincia` FOREIGN KEY (`idProvincia`) REFERENCES `provincia` (`idProvincia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  PRIMARY KEY (`idActividad`,`idPlan`),
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
-- Table structure for table `provincia`
--

DROP TABLE IF EXISTS `provincia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provincia` (
  `idProvincia` int NOT NULL AUTO_INCREMENT,
  `nombreProv` varchar(45) NOT NULL,
  PRIMARY KEY (`idProvincia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `idSede` int NOT NULL,
  `idActividad` int NOT NULL,
  `idEntrenador` int NOT NULL,
  PRIMARY KEY (`idSede`,`idActividad`,`idEntrenador`),
  KEY `fk_ent_idx` (`idEntrenador`),
  CONSTRAINT `fk_ent` FOREIGN KEY (`idEntrenador`) REFERENCES `entrenador` (`idEntrenador`),
  CONSTRAINT `fk_sedeActEnt` FOREIGN KEY (`idSede`, `idActividad`) REFERENCES `sedes_actividades` (`idSede`, `idActividad`)
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
  PRIMARY KEY (`idSede`,`idActividad`),
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

-- Dump completed on 2023-08-10 10:25:46

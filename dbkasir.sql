-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: kasir
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategoris`
--

DROP TABLE IF EXISTS `kategoris`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kategoris` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategoris`
--

LOCK TABLES `kategoris` WRITE;
/*!40000 ALTER TABLE `kategoris` DISABLE KEYS */;
INSERT INTO `kategoris` VALUES (3,'Pop it','2025-06-15 11:09:11','2025-06-18 18:49:05'),(4,'Makeup','2025-06-15 18:40:55','2025-06-15 18:40:55'),(7,'Hp mainan','2025-06-18 18:37:26','2025-06-18 18:37:26'),(8,'Boneka boba','2025-06-18 18:42:18','2025-06-18 18:42:18'),(9,'Setting sprei','2025-06-18 18:47:39','2025-06-18 18:47:39'),(10,'Bowling','2025-06-18 18:48:58','2025-06-18 18:48:58'),(11,'Lego','2025-06-18 18:50:47','2025-06-18 18:50:47'),(13,'Piano','2025-06-18 18:51:17','2025-06-18 18:51:17'),(14,'Pistol','2025-06-18 18:51:23','2025-06-18 18:51:23');
/*!40000 ALTER TABLE `kategoris` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_reset_tokens_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2024_05_19_014447_create_kategoris_table',1),(6,'2024_05_19_015031_create_produks_table',1),(7,'2024_05_19_060058_create_transaksis_table',1),(8,'2024_07_15_112311_create_suplays_table',1),(9,'2025_06_24_074258_add_role_to_users_table',2),(10,'2025_06_24_115538_create_tokos_table',3),(11,'2025_06_24_120813_remove_nama_toko_alamat_from_users_table',4);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'auth_token','ed85ad484676542437b90a438e728084fe58e89b48345bb9e14c78270b0d580c','[\"*\"]',NULL,NULL,'2025-06-14 17:14:13','2025-06-14 17:14:13'),(2,'App\\Models\\User',1,'auth_token','cba4e3f3d56148eb02a523022b5c4fef16e065898e8d62b3d97ccc986541212d','[\"*\"]','2025-06-14 17:14:30',NULL,'2025-06-14 17:14:22','2025-06-14 17:14:30'),(4,'App\\Models\\User',1,'auth_token','9eafeb4f185a40474e3ed44a20fe41bf136052be8f4f71339c488cd7c7167331','[\"*\"]','2025-06-15 09:39:06',NULL,'2025-06-15 09:37:55','2025-06-15 09:39:06'),(5,'App\\Models\\User',1,'auth_token','ff09dc51dd8514042d8141b0e22a7147c884764eec2db8573a8e60bd559bb032','[\"*\"]','2025-06-15 10:19:36',NULL,'2025-06-15 09:40:18','2025-06-15 10:19:36'),(6,'App\\Models\\User',1,'auth_token','2234cac67b004d1a308ecb69812b2f5de296e420323dfa24166116b1094fa087','[\"*\"]',NULL,NULL,'2025-06-15 10:19:39','2025-06-15 10:19:39'),(8,'App\\Models\\User',1,'auth_token','d38f05c67321e3b9bb2d403a902fd23a89a0b91bdff1a56a647152cdd1608672','[\"*\"]',NULL,NULL,'2025-06-15 10:33:02','2025-06-15 10:33:02'),(9,'App\\Models\\User',1,'auth_token','4a6dfe463f6ba40cb1cbc4654f2ce7256f76d5e37e0d89761bc71f4a6eee931c','[\"*\"]',NULL,NULL,'2025-06-15 10:33:19','2025-06-15 10:33:19'),(11,'App\\Models\\User',1,'auth_token','8f154148fb1865e14b7a3135d73208636baf09dacdaef4c00650099fec480a0d','[\"*\"]',NULL,NULL,'2025-06-15 10:44:15','2025-06-15 10:44:15'),(14,'App\\Models\\User',1,'auth_token','58334896ae8d76785672fdf53af4be4efcc31f34af0fa8764d79d94ee7a9c4bb','[\"*\"]','2025-06-26 01:32:53',NULL,'2025-06-15 11:08:58','2025-06-26 01:32:53'),(18,'App\\Models\\User',1,'auth_token','134f323ad5c605ac08c4911ba50de5582cd7cf9a957cf6a571dec1df1321977c','[\"*\"]','2025-06-18 00:18:25',NULL,'2025-06-18 00:18:01','2025-06-18 00:18:25'),(20,'App\\Models\\User',1,'auth_token','0a03a063be9c360f5ff8973e242cded2f0b76659507ba7e9e2adc5ec964992f2','[\"*\"]','2025-06-20 15:10:42',NULL,'2025-06-20 15:05:31','2025-06-20 15:10:42'),(21,'App\\Models\\User',1,'auth_token','68448a6d5cd733793b14897feeec6ba47700f6c25b9ca99a5826d95a76795fc4','[\"*\"]',NULL,NULL,'2025-06-24 07:35:42','2025-06-24 07:35:42'),(26,'App\\Models\\User',2,'auth_token','39dddbe7b72e8e44533f8d529ae2d1b209536b8b0929368de500b7a735c8d985','[\"*\"]','2025-06-24 12:02:14',NULL,'2025-06-24 10:44:21','2025-06-24 12:02:14'),(29,'App\\Models\\User',1,'auth_token','4d3ea609178d1df09324f11d80598a9175d8772ca2247fb3b56f0799a5ab24b2','[\"*\"]','2025-06-24 18:10:22',NULL,'2025-06-24 16:07:16','2025-06-24 18:10:22'),(30,'App\\Models\\User',1,'auth_token','55d91bf23bd537324e1060fc2b3cf55e0e41368ed94e78b8ce241dcb3ec22499','[\"*\"]','2025-06-25 14:38:07',NULL,'2025-06-24 18:11:08','2025-06-25 14:38:07'),(33,'App\\Models\\User',1,'auth_token','dc1f814a91c55964bb14302733f9457623b02d2e0dfac1234649829a7f00756e','[\"*\"]','2025-06-24 18:44:16',NULL,'2025-06-24 18:44:14','2025-06-24 18:44:16'),(35,'App\\Models\\User',1,'auth_token','a4255769153f8e58e16ef0857e163f07d32e99343c48bdc87b64ef3450755cd0','[\"*\"]','2025-06-30 01:29:38',NULL,'2025-06-25 14:51:03','2025-06-30 01:29:38'),(38,'App\\Models\\User',1,'auth_token','b91f8b57f38d2b696fbf22b43aa6f3a760c16cca3bf378cd57f30fe63fa15fc6','[\"*\"]','2025-07-01 13:53:55',NULL,'2025-06-25 20:00:51','2025-07-01 13:53:55'),(39,'App\\Models\\User',1,'auth_token','83da5f7775c2c5c6203617a04f979ba197c5ba126e7f81135ee1b2926e969240','[\"*\"]','2025-06-30 19:41:20',NULL,'2025-06-30 17:46:21','2025-06-30 19:41:20'),(40,'App\\Models\\User',1,'auth_token','fc58058a30b5affff1a08e2edd186fb78de3fc6e1cbc30c403a88f313827956a','[\"*\"]','2025-06-30 18:55:26',NULL,'2025-06-30 18:55:25','2025-06-30 18:55:26');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produks`
--

DROP TABLE IF EXISTS `produks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `barcode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kategori_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `merk` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stok` bigint NOT NULL,
  `beli` bigint NOT NULL,
  `jual` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `produks_kategori_id_foreign` (`kategori_id`),
  CONSTRAINT `produks_kategori_id_foreign` FOREIGN KEY (`kategori_id`) REFERENCES `kategoris` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produks`
--

LOCK TABLES `produks` WRITE;
/*!40000 ALTER TABLE `produks` DISABLE KEYS */;
INSERT INTO `produks` VALUES (3,'images/NbPJoVKiT1ZouZvIXGTsKt7wdFkNS8gRHKVaEflc.jpg','123hjj678',3,'Pop it','Kidz',27,8500,11000,'2025-06-15 12:35:51','2025-06-25 13:32:03'),(4,'images/0vM7nRdfkXu206S4usEWz4Ul8NuFuykwtSbV2ybo.jpg','1230550gf',4,'makeup set pink mini','Kidz',18,12000,17000,'2025-06-15 18:42:11','2025-06-18 18:49:21'),(5,'images/SqkG9bCbDqzD8TxpjVPJv84CjAxSkVVn3e0Stg8A.jpg','4dcvfe',7,'Hp mainan lipat','Kidz',10,8000,15000,'2025-06-18 18:40:55','2025-06-25 13:32:03'),(6,'images/wZSAW0M1ART3MalsRgEShYggrQMaZvFhzcvF2zFM.jpg','12bob23a',8,'Boneka Boba warna warni','sweet doll',11,25000,32500,'2025-06-18 18:43:47','2025-06-18 18:43:47'),(7,'images/wg6Ss5sT5Hmvuf8uFe9vc0xUhljakobOxwOLPSnD.jpg','13bob12a',8,'Boneka Boba mini kaki','sweet doll',12,20000,25000,'2025-06-18 18:44:41','2025-06-18 18:44:41'),(8,'images/QMogqVomt41CwbTCzo6KOOuZEECY1Ne2smE9MZJB.jpg','15525boba',8,'Boneka Boba mini nyala','sweet doll',11,17500,20000,'2025-06-18 18:45:38','2025-06-18 18:45:38'),(9,'images/Qr9msiNIem0IrshYSUtQSP1DF1oNulUa7kyU1fel.jpg','1209bob23a',8,'Boneka Boba medium','sweet doll',23,42000,50000,'2025-06-18 18:47:08','2025-06-25 13:37:15'),(10,'images/paMpnLaFie3UBHRPNhn2RrOdXQTVElkf3GLfs0p9.jpg','123sp',9,'Setting sprei','Kidz',74,7500,25000,'2025-06-18 18:48:20','2025-06-25 14:21:02'),(11,'images/GlhfkSJOvKIxTVhPD3cjU8CfzCdAJvkeEF3xF4zb.jpg','34dfc5',10,'Bowling 10pcs','mattel',11,12000,20000,'2025-06-18 18:50:04','2025-06-18 18:58:53'),(12,'images/AOv0yHd2u73pbHkKOWh6QE9P808G2BpkYIdpwote.jpg','34ed4',11,'Lego isi 25pcs','Smart Block',12,15000,17000,'2025-06-18 18:52:35','2025-06-18 18:52:35'),(13,'images/OXh4z4lQiGQaiYTsviTItqlv0oQiDrcBw3ZsIkqT.jpg','343le',11,'Lego isi 30pcs','Smart Block',17,19000,22500,'2025-06-18 18:53:39','2025-06-18 18:57:35'),(14,'images/53XS3lvJPv4yL3MKgKyEIKCfcMAZ0cyf2xdkK35I.jpg','ewdd2pst',14,'Pistol mainan','Hasbro',20,7500,12500,'2025-06-18 18:54:57','2025-06-18 18:54:57'),(15,'images/xLrwG0SnkLLibfoQRAmDOphY352RlAt9F34lCV1s.jpg','43d4',13,'Piano mini lengkung','Kidz',12,20000,25000,'2025-06-18 18:55:49','2025-06-18 18:55:49');
/*!40000 ALTER TABLE `produks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suplays`
--

DROP TABLE IF EXISTS `suplays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suplays` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `produk_id` bigint unsigned NOT NULL,
  `jumlah` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `suplays_produk_id_foreign` (`produk_id`),
  CONSTRAINT `suplays_produk_id_foreign` FOREIGN KEY (`produk_id`) REFERENCES `produks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suplays`
--

LOCK TABLES `suplays` WRITE;
/*!40000 ALTER TABLE `suplays` DISABLE KEYS */;
INSERT INTO `suplays` VALUES (1,3,10,'2025-06-15 18:43:03','2025-06-15 18:43:03'),(2,13,5,'2025-06-18 18:57:35','2025-06-18 18:57:35'),(3,3,2,'2025-06-18 18:58:07','2025-06-18 18:58:07'),(4,9,11,'2025-06-25 13:37:01','2025-06-25 13:37:15'),(5,10,50,'2025-06-25 14:21:02','2025-06-25 14:21:02');
/*!40000 ALTER TABLE `suplays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokos`
--

DROP TABLE IF EXISTS `tokos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci,
  `no_telp` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokos`
--

LOCK TABLES `tokos` WRITE;
/*!40000 ALTER TABLE `tokos` DISABLE KEYS */;
INSERT INTO `tokos` VALUES (1,'Sumber Rejeki Toys','Jl. Raya Kalipare','081234567890','2025-06-24 12:20:41','2025-06-25 13:38:10');
/*!40000 ALTER TABLE `tokos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaksis`
--

DROP TABLE IF EXISTS `transaksis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaksis` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `produk_id` bigint unsigned NOT NULL,
  `jual` bigint NOT NULL,
  `beli` bigint NOT NULL,
  `jumlah` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `transaksis_produk_id_foreign` (`produk_id`),
  CONSTRAINT `transaksis_produk_id_foreign` FOREIGN KEY (`produk_id`) REFERENCES `produks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaksis`
--

LOCK TABLES `transaksis` WRITE;
/*!40000 ALTER TABLE `transaksis` DISABLE KEYS */;
INSERT INTO `transaksis` VALUES (1,4,17000,12000,2,'2025-06-15 18:43:51','2025-06-15 18:43:52'),(2,3,10000,8000,1,'2025-06-15 19:27:54','2025-06-15 19:27:54'),(3,11,20000,12000,1,'2025-06-18 18:58:53','2025-06-18 18:58:53'),(4,3,11000,8500,1,'2025-06-24 15:24:26','2025-06-24 15:24:27'),(5,3,11000,8500,1,'2025-06-24 15:25:27','2025-06-24 15:25:28'),(6,3,11000,8500,1,'2025-06-24 16:06:58','2025-06-24 16:06:58'),(7,5,15000,8000,1,'2025-06-24 18:43:25','2025-06-24 18:43:25'),(8,10,25000,7500,1,'2025-06-25 13:32:03','2025-06-25 13:32:03'),(9,3,11000,8500,1,'2025-06-25 13:32:03','2025-06-25 13:32:03'),(10,5,15000,8000,1,'2025-06-25 13:32:03','2025-06-25 13:32:03');
/*!40000 ALTER TABLE `transaksis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_telp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'kasir',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Sumber Rejeki Toys','081554223','admin@mail.com','2025-06-24 12:20:41','$2y$10$i27GzkwpGZk8ZNA8klizYu9j.CxbD2SzQu.ep15Bb2ihV5pbk5P2m','Dj8MPtAKM1','2025-06-24 12:20:41','2025-06-25 12:10:58','admin'),(2,'Kasir','089456789123','kasir@mail.com',NULL,'$2y$10$86XGbwFCLh5zrfdVSqTY6OSJCQYTCzkeZhJudMOe5Eo4UyilvRR9C',NULL,'2025-06-24 15:42:51','2025-06-25 14:47:37','kasir'),(3,'Bintang','02152005','bintang@mail.com',NULL,'$2y$10$mxdM0ECDwx9DXgPMbtPjoeHUTkM0ZKm6XclkvSJ56OczntRgT69Vu',NULL,'2025-06-25 13:31:21','2025-06-25 13:31:21','kasir');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-01 14:47:13

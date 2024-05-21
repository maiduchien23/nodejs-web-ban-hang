-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.0.3-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for product_management
CREATE DATABASE IF NOT EXISTS `product_management` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `product_management`;

-- Dumping structure for table product_management.advertisements
CREATE TABLE IF NOT EXISTS `advertisements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.advertisements: ~0 rows (approximately)

-- Dumping structure for table product_management.brands
CREATE TABLE IF NOT EXISTS `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.brands: ~3 rows (approximately)
INSERT INTO `brands` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(6, 'Nhật Bản', '2024-04-03 15:22:30', '2024-04-03 15:22:31'),
	(9, 'Trung quốc', '2024-04-10 09:27:37', '2024-04-10 09:27:37'),
	(12, 'Mỹ', '2024-04-19 11:53:20', '2024-04-19 11:53:20');

-- Dumping structure for table product_management.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `createdBy` (`createdBy`),
  KEY `updatedBy` (`updatedBy`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`),
  CONSTRAINT `categories_ibfk_2` FOREIGN KEY (`updatedBy`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.categories: ~3 rows (approximately)
INSERT INTO `categories` (`id`, `name`, `priority`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`) VALUES
	(9, 'Bàn', 1, '2024-04-08 10:41:43', 20, '2024-04-08 10:41:43', 20),
	(12, 'ghế gỗ', 1, '2024-04-19 11:53:03', 20, '2024-04-19 11:53:03', 20),
	(14, 'Tủ', 2, '2024-04-19 11:59:53', 20, '2024-04-19 11:59:53', 20);

-- Dumping structure for table product_management.comboitems
CREATE TABLE IF NOT EXISTS `comboitems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comboId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comboId` (`comboId`),
  KEY `productId` (`productId`),
  CONSTRAINT `comboitems_ibfk_1` FOREIGN KEY (`comboId`) REFERENCES `combos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comboitems_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.comboitems: ~4 rows (approximately)
INSERT INTO `comboitems` (`id`, `comboId`, `productId`, `quantity`, `createdAt`, `updatedAt`) VALUES
	(29, 52, 60, 6, '2024-05-08 10:45:27', '2024-05-08 10:45:27'),
	(30, 52, 65, 22, '2024-05-08 10:45:27', '2024-05-08 10:45:27'),
	(31, 54, 65, 22, '2024-05-13 13:47:23', '2024-05-13 13:47:23'),
	(32, 54, 66, 5, '2024-05-13 13:47:23', '2024-05-13 13:47:23');

-- Dumping structure for table product_management.combos
CREATE TABLE IF NOT EXISTS `combos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.combos: ~2 rows (approximately)
INSERT INTO `combos` (`id`, `name`, `price`, `description`, `createdAt`, `updatedAt`) VALUES
	(52, 'Bàn', 200000, 'ádasdsa', '2024-05-08 10:45:27', '2024-05-08 10:45:27'),
	(54, 'combo5', 2000000, 'fghfg', '2024-05-13 13:47:23', '2024-05-13 13:47:23');

-- Dumping structure for table product_management.files
CREATE TABLE IF NOT EXISTS `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `extension` varchar(10) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.files: ~0 rows (approximately)

-- Dumping structure for table product_management.news
CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `publishDate` datetime DEFAULT NULL,
  `productUrl` text DEFAULT NULL,
  `metaTitle` varchar(255) DEFAULT NULL,
  `metaDescription` text DEFAULT NULL,
  `metaKeywords` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.news: ~2 rows (approximately)
INSERT INTO `news` (`id`, `title`, `content`, `author`, `publishDate`, `productUrl`, `metaTitle`, `metaDescription`, `metaKeywords`, `createdAt`, `updatedAt`) VALUES
	(3, 'ds', 'dsa', 'dá', '2024-05-01 07:00:00', 'https://www.facebook.com/', NULL, NULL, NULL, '2024-05-20 14:15:20', '2024-05-20 14:15:20'),
	(4, 'sdfsd', 'agfdhgf', 'dgafgd', '2024-05-10 07:00:00', 'https://www.youtube.com/', NULL, NULL, NULL, '2024-05-20 14:18:30', '2024-05-20 14:18:30');

-- Dumping structure for table product_management.orderdetails
CREATE TABLE IF NOT EXISTS `orderdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `pricePerUnit` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`),
  CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.orderdetails: ~2 rows (approximately)
INSERT INTO `orderdetails` (`id`, `orderId`, `productId`, `quantity`, `pricePerUnit`, `createdAt`, `updatedAt`) VALUES
	(48, 80, 60, 1, 19999990, '2024-05-15 15:22:12', '2024-05-15 15:22:12'),
	(49, 80, 65, 1, 200000, '2024-05-15 15:22:12', '2024-05-15 15:22:12');

-- Dumping structure for table product_management.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderCode` varchar(50) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `orderDate` datetime DEFAULT NULL,
  `totalAmount` decimal(10,0) DEFAULT NULL,
  `status` varchar(200) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `ward` varchar(100) DEFAULT NULL,
  `addressDetail` varchar(255) DEFAULT NULL,
  `orderNote` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `createdBy` (`createdBy`),
  KEY `updatedBy` (`updatedBy`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`updatedBy`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.orders: ~1 rows (approximately)
INSERT INTO `orders` (`id`, `orderCode`, `userId`, `orderDate`, `totalAmount`, `status`, `phone`, `province`, `district`, `ward`, `addressDetail`, `orderNote`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`) VALUES
	(80, '#35AXL1', 20, '2024-05-07 07:00:00', 20199990, 'Hoàn thành', '0869061648', 'Tỉnh Hà Giang', 'Thành phố Hà Giang', 'Phường Quang Trung', 'ádasdas', 'áddasd', '2024-05-15 15:22:12', NULL, '2024-05-16 10:55:44', NULL);

-- Dumping structure for table product_management.origincountries
CREATE TABLE IF NOT EXISTS `origincountries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.origincountries: ~0 rows (approximately)

-- Dumping structure for table product_management.otp
CREATE TABLE IF NOT EXISTS `otp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `otpCode` varchar(10) DEFAULT NULL,
  `expiryTime` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `otpCode` (`otpCode`),
  KEY `userId` (`userId`),
  CONSTRAINT `otp_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=546 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.otp: ~2 rows (approximately)
INSERT INTO `otp` (`id`, `userId`, `otpCode`, `expiryTime`, `createdAt`, `updatedAt`) VALUES
	(102, 30, '54367', '2024-03-28 10:41:27', '2024-03-28 10:40:27', '2024-03-28 10:40:27'),
	(545, 20, '16422', '2024-05-21 13:51:15', '2024-05-21 13:50:15', '2024-05-21 13:50:15');

-- Dumping structure for table product_management.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `values` varchar(150) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.permissions: ~40 rows (approximately)
INSERT INTO `permissions` (`id`, `values`, `createdAt`, `updatedAt`) VALUES
	(1, 'users.read', '2024-03-25 15:17:01', '2024-03-25 15:17:01'),
	(2, 'users.permission', '2024-03-25 15:17:01', '2024-03-25 15:17:01'),
	(3, 'roles.read', '2024-03-25 15:17:01', '2024-03-25 15:17:01'),
	(4, 'roles.add', '2024-03-25 15:17:01', '2024-03-25 15:17:01'),
	(5, 'roles.update', '2024-03-25 15:17:01', '2024-03-25 15:17:01'),
	(6, 'users.add', '2024-03-27 11:19:59', '2024-03-27 11:19:59'),
	(7, 'users.update', '2024-03-27 11:19:59', '2024-03-27 11:19:59'),
	(8, 'users.delete', '2024-03-27 11:19:59', '2024-03-27 11:19:59'),
	(9, 'roles.delete', '2024-03-27 15:56:45', '2024-03-27 15:56:45'),
	(10, 'products.read', '2024-04-03 09:46:07', '2024-04-03 09:46:07'),
	(11, 'products.add', '2024-04-03 09:46:07', '2024-04-03 09:46:07'),
	(12, 'products.update', '2024-04-03 09:46:07', '2024-04-03 09:46:07'),
	(13, 'products.delete', '2024-04-03 09:46:07', '2024-04-03 09:46:07'),
	(14, 'categories.read', '2024-04-08 10:29:47', '2024-04-08 10:29:47'),
	(15, 'categories.add', '2024-04-08 10:29:47', '2024-04-08 10:29:47'),
	(16, 'categories.update', '2024-04-08 10:29:47', '2024-04-08 10:29:47'),
	(17, 'categories.delete', '2024-04-08 10:29:47', '2024-04-08 10:29:47'),
	(18, 'brands.delete', '2024-04-08 15:55:40', '2024-04-08 15:55:40'),
	(19, 'brands.add', '2024-04-08 15:55:40', '2024-04-08 15:55:40'),
	(20, 'brand.read', '2024-04-08 15:55:40', '2024-04-08 15:55:40'),
	(21, 'brands.update', '2024-04-08 15:55:40', '2024-04-08 15:55:40'),
	(22, 'brands.read', '2024-04-10 09:05:30', '2024-04-10 09:05:30'),
	(23, 'colors.read', '2024-04-19 09:30:55', '2024-04-19 09:30:55'),
	(24, 'colors.add', '2024-04-19 09:30:55', '2024-04-19 09:30:55'),
	(25, '', '2024-04-19 09:30:55', '2024-04-19 09:30:55'),
	(26, '', '2024-04-19 09:30:55', '2024-04-19 09:30:55'),
	(27, 'colors.update', '2024-04-19 09:47:49', '2024-04-19 09:47:49'),
	(28, 'colors.delete', '2024-04-19 09:47:49', '2024-04-19 09:47:49'),
	(29, 'sizes.read', '2024-04-19 10:51:04', '2024-04-19 10:51:04'),
	(30, 'sizes.add', '2024-04-19 10:51:04', '2024-04-19 10:51:04'),
	(31, 'sizes.update', '2024-04-19 10:51:04', '2024-04-19 10:51:04'),
	(32, 'sizes.delete', '2024-04-19 10:51:04', '2024-04-19 10:51:04'),
	(33, 'productVariants.read', '2024-04-19 15:32:35', '2024-04-19 15:32:35'),
	(34, 'productVariants.add', '2024-04-19 15:32:35', '2024-04-19 15:32:35'),
	(35, 'productVariants.update', '2024-04-19 15:32:35', '2024-04-19 15:32:35'),
	(36, 'productVariants.delete', '2024-04-19 15:32:35', '2024-04-19 15:32:35'),
	(37, 'orders.read', '2024-05-16 13:09:00', '2024-05-16 13:09:00'),
	(38, 'orders.add', '2024-05-16 13:09:00', '2024-05-16 13:09:00'),
	(39, 'orders.update', '2024-05-16 13:09:00', '2024-05-16 13:09:00'),
	(40, 'orders.delete', '2024-05-16 13:09:00', '2024-05-16 13:09:00');

-- Dumping structure for table product_management.productattributes
CREATE TABLE IF NOT EXISTS `productattributes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) DEFAULT NULL,
  `attributeValueId` int(11) DEFAULT NULL,
  `attributeType` varchar(100) DEFAULT NULL,
  `attributeColor` varchar(4) DEFAULT NULL,
  `status` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `productattributes_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.productattributes: ~0 rows (approximately)

-- Dumping structure for table product_management.productcolors
CREATE TABLE IF NOT EXISTS `productcolors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.productcolors: ~2 rows (approximately)
INSERT INTO `productcolors` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(6, 'Đỏ', '2024-04-19 10:23:04', '2024-04-19 10:23:04'),
	(9, 'Vàng', '2024-04-19 10:37:31', '2024-04-19 10:37:31');

-- Dumping structure for table product_management.productimages
CREATE TABLE IF NOT EXISTS `productimages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `productimages_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.productimages: ~4 rows (approximately)
INSERT INTO `productimages` (`id`, `productId`, `imageUrl`, `createdAt`, `updatedAt`) VALUES
	(25, 65, '/uploads/file/Product_1713512331641.jpg', '2024-04-19 14:38:51', '2024-04-19 14:38:51'),
	(26, 66, '/uploads/file/Product_1713512424441.jpg', '2024-04-19 14:40:24', '2024-04-19 14:40:24'),
	(29, 60, '/uploads/file/Product_1713844584034.jpg', '2024-04-23 10:56:24', '2024-04-23 10:56:24'),
	(31, 68, '/uploads/file/Product_1714719502409.jpg', '2024-05-03 13:58:22', '2024-05-03 13:58:22');

-- Dumping structure for table product_management.productmaterials
CREATE TABLE IF NOT EXISTS `productmaterials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.productmaterials: ~0 rows (approximately)

-- Dumping structure for table product_management.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `originalPrice` decimal(10,0) DEFAULT NULL,
  `discountPrice` decimal(10,0) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `quantityAvailable` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `brandId` int(11) DEFAULT NULL,
  `otherDetails` text DEFAULT NULL,
  `group` varchar(50) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `metaTitle` varchar(255) DEFAULT NULL,
  `metaDescription` text DEFAULT NULL,
  `metaKeywords` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  KEY `brandId` (`brandId`),
  KEY `createdBy` (`createdBy`),
  KEY `updatedBy` (`updatedBy`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brandId`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `products_ibfk_4` FOREIGN KEY (`updatedBy`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.products: ~4 rows (approximately)
INSERT INTO `products` (`id`, `name`, `description`, `originalPrice`, `discountPrice`, `price`, `quantityAvailable`, `categoryId`, `brandId`, `otherDetails`, `group`, `url`, `metaTitle`, `metaDescription`, `metaKeywords`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`) VALUES
	(60, 'Bàn', 'hgjhgj', NULL, NULL, 19999990, 6, 9, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-04-10 14:01:29', NULL, '2024-04-23 14:39:49', NULL),
	(65, 'ghế gỗ', 'aaaaaaaaaaaaaaaaa', NULL, NULL, 200000, 22, 12, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-04-19 14:38:51', NULL, '2024-04-19 14:38:51', NULL),
	(66, 'Tủ', 'jjjjj', NULL, NULL, 30000000, 5, 14, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-04-19 14:40:24', NULL, '2024-04-19 14:40:24', NULL),
	(68, 'Giuong', 'gfd', NULL, NULL, 200000, 3, 12, 6, NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-03 13:58:22', NULL, '2024-05-03 13:58:22', NULL);

-- Dumping structure for table product_management.productsizes
CREATE TABLE IF NOT EXISTS `productsizes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.productsizes: ~2 rows (approximately)
INSERT INTO `productsizes` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(2, 'To', '2024-04-15 09:43:43', '2024-04-15 09:43:43'),
	(5, 'Nhỏ', '2024-04-19 11:53:28', '2024-04-19 11:53:28');

-- Dumping structure for table product_management.productvariants
CREATE TABLE IF NOT EXISTS `productvariants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) DEFAULT NULL,
  `colorId` int(11) DEFAULT NULL,
  `sizeId` int(11) DEFAULT NULL,
  `originalPrice` decimal(10,0) DEFAULT NULL,
  `discountPrice` decimal(10,0) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `quantityAvailable` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  KEY `colorId` (`colorId`) USING BTREE,
  KEY `sizeId` (`sizeId`) USING BTREE,
  CONSTRAINT `productvariants_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `productvariants_ibfk_2` FOREIGN KEY (`colorId`) REFERENCES `productcolors` (`id`) ON DELETE CASCADE,
  CONSTRAINT `productvariants_ibfk_3` FOREIGN KEY (`sizeId`) REFERENCES `productsizes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.productvariants: ~5 rows (approximately)
INSERT INTO `productvariants` (`id`, `productId`, `colorId`, `sizeId`, `originalPrice`, `discountPrice`, `state`, `price`, `quantityAvailable`, `createdAt`, `updatedAt`) VALUES
	(7, 66, 6, 2, NULL, NULL, NULL, 31000000, 12, '2024-04-19 14:40:42', '2024-04-22 11:17:01'),
	(13, 65, 9, 5, NULL, NULL, NULL, 200000, 4, '2024-04-19 15:07:37', '2024-04-19 15:07:37'),
	(14, 60, 6, 5, NULL, NULL, NULL, 200000, 22222, '2024-04-19 15:24:05', '2024-04-22 11:28:53'),
	(16, 60, 6, 5, NULL, NULL, NULL, 200000, 443, '2024-05-07 09:35:46', '2024-05-07 09:35:58'),
	(17, 60, 9, 2, NULL, NULL, NULL, 200000, 7676, '2024-05-21 10:10:00', '2024-05-21 10:10:00');

-- Dumping structure for table product_management.refreshtokens
CREATE TABLE IF NOT EXISTS `refreshtokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `token` varchar(200) DEFAULT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `refreshtokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=538 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.refreshtokens: ~2 rows (approximately)
INSERT INTO `refreshtokens` (`id`, `userId`, `token`, `expiryDate`, `createdAt`, `updatedAt`) VALUES
	(102, 30, '001d96fe7e8e472976a80dcc61eb86ca', NULL, '2024-03-28 10:40:27', '2024-03-28 10:40:27'),
	(537, 20, '9c9e67c9d2210af2599a726facbc1ff6', NULL, '2024-05-21 13:50:15', '2024-05-21 13:50:15');

-- Dumping structure for table product_management.rolepermission
CREATE TABLE IF NOT EXISTS `rolepermission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) DEFAULT NULL,
  `permissionId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `rolepermission_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`),
  CONSTRAINT `rolepermission_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.rolepermission: ~50 rows (approximately)
INSERT INTO `rolepermission` (`id`, `roleId`, `permissionId`, `createdAt`, `updatedAt`) VALUES
	(31, 8, 1, '2024-04-03 09:46:07', '2024-04-03 09:46:07'),
	(32, 8, 6, '2024-04-03 09:46:07', '2024-04-03 09:46:07'),
	(33, 8, 7, '2024-04-03 09:46:07', '2024-04-03 09:46:07'),
	(34, 8, 8, '2024-04-03 09:46:07', '2024-04-03 09:46:07'),
	(35, 8, 2, '2024-04-03 09:46:07', '2024-04-03 09:46:07'),
	(36, 8, 3, '2024-04-03 09:46:07', '2024-04-03 09:46:07'),
	(37, 8, 4, '2024-04-03 09:46:07', '2024-04-03 09:46:07'),
	(38, 8, 5, '2024-04-03 09:46:07', '2024-04-03 09:46:07'),
	(39, 8, 9, '2024-04-03 09:46:07', '2024-04-03 09:46:07'),
	(40, 8, 10, '2024-04-03 09:46:07', '2024-04-03 09:46:07'),
	(41, 8, 11, '2024-04-03 09:46:07', '2024-04-03 09:46:07'),
	(42, 8, 12, '2024-04-03 09:46:07', '2024-04-03 09:46:07'),
	(43, 8, 13, '2024-04-03 09:46:07', '2024-04-03 09:46:07'),
	(44, 9, 1, '2024-04-03 09:46:46', '2024-04-03 09:46:46'),
	(45, 9, 6, '2024-04-03 09:46:46', '2024-04-03 09:46:46'),
	(46, 9, 7, '2024-04-03 09:46:46', '2024-04-03 09:46:46'),
	(47, 9, 8, '2024-04-03 09:46:46', '2024-04-03 09:46:46'),
	(48, 9, 3, '2024-04-03 09:46:46', '2024-04-03 09:46:46'),
	(49, 9, 4, '2024-04-03 09:46:46', '2024-04-03 09:46:46'),
	(50, 9, 5, '2024-04-03 09:46:46', '2024-04-03 09:46:46'),
	(51, 9, 9, '2024-04-03 09:46:46', '2024-04-03 09:46:46'),
	(52, 9, 10, '2024-04-03 09:46:46', '2024-04-03 09:46:46'),
	(53, 9, 12, '2024-04-03 09:46:46', '2024-04-03 09:46:46'),
	(54, 9, 11, '2024-04-03 09:46:46', '2024-04-03 09:46:46'),
	(55, 9, 13, '2024-04-03 09:46:46', '2024-04-03 09:46:46'),
	(56, 10, 10, '2024-04-03 09:49:55', '2024-04-03 09:49:55'),
	(57, 8, 14, '2024-04-08 10:29:47', '2024-04-08 10:29:47'),
	(58, 8, 15, '2024-04-08 10:29:47', '2024-04-08 10:29:47'),
	(59, 8, 16, '2024-04-08 10:29:47', '2024-04-08 10:29:47'),
	(60, 8, 17, '2024-04-08 10:29:47', '2024-04-08 10:29:47'),
	(79, 8, 34, '2024-04-19 15:32:35', '2024-04-19 15:32:35'),
	(80, 8, 35, '2024-04-19 15:32:35', '2024-04-19 15:32:35'),
	(81, 8, 36, '2024-04-19 15:32:35', '2024-04-19 15:32:35'),
	(82, 8, 33, '2024-05-16 11:41:26', '2024-05-16 11:41:26'),
	(87, 8, 22, '2024-05-16 13:59:49', '2024-05-16 13:59:49'),
	(88, 8, 19, '2024-05-16 13:59:49', '2024-05-16 13:59:49'),
	(89, 8, 21, '2024-05-16 13:59:49', '2024-05-16 13:59:49'),
	(90, 8, 18, '2024-05-16 13:59:49', '2024-05-16 13:59:49'),
	(91, 8, 23, '2024-05-16 13:59:49', '2024-05-16 13:59:49'),
	(92, 8, 24, '2024-05-16 13:59:49', '2024-05-16 13:59:49'),
	(93, 8, 27, '2024-05-16 13:59:49', '2024-05-16 13:59:49'),
	(94, 8, 28, '2024-05-16 13:59:49', '2024-05-16 13:59:49'),
	(95, 8, 29, '2024-05-16 13:59:49', '2024-05-16 13:59:49'),
	(96, 8, 30, '2024-05-16 13:59:49', '2024-05-16 13:59:49'),
	(97, 8, 31, '2024-05-16 13:59:49', '2024-05-16 13:59:49'),
	(98, 8, 32, '2024-05-16 13:59:49', '2024-05-16 13:59:49'),
	(99, 8, 37, '2024-05-16 14:07:10', '2024-05-16 14:07:10'),
	(100, 8, 38, '2024-05-16 14:07:10', '2024-05-16 14:07:10'),
	(103, 8, 39, '2024-05-16 14:12:37', '2024-05-16 14:12:37'),
	(104, 8, 40, '2024-05-16 14:12:37', '2024-05-16 14:12:37');

-- Dumping structure for table product_management.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.roles: ~3 rows (approximately)
INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(8, 'Admin ', '2024-04-03 09:46:07', '2024-05-16 14:12:37'),
	(9, 'Manager', '2024-04-03 09:46:46', '2024-04-03 09:46:46'),
	(10, 'Customer', '2024-04-03 09:46:58', '2024-04-03 09:49:55');

-- Dumping structure for table product_management.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Dumping data for table product_management.sequelizemeta: ~29 rows (approximately)
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20240308024548-create-type.js'),
	('20240308031899-create-user.js'),
	('20240308031915-create-permission.js'),
	('20240308031917-role-permission.js'),
	('20240308031921-user-permission.js'),
	('20240308031929-create-category.js'),
	('20240308031938-create-brand.js'),
	('20240308031954-create-product.js'),
	('20240308032008-create-product-variant.js'),
	('20240308032016-create-product-image.js'),
	('20240308032022-create-product-attribute.js'),
	('20240308032029-create-product-size.js'),
	('20240308032036-create-product-color.js'),
	('20240308032043-create-product-material.js'),
	('20240308032050-create-origin-country.js'),
	('20240308032057-create-combo.js'),
	('20240308032104-create-combo-item.js'),
	('20240308032111-create-news.js'),
	('20240308032129-create-advertisement.js'),
	('20240308032134-create-order.js'),
	('20240308032140-create-order-detail.js'),
	('20240308032146-create-file.js'),
	('20240308032151-create-social-account.js'),
	('20240308032158-create-session.js'),
	('20240308032203-create-refresh-token.js'),
	('20240308032208-create-verification-token.js'),
	('20240308032214-create-role.js'),
	('20240308032219-create-user-role.js'),
	('20240308032225-create-otp.js');

-- Dumping structure for table product_management.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.sessions: ~0 rows (approximately)

-- Dumping structure for table product_management.socialaccounts
CREATE TABLE IF NOT EXISTS `socialaccounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `socialMedia` varchar(255) DEFAULT NULL,
  `socialMediaId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `socialaccounts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.socialaccounts: ~1 rows (approximately)
INSERT INTO `socialaccounts` (`id`, `userId`, `socialMedia`, `socialMediaId`, `createdAt`, `updatedAt`) VALUES
	(2, 20, NULL, NULL, '2024-05-16 15:44:33', '2024-05-16 15:44:33');

-- Dumping structure for table product_management.types
CREATE TABLE IF NOT EXISTS `types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.types: ~15 rows (approximately)
INSERT INTO `types` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(26, 'Admin', '2024-03-25 15:17:01', '2024-03-25 15:17:01'),
	(27, 'Customer', '2024-03-25 15:17:01', '2024-03-25 15:17:01'),
	(28, 'Manager', '2024-03-25 15:17:01', '2024-03-25 15:17:01'),
	(29, 'Admin', '2024-04-03 14:40:52', '2024-04-03 14:40:52'),
	(30, 'Customer', '2024-04-03 14:40:52', '2024-04-03 14:40:52'),
	(31, 'Manager', '2024-04-03 14:40:52', '2024-04-03 14:40:52'),
	(32, 'Admin', '2024-04-03 15:13:00', '2024-04-03 15:13:00'),
	(33, 'Customer', '2024-04-03 15:13:00', '2024-04-03 15:13:00'),
	(34, 'Manager', '2024-04-03 15:13:00', '2024-04-03 15:13:00'),
	(35, 'Admin', '2024-04-03 15:13:54', '2024-04-03 15:13:54'),
	(36, 'Customer', '2024-04-03 15:13:54', '2024-04-03 15:13:54'),
	(37, 'Manager', '2024-04-03 15:13:54', '2024-04-03 15:13:54'),
	(38, 'Admin', '2024-04-03 15:14:07', '2024-04-03 15:14:07'),
	(39, 'Customer', '2024-04-03 15:14:07', '2024-04-03 15:14:07'),
	(40, 'Manager', '2024-04-03 15:14:07', '2024-04-03 15:14:07');

-- Dumping structure for table product_management.userpermissions
CREATE TABLE IF NOT EXISTS `userpermissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `permissionId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `userpermissions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `userpermissions_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.userpermissions: ~9 rows (approximately)
INSERT INTO `userpermissions` (`id`, `userId`, `permissionId`, `createdAt`, `updatedAt`) VALUES
	(1, 20, 2, '2024-03-27 11:19:59', '2024-03-27 11:19:59'),
	(2, 20, 6, '2024-03-27 11:19:59', '2024-03-27 11:19:59'),
	(3, 20, 7, '2024-03-27 11:19:59', '2024-03-27 11:19:59'),
	(4, 20, 8, '2024-03-27 11:19:59', '2024-03-27 11:19:59'),
	(5, 20, 3, '2024-03-27 15:56:45', '2024-03-27 15:56:45'),
	(6, 20, 5, '2024-03-27 15:56:45', '2024-03-27 15:56:45'),
	(7, 20, 4, '2024-03-27 15:56:45', '2024-03-27 15:56:45'),
	(8, 20, 9, '2024-03-27 15:56:45', '2024-03-27 15:56:45'),
	(9, 20, 1, '2024-03-27 15:59:00', '2024-03-27 15:59:00');

-- Dumping structure for table product_management.userroles
CREATE TABLE IF NOT EXISTS `userroles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `userroles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `userroles_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.userroles: ~2 rows (approximately)
INSERT INTO `userroles` (`id`, `userId`, `roleId`, `createdAt`, `updatedAt`) VALUES
	(7, 30, 9, '2024-04-11 15:13:25', '2024-04-11 15:13:25'),
	(9, 20, 8, '2024-04-19 15:42:15', '2024-04-19 15:42:15');

-- Dumping structure for table product_management.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `firstLogin` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `typeId` (`typeId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.users: ~6 rows (approximately)
INSERT INTO `users` (`id`, `name`, `password`, `email`, `address`, `phone`, `typeId`, `firstLogin`, `createdAt`, `updatedAt`) VALUES
	(20, 'Đức Hiền', '$2b$10$uc6RrzR/MN.KIZTXvZ6yTeMlzsGToxd1m9HSFIPDQAFD4ub6hCDjO', 'mdhien2302@gmail.com', 'Hà Nội 1', '0888888889', 26, 1, '2024-03-25 15:17:01', '2024-05-16 10:56:47'),
	(22, 'hien', '$2b$10$3geJiIaK8Qz8ujSALoPrp.QhtusenClE.MTwXTQLKHOVbF04/Q9pa', 'hien@gmail.com', 'Hà Nội 1', '0869061648', 28, 0, '2024-03-27 10:49:53', '2024-03-27 10:49:53'),
	(30, 'Đức Hiền 1', '$2b$10$XZXC/sSKP9d9CV7dNfnA9eVp7gisWSF2PpJpb1YTMA73KhJwytQim', 'hienmdth2107029@fpt.edu.vn', 'Phú Thọ ', '0869061646', 26, 1, '2024-03-28 09:53:03', '2024-03-28 10:40:22'),
	(32, 'Nguyễn Văn A', '$2b$10$XGuw0B58Yb34wBnnGZZt/OOlMU6lozqkm5Gop22FgE92DznxmcU4C', 'maiduchien23@gmail.com', 'Hà Nội', '0869061648', 26, 0, '2024-03-28 10:46:12', '2024-03-28 10:46:12'),
	(34, 'Mai Đức Hiền', '$2b$10$6g5D1gFDK.i0BaZwz0PrHO7yNRph9dTpGGVFHo9qcPdykEtDH1c2e', 'admin@gmail.com', 'Hà Nội', '0869061648', 26, 0, '2024-04-03 10:28:31', '2024-04-03 10:28:31'),
	(44, 'Nguyễn Văn B', '$2b$10$oxVapRkP8L1VkSOR8NuiXukDJUETpoGeo3P8tCf8EK.9MyVPOHh3W', 'b@gmail.com', 'Hà Nội', '0869061648', 26, 0, '2024-04-08 14:34:07', '2024-04-08 14:34:07');

-- Dumping structure for table product_management.verificationtokens
CREATE TABLE IF NOT EXISTS `verificationtokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `token` varchar(200) DEFAULT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `verificationtokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table product_management.verificationtokens: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

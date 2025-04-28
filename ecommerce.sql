-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2025 at 06:55 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `accessories`
--

CREATE TABLE `accessories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `original_price` decimal(10,2) NOT NULL,
  `colors` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`colors`)),
  `quantity` int(11) NOT NULL,
  `images` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `product_code` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accessories`
--

INSERT INTO `accessories` (`id`, `name`, `description`, `category`, `price`, `original_price`, `colors`, `quantity`, `images`, `created_at`, `updated_at`, `product_code`) VALUES
(13, 'Cool Accessory', 'This is a nice accessory.', 'Fashion', 20.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744617546028-cup1.jpg,1744617546029-cup2.jpg', '2025-04-14 07:59:06', '2025-04-16 05:54:45', 'ACCYfs4ni90s'),
(14, 'Cool Accessory', 'This is a nice accessory.', '2', 19.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744617557566-cup1.jpg,1744617557567-cup2.jpg', '2025-04-14 07:59:17', '2025-04-14 07:59:17', 'ACCYixwsz0nb'),
(15, 'Cool Accessory', 'This is a nice accessory.', '2', 19.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744617558796-cup1.jpg,1744617558796-cup2.jpg', '2025-04-14 07:59:18', '2025-04-14 07:59:18', 'ACCY9ri3jiit'),
(16, 'Cool Accessory', 'This is a nice accessory.', '2', 19.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744617559903-cup1.jpg,1744617559903-cup2.jpg', '2025-04-14 07:59:19', '2025-04-14 07:59:19', 'ACCYobl7yl92'),
(17, 'Cool Accessory', 'This is a nice accessory.', '2', 19.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744617560867-cup1.jpg,1744617560867-cup2.jpg', '2025-04-14 07:59:20', '2025-04-14 07:59:20', 'ACCYbybecpzg'),
(18, 'Cool Accessory', 'This is a nice accessory.', '2', 19.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744617561762-cup1.jpg,1744617561762-cup2.jpg', '2025-04-14 07:59:21', '2025-04-14 07:59:21', 'ACCY7igdowbm'),
(19, 'Cool Accessory', 'This is a nice accessory.', '2', 19.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744617562665-cup1.jpg,1744617562665-cup2.jpg', '2025-04-14 07:59:22', '2025-04-14 07:59:22', 'ACCYdonc4a2r'),
(20, 'Cool Accessory', 'This is a nice accessory.', '8', 19.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744617724963-cap1.jpg,1744617724966-cap2.jpeg', '2025-04-14 08:02:04', '2025-04-14 08:02:04', 'ACCY84yxxger'),
(21, 'Cool Accessory', 'This is a nice accessory.', '8', 19.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744617729727-cap1.jpg,1744617729729-cap2.jpeg', '2025-04-14 08:02:09', '2025-04-14 08:02:09', 'ACCY9ndbze14'),
(22, 'Cool Accessory', 'This is a nice accessory.', '8', 19.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744617730907-cap1.jpg,1744617730908-cap2.jpeg', '2025-04-14 08:02:10', '2025-04-14 08:02:10', 'ACCYes5joi3r'),
(23, 'Cool Accessory', 'This is a nice accessory.', '8', 19.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744617731876-cap1.jpg,1744617731877-cap2.jpeg', '2025-04-14 08:02:11', '2025-04-14 08:02:11', 'ACCYuti2s7eu'),
(24, 'Cool Accessory', 'This is a nice accessory.', '8', 19.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744617732760-cap1.jpg,1744617732761-cap2.jpeg', '2025-04-14 08:02:12', '2025-04-14 08:02:12', 'ACCYcsk976ei'),
(25, 'Cool Accessory', 'This is a nice accessory.', '6', 19.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744618039113-case1.jpeg,1744618039113-case2.webp', '2025-04-14 08:07:19', '2025-04-14 08:07:19', 'ACCYbfvj0hfk'),
(26, 'Cool Accessory', 'This is a nice accessory.', '6', 19.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744618043191-case1.jpeg,1744618043191-case2.webp', '2025-04-14 08:07:23', '2025-04-14 08:07:23', 'ACCYczgerfsc'),
(27, 'Cool Accessory', 'This is a nice accessory.', '6', 19.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744618044359-case1.jpeg,1744618044359-case2.webp', '2025-04-14 08:07:24', '2025-04-14 08:07:24', 'ACCY7paekg1m'),
(28, 'Cool Accessory', 'This is a nice accessory.', '6', 19.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744618045341-case1.jpeg,1744618045342-case2.webp', '2025-04-14 08:07:25', '2025-04-14 08:07:25', 'ACCYlole05zb'),
(29, 'Cool Accessory', 'This is a nice accessory.', '6', 19.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744618046346-case1.jpeg,1744618046347-case2.webp', '2025-04-14 08:07:26', '2025-04-14 08:07:26', 'ACCYv5soumy5'),
(30, 'Cool Accessory', 'This is a nice accessory.', '6', 19.99, 29.99, '[\"red\",\"blue\",\"green\"]', 100, '1744618047331-case1.jpeg,1744618047331-case2.webp', '2025-04-14 08:07:27', '2025-04-14 08:07:27', 'ACCYtctbw74j'),
(31, 'Cup', 'Cup', '2', 200.00, 100.00, '[\"#ff0000\",\"#000000\"]', 200, '1744619423703-cup2.jpg,1744619423703-cup3.jpg', '2025-04-14 08:30:23', '2025-04-14 08:30:23', 'ACCYk4kvxgax'),
(32, 'Cap', 'cap', '8', 300.00, 500.00, '[\"#000000\",\"#ff0000\"]', 100, '1744619465896-cap2.jpeg,1744619465896-cap1.jpg', '2025-04-14 08:31:05', '2025-04-14 08:31:05', 'ACCY3ejknqna');

-- --------------------------------------------------------

--
-- Table structure for table `accessories_products`
--

CREATE TABLE `accessories_products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `product_code` varchar(20) DEFAULT NULL,
  `original_price` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accessories_products`
--

INSERT INTO `accessories_products` (`id`, `name`, `description`, `category`, `price`, `quantity`, `created_at`, `product_code`, `original_price`) VALUES
(16, 'Cup', 'cup', '2', 200.00, 20, '2025-04-14 08:32:12', 'CUACQqH635', 500.00),
(18, 'cap', 'cap', '8', 100.00, 11, '2025-04-14 08:44:17', 'CUACgNA653', 80.00),
(19, 'Phone Cases ', 'Phoe case', '6', 225.00, 20, '2025-04-14 08:45:13', 'CUACYYB317', 500.00),
(20, 'digi', 'gfhjk', '2', 2266.00, 7, '2025-04-15 10:03:02', 'CUACFTj337', 11.00),
(21, 'digi', 'dtfyu', '6', 2266.00, 3388, '2025-04-15 10:03:30', 'CUACbTN550', 4567.00),
(22, 'digi', 'bnv', '2', 2266.00, 3388, '2025-04-15 10:10:07', 'CUACikW939', 56789.00);

-- --------------------------------------------------------

--
-- Table structure for table `accessories_products_variants`
--

CREATE TABLE `accessories_products_variants` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `color` varchar(50) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accessories_products_variants`
--

INSERT INTO `accessories_products_variants` (`id`, `product_id`, `color`, `image`, `created_at`) VALUES
(33, 16, 'Red', '1744619532612-cup2.jpg', '2025-04-14 08:32:12'),
(34, 16, '#ff0000', '1744619532612-cup3.jpg', '2025-04-14 08:32:12'),
(35, 16, '#ff8585', '1744619532612-cup1.jpg', '2025-04-14 08:32:12'),
(39, 18, 'Red', '1744620257840-cap2.jpeg', '2025-04-14 08:44:17'),
(40, 18, '#ff0000', '1744620257840-cap1.jpg', '2025-04-14 08:44:17'),
(41, 19, 'Red', '1744620313285-case1.jpeg', '2025-04-14 08:45:13'),
(42, 19, '#ff0000', '1744620313285-case2.webp', '2025-04-14 08:45:13'),
(43, 20, 'Red', '1744711382471-19th November 2024 -  (2).jpg', '2025-04-15 10:03:02'),
(44, 21, 'Red', '1744711410837-4 PE4.png', '2025-04-15 10:03:30'),
(45, 21, '#ff0000', '1744711410839-19th November 2024 -  (2).jpg', '2025-04-15 10:03:30'),
(46, 22, 'Red', '1744711807686-19th November 2024 -  (2).jpg', '2025-04-15 10:10:07'),
(47, 22, '#ff1414', '1744711807692-40 (1).png', '2025-04-15 10:10:07');

-- --------------------------------------------------------

--
-- Table structure for table `accessory`
--

CREATE TABLE `accessory` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `images` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `color` varchar(30) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `image`, `title`, `description`) VALUES
(2, 'http://localhost:5005/uploads/1745586504310.jpg', 'Hello', '');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `description`, `created_at`) VALUES
(2, 'vghjkl', '<p>vbbjkl</p>', '2025-04-14 06:22:58'),
(3, 'ghuijop[]ghjkolp;\'; bm,l;', '<p>vbbjklvhjk</p>', '2025-04-14 06:23:05'),
(4, 'bhjkl', '<p>vbbjklvhjk</p>', '2025-04-14 06:23:05'),
(5, 'hiiiiii', '<h2><strong>cvbhjkl</strong><br><br>gcfhjkl;<br>&nbsp;</h2>', '2025-04-14 06:25:54');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_code` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `original_price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `color` varchar(50) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_code`, `name`, `price`, `original_price`, `quantity`, `color`, `size`, `image`, `subtotal`, `created_at`, `updated_at`) VALUES
(1, 9, 'PROD97WBPPAM', 'Sample Product', 29.99, 39.99, 7, 'Red', 'S', '1744619367346.avif', 209.93, '2025-04-15 09:11:34', '2025-04-15 09:12:14'),
(2, 9, 'PROD97WBPPAM', 'Sample Product', 29.99, 39.99, 6, 'Blue', 'L', '1744619367346.avif', 179.94, '2025-04-15 09:11:41', '2025-04-15 09:12:16'),
(5, 9, 'PROD97WBPPAM', 'Sample Product', 29.99, 39.99, 1, 'Blue', 'S', '1744619367346.avif', 29.99, '2025-04-15 09:12:06', '2025-04-15 09:12:06'),
(6, 9, 'PRODPDVX3O5Z', 'Sample Product', 29.99, 39.99, 1, 'Red', 'M', '1744615557335.webp', 29.99, '2025-04-15 09:18:02', '2025-04-15 09:18:02'),
(7, 8, 'ACCYdonc4a2r', 'Cool Accessory', 19.99, 29.99, 10, 'blue', '', '1744617562665-cup1.jpg', 199.90, '2025-04-15 10:50:02', '2025-04-15 10:51:17'),
(8, 8, 'ACCYdonc4a2r', 'Cool Accessory', 19.99, 29.99, 10, 'red', '', '1744617562665-cup1.jpg', 199.90, '2025-04-15 10:50:10', '2025-04-15 10:51:19'),
(10, 8, 'ACCYk4kvxgax', 'Cup', 200.00, 100.00, 10, '#ff0000', '', '1744619423703-cup2.jpg', 2000.00, '2025-04-15 10:50:59', '2025-04-15 10:51:22'),
(11, 11, 'PRODUUXLQ2HJ', 'T shirt', 200.00, NULL, 1, '#ff0000', 'S', '1744614623528.webp', 200.00, '2025-04-17 05:34:48', '2025-04-17 05:34:48'),
(12, 11, 'ACCYixwsz0nb', 'Cool Accessory', 19.99, 29.99, 1, 'red', '', '1744617557566-cup1.jpg', 19.99, '2025-04-17 05:35:40', '2025-04-17 05:35:40'),
(15, 11, 'MERCAE8P1LV9', 'T shirt', 2670.00, 4000.00, 1, '#000000', 'S', 'uploads/merged/merged_11_1744886598340.png', 2670.00, '2025-04-17 10:43:21', '2025-04-17 10:43:21'),
(18, 10, 'ACCY9ri3jiit', 'Cool Accessory', 19.99, 29.99, 2, 'red', '', '1744617558796-cup1.jpg', 59.97, '2025-04-21 06:17:50', '2025-04-25 10:57:17'),
(19, 13, 'PRODSF5FMVHF', 'Sample Product', 29.99, 39.99, 10, 'Red', 'S', '1744615560935.webp', 299.90, '2025-04-21 12:13:26', '2025-04-21 12:13:42'),
(20, 13, 'ACCY3ejknqna', 'Cap', 300.00, 500.00, 1, '#000000', '', '1744619465896-cap2.jpeg', 300.00, '2025-04-22 06:46:24', '2025-04-22 06:46:24'),
(21, 10, 'PRODWAVWFMIK', 'Hoodie', 100.00, NULL, 1, '#000000', 'S', '1744615291486.avif', 100.00, '2025-04-25 10:56:37', '2025-04-25 10:56:37'),
(23, 10, 'ACCYczgerfsc', 'Cool Accessory', 19.99, 29.99, 1, 'red', '', '1744618043191-case1.jpeg', 19.99, '2025-04-25 10:58:02', '2025-04-25 10:58:02'),
(24, 10, 'MERCAE8P1LV9', 'T shirt', 2670.00, 4000.00, 1, '#000000', 'S', '96bde3ea9dd320ccff325e19618ffb66', 2670.00, '2025-04-25 11:33:10', '2025-04-25 11:33:10');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `image`, `created_at`, `updated_at`) VALUES
(2, 'Mug', 'This is mug ', '1743499089098.jpeg', '2025-03-25 05:59:21', '2025-04-01 09:18:09'),
(4, 'Hoodie', 'This is Hoodie', '1743501508713.jpeg', '2025-03-25 06:00:11', '2025-04-01 09:58:28'),
(5, 'T-shirt', 'This is T-shirt', '1743498855195.png', '2025-03-25 06:00:42', '2025-04-01 09:14:15'),
(6, 'Phone Cases ', 'This is Phone Case', '1743501603054.jpg', '2025-03-25 06:02:40', '2025-04-01 10:00:03'),
(8, 'Cap', 'Hey Cap', '1743501660424.jpg', '2025-03-25 06:03:26', '2025-04-01 10:01:00');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `type` enum('fixed','percentage') NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `min_cart_value` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `code`, `type`, `value`, `min_cart_value`, `description`, `created_at`) VALUES
(1, 'WELCOME50', 'fixed', 50.00, 200.00, '50 off on first purchase', '2025-04-08 07:51:45'),
(2, '974157', 'fixed', 234.00, 44.00, 'fghj', '2025-04-08 07:52:02'),
(3, 'gyuedu7', 'fixed', 892.00, 6789.00, 'ghj', '2025-04-08 07:55:45'),
(4, '974157', 'fixed', 1000.00, 2667.00, 'fghj', '2025-04-08 07:59:40'),
(5, 'WELCOME50', 'fixed', 50.00, 100.00, '50 off on first purchase', '2025-04-08 08:01:40'),
(6, '974bvj', 'percentage', 20.00, 1000.00, '20% off on first purchase	\n', '2025-04-08 08:02:31'),
(7, 'WELCOME50', 'fixed', 50.00, 200.00, '50 off on first purchase', '2025-04-08 08:07:46');

-- --------------------------------------------------------

--
-- Table structure for table `customize_accessories`
--

CREATE TABLE `customize_accessories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `color` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `headlines`
--

CREATE TABLE `headlines` (
  `id` int(11) NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `is_hidden` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `headlines`
--

INSERT INTO `headlines` (`id`, `text`, `is_hidden`, `created_at`, `status`) VALUES
(4, 'gfhjkldfghju', 0, '2025-04-08 06:11:33', 0),
(5, 'hgvjkl', 0, '2025-04-08 06:12:40', 0),
(6, 'fdfgyhukj', 0, '2025-04-08 06:19:35', 0),
(7, '10% Off', 0, '2025-04-08 06:49:45', 0),
(9, 'PLease Go 🎊🎉', 0, '2025-04-08 12:31:18', 0),
(11, 'Limited Offer  🎊🎉', 0, '2025-04-08 12:32:09', 0),
(13, 'Hurry 🎊🎉', 0, '2025-04-08 12:33:49', 0),
(18, 'Welcome to A&M Prints – Custom Mugs, T‑Shirts, Keychains and More! Affordable Pricing • Fast Turnaround • High‑Quality Prints •', 0, '2025-04-20 12:08:48', 1);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merchandise_products`
--

CREATE TABLE `merchandise_products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `original_price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `product_code` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `merchandise_products`
--

INSERT INTO `merchandise_products` (`id`, `name`, `description`, `category`, `price`, `original_price`, `quantity`, `created_at`, `updated_at`, `product_code`) VALUES
(34, 'T shirt', 'T shirt', '5', 2670.00, 4000.00, 45, '2025-04-14 10:21:44', '2025-04-14 10:21:44', 'MERCAE8P1LV9');

-- --------------------------------------------------------

--
-- Table structure for table `merchandise_products_variants`
--

CREATE TABLE `merchandise_products_variants` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `color` varchar(50) NOT NULL,
  `sizes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`sizes`)),
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `merchandise_products_variants`
--

INSERT INTO `merchandise_products_variants` (`id`, `product_id`, `color`, `sizes`, `image`, `created_at`, `updated_at`) VALUES
(62, 34, '#000000', '[\"S\",\"M\"]', '96bde3ea9dd320ccff325e19618ffb66', '2025-04-14 10:21:44', '2025-04-14 10:21:44'),
(63, 34, '#000000', '[\"S\"]', '14b7d93d6f9e804248bd0015aebd6732', '2025-04-14 10:21:44', '2025-04-14 10:21:44');

-- --------------------------------------------------------

--
-- Table structure for table `merged_images`
--

CREATE TABLE `merged_images` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_code` varchar(100) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `images` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `original_price` decimal(10,2) DEFAULT 0.00,
  `quantity` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `product_code` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `category`, `images`, `price`, `original_price`, `quantity`, `created_at`, `product_code`) VALUES
(51, 'T shirt', 'T shirt ', '5', '1744614623528.webp,1744614623529.webp,1744614623529.webp,1744614623529.webp,1744614623530.jpg', 200.00, NULL, 12, '2025-04-14 07:10:23', 'PRODUUXLQ2HJ'),
(52, 'Hoodie', 'Hoodie', '4', '1744615291486.avif,1744615291486.webp', 100.00, NULL, 200, '2025-04-14 07:21:31', 'PRODWAVWFMIK'),
(53, 'Sample Product', 'This is a sample product', '5', '1744615559746.webp,1744615559746.webp', 29.99, 39.99, 100, '2025-04-14 07:27:33', 'PRODF8P7IJTU'),
(54, 'Sample Product', 'This is a sample product', '5', '1744615557335.webp,1744615557335.webp', 29.99, 39.99, 100, '2025-04-14 07:27:08', 'PRODPDVX3O5Z'),
(55, 'Sample Product', 'This is a sample product', '5', '1744615558548.webp,1744615558549.webp', 29.99, 39.99, 100, '2025-04-14 07:27:11', 'PROD4L9FD10R'),
(56, 'Sample Product', 'This is a sample product', '5', '1744615559746.webp,1744615559746.webp', 29.99, 39.99, 100, '2025-04-14 07:27:17', 'PRODQZZ3EB5X'),
(57, 'Sample Product', 'This is a sample product', '5', '1744615560935.webp,1744615560935.webp', 29.99, 39.99, 100, '2025-04-14 07:27:21', 'PRODSF5FMVHF'),
(58, 'Sample Product', 'This is a sample product', '5', '1744615561963.webp,1744615561963.webp', 29.99, 39.99, 100, '2025-04-14 07:27:25', 'PRODY23YCG05'),
(59, 'Sample Product', 'This is a sample product', 'Accessories', '1744619345406.avif,1744619345407.avif', 29.99, 39.99, 100, '2025-04-14 08:29:05', 'PRODR6N72KWF'),
(60, 'Sample Product', 'This is a sample product', '5', '1744619365292.avif,1744619365292.avif', 29.99, 39.99, 100, '2025-04-14 08:29:25', 'PRODAU7216P2'),
(61, 'Sample Product', 'This is a sample product', '5', '1744619366348.avif,1744619366348.avif', 29.99, 39.99, 100, '2025-04-14 08:29:26', 'PRODTV2N4TRH'),
(62, 'Sample Product', 'This is a sample product', '5', '1744619367346.avif,1744619367347.avif', 29.99, 39.99, 100, '2025-04-14 08:29:27', 'PROD97WBPPAM'),
(63, 'Sample Product', 'This is a sample product', '5', '1744619368232.avif,1744619368232.avif', 29.99, 39.99, 100, '2025-04-14 08:29:28', 'PROD8HKKLF0Y');

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `sizes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`sizes`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`id`, `product_id`, `color`, `sizes`) VALUES
(78, 51, '#ff0000', '[\"S\",\"M\",\"L\",\"XL\"]'),
(79, 52, '#000000', '[\"S\",\"M\",\"L\",\"XL\"]'),
(80, 52, '#ff4747', '[\"S\"]'),
(81, 53, 'Red', '[\"S\",\"M\",\"L\"]'),
(82, 53, 'Blue', '[\"M\",\"L\"]'),
(83, 54, 'Red', '[\"S\",\"M\",\"L\"]'),
(84, 54, 'Blue', '[\"M\",\"L\"]'),
(85, 55, 'Red', '[\"S\",\"M\",\"L\"]'),
(86, 55, 'Blue', '[\"M\",\"L\"]'),
(87, 56, 'Red', '[\"S\",\"M\",\"L\"]'),
(88, 56, 'Blue', '[\"M\",\"L\"]'),
(89, 57, 'Red', '[\"S\",\"M\",\"L\"]'),
(90, 57, 'Blue', '[\"M\",\"L\"]'),
(91, 58, 'Red', '[\"S\",\"M\",\"L\"]'),
(92, 58, 'Blue', '[\"M\",\"L\"]'),
(93, 59, 'Red', '[\"S\",\"M\",\"L\"]'),
(94, 59, 'Blue', '[\"M\",\"L\"]'),
(95, 60, 'Red', '[\"S\",\"M\",\"L\"]'),
(96, 60, 'Blue', '[\"M\",\"L\"]'),
(97, 61, 'Red', '[\"S\",\"M\",\"L\"]'),
(98, 61, 'Blue', '[\"M\",\"L\"]'),
(99, 62, 'Red', '[\"S\",\"M\",\"L\"]'),
(100, 62, 'Blue', '[\"M\",\"L\"]'),
(101, 63, 'Red', '[\"S\",\"M\",\"L\"]'),
(102, 63, 'Blue', '[\"M\",\"L\"]');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_code` varchar(100) NOT NULL,
  `review` text NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `product_code`, `review`, `rating`, `created_at`) VALUES
(1, 13, 'ACCY9ri3jiit', 'Rated via card', 2, '2025-04-21 11:22:01'),
(2, 13, 'ACCYczgerfsc', 'Rated via card', 2, '2025-04-21 12:03:29'),
(3, 13, 'ACCYtctbw74j', 'Rated via card', 2, '2025-04-21 12:10:27'),
(4, 13, 'PRODF8P7IJTU', 'Rated via card', 2, '2025-04-22 06:39:49'),
(5, 13, 'PRODTV2N4TRH', 'Rated via card', 5, '2025-04-22 06:43:23');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `provider` varchar(50) DEFAULT 'local'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `status`, `created_at`, `provider`) VALUES
(8, 'Rishika Sharma', 'rishika@jewarinternational.com', NULL, 'active', '2025-04-15 08:02:36', 'local'),
(9, 'Demo', 'demo24361@gmail.com', NULL, 'active', '2025-04-15 08:51:00', 'local'),
(10, 'dfhtgyjh', 'abcv@gmail.com', '$2b$10$bb7895c7o/8YQwbY0ReuZeg2lv.FCtcQCB1eB3Iw/bqQn0Y1Hp9iW', 'active', '2025-04-15 08:56:00', 'local'),
(11, 'dftyguh', 'rishika1@jewarinternational.com', '$2b$10$oqk3E0k.safL1jLP44jR1u40EmGd3mSofwfq6f.cu6METg2jwv8BO', 'active', '2025-04-17 05:31:31', 'local'),
(12, 'Syed', 'syed', '$2b$10$VMNC1/icbVQMTm7MiC6XD.H3Tq1SIdlV1tOpclNF/Rc5G0namLa3u', 'active', '2025-04-20 11:48:33', 'local'),
(13, 'Tester', 'testing@gmail.com', '$2b$10$BuR9b0m9XWy4nrsaDmKoeuf2GymPfbYlW/EDWeMfIQoI2IvQPSC0C', 'active', '2025-04-21 07:16:34', 'local');

-- --------------------------------------------------------

--
-- Table structure for table `user_images`
--

CREATE TABLE `user_images` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `merge_image` varchar(255) NOT NULL,
  `product_code` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accessories`
--
ALTER TABLE `accessories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_code` (`product_code`);

--
-- Indexes for table `accessories_products`
--
ALTER TABLE `accessories_products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_code` (`product_code`);

--
-- Indexes for table `accessories_products_variants`
--
ALTER TABLE `accessories_products_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `accessory`
--
ALTER TABLE `accessory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_cart_item` (`user_id`,`product_code`,`color`,`size`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customize_accessories`
--
ALTER TABLE `customize_accessories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `headlines`
--
ALTER TABLE `headlines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merchandise_products`
--
ALTER TABLE `merchandise_products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_code` (`product_code`);

--
-- Indexes for table `merchandise_products_variants`
--
ALTER TABLE `merchandise_products_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `merged_images`
--
ALTER TABLE `merged_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`product_code`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_images`
--
ALTER TABLE `user_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accessories`
--
ALTER TABLE `accessories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `accessories_products`
--
ALTER TABLE `accessories_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `accessories_products_variants`
--
ALTER TABLE `accessories_products_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `accessory`
--
ALTER TABLE `accessory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customize_accessories`
--
ALTER TABLE `customize_accessories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `headlines`
--
ALTER TABLE `headlines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merchandise_products`
--
ALTER TABLE `merchandise_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `merchandise_products_variants`
--
ALTER TABLE `merchandise_products_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `merged_images`
--
ALTER TABLE `merged_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user_images`
--
ALTER TABLE `user_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accessories_products_variants`
--
ALTER TABLE `accessories_products_variants`
  ADD CONSTRAINT `accessories_products_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `accessories_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `merchandise_products_variants`
--
ALTER TABLE `merchandise_products_variants`
  ADD CONSTRAINT `merchandise_products_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `merchandise_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_images`
--
ALTER TABLE `user_images`
  ADD CONSTRAINT `user_images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

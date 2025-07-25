-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 25 juil. 2025 à 02:50
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `restaurant_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `dishes`
--

CREATE TABLE `dishes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `dishes`
--

INSERT INTO `dishes` (`id`, `name`, `description`, `price`, `category`, `image_url`, `created_at`) VALUES
(8, 'Classic Burger', 'A juicy beef patty with lettuce, tomato, and cheese.', 12.99, 'Burgers', 'http://localhost:3000/img/menu1.png', '2025-07-23 10:29:47'),
(9, 'Margherita Pizza', 'Classic pizza with tomato, mozzarella, and basil.', 15.50, 'Pizzas', 'http://localhost:3000/img/menu2.png', '2025-07-23 10:29:47'),
(10, 'Salade Cesar', 'Salade romaine, croûtons, parmesan, poulet grillé, sauce César', 9.99, 'Salade', 'http://localhost:3000/img/menu3.png', '2025-07-25 00:45:47');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `dishes`
--
ALTER TABLE `dishes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `dishes`
--
ALTER TABLE `dishes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

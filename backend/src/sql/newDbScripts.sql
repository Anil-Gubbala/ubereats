CREATE TABLE `restaurant_login` (
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `contact` int NOT NULL,
  `picture` varchar(100) NOT NULL DEFAULT 'https://imageuploadlab1.s3.us-east-2.amazonaws.com/defaults/restaurant.jpg',
  `description` varchar(100) NOT NULL DEFAULT 'Add Restaurant Description',
  `start` time NOT NULL DEFAULT '09:00:00',
  `end` time NOT NULL DEFAULT '18:00:00',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `dishes` (
  `email` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `ingredients` varchar(45) NOT NULL,
  `image` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `description` varchar(150) NOT NULL,
  `category` int NOT NULL,
  PRIMARY KEY (`email`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) NOT NULL,
  `address_id` int NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `restaurant_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `cart` (
  `user_id` varchar(45) NOT NULL,
  `restaurant_id` varchar(45) NOT NULL,
  `dish` varchar(45) NOT NULL,
  `count` int NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `order_dishes` (
  `id` int NOT NULL,
  `dish` varchar(45) NOT NULL,
  `count` int NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `email` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_data` (
  `email` varchar(45) NOT NULL,
  `picture` varchar(100) NOT NULL,
  `contact` int NOT NULL,
  `dob` date NOT NULL,
  `nickname` varchar(45) NOT NULL,
  `about` varchar(150) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `addresses` (
  `user_id` varchar(45) NOT NULL,
  `location` varchar(100) NOT NULL,
  `country` varchar(10) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

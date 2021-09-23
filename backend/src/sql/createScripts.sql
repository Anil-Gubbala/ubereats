CREATE SCHEMA `ubereats` ;

CREATE TABLE `restaurant_login` (
  `restaurant_name` varchar(25) NOT NULL,
  `email_id` varchar(25) NOT NULL,
  `password` varchar(100) NOT NULL,
  `location` varchar(25) NOT NULL,
  PRIMARY KEY (`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



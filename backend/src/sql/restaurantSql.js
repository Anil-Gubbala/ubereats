const RESTAURANT = {
  SIGNUP:
    'INSERT INTO ubereats.restaurant_login (name,email,password,location,latitude,longitude)VALUES(?,?,?,?,?,?);',
  PASSWORD:
    'SELECT password, status FROM ubereats.restaurant_login WHERE email = ?;',
  ALL_INFO:
    'SELECT `name`, `location`, `contact`, `picture`, `description`, `start`, `end` ,`latitude`,`longitude` FROM ubereats.restaurant_login WHERE email = ?;',
  DISHES:
    'SELECT `email`, `name`, `ingredients`, `image`, `price`, `description`, `category` FROM ubereats.dishes WHERE email = ?;',
  ADD_DISH:
    'INSERT INTO `ubereats`.`dishes` (`email`,`name`,`ingredients`,`image`,`price`,`description`,`category`)VALUES(?,?,?,?,?,?,?);',
  UPDATE_DISH:
    'UPDATE `ubereats`.`dishes` SET`name` = ? ,`ingredients` = ?,`image` = ?,`price` = ?,`description` = ?,`category` = ? WHERE `email` = ? AND `name` = ? ;',
  UPDATE_RESTAURANT:
    'UPDATE `ubereats`.`restaurant_login` SET `name` = ?, `location` = ?, `contact` = ?, `picture` = ? , `description` = ?, `start` = ? , `end` = ? , `latitude`,`longitude`, WHERE `email` = ?;',
  GET_RESTAURANT_ORDERS:
    'SELECT `order`.`id`, `order`.`user_id`, `order`.`address_id`, `order`.`status`, `order`.`date` FROM `ubereats`.`order` where `order`.`restaurant_id`=?; ',
  UDPATE_ORDER_STATUS:
    'UPDATE `ubereats`.`order` SET `status` = ?  WHERE `id` = ? ;',
};
module.exports = RESTAURANT;

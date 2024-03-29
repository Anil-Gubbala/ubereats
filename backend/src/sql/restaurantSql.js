const RESTAURANT = {
  SIGNUP:
    'INSERT INTO ubereats.restaurant_login (name,email,password,location,latitude,longitude)VALUES(?,?,?,?,?,?);',
  PASSWORD:
    'SELECT password, status FROM ubereats.restaurant_login WHERE email = ?;',
  ALL_INFO:
    'SELECT `email`, `name`, `location`, `contact`, `picture`, `description`, `start`, `end` ,`latitude`,`longitude`,`delivery` FROM ubereats.restaurant_login WHERE email = ?;',
  DISHES:
    'SELECT `email`, `name`, `ingredients`, `picture`, `price`, `description`, `category`,`type` FROM ubereats.dishes WHERE email = ?;',
  DISHES_WITH_FILTER:
    'SELECT `email`, `name`, `ingredients`, `picture`, `price`, `description`, `category`,`type` FROM ubereats.dishes WHERE email = ? and type=?;',

  ADD_DISH:
    'INSERT INTO `ubereats`.`dishes` (`email`,`name`,`ingredients`,`picture`,`price`,`description`,`category`, `type`)VALUES(?,?,?,?,?,?,?,?);',
  UPDATE_DISH:
    'UPDATE `ubereats`.`dishes` SET`name` = ? ,`ingredients` = ?,`picture` = ?,`price` = ?,`description` = ?,`category` = ? , `type`=? WHERE `email` = ? AND `name` = ? ;',
  UPDATE_RESTAURANT:
    'UPDATE `ubereats`.`restaurant_login` SET `name` = ?, `location` = ?, `contact` = ?, `picture` = ? , `description` = ?, `start` = ? , `end` = ? , `latitude`=? ,`longitude`=?, `delivery`= ? WHERE `email` = ? ;',
  GET_RESTAURANT_ORDERS_NEW:
    'SELECT `order`.`id`, `order`.`user_id`, `order`.`address_id`, `order`.`status`, `order`.`date`, addresses.location, order.delivery FROM `ubereats`.`order` join `ubereats`.`addresses` on  order.address_id = addresses.id where `order`.`restaurant_id`=? and `order`.`status` <= 2 ; ',
  GET_RESTAURANT_ORDERS_OLD:
    'SELECT `order`.`id`, `order`.`user_id`, `order`.`address_id`, `order`.`status`, `order`.`date`, addresses.location, order.delivery FROM `ubereats`.`order` join `ubereats`.`addresses` on  order.address_id = addresses.id where `order`.`restaurant_id`=? and `order`.`status` = ? ; ',

  UDPATE_ORDER_STATUS:
    'UPDATE `ubereats`.`order` SET `status` = ?  WHERE `id` = ? ;',
  DELETE_DISH:
    'DELETE FROM `ubereats`.`dishes` WHERE `dishes`.`email` = ? and `dishes`.`name` = ?;',
  GET_RESTAURANT_DELIVERY:
    'select delivery from ubereats.restaurant_login where email = ?',
};
module.exports = RESTAURANT;

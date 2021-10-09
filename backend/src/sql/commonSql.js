const COMMON = {
  GET_RESTAURANTS:
    'SELECT `restaurant_login`.`email`, `restaurant_login`.`name`, `restaurant_login`.`location`,     `restaurant_login`.`contact`,     `restaurant_login`.`picture`,     `restaurant_login`.`description`,     `restaurant_login`.`start`,     `restaurant_login`.`end` , `restaurant_login`.`delivery` FROM `ubereats`.`restaurant_login`;',
  ADD_TO_CART:
    'INSERT INTO `ubereats`.`cart` (`user_id`, `restaurant_id`, `dish`, `count`, `price`) VALUES (?,?, ?, ?,?) ON DUPLICATE KEY UPDATE count = ? ;',
  // ADD_NEW_TO_CART:
  //   'INSERT INTO `ubereats`.`cart` (`user_id`, `restaurant_id`, `dish`, `count`, `price`) VALUES (?,?, ?, ?,?) ON DUPLICATE KEY UPDATE count = ? ;',
  CLEAR_CART: 'DELETE from `ubereats`.`cart`',

  GET_CART:
    'SELECT  `cart`.`restaurant_id`, `cart`.`dish`, `cart`.`count`, `cart`.`price` FROM `ubereats`.`cart` where user_id = ? ;',
  GET_ORDER_DETAILS:
    'SELECT `order_dishes`.`dish`,     `order_dishes`.`count`,     `order_dishes`.`price` FROM `ubereats`.`order_dishes` where `order_dishes`.`id` = ?;',
};
module.exports = COMMON;

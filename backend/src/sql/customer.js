const CUSTOMER = {
  CART_INSERT:
    'INSERT INTO `ubereats`.`order` (`user_id`, `restaurant_id`, `address_id`) VALUES (?, ?, ?)',
  MOVE_TO_ORDER:
    'INSERT INTO ubereats.order_dishes (id,dish,count,price) SELECT ? ,dish, count, price FROM ubereats.cart WHERE user_id= ? and restaurant_id= ?;',
  CLEAR_CART:
    'DELETE FROM `ubereats`.`cart`WHERE user_id=? and restaurant_id=?;',
  GET_ORDERS:
    'SELECT `order`.`id`, `order`.`restaurant_id`, `order`.`address_id`, `order`.`status` , `order`.`date` FROM `ubereats`.`order` where `order`.`user_id`=?; ',
  GET_PROFILE:
    'SELECT `user`.`name` , `user`.`email`,     `user_data`.`picture`,     `user_data`.`contact`,     `user_data`.`dob`,     `user_data`.`nickname`,     `user_data`.`location`,`user_data`.`about` FROM `ubereats`.`user_data` right join `ubereats`.`user` on `user_data`.`email` = `user`.`email`  where `user`.`email`= ?;',
  UPDATE_USER:
    'UPDATE `ubereats`.`user` SET `name` = ?, `email` = ?, `status` = ? WHERE `email` = ?;',
  UPDATE_USER_DATA:
    'UPDATE `ubereats`.`user_data` SET `email` = ?, `picture` = ?, `contact` = ?, `dob` = ?, `nickname` = ?, `location` = ? , `about` = ?  WHERE `email` = ?;',
  // GET_ORDER_DISHES:
  //   'SELECT  `order_dishes`.`dish`, `order_dishes`.`count`, `order_dishes`.`price` FROM `ubereats`.`order_dishes` where `ubereats`.`user_id`=? ;',
  // GET_ORDERS:
  //   'SELECT `order`.`id`, `order`.`restaurant_id`, `order`.`address_id`, `order`.`status`,`order_dishes`.`dish`, `order_dishes`.`count`, `order_dishes`.`price` FROM `ubereats`.`order` natural join `ubereats`.`order_dishes` where `order`.`user_id`= ? ; ',
};

module.exports = CUSTOMER;

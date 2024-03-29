const CUSTOMER = {
  CART_INSERT:
    'INSERT INTO `ubereats`.`order` (`user_id`, `restaurant_id`, `address_id`, delivery) VALUES (?, ?, ?, ?);',
  MOVE_TO_ORDER:
    'INSERT INTO ubereats.order_dishes (id,dish,count,price) SELECT ? ,dish, count, price FROM ubereats.cart WHERE user_id= ? and restaurant_id= ?;',
  CLEAR_CART:
    'DELETE FROM `ubereats`.`cart`WHERE user_id=? and restaurant_id=?;',
  GET_ORDERS:
    'SELECT `order`.`id`, `order`.`restaurant_id`, `order`.`address_id`, `order`.`status` , `order`.`date`, `addresses`.`location`, `order`.delivery FROM `ubereats`.`order` join `ubereats`.`addresses` on `order`.`address_id`= `addresses`.`id` where `order`.`user_id`=? and order.delivery = ? and order.status = ? ;',
  GET_PROFILE:
    'SELECT `user`.`name` , `user`.`email`,     `user_data`.`picture`,     `user_data`.`contact`,     `user_data`.`dob`,     `user_data`.`nickname`, `user_data`.`about` , `addresses`.`location`, `addresses`.`country` ,`addresses`.`latitude`  ,`addresses`.`longitude`  FROM (`ubereats`.`user_data`  join `ubereats`.`addresses` on `user_data`.`email` = `addresses`.`user_id` ) right join `ubereats`.`user` on `user_data`.`email` = `user`.`email`  where `user`.`email`= ?;',
  GET_PROFILE1:
    'SELECT * from ubereats.user where user.email= ? ; SELECT * from ubereats.user_data where user_data.email= ? ; Select * from ubereats.addresses where addresses.user_id = ? and addresses.active = 1;',

  UPDATE_USER:
    'UPDATE `ubereats`.`user` SET `name` = ?, `email` = ?, `status` = ? WHERE `email` = ?;',
  UPDATE_USER_DATA:
    'INSERT INTO `ubereats`.`user_data`  (`email`, `picture`, `contact`, `dob`, `nickname`,  `about`) VALUES(?,?,?,?,?,?) ON DUPLICATE KEY UPDATE  `picture` = ?, `contact` = ?, `dob` = ?, `nickname` = ?,  `about` = ?;',
  UPDATE_USER_ADDRESS:
    'INSERT INTO `ubereats`.`addresses`  (`user_id`, `location`,  `country`, `latitude`, `longitude` , active ) VALUES(?,?,?,?,?, 1) ON DUPLICATE KEY UPDATE `location` = ? ,  `country`= ?, `latitude`=? , `longitude`=?;',
  FAVORITE_ADD:
    'INSERT INTO `ubereats`.`favorite` (`user_id`, `restaurant_id`) VALUES (?, ?);',
  FAVORITE_REMOVE:
    'DELETE FROM `ubereats`.`favorite` WHERE user_id = ? and restaurant_id = ? ;',
  FAVORITE_GET:
    'SELECT restaurant_id FROM ubereats.favorite where user_id = ? ;',
  ADDRESSES_GET_ALL:
    'select * from addresses where user_id= ?  order by active desc',
  ADDRESSES_ADD_NEW:
    'INSERT INTO `ubereats`.`addresses` (`user_id`,`location`, `country`, `latitude`, `longitude`) VALUES (?,?,?,?,?);',
};

// UPDATE_USER_DATA:
//   'UPDATE `ubereats`.`user_data` SET `email` = ?, `picture` = ?, `contact` = ?, `dob` = ?, `nickname` = ?,  `about` = ?  WHERE `email` = ?;',
// UPDATE_USER_ADDRESS:
//   'UPDATE `ubereats`.`addresses` SET `user_id` = ?, `location` = ? ,  `country`= ?, `latitude`=? , `longitude`=? WHERE `user_id` = ?;',
// GET_ORDER_DISHES:
//   'SELECT  `order_dishes`.`dish`, `order_dishes`.`count`, `order_dishes`.`price` FROM `ubereats`.`order_dishes` where `ubereats`.`user_id`=? ;',
// GET_ORDERS:
//   'SELECT `order`.`id`, `order`.`restaurant_id`, `order`.`address_id`, `order`.`status`,`order_dishes`.`dish`, `order_dishes`.`count`, `order_dishes`.`price` FROM `ubereats`.`order` natural join `ubereats`.`order_dishes` where `order`.`user_id`= ? ; ',

module.exports = CUSTOMER;

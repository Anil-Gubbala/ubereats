const CUSTOMER = {
  CART_INSERT:
    'INSERT INTO `ubereats`.`order` (`user_id`, `restaurant_id`, `address_id`) VALUES (?, ?, ?)',
  MOVE_TO_ORDER:
    'INSERT INTO ubereats.order_dishes (id,dish,count,price) SELECT ? ,dish, count, price FROM ubereats.cart WHERE user_id= ? and restaurant_id= ?;',
  CLEAR_CART:
    'DELETE FROM `ubereats`.`cart`WHERE user_id=? and restaurant_id=?;',
};

module.exports = CUSTOMER;

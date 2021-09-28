const RESTAURANT = {
  SIGNUP:
    'INSERT INTO ubereats.restaurant_login (restaurant_name,email_id,password,location)VALUES(?,?,?,?);',
  CHECK_USER: 'SELECT password FROM ubereats.restaurant_login WHERE email = ?;',
  ALL_INFO:
    'SELECT `name`, `location`, `contact`, `picture`, `description`, `start`, `end` FROM ubereats.restaurant_login WHERE email = ?;',
  DISHES:
    'SELECT `email`, `name`, `ingredients`, `image`, `price`, `description`, `category` FROM ubereats.dishes WHERE email = ?;',
  ADD_DISH:
    'INSERT INTO `ubereats`.`dishes` (`email`,`name`,`ingredients`,`image`,`price`,`description`,`category`)VALUES(?,?,?,?,?,?,?);',
  UPDATE_DISH:
    'UPDATE `ubereats`.`dishes` SET`name` = ? ,`ingredients` = ?,`image` = ?,`price` = ?,`description` = ?,`category` = ? WHERE `email` = ? AND `name` = ? ;',
};
module.exports = RESTAURANT;

const COMMON = {
  GET_RESTAURANTS:
    'SELECT `restaurant_login`.`email`, `restaurant_login`.`name`, `restaurant_login`.`location`,     `restaurant_login`.`contact`,     `restaurant_login`.`picture`,     `restaurant_login`.`description`,     `restaurant_login`.`start`,     `restaurant_login`.`end` FROM `ubereats`.`restaurant_login`;',
  ADD_TO_CART: '',
};
module.exports = COMMON;

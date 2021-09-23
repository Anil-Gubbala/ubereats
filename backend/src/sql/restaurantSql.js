const RESTAURANT = {
  SIGNUP:
    'INSERT INTO ubereats.restaurant_login (restaurant_name,email_id,password,location)VALUES(?,?,?,?);',
  CHECK_USER:
    'SELECT password FROM ubereats.restaurant_login WHERE email_id = ?;',
};
module.exports = RESTAURANT;

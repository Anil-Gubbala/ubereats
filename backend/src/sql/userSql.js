const USER = {
  SIGNUP: 'INSERT INTO ubereats.user (name,email,password)VALUES(?,?,?);',
  PASSWORD: 'SELECT password FROM ubereats.user WHERE email = ?;',
};
module.exports = USER;

const bcrypt = require('bcrypt');

const hashUserPass = async (user, pass) => await bcrypt.hash(`${user}:${pass}`, 3);

module.exports = { hashUserPass };

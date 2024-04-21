const bcrypt = require("bcrypt");

const saltRounds = 10;

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

async function checkPassword(password, passwordDB) {
  try {
    const checkedPassword = await bcrypt.compare(password, passwordDB);
    return checkedPassword;
  } catch (error) {
    return error;
  }
}

module.exports = {
  hashPassword,
  checkPassword,
};

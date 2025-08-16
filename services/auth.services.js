const { User, Operator } = require('../models')
const bcrypt = require("bcrypt");
const logger = require('../logs/logger')
const saltRounds = 10;
const AuthError = require('../errors/auth.error')
const { Op } = require('sequelize')

const generateHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (e) {
    logger.error(`PASSWORD_HASH_ERROR: ${e.message}`);
    return password;
  }
};



const login = async (body, isOperator) => {
  let data;
  if (isOperator) {
    data = await Operator.findOne({ where: { email: body.email } })
  } else {
    data = await User.findOne({
      where: { email: body.email }
      // [Op.or]: [
      //   { where: { email: body.email } },
      //   { where: { phone: body.phone } }
      // ]
    })
  }
  console.log("data 27=>", data);
  if (data !== null) {
    console.log("data password", data.password)
    console.log("body passwrod", body.password)
    const isPasswordMatch = await bcrypt.compare(body.password, data.password)
    console.log("isPassword=>", isPasswordMatch)
    if (isPasswordMatch) {
      return data;
    }
    else {
      throw new AuthError("Incorrect Password!! Please type a valid password");
    }

  }
  else {
    let message = "Email not exist! Please enter valid email";
    // let message = body.email ? "Email not exist! Please enter valid email" : "Phone number not exist! Please enter valid phone number";
    throw new AuthError(message)
  }
}

const checkPhoneNumber = async (phone) => {
  let data = await User.findOne({ where: { phone: phone } });
  if (data !== null) {
    return true;
  } else {
    return false;
  }
}

const checkEmail = async (email) => {
  let data = await User.findOne({ where: { email: email } });
  if (data !== null) {
    return true;
  }
  else {
    return false;
  }
}

const changePassword = async (body, isOperator) => {
  let data;
  if (isOperator) {
    data = await Operator.findOne({ where: { email: body.email } });
  } else {
    data = await User.findOne({ where: { phone_no: body.phone } });
  }
  if (data !== null) {
    if (body.old_password !== undefined) {
      const isPasswordMatch = await bcrypt.compare(
        body.old_password,
        data.password
      );
      if (isPasswordMatch) {
        data.password = await generateHash(body.new_password);
        await data.save();
        return data;
      } else {
        throw new AuthError("Incorrect Password! Please type a valid password");
      }
    } else {
      data.password = await generateHash(body.new_password);
      await data.save();
      return data;
    }
  } else {
    let message = isOperator ? "Email not exist" : "Phone Number not exist";
    throw new AuthError(message);
  }
};



module.exports = {
  generateHash,
  login,
  checkPhoneNumber,
  checkEmail,
  changePassword
}
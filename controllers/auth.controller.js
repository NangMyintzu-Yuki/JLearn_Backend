const Joi = require('joi');
const AuthError = require('../errors/auth.error');
const logger = require('../logs/logger')

const { login, checkPhoneNumber, checkEmail,changePassword } = require('../services/auth.services')
const { apiResponseHeader, httpStatusCode, messages, errors } = require('../utils/constant');

const validate = (req, res, next) => {
  let action = req.url.split('/')[3];
  let schema = {};
  switch (action) {
    case "operator":
      if (req.url.split("/").pop() === "login") {
        schema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        })
      }
      else {
        schema = Joi.object({
          email: Joi.string().email().required(),
          old_password: Joi.string().required(),
          new_password: Joi.string().required(),
          confirm_password: Joi.ref("new_password"),
        })
      }
      break;
    case "user":
      if (req.url.split("/").pop() === "login") {
        schema = Joi.object({
          phone: Joi.string().required(),
          password: Joi.string().required(),
        })
      }
      else {
        schema = Joi.object({
          phone: Joi.string().required(),
          old_password: Joi.string(),
          new_password: Joi.string().required(),
          confirm_password: Joi.ref("new_password")
        })
      }
      break;
  }
  if (Object.keys(schema).length !== 0) {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const { code, status, formatedError } = formatValidationErrors(error.details);
      res.json({ code, status, data: formatedError })
    }
    else {
      next();
    }
  }
  else {
    next();
  }
}

const userLogin = async (req, res) => {
  console.log(req.body);
  try {
    const data = await login(req.body, false);
    console.log("data=>", data)
    data.dataValues.Role = await data.getRole();
    const { code, status, message } = apiResponseHeader(
      httpStatusCode.OK,
      messages.success,
      messages.loginSuccess
    );
    
    // req.body.id = data.dataValues.id
    // findById(req,res)
    res.json({ code, status, message, data })

  } catch (err) {
    logger.error(`${err.message}`);
    if (err instanceof AuthError) {
      res.json(err);
    }
    else {
      res.status(httpStatusCode.INTERNAL_SERVER).json({ message: errors.LOGIN_ERROR })
    }
  }
}
const operatorLogin = async (req, res) => {
  try {
    logger.error(req.body)
    console.log('req.body', req.body)
    const data = await login(req.body, true);
    data.dataValues.Role = await data.getRole();
    
    console.log("data=>", data)
    const { code, status, message } = apiResponseHeader(
      httpStatusCode.OK,
      messages.success,
      messages.loginSuccess
    );
    res.json({ code, status, message, data })
  } catch (err) {
    console.log('err=>', err.message)
    logger.error(`${err.message}`);
    if (err instanceof AuthError) {
      res.json(err)
    } else {
      res.status(httpStatusCode.INTERNAL_SERVER).json({ message: errors.LOGIN_ERROR })
    }
  }
}

const operatorChangePassword = async(req,res) =>{
  try{
    const data = await changePassword(req.body, true);
    const {code, status,message} = apiResponseHeader(
      httpStatusCode.OK,
      messages.success,
      messages.changePasswordSuccess
    );
    res.json({code,status,message,data});
  }catch(e){
    logger.error(`${e.message}`);
    if(e instanceof AuthError){
      res.json(e);
    }else{
      res.status(httpStatusCode.INTERNAL_SERVER).json({message:errors.FAILED_CHANGE_PASSWORD})
    }
  }
}


// formatValidationErrors 
const formatValidationErrors = (errors) => {
  let formatedError = {};
  if (errors.length === 0) {
    return;
  }
  const { code, status } = apiResponseHeader(httpStatusCode.OK, messages.failed);
  errors.forEach((error) => {
    formatedError[error.path[0]] = [error.message.replace(/[\"]+/g, "")];
  });
  return { code, status, formatedError }

}

const checkRegisteredOrNot = async (req, res) => {
  // // const phone = req.body.phone;
  // const email = req.body.email;
  // // console.log("req body=>", req.body);
  // try {
  //   // if (req.body.phone) {
  //   //   let isExistPhone = await checkPhoneNumber(req.body.phone);
  //   //   if (isExistPhone) {
  //   //     const { code, status, message } = apiResponseHeader(
  //   //       httpStatusCode.CONFLICT,
  //   //       messages.success,
  //   //       `${req.body.phone} is already registered`
  //   //     )
  //   //     res.status(httpStatusCode.OK).json({ code, status, message });
  //   //   }
  //   // }
  //   if (req.body.email) {
  //     let isExistEmail = await checkEmail(req.body.email);
  //     if (isExistEmail) {
  //       const { code, status, message } = apiResponseHeader(
  //         httpStatusCode.CONFLICT,
  //         messages.success,
  //         `${req.body.email} is already registered`
  //       )
  //       res.status(httpStatusCode.OK).json({ code, status, message });
  //     }
  //   }

  //   else {
  //     const { code, status, message } = apiResponseHeader(
  //       httpStatusCode.OK,
  //       messages.success,
  //       "you can register with this phone number"
  //     );
  //     res.json({ code, status, message })
  //   }
  // } catch (error) {
  //   res.status(httpStatusCode.INTERNAL_SERVER).json({ message: errors.LOGIN_ERROR })
  // }
}



module.exports = {
  validate,
  userLogin,
  operatorLogin,
  checkRegisteredOrNot,
  operatorChangePassword
}
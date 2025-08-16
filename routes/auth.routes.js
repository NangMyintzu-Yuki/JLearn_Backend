const express = require('express')
const { validate, userLogin, operatorLogin,operatorChangePassword } = require('../controllers/auth.controller')
const router = express.Router();

router.post(`/auth/user/login`, validate, userLogin);
router.post(`/auth/operator/login`, validate, operatorLogin);
router.post(`/auth/operator/change_password`,validate,operatorChangePassword)


// router.post(`/1/auth/user/login`, validate, userLogin);
// router.post(`/1/auth/operator/login`, validate, operatorLogin);
// router.put(`/1/auth/user/change_password`, validate, userChangePassword);
// router.put(
//   `/1/auth/operator/change_password`,
//   validate,
//   operatorChangePassword
// );
// router.post(`/1/auth/otp`, validate, requestOTP);
// router.post(`/1/auth/forgot-password`, validate, requestOTP);
// router.post(`/1/auth/check-phone`, validate, checkUserPhone);

module.exports = router;

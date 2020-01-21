const router = require("express").Router();
const login = require("../controller/googlelogin");

router.post("/googleLogin", login.googlelogin);

module.exports = router;
const { Router } = require("express")
const AuthController = require("../controllers/auth_controller")

const router = Router()

router.post("/register", AuthController.RegisterController)
router.post("/login", AuthController.LoginController)

module.exports = router

const { Router } = require("express")
const ServicesController = require('../controllers/services_controller')

const router = Router()

router.get('/get-from-address', ServicesController.GetFromAddress)

module.exports = router
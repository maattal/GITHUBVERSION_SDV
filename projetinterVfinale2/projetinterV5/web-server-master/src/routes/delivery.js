const { Router } = require("express")
const DeliveryController = require("../controllers/delivery_controller")
const { Authenticate, IsManager } = require("../middlewares/auth_middleware")

const router = Router()

router.get("/", Authenticate, IsManager, DeliveryController.GetDeliveries)
router.get("/allhomepage", Authenticate, IsManager, DeliveryController.GetDeliveriesHomepage)
router.get("/all", Authenticate, IsManager, DeliveryController.GetAllDeliveries)
router.post("/", Authenticate, IsManager, DeliveryController.ScheduleDelivery)
router.get(
  "/deliverers",
  Authenticate,
  IsManager,
  DeliveryController.GetDeliverers
)
router.put(
  "/dispatch",
  Authenticate,
  IsManager,
  DeliveryController.DispatchDeliveries
)
router.put("/:id", Authenticate, IsManager, DeliveryController.UpdateDeliverer)
router.get(
  "/deliverer/:id",
  Authenticate,
  DeliveryController.GetDeliveriesForDeliverer
)
router.put("/:id/done", Authenticate, DeliveryController.MarkDeliveryAsDone)

module.exports = router

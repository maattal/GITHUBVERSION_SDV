
const skmeans = require("skmeans")

const Delivery = require("../models/delivery")
const User = require("../models/user")
const { getFromAddress } = require("../services/address_converter")

/* Validation */
/*
   - At least one between food and medicine must be true
   - Addresses must not be empty
*/
const validateDeliveryData = ({ food, medicine, addresses }) => {
  const errors = {}

  if (food === undefined && medicine === undefined) {
    errors.food = "Please select at least one type of delivery"
    errors.medicine = "Please select at least one type of delivery"
  }

  if (addresses === undefined || addresses.length === 0)
    errors.addresses = "Please specify at least one address or coordinates"

  return Object.keys(errors).length > 0 ? errors : null
}

// Creates a new date without time
// Date can be passed as an argument
const createDate = (date) => {
  const temp = date ? new Date(date) : new Date()
  temp.setHours(0, 0, 0, 0)
  return temp
}

module.exports = {
  ScheduleDelivery: async (req, res) => {
    const errors = validateDeliveryData(req.body)

    if (errors) return res.status(400).json(errors)

    const data = {}

    // Figure out the locations
    const { addresses } = req.body

    data.addresses = await Promise.all(
      addresses.map((address) =>
        getFromAddress(address).then(({ coordinates: [lat, lon] }) => ({
          lat,
          lon,
        }))
      )
    )

    // Delivery dates
    const { dates } = req.body

    data.dates =
      dates === undefined
        ? [createDate()]
        : dates.map((date) => createDate(date))

    // Additional info
    const { food, medicine } = req.body

    // Create addresses x dates deliveries
    const created = []

    for (const address of data.addresses)
      for (const date of data.dates)
        created.push(
          Delivery.create({
            address,
            date,
            food,
            medicine,
          })
        )

    return res.status(201).json(await Promise.all(created))
  },

  GetDeliverers: async (req, res) => {
    const users = await User.find({ manager: false })

    return res.status(200).json(users)
  },

  DispatchDeliveries: async (req, res) => {
    const { ids } = req.body
    const today = createDate()

    // Get deliveries for today
    const deliveries = await Delivery.find({
      done: false,
      date: today,
      deliverer: null,
    })

    // Get deliverers
    const deliverers = await User.find({
      _id: {
        $in: ids,
      },
      manager: false,
    })

    // Calculate centroids
    const data = deliveries.map(({ address }) => [address.lat, address.lon])
    // k must be lower than the number of samples
    const k = data.length > deliverers.length ? deliverers.length : data.length

    const result = skmeans(data, k)

    // Update deliveries
    deliveries.forEach(
      async (delivery, index) =>
        await Delivery.findByIdAndUpdate(delivery.id, {
          deliverer: deliverers[result.idxs[index]].id,
        })
    )

    return res.status(200).end()
  },

  UpdateDeliverer: async (req, res) => {
    const { id } = req.params

    const user = await User.findByIdAndUpdate(id, req.body)

    return res.status(200).json(user)
  },

  GetDeliveriesForDeliverer: async (req, res) => {
    const { id } = req.params

    const deliveries = await Delivery.find({ deliverer: id, done: false })

    return res.status(200).json(deliveries)
  },

  GetDeliveries: async (req, res) => {
    const date =
      req.body.date === undefined ? createDate() : createDate(req.body.date)
const today=createDate();
    const deliveries = await Delivery.find({  done: false,
      date: today,
      deliverer: null, })

    return res.status(200).json(deliveries)
  },
  GetDeliveriesHomepage: async (req, res) => {
    const date =
      req.body.date === undefined ? createDate() : createDate(req.body.date)
const today=createDate();
    const deliveries = await Delivery.find({  done: false});

    return res.status(200).json(deliveries.filter(del=> del.deliverer!=null))
  },
  GetAllDeliveries: async (req, res) => {
    const deliveries = await Delivery.find({})
    return res.status(200).json(deliveries)
  },

  MarkDeliveryAsDone: async (req, res) => {
    const userId = req.user.id
    const deliveryId = req.params.id

    const delivery = await Delivery.findById(deliveryId)

    // Value equality because deliverer is an ObjectID while userId is a String
    if (delivery.deliverer != userId)
      return res.status(403).end("This is not your delivery")

    await Delivery.findByIdAndUpdate(deliveryId, { done: true })

    return res.status(200).end()
  },
}

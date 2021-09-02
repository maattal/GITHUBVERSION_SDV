const { Schema, model, ObjectId } = require("mongoose")

const AddressSchema = Schema({
  _id: false,
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  address: { type: String, required: false }
})

const DeliverySchema = Schema({
  address: AddressSchema,
  date: { type: Date, required: true },
  deliverer: { type: ObjectId, ref: "Users", required: false },
  done: { type: Boolean, default: false },
  food: { type: Boolean, default: false },
  medicine: { type: Boolean, default: false },
})

module.exports = model("Delivery", DeliverySchema)

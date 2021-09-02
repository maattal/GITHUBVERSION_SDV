const { Schema, model } = require("mongoose")

const AddressSchema = Schema({
  _id: false,
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  address: { type: String, required: false }
})

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  manager: { type: Boolean, default: false },
  address: AddressSchema,
})

module.exports = model("User", UserSchema)

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { getFromAddress } = require("../services/address_converter")

const User = require("../models/user")

const validateRegisterInput = ({ email, password, name, age, address }) => {
  const errors = {}

  if (email === undefined || email === "")
    errors.email = "Email cannot be empty"

  if (password === undefined || password === "")
    errors.password = "Password cannot be empty"

  if (name === undefined || name === "") errors.name = "Name cannot be empty"

  if (age ==""|| age < 0){console.log("jesuisdanageundif"); errors.age = "Age cannot be empty"}
  if (address === undefined || address === "")
    errors.address = "Address cannot be empty"
    
    console.log("typeof(age)")
    console.log(typeof(age))

  return Object.keys(errors).length > 0 ? errors : null
}

const validateLoginInput = ({ email, password }) => {
  const errors = {}

  if (email === undefined || email === "")
    errors.email = "Email cannot be empty"
    
  if (password === undefined || password === "")
    errors.password = "Password cannot be empty"
  console.log(errors)
  return Object.keys(errors).length > 0 ? errors : null
}

module.exports = {
  RegisterController: async (req, res) => {
    // Validate input
    const errors = validateRegisterInput(req.body)

    const labeledAddress = await getFromAddress(req.body.address)
    
    if(errors !== null && errors.email!=null && errors.password!=null && errors.name!=null  && errors.age!= undefined && errors.address!=null) return res.status(405).json({ errors})
    if (errors !== null && errors.name!=null) return res.status(402).json({ errors})
    if (errors !== null && errors.age!= undefined) return res.status(403).json({ errors})
    if (errors !== null && errors.address!= undefined) return res.status(404).json({ errors})
    if (errors !== null && errors.email!=null) return res.status(400).json({ errors})
    if (errors !== null && errors.password!=null) return res.status(401).json({ errors})
    // Check if the email is available
    const existingUser = await User.findOne({ email: req.body.email })

    if (existingUser !== null)
      return res
        .status(409)
        .json({ email: "An account with this email already exists" })

    //Hash password, then create user
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      address: {
        lat: labeledAddress.coordinates[0],
        lon: labeledAddress.coordinates[1],
        address: labeledAddress.address,
      },
    })
    console.log("cest la l adress?")
    console.log(user.address)
    return res.status(201).json({ id: user.id })
  },

  LoginController: async (req, res) => {
    // Validate input
    const errors = validateLoginInput(req.body)
    if(errors !== null && errors.email!=null && errors.password!=null) return res.status(405).json({ errors})
    if (errors !== null && errors.email!=null) return res.status(400).json({ errors})
    if (errors !== null && errors.password!=null) return res.status(404).json({ errors})
    // Checks that the user exist
    const user = await User.findOne({ email: req.body.email })

    if (user === null)
      return res
        .status(404)
        .json({ email: "There is no account associated with this email" })

    // Compare password hash
    const passwordMatch = await bcrypt.compare(req.body.password, user.password)

    if (!passwordMatch)
      return res.status(400).json({ password: "The password is invalid" })

    // Create JWT, then return it
    const token = jwt.sign({ id: user.id },"my_secret_key", {
      expiresIn: 3600 * 24,
    })

    return res
      .status(200)
      .json({ token, id: user.id, name: user.name, manager: user.manager })
  },

 
}

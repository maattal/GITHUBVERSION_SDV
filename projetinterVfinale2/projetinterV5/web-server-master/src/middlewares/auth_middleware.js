const jwt = require("jsonwebtoken")

const User = require("../models/user")

const Authenticate = async (req, res, next) => {
  // Checks for bearer token
 
  const { authorization } = req.headers
  console.log(req.headers) 
  if (authorization === undefined || !authorization.startsWith("Bearer "))
    {console.log("banane")
    return res.status(401).end()}

  const token = authorization.substring("Bearer ".length)

  let payload

  // Check that the token is valid
  try {
    payload = jwt.verify(token, "my_secret_key")
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return res.status(403).end("Token expired")
    else if (err.name === "JsonWebTokenError")
      return res.status(401).end("Invalid signature")
    else throw err
  }

  // Get the associated user
  const user = await User.findById(payload.id)

  if (user === null) return res.status(401).end("Unknown user")

  // Sets req.user, then forwards request
  req.user = user
  next()
}

const IsManager = async (req, res, next) => {
  if (req.user.manager === false)
    return res.status(403).end("You must be a manager")

  next()
}

// Auth middleware - forwards authenticated user, adds user document in req.user
module.exports = {
  Authenticate,
  IsManager,
}

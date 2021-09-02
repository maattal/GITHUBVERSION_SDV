require("dotenv").config() 
const express = require("express")
const PORT = 3000
const io = require("socket.io")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false);

const main = async () => {

  const app = express()
  const http = require("http").createServer(app)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors({ origin: "http://localhost:1234", credentials: true }))

  app.use("/api/auth", require("./routes/auth"))
  app.use("/api/delivery", require("./routes/delivery"))
  app.use("/api/post", require("./routes/post"))
  app.use("/api/services", require("./routes/services"))
  mongoose.set("useCreateIndex", true)

  await mongoose.connect(
    "mongodb+srv://MalkiAttal:Onepiece12@cluster0.c7q2x.mongodb.net/Internet",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("🔌 Connected to MongoDB!")
  )
  const socket = io(http)

  var messages = []

  socket.on("connection", (client) => {
    client.on("start", ({ user, manager }) => {
      client.broadcast.emit("info", {
        date: new Date(),
        user,
        manager,
        info: " has joined",
      })
      client.emit("back-up", messages)

      client.on("message", (message) => {
        const newMessage = { date: new Date(), user, manager, message }
        messages.push(newMessage)
        socket.sockets.emit("message", newMessage)
      })

      client.on("disconnect", () =>
        client.broadcast.emit("info", {
          date: new Date(),
          user,
          manager,
          info: " has left",
        })
      )
    })
  })
  // await User.create({
  //   email: "hello",
  //   name:"attal",
  //   age:23,
  //   password: "1234",
  //   address: "ADO" , 
  // }).then(()=>console.log("success"))
  // .catch(()=>console.log("failed"))
  http.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`))
}

main()

const client = require("../index.js")
// const config = require('../config.json')

client.on("ready", async() => {
  console.log("Logged in as "+client.user.tag)
  client.user.setActivity(`${client.prefix}help`, {type: "WATCHING"})
})
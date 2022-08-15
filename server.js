const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const server = http.createServer(app)

// SOCKETS
const { Server } = require('socket.io')
const io = new Server(server)
io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('user-connected', (userId) => {
    console.log('new connection', userId)
    socket.broadcast.emit('user-connected', userId)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

app.use(express.static(path.join(__dirname + '/public')))

// app.get('/', (req, res) => {})

server.listen(3000, () => {
  console.log('listening on http://localhost:3000/')
})

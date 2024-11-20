require('dotenv').config()
const express = require('express')
const Pusher = require('pusher')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

// Initialize Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: process.env.PUSHER_USETLS === 'true',
})

// Endpoint to trigger a Pusher event
app.post('/message', (req, res) => {
  const { message } = req.body

  // Trigger the event on 'my-channel' channel
  pusher.trigger('my-channel', 'my-event', {
    message,
  })

  res.status(200).send('Message sent successfully')
})

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

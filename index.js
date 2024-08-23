const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db')
const port = 8000
const app = express()
app.use(cors())
app.use(express.json());

app.listen(port, () => {
    console.log("Port listened on " + port)
})

app.use('/api/user', require('./routes/customer'));

connectToMongo()
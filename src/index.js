const express = require('express')
const apiRoutes = require('./routes')
const { PORT } = require('./config/index')
const { scheduleCrons } = require('./utils')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRoutes)

app.listen(PORT, () => {
    console.log(`Server running successfully on PORT ${PORT}`)
    scheduleCrons()
})
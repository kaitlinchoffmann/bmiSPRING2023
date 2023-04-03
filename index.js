const express = require('express')
const app = express()

const userRoutes = require('./server/routes/user')
// const postRoutes = require('./server/routes/post')

app.use('/users', userRoutes)
// app.use('/posts', postRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}!!!`))
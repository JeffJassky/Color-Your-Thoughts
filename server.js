const express = require('express')
const app = express()
app.use(express.static('public'))
app.listen(3000, () => console.log('Jeff Jassky test server listening at http://localhost:3000'));
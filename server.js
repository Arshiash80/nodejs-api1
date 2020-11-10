const express = require("express");
const app = express();


// Static files
app.use(express.static('public'));



const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => console.log(`Sever is listening at port ${PORT}`))
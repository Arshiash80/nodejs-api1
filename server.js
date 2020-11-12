// API stands for "Application Programming Interface".
// RESTful API: Representational state transfer. https://en.wikipedia.org/wiki/Representational_state_transfer

const express = require("express");
const app = express();

// Static files
app.use(express.static('public'));

// Server gets that :flower as a prameter part of the request.
app.get('/search/:flower', sendFlower);

function sendFlower(request, response) {
    let data = request.params;
    response.send("I love " + data.flower +" too")
} 

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => console.log(`Sever is listening at port ${PORT}`))
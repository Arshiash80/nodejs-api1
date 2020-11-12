// API stands for "Application Programming Interface".
// RESTful API: Representational state transfer. https://en.wikipedia.org/wiki/Representational_state_transfer

const express = require("express");
const app = express();

let words = {
    "rainbow": 4,
    "unicorn": 5,
    "doom": -3,
    "gloom": -2
}

// Static files
app.use(express.static('public'));

// Server gets that :flower as a prameter part of the request.
app.get('/add/:word/:score?', addWord);

function addWord(request, response) {
    let data = request.params;
    let word = data.word;
    let score = Number(data.score);

    let reply;
    if(!score) {
        reply = {
            msg: "Score is required."
        }
    } else {
        words[word] = score;
        reply = {
            msg: "Thank you for your word."
        }     
    }
    response.send(reply)
} 

app.get('/search/:word', searchWord);

function searchWord(request, response) {
    let word = request.params.word;
    let reply;
    if (words[word]) {
        reply = {
            status: "found",
            word: word,
            score: words[word]
        }
    } else {
        reply = {
            status: "Not found",
            word: word
        }
    }
    response.send(reply)
}

app.get('/all', sendAll);
function sendAll(request, response) {
    // Express automatically format the object as JSON.
    response.send(words);
}

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => console.log(`Sever is listening at port ${PORT}`))
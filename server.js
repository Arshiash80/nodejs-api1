// API stands for "Application Programming Interface".
// RESTful API: Representational state transfer. https://en.wikipedia.org/wiki/Representational_state_transfer

const express = require("express");
const app = express();
const fs = require('fs');

let data = fs.readFileSync('words.json')
let words = JSON.parse(data)
console.log(words)

// Static files
app.use(express.static('public'));

// Server gets that :flower as a prameter part of the request.
app.get('/add/:word/:score?', addWord);

function addWord(request, response) {
    let word = request.params.word;
    let score = Number(request.params.score);

    let reply;
    if(!score) {
        reply = {
            msg: "Score is required."
        }
    } else {
        words[word] = score;
        let data = JSON.stringify(words)   

        fs.writeFile('words.json', data, finished)

        function finished(err) {
            if (!err) {
                console.log(`Succesfully adding the ${word}: ${score} to the database.`)
                reply = {
                    word: word,
                    score: score,
                    status: "success"
                }  
                console.log(data);
                response.send(reply)
            } else {
                console.log(err)
            }
        }
    }
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
// API stands for "Application Programming Interface".
// RESTful API: Representational state transfer. https://en.wikipedia.org/wiki/Representational_state_transfer

const express = require("express");
const app = express();
const fs = require('fs');
const bodyParser = require("body-parser")

let data = fs.readFileSync('words.json')
let words = JSON.parse(data)
console.log("Current data base: ",words)

// Static files
app.use(express.static('public'));

// Init body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// get :word and :score as parameter and save in database.
app.get('/add/:word/:score?', addWord);

function addWord(request, response) {
    console.log(request.params)
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
                reply = {
                    word: word,
                    score: score,
                    status: "success"
                }  
                console.log(data);
            } else {
                console.log(err)
            }
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
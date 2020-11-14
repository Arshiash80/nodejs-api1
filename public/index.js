const word = document.getElementById('inputWord')
const score = document.getElementById('inputScore')
const submitBtn = document.getElementById('submitBtn')

submitBtn.addEventListener('click', sendData)

function sendData() {
    data = {
        word: word.value,
        score: score.value
    }
    axios.get(`/add/${data.word}/${data.score}`)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}


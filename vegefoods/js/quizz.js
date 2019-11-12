let quizzResults;
let quizz;

let question = document.querySelector("#question");
let answers = document.querySelector("#answers");
let index = 0;
let min = 0;
let sec = 0;

let loadQuizz = (cb) => {
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/quizzes/${localStorage.pin}`
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if(xhr.status == 200){
            //console.log(xhr.response);
            quizz = JSON.parse(xhr.response);
            cb(index);
        }
    }
}

let loadQuizzResults = () => {
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/quizzresults/${localStorage.quizz}`
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if(xhr.status == 200){
            //console.log(xhr.response);
            quizzResults = JSON.parse(xhr.response);
        }
    }
}

let loadQuestions = (index) => {
    //console.log(quizz);
    question.innerText = quizz.questions[index].question;
    let html = quizz.questions[index].answers.map((item) => {
        return `
        <div class="col-md-6 col-lg-4">
            <div class="product">
                <div class="text py-3 pb-4 px-3 text-center">
                    <h3>${item.answer}</h3>
                </div>
            </div>
        </div>`
    }).join("");
    //console.log(html);
    answers.innerHTML = html;
    console.log(quizz.questions[index]);
    console.log(quizz.questions[index].time);
    min = Math.floor(quizz.questions[index].time / 60);
    sec = quizz.questions[index].time % 60;
    //console.log(answers);
}

loadQuizz(loadQuestions);
loadQuizzResults();

function makeTimer() {
    $("#minutes").html(min + "<span>Minutes</span>");
    $("#seconds").html(sec + "<span>Seconds</span>");
    sec--;
    if(sec == 0){
        min--;
        sec = 60;
    }
}

setInterval(function() { makeTimer(); }, 1000);
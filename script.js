//Initial data
let currentQuestion = 0;
let score = 0;
let scoreArea = document.querySelector('.scoreArea');
let questionArea = document.querySelector('.questionArea');
let question = document.querySelector('.question');
let optionsArea = document.querySelector('.options');

showQuestion()

//Functions
function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100)
        document.querySelector('.progress--bar').style.width = `${pct}%`
        console.log(pct)


        scoreArea.style.display = 'none'
        questionArea.style.display = 'block'

        question.innerHTML = q.question;
        let optionsHtml = '';

        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${Number(i) + 1}</span> ${q.options[i]}</div>`;
        }

        optionsArea.innerHTML = optionsHtml

        document.querySelectorAll('.options').forEach(item => {
            item.addEventListener('click', optionClickEvent)
        })
    } else {
        finishQuiz()
    }
}

function optionClickEvent(event) {
    let clickedOption = Number(event.target.getAttribute('data-op'))

    if (clickedOption === questions[currentQuestion].answer) {

        score++
    } else {

    }

    currentQuestion++
    showQuestion()

}

function finishQuiz() {
    scoreArea.style.display = 'block'
    questionArea.style.display = 'none'

    document.querySelector('.progress--bar').style.width = `100%`

    let pctHit = Math.floor((score / questions.length) * 100)
    let msgArea = document.querySelector('.scoreText1')
    let pctArea = document.querySelector('.scorePct')
    let scoreElement = document.querySelector('.scoreText2')
    pctArea.innerHTML = `Você acertou ${pctHit}%`;
    scoreElement.innerHTML = `Você respondeu ${questions.length} e acertou ${score}`

    if (pctHit < 40) {
        pctArea.style.color = 'red'
        msgArea.innerHTML = `Muito RUIM, estude mais`
    } else if (pctHit < 70) {
        pctArea.style.color = '#014701'
        msgArea.innerHTML = `Ficou na média, continue estudando`
    } else if (pctHit >= 70) {
        pctArea.style.color = 'green'
        msgArea.innerHTML = `PARABÉNS, bom trabalho`
    }
}

document.querySelector('.repeat').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    showQuestion()


})
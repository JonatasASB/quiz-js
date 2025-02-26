//Initial data

let currentQuestion = 0;// Variável responsável por controlar a pergunta atual
let score = 0;//Variável que vai armazenar a pontuação
let scoreArea = document.querySelector('.scoreArea');//Área que vai aparecer a pontuação
let questionArea = document.querySelector('.questionArea');// Área que vai aparecer as perguntas
let question = document.querySelector('.question');// Pergunta
let optionsArea = document.querySelector('.options');// Opções de resposta


showQuestion() //Função que inicializa o quiz

//Functions
function showQuestion() {
    //Verifica se tem ainda tem perguntas
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        //Porcentagem da Barra
        let pct = Math.floor((currentQuestion / questions.length) * 100)
        document.querySelector('.progress--bar').style.width = `${pct}%`


        //Esconde a area de pontuação
        scoreArea.style.display = 'none'
        //Mostra a area de perguntas
        questionArea.style.display = 'block'

        //
        question.innerHTML = q.question;
        let optionsHtml = '';

        //Loop responsável por formar as opções
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${Number(i) + 1}</span> ${q.options[i]}</div>`;
        }

        //Mostra as opções no HTML
        optionsArea.innerHTML = optionsHtml

        //Adiciona o evento de Click em todas as opções
        document.querySelectorAll('.options').forEach(item => {
            item.addEventListener('click', optionClickEvent)
        })
    } else {
        //Função responsável por finalizar o quiz quando acabarem as perguntas
        finishQuiz()
    }
}



/**
 * Função responsável por verificar se a opção escolhida é igual a resposta certa
 * Evento de click em uma opção
 */
function optionClickEvent(event) {
    //Pega a opção escolhida
    let clickedOption = Number(event.target.getAttribute('data-op'))

    //Verifica se a opção escolhida é igual a resposta certa
    if (clickedOption === questions[currentQuestion].answer) {
        //Incrementa a pontuação
        score++
    } else {
        //Caso contrário, não faz nada
    }

    //Incrementa a pergunta atual
    currentQuestion++
    //Chama a função para mostrar a próxima pergunta
    showQuestion()
}

//Função responsável por finalizar o quiz e mostrar pontuação
function finishQuiz() {
    //Mostra a area de pontuação
    scoreArea.style.display = 'block'
    //Esconde area de perguntas
    questionArea.style.display = 'none'

    document.querySelector('.progress--bar').style.width = `100%`

    let pctHit = Math.floor((score / questions.length) * 100)// Calcula a porcentagem de acerto
    let msgArea = document.querySelector('.scoreText1')
    let pctArea = document.querySelector('.scorePct')
    let scoreElement = document.querySelector('.scoreText2')
    pctArea.innerHTML = `Você acertou ${pctHit}%`;// Mostra a porcentagem de acerto
    scoreElement.innerHTML = `Você respondeu ${questions.length} e acertou ${score}`// Mostra a quantidade de perguntas e quantidade de perguntas acertadas

    // Verificações para mudar cor de pontuação e informar rendimento
    if (pctHit < 40) {
        pctArea.style.color = 'red'
        msgArea.innerHTML = `Muito RUIM, estude mais`
    } else if (pctHit < 70) {
        pctArea.style.color = '#fcff38'
        msgArea.innerHTML = `Ficou na média, continue estudando`
    } else if (pctHit >= 70) {
        pctArea.style.color = 'green'
        msgArea.innerHTML = `PARABÉNS, bom trabalho`
    }
}
//Evento de Click no botão de Peretir para zerar pontuação e reiniciar o quiz
document.querySelector('.repeat').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    //Chama a função para mostrar a primeira pergunta
    showQuestion()


})
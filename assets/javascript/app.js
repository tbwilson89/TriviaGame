gameObj = {
  questions: [
    {
      q: "What year was the (original) Sony Playstation released?",
      options: ['1997', '1994', '2000', '1995'],
      answer: 1
    },
    {
      q: "What game was the character Mario originally from?",
      options: ['Super Mario Bros.', 'Donkey Kong', 'Super Mario World', 'Game & Watch'],
      answer: 1
    },
    {
      q: "Who was the character Zelda in the Legend of Zelda games?",
      options: ['The Hero', 'The Villian', 'The Story Teller', 'The Princess'],
      answer: 3
    },
    {
      q: "In the game Tetris, what is the name given to the pieces?",
      options: ['Dominoes', 'Shapes', 'Tetrominoes', 'Blocks'],
      answer: 2
    },
    {
      q: "What was the gender of the main character of Metroid, Samus Aran?",
      options: ['Male', 'Female'],
      answer: 1
    },
    {
      q: "What year did the trading card game Magic: The Gathering release?",
      options: ['1997', '1994', '1993', '1991'],
      answer: 2
    },
    {
      q: "How many evolutions did Eevee have in the original Pokemon game?",
      options: ['Two', 'Five', 'Three', 'Seven'],
      answer: 2
    },
    {
      q: "What company worked with Nintendo to create a new console, at least until Nintendo dropped the project, in the 90's?",
      options: ['Samsung', 'Microsoft', 'IBM', 'Sony'],
      answer: 3
    }
  ],
  gameStarted: false,
  questionsLeft: [],
  rightAnswers: 0,
  wrongAnswers: 0,
  unanswered: 0,
  intervalVar: "",
  questionAnswered: false,
  count: 15,
  resetQuiz: function(){
    for(i=0;i<this.questions.length;i++){
      this.questionsLeft.push(i)
    }
    this.rightAnswers = 0
    this.wrongAnswers = 0
    this.unanswered = 0
    this.count = 15
  },
  countFunc: function(){
    this.count--
    $('#question-timer').text(this.count)
    if(this.count === 0){
      this.unanswered++
      gameObj.questionAnswered = true
      $('#question-timer').text(`You ran out of time for that question...`)
      var qVal = $('.question-option').val()
      $(`#${gameObj.questions[$('.question-option').val()].answer.toString()}`).addClass('highlight-correct')
      this.count = 15
      clearInterval(this.intervalVar)
      setTimeout(this.displayQuestionInfo.bind(this), 3000)
    }
  },
  displayQuestionInfo: function(){
    var optionsEle = $('#current-answer-choices')
    var timerEle = $('#question-timer')
    var questionEle = $('#current-question')
    document.getElementById('quiz-results').textContent = ''
    if(this.questionsLeft.length > 0){
      this.questionAnswered = false
      var q = this.questionsLeft[Math.floor(Math.random() * this.questionsLeft.length)]
      this.questionsLeft.splice(this.questionsLeft.indexOf(q), 1)
      timerEle.text(gameObj.count)
      gameObj.intervalVar = setInterval(gameObj.countFunc.bind(gameObj), 1000)
      questionEle.text(gameObj.questions[q].q)
      optionsEle.empty()
      for(i=0;i<gameObj.questions[q].options.length;i++){
        var newDiv = $('<li>')
        newDiv.addClass('question-option list-group-item')
        newDiv.attr('id', i)
        newDiv.val(q)
        newDiv.text(this.questions[q].options[i])
        $('#current-answer-choices').append(newDiv)
        if(i===gameObj.questions[q].options.length - 1){
          var elements = document.querySelectorAll('.question-option')
          for(i=0;i<elements.length;i++){
            elements[i].addEventListener('click', function(e){
              if(!gameObj.questionAnswered){
                gameObj.questionAnswered = !gameObj.questionAnswered
                gameObj.count = 15
                console.log(e.target.id + ' ' + gameObj.questions[this.value].answer)
                if(e.target.id == gameObj.questions[this.value].answer){
                  gameObj.rightAnswers++
                  console.log('You got it!')
                  this.classList.add('highlight-correct')
                  timerEle.text(`That's correct!`)
                  clearInterval(gameObj.intervalVar)
                  setTimeout(gameObj.displayQuestionInfo.bind(gameObj), 3000)
                } else {
                  gameObj.wrongAnswers++
                  console.log('You did not get it...')
                  $(`#${gameObj.questions[this.value].answer}`).addClass('highlight-correct')
                  this.classList.add('highlight-incorrect')
                  timerEle.text(`That's incorrect...`)
                  clearInterval(gameObj.intervalVar)
                  setTimeout(gameObj.displayQuestionInfo.bind(gameObj), 3000)
                }
              }
            })
          }
        }
      }
    } else {
      optionsEle.empty()
      timerEle.text('')
      questionEle.text('')
      $('#quiz-results').html(`
        <div id='results-container'>
          <h1>Congratulations! You finished the quiz!</h1>
          <h2>Press any key for a retake!</h2>
          <h3>Score: ${(gameObj.rightAnswers / gameObj.questions.length) * 100}%</h3>
          <h3>Correct: ${gameObj.rightAnswers} Incorrect ${gameObj.wrongAnswers}</h3>
          <h3>Unanswered: ${gameObj.unanswered}</h3>
        </div>
      `)
      gameObj.gameStarted = !gameObj.gameStarted
      console.log(`You're out of questions!`)
    }
  },
}

document.onkeyup = function(e){
  console.log(e.key)
  if(e.key !== "F5" && !gameObj.gameStarted){
    gameObj.resetQuiz()
    gameObj.gameStarted = !gameObj.gameStarted
    gameObj.displayQuestionInfo()
  }
}

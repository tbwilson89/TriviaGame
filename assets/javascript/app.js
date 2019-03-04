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
      q: "Question Eight",
      options: ['Answer one', 'Answer two', 'Answer three', 'Answer four'],
      answer: 0
    },
    {
      q: "Question Nine",
      options: ['Answer one', 'Answer two', 'Answer three', 'Answer four'],
      answer: 0
    },
    {
      q: "Question Ten",
      options: ['Answer one', 'Answer two', 'Answer three', 'Answer four'],
      answer: 0
    }
  ],
  gameStarted: false,
  questionsLeft: [0,1,2,3,4,5,6,7,8,9],
  rightAnswers: 0,
  wrongAnswers: 0,
  unanswered: 0,
  intervalVar: "",
  questionAnswered: false,
  count: 30,
  resetQuiz: function(){
    this.questionsLeft = [0,1,2,3,4,5,6,7,8,9]
    this.rightAnswers = 0
    this.wrongAnswers = 0
    this.unanswered = 0
    this.count = 30
  },
  countFunc: function(){
    this.count--
    document.getElementById('question-timer').textContent = this.count
    if(this.count === 0){
      this.unanswered++
      gameObj.questionAnswered = true
      document.getElementById('question-timer').textContent = `You ran out of time for that question...`
      console.log('Count is 0! You failed to answer in time...')
      this.count = 30
      clearInterval(this.intervalVar)
      setTimeout(this.displayQuestionInfo.bind(this), 3000)
    }
  },
  displayQuestionInfo: function(){
    var options = document.getElementById('current-answer-choices')
    var timer = document.getElementById('question-timer')
    var question = document.getElementById('current-question')
    document.getElementById('quiz-results').textContent = ''
    if(this.questionsLeft.length > 0){
      this.questionAnswered = false
      var q = this.questionsLeft[Math.floor(Math.random() * this.questionsLeft.length)]
      this.questionsLeft.splice(this.questionsLeft.indexOf(q), 1)
      timer.textContent = gameObj.count
      gameObj.intervalVar = setInterval(gameObj.countFunc.bind(gameObj), 1000)
      question.textContent = gameObj.questions[q].q
      while(options.firstChild){
        options.removeChild(options.firstChild)
      }
      for(i=0;i<gameObj.questions[q].options.length;i++){
        var newDiv = document.createElement('li')
        newDiv.classList.add('question-option')
        newDiv.classList.add('list-group-item')
        newDiv.id = i
        newDiv.value = q
        newDiv.textContent = this.questions[q].options[i]
        document.getElementById('current-answer-choices').appendChild(newDiv)
        if(i===gameObj.questions[q].options.length - 1){
          var elements = document.querySelectorAll('.question-option')
          for(i=0;i<elements.length;i++){
            console.log(elements[i])
            elements[i].addEventListener('click', function(e){
              if(!gameObj.questionAnswered){
                gameObj.questionAnswered = !gameObj.questionAnswered
                gameObj.count = 30
                console.log(e.target.id + ' ' + gameObj.questions[this.value].answer)
                if(e.target.id == gameObj.questions[this.value].answer){
                  gameObj.rightAnswers++
                  console.log('You got it!')
                  this.classList.add('highlight-correct')
                  document.getElementById('question-timer').textContent = `That's correct!`
                  clearInterval(gameObj.intervalVar)
                  setTimeout(gameObj.displayQuestionInfo.bind(gameObj), 3000)
                } else {
                  gameObj.wrongAnswers++
                  console.log('You did not get it...')
                  document.getElementById(gameObj.questions[this.value].answer).classList.add('highlight-correct')
                  this.classList.add('highlight-incorrect')
                  document.getElementById('question-timer').textContent = `That's incorrect...`
                  clearInterval(gameObj.intervalVar)
                  setTimeout(gameObj.displayQuestionInfo.bind(gameObj), 3000)
                }
              }
            })
          }
        }
      }
    } else {
      while(options.firstChild){
        options.removeChild(options.firstChild)
      }
      timer.textContent = ''
      question.textContent = ''
      document.getElementById('quiz-results').innerHTML = `
        <div id='results-container'>
          <h1>Congratulations! You finished the quiz!</h1>
          <h2>Press any key for a retake!</h2>
          <h3>Score: ${(gameObj.rightAnswers / gameObj.questions.length) * 100}%</h3>
          <h3>Correct: ${gameObj.rightAnswers} Incorrect ${gameObj.wrongAnswers}</h3>
          <h3>Unanswered: ${gameObj.unanswered}</h3>
        </div>
      `
      gameObj.gameStarted = !gameObj.gameStarted
      console.log(`You're out of questions!`)
    }
  },
}

// Initial Page Setup:
// Display message for player to push any key to start the quiz
// Check for any key press to start the quiz
//
// Once any key pressed, display random question and remove that question option
// from the questionLeft array
// Set a timeout for 30 seconds
// if user selects correct option, congratulate them and wait a few seconds before
// displaying another question randomly, same as before. Increment rightAnswers
// if user selects incorrect option, let them know it's wrong and highlight the correct
// option, then wait and display another question after. increment wrongAnswers
// if user does not select any answer and the timeout finishes, let them know time is up
// then shortly after display a new question. increment unanswered.
//
// Once all questionsLeft array is empty, display page with quiz results and give option
// to start over.
document.onkeyup = function(e){
  console.log(e.key)
  if(e.key !== "F5" && !gameObj.gameStarted){
    gameObj.resetQuiz()
    gameObj.gameStarted = !gameObj.gameStarted
    gameObj.displayQuestionInfo()
  }
}

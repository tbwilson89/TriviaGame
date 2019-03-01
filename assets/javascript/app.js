gameObj = {
  questions: [
    {
      q: "Question One",
      options: ['Answer one', 'Answer two', 'Answer three', 'Answer four'],
      a1: "Answer One",
      a2: "Answer Two",
      a3: "Answer Three",
      a4: "Answer Four",
      answer: "a1"
    },
    {
      q: "Question Two",
      a1: "Answer One",
      a2: "Answer Two",
      a3: "Answer Three",
      a4: "Answer Four",
      answer: "a1"
    },
    {
      q: "Question Three",
      a1: "Answer One",
      a2: "Answer Two",
      a3: "Answer Three",
      a4: "Answer Four",
      answer: "a1"
    },
    {
      q: "Question Four",
      a1: "Answer One",
      a2: "Answer Two",
      a3: "Answer Three",
      a4: "Answer Four",
      answer: "a1"
    },
    {
      q: "Question Five",
      a1: "Answer One",
      a2: "Answer Two",
      a3: "Answer Three",
      a4: "Answer Four",
      answer: "a1"
    },
    {
      q: "Question Six",
      a1: "Answer One",
      a2: "Answer Two",
      a3: "Answer Three",
      a4: "Answer Four",
      answer: "a1"
    },
    {
      q: "Question Seven",
      options: ['Answer one', 'Answer two', 'Answer three', 'Answer four'],
      a1: "Answer One",
      a2: "Answer Two",
      a3: "Answer Three",
      a4: "Answer Four",
      answer: "a1"
    },
    {
      q: "Question Eight",
      a1: "Answer One",
      a2: "Answer Two",
      a3: "Answer Three",
      a4: "Answer Four",
      answer: "a1"
    },
    {
      q: "Question Nine",
      a1: "Answer One",
      a2: "Answer Two",
      a3: "Answer Three",
      a4: "Answer Four",
      answer: "a1"
    },
    {
      q: "Question Ten",
      a1: "Answer One",
      a2: "Answer Two",
      a3: "Answer Three",
      a4: "Answer Four",
      answer: "a1"
    }
  ],
  questionsLeft: [0,1,2,3,4,5,6,7,8,9],
  rightAnswers: 0,
  wrongAnswers: 0,
  unanswered: 0,
  intervalVar: "",
  count: 30,
  countFunc: function(){
    this.count--
    console.log(document.getElementById('question-timer'))
    document.getElementById('question-timer').textContent = this.count
    if(this.count === 0){
      console.log('Count is 0!')
      clearInterval(this.intervalVar)

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
  if(e.key !== "F5"){
    triviaStart()
  }
}
function triviaStart(){
  document.getElementById('question-timer').textContent = gameObj.count
  gameObj.intervalVar = setInterval(gameObj.countFunc.bind(gameObj), 1000)
  document.getElementById('current-question').textContent = gameObj.questions[0].q
  for(i=0;i<gameObj.questions[0].options.length;i++){
    var newDiv = document.createElement('div')
    newDiv.textContent = gameObj.questions[0].options[i]
    document.getElementById('current-question').appendChild(newDiv)
  }
}

for(i=0;i<gameObj.questions.length;i++){
  console.log(gameObj.questions[i].q)
}

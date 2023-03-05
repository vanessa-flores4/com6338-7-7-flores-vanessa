var quiz = document.getElementById("quiz");
var previousScore  = localStorage.getItem("previous-score");
var quizButton = document.createElement("button");
var timerDis = document.createElement("p");
var questionEl = document.createElement("p");
let currentQuestion = 0;
let score = 0;
let remainingTime = 30;
let setTime = "";
var questionsArr = [
    {question: 'In what year was Walt Disney Studios founded?',
    answer:'1923',
    options: [
        '1971',
        '1933',
        '1940',
        '1923'
    ]
    },
    {question: 'When did Disneyland first open?',
    answer:'July 17, 1955',
    options: [
        'May 4, 1950',
        'July 17, 1955',
        'November 18, 1928',
        'June 13, 1997'
    ]
    },
    {question: 'What was the first fully animated film released by Disney?',
    answer:'Snow White and the Seven Dwarfs',
    options: [
        'Snow White and the Seven Dwarfs',
        'Pinocchio',
        'Bambi',
        'Cinderella'
    ]
    },
    {question: 'When did Disney World first open?',
    answer:'October 1, 1971',
    options: [
        'January 1, 1955',
        'October 1, 1971',
        'December 21, 1937',
        'February 15, 1950'
    ]
    },
    {question: 'What year did Disney acquire Marvel Entertainment?',
    answer:'2009',
    options: [
        '2009',
        '2002',
        '2015',
        '1998'
    ]
    },
    {question: 'What Marvel movie was released last in 2019?',
    answer:'Spider-Man: Far From Home',
    options: [
        'Captain Marvel',
        'Avengers: Endgame',
        'Thor: Ragnarok',
        'Spider-Man: Far From Home'
    ]
    }
]
 
quiz.onclick = function (e){
    if (e.target.id == 'start-quiz'){
      quizQuestion()
    } else if (e.target.parentElement.id == 'choices'
    && e.target.tagName == 'BUTTON') {
        if ( e.target.textContent == questionsArr[currentQuestion].answer){
        score++
        }
        currentQuestion++
        clearInterval(setTime);
    
      if(currentQuestion< questionsArr.length){
        quizQuestion()
      } else {
        endQuiz()
      }
    }
}

function startQuiz() {
    var previousScore = localStorage.getItem('previous-score');
    quiz.innerHTML = "";
    currentQuestion = 0;
    score = 0;
    if (previousScore && previousScore.trim() !== "") {
      var previousScoreEl = document.createElement('p')
      previousScoreEl.textContent = 'Previous Score: ' + previousScore;
      quiz.insertBefore(previousScoreEl, quiz.firstChild);
    }
    quizButton.id = 'start-quiz';
    quizButton.textContent = "Start Quiz!";
    quiz.appendChild(quizButton);
}  

function startTime(){
    var timerDis = document.getElementById("timer");
    setTime = setInterval(function(){
      remainingTime--
      if(remainingTime >= 0){
        timerDis.textContent = remainingTime
      } else { 
        clearInterval(setTime)
        currentQuestion ++
        if (currentQuestion < questionsArr.length){
          quizQuestion()
        } else {
          endQuiz()
        }
      }
    }, 1000)
}

function quizQuestion(){
    var questionAsk = questionsArr[currentQuestion];
    var questionChoices = document.createElement("div");
    quiz.innerHTML = "";
    quiz.appendChild(questionEl);
    quiz.appendChild(questionChoices);
    questionEl.textContent = questionAsk.question
    questionChoices.id = 'choices';
    questionAsk.options.forEach(function(choice){
      var button = document.createElement("button");
      questionChoices.appendChild(button);
      button.textContent = choice
    })
    timerDis.id = 'timer';
    quiz.appendChild(timerDis);
    remainingTime = 30;
    timerDis.textContent = remainingTime;
    startTime()
}
function endQuiz(){
    var percentage = Math.round(score / questionsArr.length * 100) + "%";
    quiz.innerHTML = "";
    localStorage.setItem('previous-score', percentage);
    startQuiz()
}
startQuiz()


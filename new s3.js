
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restartbutton");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("startbutton");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;


let endGif0 = document.getElementById("endGif0");
let endGif1 = document.getElementById("endGif1");
let endGif2 = document.getElementById("endGif2");
let endGif3 = document.getElementById("endGif3");


const quizArray = [
  {
    id: "0",
    question: "What is the name of the train that takes students to Hogwarts from Platform 9¾?",
    options: ["The Knight Bus", "The Hogwarts Express", "Thestral Transport", "The Floo Network"],
    correct: "The Hogwarts Express",
  },
  {
    id: "1",
    question: "Why did Professor Snape stand in the middle of the road?",
    options: ["To confuse Muggles", "To teach a lesson on Dark Arts", "So you'll never know which side he's on", "Because he needed directions to Diagon Alley"],
    correct: "So you'll never know which side he's on",
  },
  {
    id: "2",
    question: "What do you call a Hufflepuff with two brain cells?",
    options: ["Ambidextrous", "Overprepared", "Alohomora", "Pregnant"],
    correct: "Pregnant",
  },
  {
    id: "3",
    question: "What position does Harry play on his Quidditch team?",
    options: ["Chaser", "Beater", "Keeper", "Seeker"],
    correct: "Seeker",
  },
  {
    id: "4",
    question: "What does the spell 'Lumos' do?",
    options: ["Levitate objects", "Create a light at the wand's tip", "Unlock doors", "Disarm opponents"],
    correct: "Create a light at the wand's tip",
  },
  {
    id: "5",
    question: "Who is the Half-Blood Prince?",
    options: ["Harry Potter", "Albus Dumbledore", "Severus Snape", "Tom Riddle"],
    correct: "Severus Snape",
  },
  {
    id: "6",
    question: "What is the name of the house-elf that serves the Malfoy family?",
    options: ["Kreacher", "Winky", "Dobby", "Hokey"],
    correct: "Dobby",
  },
  {
    id: "7",
    question: "What is the core of Harry's wand?",
    options: ["Phoenix feather", "Dragon heartstring", "Unicorn hair", "Thestral tail hair"],
    correct: "Phoenix feather",
  },
  {
    id: "8",
    question: "Who was the master of the Elder Wand before Harry?",
    options: ["Voldemort", "Draco Malfoy", "Severus Snape", "Dumbledore"],
    correct: "Draco Malfoy",
  },
  {
    id: "9",
    question: "What is the name of the Weasley's house?",
    options: ["Shell Cottage", "The Burrow", "Hogwarts", "Godric's Hollow"],
    correct: "The Burrow",
  },
];


restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
  endGif0.classList.add("hide"); 
  endGif1.classList.add("hide");
  endGif2.classList.add("hide");
  endGif3.classList.add("hide");
});


nextBtn.addEventListener("click", (displayNext = () => {
 
  questionCount += 1;
 
  if (questionCount == quizArray.length) {
   
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");

    
    if (scoreCount === 0) {
      endGif0.classList.remove("hide");
    } else if (scoreCount <= 5) {
      endGif1.classList.remove("hide");
    } else if (scoreCount < 10) {
      endGif2.classList.remove("hide");
    } else {
      endGif3.classList.remove("hide");
    }

    
    userScore.innerHTML = "Your score is " + scoreCount + " out of " + questionCount;
  } else {
    
    countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + " Question";
   
    quizDisplay(questionCount);
    count = 11;
    clearInterval(countdown);
    timerDisplay();
  }
}));


const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
 
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  
  quizCards[questionCount].classList.remove("hide");
};


function quizCreator() {
  
  quizArray.sort(() => Math.random() - 0.5);
 
  for (let i of quizArray) {
    
    i.options.sort(() => Math.random() - 0.5);
    
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    
    div.innerHTML += `
      <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}


function checker(userOption) {
  let userSolution = userOption.innerText;
  let question = document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  
  clearInterval(countdown);
  
  options.forEach((element) => {
    element.disabled = true;
  });
}


function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}


startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

document.addEventListener('DOMContentLoaded', function() {
  const startbutton = document.getElementById('startbutton');
  const restartbutton = document.getElementById('restartbutton');
  const backgroundaudio = document.getElementById('backgroundaudio');

 
  startbutton.addEventListener('click', function() {
    
    backgroundaudio.play();
    
    
    startbutton.style.display = 'none';
    restartbutton.style.display = 'inline-block'; 
  });

  
  restartbutton.addEventListener('click', function() {
    
    backgroundaudio.pause();
    backgroundaudio.currentTime = 0; 
    backgroundaudio.play();
  });
});


window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};

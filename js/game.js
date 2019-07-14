// console.log("hello.world!")
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
// console.log(choices);
const images = Array.from(document.getElementsByClassName("choice-image"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const sound = document.getElementById("sound");
const audio = document.getElementById("audio");
const playButton = document.getElementById("play-button");

let currentQuestion = {};
let acceptingAnswers = false; 
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let playCount=0;
let shuffleArr=[];

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

let questions = [
  {
    question: ["sounds/alligatorHiss (1).mp3"],
    choice1: ["images/alligatorHiss (1).jpg"],
    choice2: ["images/bat1.jpg"],
    choice3: ["images/bear.jpg"],
    choice4: ["images/Camel (1).jpg"],
    answer: 1
  },
  {
    question: ["sounds/baboon.mp3"],
    choice1: ["images/baboon.jpg"],
    choice2: ["images/bear.jpg"],
    choice3: ["images/CHIPMUNK.jpg"],
    choice4: ["images/lioncub2.jpg"],
    answer: 1
  },
  {
    question: ["sounds/bat1.mp3"],
    choice1: ["images/penguin3.jpg"],
    choice2: ["images/whalesurfaces.jpg"],
    choice3: ["images/raccoon3 (1).jpg"],
    choice4: ["images/bat1.jpg"],
    answer: 4
  },
  {
    question: ["sounds/bear.mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/bear.jpg"],
    choice3: ["images/Camel (1).jpg"],
    choice4: ["images/koala[1].jpg"],
    answer: 2
  },
  {
    question: ["sounds/BOB-CAT (1).mp3"],
    choice1: ["images/Tiger7 (1).jpg"],
    choice2: ["images/lemur4 (1).jpg"],
    choice3: ["images/BOB-CAT (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 3
  },
  {
    question: ["sounds/Camel (1).mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/bear_polar.jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/Camel (1).jpg"],
    answer: 4
  },
  {
    question: ["sounds/Cat2.mp3"],
    choice1: ["images/BOB-CAT (1).jpg"],
    choice2: ["images/Cat2.jpg"],
    choice3: ["images/SQMarsupflyingsquirrel2 (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 2
  },
  {
    question: ["sounds/cheeta (1).mp3"],
    choice1: ["images/cheeta (1).jpg"],
    choice2: ["images/lioncub2.jpg"],
    choice3: ["images/crocodile.jpg"],
    choice4: ["images/baboon.jpg"],
    answer: 1
  },
  {
    question: ["sounds/CHIPMUNK.mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/whalesurfaces.jpg"],
    choice3: ["images/CHIPMUNK.jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 3
  },
  {
    question: ["sounds/crocodile.mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/crocodile.jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 2
  },
  {
    question: ["sounds/dog.mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/whalesurfaces.jpg"],
    choice3: ["images/dog.jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 3
  },
  {
    question: ["sounds/dolphin1.mp3"],
    choice1: ["images/dolphin1.jpeg"],
    choice2: ["images/whalesurfaces.jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 1
  },
  {
    question: ["sounds/elephantcub (1).mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/whalesurfaces.jpg"],
    choice3: ["images/elephantcub (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 3
  },
  {
    question: ["sounds/greyfox-vs-coon (1).mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/greyfox-vs-coon (1).jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 2
  },
  {
    question: ["sounds/hippo3.mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/whalesurfaces.jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 1
  },
  {
    question: ["sounds/hyena3.mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/whalesurfaces.jpg"],
    choice3: ["images/hyena3.jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 3 
  },
  {
    question: ["sounds/koala[1].mp3"],
    choice1: ["images/koala[1].jpg"],
    choice2: ["images/whalesurfaces.jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 1
  },
  {
    question: ["sounds/lemur4 (1).mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/whalesurfaces.jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/lemur4 (1).jpg"],
    answer: 4
  },
  {
    question: ["sounds/lioncub2.mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/lioncub2.jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 2
  },
  {
    question: ["sounds/penguin3.mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/whalesurfaces.jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/penguin3.jpg"],
    answer: 4
  },
  {
    question: ["sounds/pig.mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/pig.jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 2
  },
  {
    question: ["sounds/raccoon3 (1).mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/raccoon3 (1).jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 2
  },
  {
    question: ["sounds/rhinos5 (1).mp3"],
    choice1: ["images/rhinos5 (1).jpg"],
    choice2: ["images/whalesurfaces.jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 1
  },
  {
    question: ["sounds/seal3 (1).mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/whalesurfaces.jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 4
  },
  {
    question: ["sounds/sealions (1).mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/whalesurfaces.jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 3
  },
  {
    question: ["sounds/snakehit2.mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/snakehit2.jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 2
  },
  {
    question: ["sounds/SQMarsupflyingsquirrel2 (1).mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/SQMarsupflyingsquirrel2 (1).jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 2
  },
  {
    question: ["sounds/Tiger7 (1).mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/whalesurfaces.jpg"],
    choice3: ["images/Tiger7 (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 3
  },
  {
    question: ["sounds/whalesurfaces.mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/whalesurfaces.jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 2
  },
  {
    question: ["sounds/wolf8.mp3"],
    choice1: ["images/hippo3.jpg"],
    choice2: ["images/whalesurfaces.jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/wolf8.jpg"],
    answer: 4
  },
  {
    question: ["sounds/zebra7 (1).mp3"],
    choice1: ["images/zebra7 (1).jpg"],
    choice2: ["images/whalesurfaces.jpg"],
    choice3: ["images/sealions (1).jpg"],
    choice4: ["images/seal3 (1).jpg"],
    answer: 1
  }
]


//Stałe
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  // console.log(availableQuesions);
  getNewQuestion();
};

getNewQuestion = () => {
  if(playButton.getAttribute("hidden") == "true"){
      playButton.removeAttribute("hidden");
    }
  playCount=0;
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }
  questionCounter++;
   //Zmiana statusu progres bar
  progressText.innerHTML = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  //losowanie pytania/dzwięku z tablicy zwierząt
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  sound.src = currentQuestion.question;

  audio.load();
  if(shuffleArr.length>0){
      shuffleArr = [];
    }
  for(i=0;i<4;i++){
    shuffleArr.push(  {
    answear: currentQuestion["choice" + (i+1)],
    key: i+1});
  }
  shuffle(shuffleArr);

   audio.onplay = (e) => {
    console.log(playCount);
     playCount += 1;
     if (playCount === 3) {
       playButton.setAttribute("hidden", true);
     }
   };

  audio.play();
   playButton.addEventListener('click', function() {
      audio.play();
   });

  let el=0;
  choices.forEach(choice => {
    choice.dataset["number"] = shuffleArr[el].key;
    choice.children[0].src=shuffleArr[el].answear[0];
    el++;
  });
  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(c => {
  c.addEventListener("click", e => {
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.parentNode.dataset["number"];
    
    const classToApply =
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    //console.log(selectedAnswer == currentQuestion.answer);
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    //console.log(classToApply);
    //bo znikała ta klasa odrazu
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();

const GameSection = document.querySelector("#GameSection"),
  timer = document.querySelector("#timer"),
  imgs = document.querySelector("#imgs"),
  question = document.querySelector("#question"),
  lines = document.querySelector("#lines"),
  alphabets = document.querySelectorAll("#alphabets"),
  startGameSec = document.querySelector("#startGame"),
  startBtn = document.querySelector("#StartBtn");

let theQues,
    theAnswers = [],
    QuestionIndex = 0,
    QuestionLength ; 
    imgIndex = 1,
    answerArr = [],
    timeInSecond = 60,
    score = 0;

// this function to get Question from json file
let getQuestions = () => {
  let http = new XMLHttpRequest();

  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let jsob = JSON.parse(this.responseText);

      QuestionLength = jsob.length;
      theQues = randomQuestions(jsob);
      ShowQuestion(QuestionIndex);
    }
  };

  http.open("GET", "./Allquestion.json", true);
  http.send();
};

// this function to random element of Question array
randomQuestions = (questions) => {
  // first we random the questions
  let random = Math.floor(Math.random() * questions.length);
  let temp;
  let i;
  for (i = 0; i < questions.length; i++) {
    temp = questions[i];
    questions[i] = questions[random];
    questions[random] = temp;
  }

  return questions;
};

// This piece of code handles the click event for each alphabet button.
// It checks whether the clicked button is correct or not.
alphabets.forEach((ele) => {
  ele.addEventListener("click", (event) => {
    let e = event.target.innerHTML.trim("");

    if (theQues[QuestionIndex].anser.includes(e)) {
      // This line checks whether the clicked alphabet is correct or not
      for (let i = 0; i < theAnswers.length; i++) {
        for (let j = 0; j < theAnswers[i].length; j++) {
          if (e == theAnswers[i][j]) {
            answerArr[i][j] = theAnswers[i][j];
            event.target.disabled = true;
            event.target.style.boxShadow = "none";
          }
        }
      }

      // this line to puts answerArr to html document
      lines.innerHTML = answerArr.map((x) => `<div>${x.map((y) => `<span class="line">${y}</span>`).join("")}</div>`).join("");
    } else {
      if (imgIndex == 7) {
        alert(`Game over \nyour score is ${score} of ${QuestionLength}`);

        window.location.reload();
      }

      if (imgIndex < 7) {
        showPhoto(imgIndex++);
      }
    }

    if (theAnswers.flat().join("").toString() == answerArr.flat().join("").toString()) {
      timeInSecond = 60;
      imgIndex = 0;
      answerArr = [];
      showPhoto(imgIndex);
      ShowQuestion(QuestionIndex++);
      makeButtonsFun();
      score++;
    }
  });
});

// this piece of code to show alphabet in html document
makeButtonsFun = () => {
  alphabets[0].innerHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map(
      (letters) =>
        `<button class=${letters}  value=${letters}  >
            ${letters}
        </button>`
    )
    .join("");
};

let ShowQuestion = () => {
  question.innerHTML = theQues[QuestionIndex].ques;

  theAnswers = theQues[QuestionIndex].anser
    .split(" ")
    .map((x) => x.split("").map((y) => y));
    
  answerArr = theQues[QuestionIndex].anser
    .split(" ")
    .map((x) => x.split("").map((y) => ''));


  lines.innerHTML = answerArr.map((x) => `<div>${x.map((y) => `<span class="line"></span>`).join("")}</div>`).join("");
};

let showPhoto = (PhoNum) => (imgs.innerHTML = `<img src="./imgs/${PhoNum}.jpg">`);
let timerDown = () => {
  if (timeInSecond >= 0) {
    let minute = Math.floor(timeInSecond / 60);
    let second = Math.floor(timeInSecond % 60);

    timer.innerHTML = `${minute < 10 ? "0" + minute : minute}:${
      second < 10 ? "0" + second : second
    }`;

    var timerdown = setInterval(() => {
      timeInSecond--;
      let minute = Math.floor(timeInSecond / 60);
      let second = Math.floor(timeInSecond % 60);
      timer.innerHTML = `${minute < 10 ? "0" + minute : minute}:${
        second < 10 ? "0" + second : second
      }`;
      if (timeInSecond == 0) {
        alert(`game finished \nyour score is ${score} of ${QuestionLength}`);
        clearInterval(timerdown);
      }
    }, 1000);
  }
};

startBtn.onclick = () => {
  startGameSec.classList.add("hidden");
  GameSection.classList.remove("hidden");

  getQuestions();
  showPhoto(0);
  timerDown();
  makeButtonsFun();
};

/*
let start = () => {
    let word , count;
    count = Math.floor(Math.random() * words.length);
    word = words[count].answer;
    check = word.split("");

    // to make line for alphabets
    for(let i = 0 ; i < check.length ;i++){
        lines.innerHTML += `<span class="line"></span>`
    }

}
 function nasMan(event) {
     for(let i = 0 ; i < check.length;i++){
         if(event.target.value == check[i]){
             win[i] = check[i];
             event.target.classList.add("jamal");
             event.target.disabled = true;
             r++;
         }else{
            event.target.classList.add("jamal");
            event.target.disabled = true;
         }
     }
     let f = check.includes(event.target.value)
     if(f == false){
         imgCount++;
     }
      for(let i = 0 ; i < check.length ; i++){
         if(win[i] !== undefined){
            line[i].innerHTML  = win[i];
         }
      }
      imgs.innerHTML = `<img src='../games/imgs/${imgCount}.jpg'>`;
      endGame();
}


function endGame(){
    if(r === check.length){
        strtGm.innerHTML = `
        <div class="optionsOfGame">
            <div>you win</div>
            <button onclick="playAgain(event)">paly again</button>
        </div>`;
        strtGm.style.display = "block";
    }

    if(time == 0 || imgCount == 6){
        strtGm.innerHTML = `
        <div class="optionsOfGame">
            <div>time is over try again</div>
            <button onclick="playAgain(event)">paly again</button>
        </div>`;
        strtGm.style.display = "block";
    }
    strtGm.style.fontSize = "20px";
}

function playAgain(event){
    location.reload();
}
*/

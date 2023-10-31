const startBtn = document.querySelector(".start_btn button"),
  rules = document.querySelector(".rules"),
  exitBtn = rules.querySelector(".buttons .quit"),
  continueBtn = rules.querySelector(".buttons .restart"),
  quizBox = document.querySelector(".quiz_box"),
  resultBox = document.querySelector(".result_box"),
  optionsList = document.querySelector(".option_list"),
  timeLine = document.querySelector("header .time_line"),
  timeText = document.querySelector(".timer .time_left_txt"),
  timeCount = document.querySelector(".timer .timer_sec"),
  restart_quiz = resultBox.querySelector(".buttons .restart"),
  leave = resultBox.querySelector(".buttons .quit");

let timeValue = 15,
  queCount = 0,
  queNumb = 1,
  userRating = 0,
  counter,
  counterLine,
  widthValue = 0;

startBtn.addEventListener("click", () => {
  rules.classList.add("activeInfo");
});

exitBtn.addEventListener("click", () => {
  rules.classList.remove("activeInfo");
});

continueBtn.addEventListener("click", () => {
  rules.classList.remove("activeInfo");
  quizBox.classList.add("activeQuiz");
  show_questions(0);
  queCounter(1);
  startTimer(15);
  startTimerLine(0);
});

restart_quiz.addEventListener("click", () => {
  quizBox.classList.add("activeQuiz");
  resultBox.classList.remove("activeResult");
  timeValue = 15;
  queCount = 0;
  queNumb = 1;
  userRating = 0;
  widthValue = 0;
  show_questions(queCount);
  queCounter(queNumb);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  timeText.textContent = "Time Left";
  nextBtn.classList.remove("show");
});

leave.addEventListener("click", () => {
  window.location.reload();
});

const nextBtn = document.querySelector("footer .next_btn"),
  question_counter_down = document.querySelector("footer .total_que");

nextBtn.addEventListener("click", () => {
  if (queCount < questions.length - 1) {
    queCount++;
    queNumb++;
    show_questions(queCount);
    queCounter(queNumb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    nextBtn.classList.remove("show");
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    show_result();
  }
});

function show_questions(index) {
  const que_text = document.querySelector(".que_text");
  let que_tag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";
  que_text.innerHTML = que_tag;
  optionsList.innerHTML = option_tag;

  const option = optionsList.querySelectorAll(".option");

  for (let i = 0; i < option.length; i++) {
    option[i].addEventListener("click", function () {
      optionSelected(this);
    });
  }
}

let tickIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correcAns = questions[queCount].answer;
  const allOptions = optionsList.children.length;

  if (userAns == correcAns) {
    userRating += 1;
    answer.classList.add("correct");
    answer.innerHTML += crossIcon;
    console.log("Correct Answer");
    for (let i = 0; i < allOptions; i++) {
      if (optionsList.children[i].textContent == correcAns) {
        optionsList.children[i].setAttribute("class", "option correct");
        optionsList.children[i].innerHTML += tickIcon;
        console.log("Auto selected correct answer.");
      }
    }
  } else {
    answer.classList.add("incorrect");
    answer.innerHTML += crossIcon;
    console.log("Wrong Answer");
    for (let i = 0; i < allOptions; i++) {
      if (optionsList.children[i].textContent == correcAns) {
        optionsList.children[i].setAttribute("class", "option correct");
        optionsList.children[i].innerHTML += tickIcon;
        console.log("Auto selected correct answer.");
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    optionsList.children[i].classList.add("disabled");
  }
  nextBtn.classList.add("show");
}

function show_result() {
  rules.classList.remove("activeInfo");
  quizBox.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");
  const score = resultBox.querySelector(".score_text");
  if (userRating > 3) {
    let scoreTag =
      "<span>and congrats! , You got <p>" +
      userRating +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    score.innerHTML = scoreTag;
  } else if (userRating > 1) {
    let scoreTag =
      "<span>and nice , You got <p>" +
      userRating +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    score.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span>and sorry! , You got only <p>" +
      userRating +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    score.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 10) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeText.textContent = "Time Off";
      const allOptions = optionsList.children;
      let correcAns = questions[queCount].answer;
      for (let i = 0; i < allOptions.length; i++) {
        if (optionsList.children[i].textContent == correcAns) {
          optionsList.children[i].setAttribute("class", "option correct");
          optionsList.children[i].innerHTML += tickIcon;
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for (let i = 0; i < allOptions.length; i++) {
        optionsList.children[i].classList.add("disabled");
      }
      nextBtn.classList.add("show");
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px";
    if (time > 549) {
      clearTimeout(counterLine);
    }
  }
}

function queCounter(index) {
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    questions.length +
    "</p> Questions</span>";
  question_counter_down.innerHTML = totalQueCounTag;
}
function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correctAns = questions[queCount].answer;
  const allOptions = optionsList.children;

  for (let i = 0; i < allOptions.length; i++) {
    allOptions[i].classList.add("disabled");
    if (allOptions[i].textContent == correctAns) {
      allOptions[i].setAttribute("class", "option correct");
      allOptions[i].innerHTML += tickIcon;
    }
    if (allOptions[i].textContent == userAns) {
      if (userAns == correctAns) {
        allOptions[i].classList.add("correct");
      } else {
        allOptions[i].classList.add("incorrect");
        allOptions[i].innerHTML += crossIcon;
      }
    }
  }

  nextBtn.classList.add("show");
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function show_questions(index) {
  const que_text = document.querySelector(".que_text");
  let que_tag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";

  let options = questions[index].options.slice(); // Kopyasını al
  shuffleArray(options); // Şıkları karıştır

  let option_tag = "";
  for (let i = 0; i < options.length; i++) {
    option_tag += '<div class="option"><span>' + options[i] + "</span></div>";
  }

  que_text.innerHTML = que_tag;
  optionsList.innerHTML = option_tag;

  const option = optionsList.querySelectorAll(".option");

  for (let i = 0; i < option.length; i++) {
    option[i].addEventListener("click", function () {
      optionSelected(this);
    });
  }
}

var score = 0;
var time;
var runtime;
var playg = 0;
var audio_true = new Audio("./sound/true_sound.mp3");
var audio_false = new Audio("./sound/false_sound.mp3");
var highscore = JSON.parse(localStorage.getItem("highscore"));
if (highscore === null) {
  highscore = 0;
}

function getId(id) {
  return document.getElementById(id);
}

function getClass(clss) {
  {
    return document.getElementsByClassName(clss);
  }
}

function getTagName(tagname) {
  {
    return document.getElementsByTagName(tagname);
  }
}
getClass("highscore")[0].innerText = highscore;
getId("btn-start").onclick = playgame;
getClass("true")[0].onclick = answer_true;
getClass("false")[0].onclick = answer_false;


function playgame() {
  playg = 1;
  score = 0;
  time = 3000;
  clearInterval(runtime);
  getClass("gameover")[0].classList.remove("active");
  getClass("displaynumber")[0].style.display = "block";
  getClass("nametitle")[0].style.display = "none";
  getClass("score")[0].innerText = score;
  getClass("mainstart")[0].style.display = "none";
  getId("maingame").style.display = "block";
  checktime();
  try {
    startgame();
  } catch (error) { }
}

function startgame() {
  a = Math.floor(Math.random() * 50);
  b = Math.floor(Math.random() * 50);
  rd = Math.ceil(Math.random() * 8);
  switch (rd) {
    case 1:
    case 2:
    case 3:
    case 4:
      c = a + b;
      ques = 1;
      break;
    case 5:
    case 6:
      c = a + b + Math.ceil(Math.random() * 10);
      ques = 0;
      break;
    case 7:
    case 8:
      c = a + b - Math.ceil(Math.random() * 10);
      ques = 0;
      break;
    default:
      rd = Math.ceil(Math.random() * 8);
      break;
  }
  getId("number_1").innerText = a;
  getId("number_2").innerText = b;
  getId("result").innerText = c;
}

function checktime() {
  var runtime = setInterval(function () {
    time -= 8;
    if (time <= 0) {
      time = 0;
    }
    if (time === 0) {
      playg = 0;
      audio_false.play();
      clearInterval(runtime);
      getClass("score")[0].innerText = score;
      getClass("gameover")[0].classList.add("active");
      getClass("displaynumber")[0].style.display = "none";
      getClass("score")[1].innerText = score;
    }
    rtime = (time) / 30;
    getClass("line")[0].style.width = rtime + "%";
  }, 1);
}

function answer_true() {
  answ = 1;
  checkclick();
  getClass("true")[0].classList.add("active")
}

function answer_false() {
  answ = 0;
  checkclick();
  getClass("false")[0].classList.add("active")
}

function checkclick() {
  if (playg === 1) {
    if (ques === answ) {
      score += 1;
      audio_true.play();
      getClass("score")[0].innerText = score;
      startgame();
      time = 3000;
    } else {
      playg = 0;
      audio_false.play();
      getClass("score")[0].innerText = score;
      getClass("gameover")[0].classList.add("active");
      getClass("displaynumber")[0].style.display = "none";
      time = 0;
    }
    getClass("score")[1].innerText = score;
    savehighscore();
  }
}

getClass("replay")[0].onclick = function () {
  setTimeout(playgame, 300);
};
getClass("returnmainmenu")[0].onclick = function () {
  location.reload();
};

function savehighscore() {
  if (score > highscore) {
    highscore = score;
    localStorage.setItem("highscore", JSON.stringify(highscore));
    getClass("highscore")[0].innerText = highscore;
  }
}


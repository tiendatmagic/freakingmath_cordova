var score = 0;
var time;
var tim;
var playg = 0;
var bgcolor = 0;
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
document.getElementsByClassName("btn-start")[0].addEventListener("click", playgame);
document.getElementById("btn-rate").addEventListener("click", rategame);
function rategame() {
  cordova.plugins.market.open('com.tiendatmagic.freakingmath');
}
getClass("true")[0].onclick = truee;
getClass("false")[0].onclick = falsee;
getClass("replay")[0].onclick = function () {
  setTimeout(playgame, 300);
};
getClass("returnmainmenu")[0].onclick = function () {

  location.reload();
};
window.addEventListener("keydown", function (event) {
  if (event.which === 37) {
    truee();
  } else if (event.which === 39) {
    falsee();
  }
}, true);

function playgame() {
  playg = 1;
  score = 0;
  time = 3000;
  clearInterval(tim);
  getClass("gover")[0].classList.remove("active");
  getClass("displaynumber")[0].style.display = "block";
  getClass("nametitle")[0].style.display = "none";
  getClass("score")[0].innerText = score;
  getClass("mainstart")[0].style.display = "none";
  getId("maingame").style.display = "block";
  setcolor();
  checktime();
  try {
    startgame();
  } catch (error) {
    playgame();
  }
}

function setcolor() {
  bgcolor = Math.floor(Math.random() * 6);
  switch (bgcolor) {
    case 0:
      getTagName("body")[0].style.backgroundColor = "#c92bc9";
      break;
    case 1:
      getTagName("body")[0].style.backgroundColor = "#5bbdff";
      break;
    case 2:
      getTagName("body")[0].style.backgroundColor = "#24AE5E";
      break;
    case 3:
      getTagName("body")[0].style.backgroundColor = "#800080";
    case 4:
      getTagName("body")[0].style.backgroundColor = "#ff189e";
      break;
    default:
      getTagName("body")[0].style.backgroundColor = "#FF6633";
      break;
  }
}

function startgame() {
  a = Math.floor(Math.random() * 50);
  b = Math.floor(Math.random() * 50);
  rd = Math.ceil(Math.random() * 12);
  switch (rd) {
    case 2:
    case 4:
    case 6:
    case 8:
    case 10:
    case 12:
      c = a + b;
      ques = 1;
      break;

    case 1:
      c = a + b + 10;
      ques = 0;
      break;

    case 11:
      c = a + b - 10;
      ques = 0;
      break;
    case 3:
      c = a + b + Math.ceil(Math.random() * 10);
      ques = 0;
      break;

    case 9:
      c = a + b - Math.ceil(Math.random() * 10);
      ques = 0;
      break;

    case 5:
      c = a + b + Math.ceil(Math.random() * 5);
      ques = 0;
      break;
    case 7:
      c = a + b - Math.ceil(Math.random() * 5);
      ques = 0;
      break;
    default:
      rd = Math.ceil(Math.random() * 12);
      break;
  }
  getId("number_1").innerText = a;
  getId("number_2").innerText = b;
  getId("result").innerText = c;
}

function checktime() {
  var tim = setInterval(function () {
    time -= 8;
    if (time <= 0) {
      time = 0;
    }
    if (time === 0) {
      playg = 0;
      audio_false.play();
      clearInterval(tim);
      getClass("score")[0].innerText = score;
      getClass("gover")[0].classList.add("active");
      getClass("displaynumber")[0].style.display = "none";
      getClass("score")[1].innerText = score;
    }
    rtimee = (time) / 30;
    getClass("line")[0].style.width = rtimee + "%";
  }, 1);
}

function truee() {
  answ = 1;
  checkclick();
  getClass("true")[0].classList.add("active")
  setTimeout(function () {
    getClass("true")[0].classList.remove("active")
  }, 100)
}

function falsee() {
  answ = 0;
  checkclick();
  getClass("false")[0].classList.add("active")
  setTimeout(function () {
    getClass("false")[0].classList.remove("active")
  }, 100)
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
      getClass("gover")[0].classList.add("active");
      getClass("displaynumber")[0].style.display = "none";
      time = 0;
    }
    getClass("score")[1].innerText = score;
    savehighscore();
  }
}

function savehighscore() {
  if (score > highscore) {
    highscore = score;
    localStorage.setItem("highscore", JSON.stringify(highscore));
    getClass("highscore")[0].innerText = highscore;
  }
}


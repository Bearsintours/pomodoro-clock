// Global variable
var clock = document.getElementById("screen");
var message = document.getElementById("message");
var start = document.getElementById("start");
var reset = document.getElementById("reset");
var text = document.getElementById("text");
var screen = document.getElementById("screen");
var workTime = document.getElementById("work-time-output");
var lessWorkTime = document.getElementById("less-work-time");
var moreWorkTime = document.getElementById("more-work-time");
var restTime = document.getElementById("rest-time-output");
var lessRestTime = document.getElementById("less-rest-time");
var moreRestTime = document.getElementById("more-rest-time");
var countWorkTime, countRestTime, working, count;

// Print work time set on screen
function init() {
  message.innerHTML = "Time"
  screen.innerHTML = workTime.innerHTML < 10 ? "0" + workTime.innerHTML + " : 00" : workTime.innerHTML + " : 00";
}

//When page opens : run init() function
window.onload = init;

//Adjust work time down
lessWorkTime.addEventListener("click", function() {
  if (workTime.innerHTML > 0) {
    workTime.innerHTML--;
  };
});

//Adjust work time up
moreWorkTime.addEventListener("click", function() {
  if (workTime.innerHTML < 60) {
    workTime.innerHTML++;
  };
});

//Adjust rest time down
lessRestTime.addEventListener("click", function() {
  if (restTime.innerHTML > 0) {
    restTime.innerHTML--;
  };
});

// Adjust rest time up
moreRestTime.addEventListener("click", function() {
  if (restTime.innerHTML < 60) {
    restTime.innerHTML++;
  };
});


count = workTime.innerHTML * 60;
working = false;

// Start pomodoro clock
start.addEventListener("click", function() {
  // If already countdown running : clear existing countdown before starting work countddown
  if (working == true) {
    clearInterval(countWorkTime);
    clearInterval(countRestTime);
    count = workTime.innerHTML * 60;
    init();
    countWorkTime = setInterval(countWork, 1000);
  }
  // Else start work countdown
  else {
    clearInterval(countRestTime);
    count = workTime.innerHTML * 60;
    countWorkTime = setInterval(countWork, 1000);
  }
});
// Function work countdown
function countWork() {
  message.innerHTML = "Lets work!";
  var minutes = Math.floor((count / 60) % 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var seconds = Math.floor(count % 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  screen.innerHTML = minutes + " : " + seconds;
  count--;
  working = true;

  if (count < 0) {
    clearInterval(countWorkTime);
    count = restTime.innerHTML * 60;
    countRestTime = setInterval(countRest, 1000);
  }
  // Reset clock
  reset.addEventListener("click", function() {
    clearInterval(countWorkTime);
    init();
  })
}

// Function rest countdown
function countRest() {
  message.innerHTML = "Time to rest";
  screen.innerHTML = count;
  var minutes = Math.floor((count / 60) % 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var seconds = Math.floor(count % 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  screen.innerHTML = minutes + " : " + seconds;
  count--;
  working = false;

  if (count < 0) {
    clearInterval(countRestTime);
    count = workTime.innerHTML * 60;
    countWorkTime = setInterval(countWork, 1000);
  }
  // Reset clock
  reset.addEventListener("click", function() {
    clearInterval(countRestTime);
    count = workTime.innerHTML * 60;
    init();
  })
}

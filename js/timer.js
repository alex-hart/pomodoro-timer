$(document).ready(function() {
  var displayType = "pomodoro";

  $('#pom-sec').on('click', function() {

  });
  //Pomodoro timer variables
  var pomAdjust = "sec";
  var breakAdjust = "sec";
  var pomTimerTotal1 = 1800;
  var pomTimerTotal2 = pomTimerTotal1
  //Converting the total seconds into minutes and seconds
  var pomMin = Math.floor(pomTimerTotal1 / 60);
  var pomSec = pomTimerTotal1 % 60;
  //pomDisplay is what will be displayed on the website
  var pomDisplay;
  if (pomSec.toString().length == 1) {
    pomDisplay = pomMin.toString() + ":0" + pomSec.toString();
  } else {
    pomDisplay = pomMin.toString() + ":" + pomSec.toString();
  }
  $('#pom-time').text(pomDisplay);
  $('#main-time').text(pomDisplay);
  var buttonType = "start";
  var isPaused = false;
  var sessions = 0;

  //Break timer variables
  var breakTimerTotal1 = 300;
  var breakTimerTotal2 = breakTimerTotal1 + 1;
  var breakMin = Math.floor(breakTimerTotal1 / 60);
  var breakSec = breakTimerTotal1 % 60;
  var breakDisplay;
  if (breakSec.toString().length == 1) {
    breakDisplay = breakMin.toString() + ":0" + breakSec.toString();
  } else {
    breakDisplay = breakMin.toString() + ":" + breakSec.toString();
  }
  $('#break-time').text(breakDisplay);

  // ---- Pomodoro timer controls ----
  $('#pom-plus').on('click', function(e) {
    e.preventDefault();
    if (pomAdjust == "sec") {
      pomTimerTotal1 += 15;
      pomTimerTotal2 += 15;
    } else if (pomAdjust == "min") {
      pomTimerTotal1 += 60;
      pomTimerTotal2 += 60;
    }
    pomMin = Math.floor(pomTimerTotal1 / 60);
    pomSec = pomTimerTotal1 % 60;
    if (pomSec.toString().length == 1) {
      pomDisplay = pomMin.toString() + ":0" + pomSec.toString();
    } else {
      pomDisplay = pomMin.toString() + ":" + pomSec.toString();
    }
    $('#pom-time').text(pomDisplay);
    $('#main-time').text(pomDisplay);
  });

  $('#pom-minus').on('click', function(e) {
    e.preventDefault();
    if (pomAdjust == "sec") {
      if (pomTimerTotal1 > 15) {
        pomTimerTotal1 -= 15;
        pomTimerTotal2 -= 15;
      }
    } else if (pomAdjust == "min") {
      if (pomTimerTotal1 > 60) {
        pomTimerTotal1 -= 60;
        pomTimerTotal2 -= 60;
      }
    }
    pomMin = Math.floor(pomTimerTotal1 / 60);
    pomSec = pomTimerTotal1 % 60;
    if (pomSec.toString().length == 1) {
      pomDisplay = pomMin.toString() + ":0" + pomSec.toString();
    } else {
      pomDisplay = pomMin.toString() + ":" + pomSec.toString();
    }
    $('#pom-time').text(pomDisplay);
    $('#main-time').text(pomDisplay);
  });

  $('#pom-sec').on('click', function(e) {
    e.preventDefault();
    $(this).addClass('active');
    $('#pom-min').removeClass('active');
    pomAdjust = "sec";
  });
  $('#pom-min').on('click', function(e) {
    e.preventDefault();
    $(this).addClass('active');
    $('#pom-sec').removeClass('active');
    pomAdjust = "min";
  });

  // ---- Break timer controls ----
  $('#break-plus').on('click', function(e) {
    e.preventDefault();
    if (breakAdjust == "sec") {
      breakTimerTotal1 += 15;
      breakTimerTotal2 += 15;
    } else if (breakAdjust == "min") {
      breakTimerTotal1 += 60;
      breakTimerTotal2 += 60;
    }

    breakMin = Math.floor(breakTimerTotal1 / 60);
    breakSec = breakTimerTotal1 % 60;
    if (breakSec.toString().length == 1) {
      breakDisplay = breakMin.toString() + ":0" + breakSec.toString();
    } else {
      breakDisplay = breakMin.toString() + ":" + breakSec.toString();
    }
    $('#break-time').text(breakDisplay);
  });

  $('#break-minus').on('click', function(e) {
    e.preventDefault();
    if (breakAdjust == "sec") {
      if (breakTimerTotal1 > 15) {
        breakTimerTotal1 -= 15;
        breakTimerTotal2 -= 15;
      }
    } else if (breakAdjust == "min") {
      if (breakTimerTotal1 > 60) {
        breakTimerTotal1 -= 60;
        breakTimerTotal2 -= 60;
      }
    }
    breakMin = Math.floor(breakTimerTotal1 / 60);
    breakSec = breakTimerTotal1 % 60;
    if (breakSec.toString().length == 1) {
      breakDisplay = breakMin.toString() + ":0" + breakSec.toString();
    } else {
      breakDisplay = breakMin.toString() + ":" + breakSec.toString();
    }
    $('#break-time').text(breakDisplay);
  });

  $('#break-sec').on('click', function(e) {
    e.preventDefault();
    $(this).addClass('active');
    $('#break-min').removeClass('active');
    breakAdjust = "sec";
  });
  $('#break-min').on('click', function(e) {
    e.preventDefault();
    $(this).addClass('active');
    $('#break-sec').removeClass('active');
    breakAdjust = "min";
  });

  // ---- Start and Stop button ----
  var startCountdown;
  var clickOnce = 0;
  $('#start-button').on('click', function(e) {
    e.preventDefault();
    if (buttonType == 'start') {
      $('#start-button').removeClass('start');
      $('#start-button').addClass('pause');
      $('#start-pause').text('Pause');
      buttonType = 'pause';
      $('.time-settings').fadeOut(1000);
      if (clickOnce === 0) {
        clickOnce = 1;
        startCountdown = setInterval(countdown, 1000);
      }
    } else if (buttonType == 'pause') {
      $('#start-button').removeClass('pause');
      $('#start-button').addClass('start');
      $('#start-pause').text('Resume');
      buttonType = 'resume';
      isPaused = true;
    } else {
      $('#start-button').removeClass('start');
      $('#start-button').addClass('pause');
      $('#start-pause').text('Pause');
      buttonType = 'pause';
      isPaused = false;
    }
  });

  $('#stop-button').on('click', function(e) {
    e.preventDefault();
    displayType = "pomodoro";
    $('#time-description').text("Time left until next break:")
    clearInterval(startCountdown);
    pomTimerTotal2 = pomTimerTotal1;
    breakTimerTotal2 = breakTimerTotal1;
    pomMin = Math.floor(pomTimerTotal1 / 60);
    pomSec = pomTimerTotal1 % 60;
    if (pomSec.toString().length == 1) {
      pomDisplay = pomMin.toString() + ":0" + pomSec.toString();
    } else {
      pomDisplay = pomMin.toString() + ":" + pomSec.toString();
    }
    clickOnce = 0;
    $('#main-time').text(pomDisplay);
    buttonType = 'start';
    $('#start-pause').text('Start');
    $('#start-button').removeClass('pause');
    $('#start-button').addClass('start');
    $('.time-settings').fadeIn(1000);
  });

  function countdown() {
    if (displayType == "pomodoro") {
      if (!isPaused) {
       pomTimerTotal2 -= 1;
      }
      pomMin = Math.floor(pomTimerTotal2 / 60);
      pomSec = pomTimerTotal2 % 60;
      if (pomSec.toString().length == 1) {
        pomDisplay = pomMin.toString() + ":0" + pomSec.toString();
      } else {
        pomDisplay = pomMin.toString() + ":" + pomSec.toString();
      }
      $('#main-time').text(pomDisplay);
      if (pomTimerTotal2 == -1) {
        //pomTimerTotal2 = pomTimerTotal1 + 1;
        breakTimerTotal2 = breakTimerTotal1 + 1;
        clearInterval(startCountdown);
        displayType = "break";
        $('#main-time').text(breakDisplay);
        $('#time-description').text("Break time!");
        startCountdown = setInterval(countdown, 1000);
      }
    }
    if (displayType == "break") {
      if (!isPaused) {
        breakTimerTotal2 -= 1;
      }
      breakMin = Math.floor(breakTimerTotal2 / 60);
      breakSec = breakTimerTotal2 % 60;
      if (breakSec.toString().length == 1) {
        breakDisplay = breakMin.toString() + ":0" + breakSec.toString();
      } else {
        breakDisplay = breakMin.toString() + ":" + breakSec.toString();
      }
      $('#main-time').text(breakDisplay);
      if (breakTimerTotal2 == -1) {
        sessions++;
        $('#sessions').text('Sessions: ' + sessions)
        pomTimerTotal2 = pomTimerTotal1;
        pomMin = Math.floor(pomTimerTotal2 / 60);
        pomSec = pomTimerTotal2 % 60;
        if (pomSec.toString().length == 1) {
          pomDisplay = pomMin.toString() + ":0" + pomSec.toString();
        } else {
          pomDisplay = pomMin.toString() + ":" + pomSec.toString();
        }
        clearInterval(startCountdown);
        displayType = "pomodoro";
        $('#main-time').text(pomDisplay);
        $('#time-description').text("Time left until next break:");
        startCountdown = setInterval(countdown, 1000);
      }
    }
  }
});

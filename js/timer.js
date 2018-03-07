$(document).ready(function() {
  var displayType = "pomodoro";
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
  var $pomTime = $('#pom-time');
  var $mainTime = $('#main-time');
  if (pomSec.toString().length == 1) {
    pomDisplay = pomMin.toString() + ":0" + pomSec.toString();
  } else {
    pomDisplay = pomMin.toString() + ":" + pomSec.toString();
  }
  $pomTime.text(pomDisplay);
  $mainTime.text(pomDisplay);
  var buttonType = "start";
  var isPaused = false;
  var sessions = 0;

  //Break timer variables
  var breakTimerTotal1 = 300;
  var breakTimerTotal2 = breakTimerTotal1 + 1;
  var breakMin = Math.floor(breakTimerTotal1 / 60);
  var breakSec = breakTimerTotal1 % 60;
  var breakDisplay;
  var $breakTime = $('#break-time');
  if (breakSec.toString().length == 1) {
    breakDisplay = breakMin.toString() + ":0" + breakSec.toString();
  } else {
    breakDisplay = breakMin.toString() + ":" + breakSec.toString();
  }
  $breakTime.text(breakDisplay);

  // ---- Pomodoro timer controls ----
  var $pomPlus = $('#pom-plus');
  var $pomMinus = $('#pom-minus');
  var $pomSec = $('#pom-sec');
  var $pomMin = $('#pom-min');
  $pomPlus.on('click', function(e) {
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
    $pomTime.text(pomDisplay);
    $mainTime.text(pomDisplay);
  });

  $pomMinus.on('click', function(e) {
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
    $pomTime.text(pomDisplay);
    $mainTime.text(pomDisplay);
  });

  $pomSec.on('click', function(e) {
    e.preventDefault();
    $(this).addClass('active');
    $pomMin.removeClass('active');
    pomAdjust = "sec";
  });
  $pomMin.on('click', function(e) {
    e.preventDefault();
    $(this).addClass('active');
    $pomSec.removeClass('active');
    pomAdjust = "min";
  });

  // ---- Break timer controls ----
  var $breakPlus = $('#break-plus');
  var $breakMinus = $('#break-minus');
  var $breakSec = $('#break-sec');
  var $breakMin = $('#break-min');
  $breakPlus.on('click', function(e) {
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
    $breakTime.text(breakDisplay);
  });

  $breakMinus.on('click', function(e) {
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
    $breakTime.text(breakDisplay);
  });

  $breakSec.on('click', function(e) {
    e.preventDefault();
    $(this).addClass('active');
    $breakMin.removeClass('active');
    breakAdjust = "sec";
  });
  $breakMin.on('click', function(e) {
    e.preventDefault();
    $(this).addClass('active');
    $breakSec.removeClass('active');
    breakAdjust = "min";
  });

  // ---- Start and Stop button ----
  var startCountdown;
  var clickOnce = 0;
  var $startBtn = $('#start-button');
  var $stopBtn = $('#stop-button');
  var $startPause = $('#start-pause');
  var $timeSettings = $('.time-settings');
  $startBtn.on('click', function(e) {
    e.preventDefault();
    if (buttonType == 'start') {
      $startBtn.removeClass('start');
      $startBtn.addClass('pause');
      $startPause.text('Pause');
      buttonType = 'pause';
      $timeSettings.fadeOut(1000);
      if (clickOnce === 0) {
        clickOnce = 1;
        startCountdown = setInterval(countdown, 1000);
      }
    } else if (buttonType == 'pause') {
      $startBtn.removeClass('pause');
      $startBtn.addClass('start');
      $startPause.text('Resume');
      buttonType = 'resume';
      isPaused = true;
    } else {
      $startBtn.removeClass('start');
      $startBtn.addClass('pause');
      $startPause.text('Pause');
      buttonType = 'pause';
      isPaused = false;
    }
  });

  var $timeDescription = $('#time-description');
  $stopBtn.on('click', function(e) {
    e.preventDefault();
    displayType = "pomodoro";
    $timeDescription.text("Time left until next break:")
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
    $mainTime.text(pomDisplay);
    buttonType = 'start';
    $startPause.text('Start');
    $startBtn.removeClass('pause');
    $startBtn.addClass('start');
    $timeSettings.fadeIn(1000);
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
      $mainTime.text(pomDisplay);
      if (pomTimerTotal2 == -1) {
        //pomTimerTotal2 = pomTimerTotal1 + 1;
        breakTimerTotal2 = breakTimerTotal1 + 1;
        clearInterval(startCountdown);
        displayType = "break";
        $mainTime.text(breakDisplay);
        $timeDescription.text("Break time!");
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
      $mainTime.text(breakDisplay);
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
        $mainTime.text(pomDisplay);
        $timeDescription.text("Time left until next break:");
        startCountdown = setInterval(countdown, 1000);
      }
    }
  }
});

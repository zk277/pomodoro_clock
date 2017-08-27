$(document).ready(function () {

  var breakTime = 300;
  var sessionTime = 1500;
  currentTime = sessionTime,
  session = currentTime;
  var id = true;
  var sessionBreak = 'Break';

  //set session clock
  $('#clock').text(secToClock(sessionTime));

  //decrease session time, cannot reduce below 1
  $('#decSession').click(function () {
    var $session = $('#session').text();
    if ((session == sessionTime) && ($session > 1)) {
      $session--;
      $('#session').text($session);
      session = currentTime = sessionTime = eval(minToSec($('#session').text()));
      $('#clock').text(secToClock(sessionTime));
    }
  });

  //increase session time
  $('#incSession').click(function () {
    if (session == sessionTime) {
      var $session = $('#session').text();
      $session++;
      $('#session').text($session);
      session = currentTime = sessionTime = eval(minToSec($('#session').text()));
      $('#clock').text(secToClock(sessionTime));
    }
  });

  //decrease break time, cannot reduce below 1
  $('#decBreak').click(function () {
    var $break = $('#break').text();
    if ((session == sessionTime) && ($break > 1)) {
      $break--;
      $('#break').text($break);
      breakTime = eval(minToSec($('#break').text()));
    }
  });

  //increase break time
  $('#incBreak').click(function () {
    if (session == sessionTime) {
      var $break = $('#break').text();
      $break++;
      $('#break').text($break);
      breakTime = eval(minToSec($('#break').text()));
    }
  });

  //session flow handlers
  $('#start').click(countdown);
  $('#refresh').click(resetCountdown);
  $('#pause').click(pauseCountdown);
  $('#stop').click(stopCountdown);

  //functions
  function countdown() {
    if (id == true) {
      session = currentTime;
      id = setInterval(timing, 1000); //setInterval method//1000ms=1s
    }
  }

  function timing() {
    if (session == 0) {
      $('#action').text(sessionBreak);
      switch (sessionBreak) {
        case 'Break':
          session = breakTime;
          sessionBreak = 'Session';
          break;
        case 'Session' :
          session = sessionTime;
          sessionBreak = 'Break';
          break;
      }
      $('#clock').text(secToClock(session));
    } else {
      session--;
      $('#clock').text(secToClock(session));
    }

    //change color of clock based on the left time
    var percent = Math.floor((session / sessionTime) * 100);
    if (percent <= 5) {
      $('#clock').css('color', 'red');
    } else if (percent <= 20) {
      $('#clock').css('color', 'yellow');
    } else {
      $('#clock').css('color', 'green');
    }
  }

  //convert time from seconds to minutes
  function minToSec(min) {
    return min * 60;
  }

  //convert seconds to 00:00:00 format
  function secToClock(sec) {
    var hours = Math.floor(sec / 3600);
    var minutes = Math.floor((sec - (3600 * hours)) / 60);
    var seconds = Math.floor(sec - (3600 * hours) - (60 * minutes));

    return (hours > 0) ? leadZero(hours) + ':' + leadZero(minutes) + ':' + leadZero(seconds) : leadZero(minutes) + ':' + leadZero(seconds);
  }

  //add leading zero//return n > 9 ? "" + num : "0" + num;
  function leadZero(num) {
    if (num > 9) {
      return num;
    } else {
      return '0' + num;
    }
  }

  function resetCountdown() {
    clearInterval(id);
    id = true;
    session = currentTime = sessionTime = minToSec(25);
    breakTime = minToSec(5);
    $('#session').text(25);
    $('#break').text(5);
    $('#clock').text(secToClock(session));
    $('#clock').css('color', 'white');
    sessionBreak = 'Break';
  }

  function pauseCountdown() {
    clearInterval(id);
    id = true;
    currentTime = session;
  }

  function stopCountdown() {
    clearInterval(id);
    id = true;
    session = currentTime = sessionTime;
    $('#clock').text(secToClock(sessionTime));
    $('#action').text('Session');
    $('#clock').css('color', 'white');
    sessionBreak = 'Break';
  }
});

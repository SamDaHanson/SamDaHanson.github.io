// Initialize Firebase
var config = {
  apiKey: "AIzaSyAaQnyWFjnDEXGCZcLDBCd_Q5hIrMGl0Vc",
  authDomain: "trains-e44e0.firebaseapp.com",
  databaseURL: "https://trains-e44e0.firebaseio.com",
  projectId: "trains-e44e0",
  storageBucket: "trains-e44e0.appspot.com",
  messagingSenderId: "1059349187718"
};
firebase.initializeApp(config);

var database = firebase.database();

var startTrain = {
  name: 'New Hope',
  destination: 'Philly',
  time: '20:18',
  frequency: '20'
}
var trains = [];

function getTimeDiff(time1, time2) {
  var hourTimes = {
    t1: time1.substring(0,time1.indexOf(":")),
    t2: time2.substring(0,time2.indexOf(":"))
  }
  var minTimes = {
    t1: time1.substring(time1.indexOf(":")+1),
    t2: time2.substring(time2.indexOf(":")+1)
  }
  var hourDiff = parseInt(hourTimes.t2) - parseInt(hourTimes.t1);
  var minDiff = parseInt(minTimes.t2) - parseInt(minTimes.t1);
  var minTillTrain = hourDiff*60 + minDiff;

  //console.log("hDiff: "+hourDiff+", mDiff: "+minDiff+", tDiff: "+minTillTrain);

  return minTillTrain;
}

function addMin(time, numMin) {
  var curMin = parseInt(time.substring(time.indexOf(":")+1));
  var curHour = parseInt(time.substring(0,time.indexOf(":")));

  var realHours = Math.floor(numMin / 60);
  var realMins = numMin - 60*realHours;

  curHour += realHours;
  curMin += realMins;
  var nextArrival = curHour+":"+curMin;

  return nextArrival;
}

database.ref().on("value", function(response) {
  trains = [];

  var today = new Date();
  var time = today.toISOString();
  time = time.substring(time.indexOf("T")+1);
  time = time.substring(0,time.lastIndexOf(":"));
  
  $('#trainTable td').remove();
  for (var i = 0; i < response.val().length; i++) {
    trains.push(response.val()[i]);

    var trainTime = response.val()[i].time;
    var minTillTrain = getTimeDiff(time, trainTime);

    while(minTillTrain <= 0) {
      minTillTrain += parseInt(response.val()[i].frequency);
    }

    var nextArrival = addMin(time, minTillTrain);
    var timeTillArrival = getTimeDiff(time,nextArrival);

    var tr = document.createElement('tr');
    tr.className = 'rowy';
    var td = document.createElement('td');
    td.innerHTML = response.val()[i].name;
    var td1 = document.createElement('td');
    td1.innerHTML = response.val()[i].destination;
    var td2 = document.createElement('td');
    td2.innerHTML = response.val()[i].frequency;
    var td3 = document.createElement('td');
    td3.innerHTML = nextArrival;
    var td4 = document.createElement('td');
    td4.innerHTML = timeTillArrival;
    tr.append(td,td1,td2,td3,td4);
    document.getElementById('trainTable').append(tr);
  }

});

$("#submitButton").on("click", function() {
  console.log("Submit!");
  var name = $("#trainName").val();
  var destination = $("#trainDestination").val();
  var time = $("#trainTime").val();
  var frequency = $("#trainFrequency").val();

  var train = {
    name: name,
    destination: destination,
    time: time,
    frequency: frequency
  }
  trains.push(train);
  database.ref().set(trains);
});

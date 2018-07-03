  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAIKSXxVeNqRKOqgWzX3Dq9SAdWNhmGjLs",
    authDomain: "traintime-a3a8e.firebaseapp.com",
    databaseURL: "https://traintime-a3a8e.firebaseio.com",
    projectId: "traintime-a3a8e",
    storageBucket: "",
    messagingSenderId: "853533862775"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var trainName;
var destinationName;
var ftTime;
var frequency;
var nextArrival;
var minutesAway;
var currentTime = moment(currentTime).format("HH:mm");
console.log(currentTime);


$("#submit").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();

    trainName = $("#tName").val().trim();
    destinationName = $("#dName").val().trim();
    frequency = $("#frequency").val().trim();
    ftTime = $("#ftTime").val().trim();

    // console.log(trainName);
    // console.log(destinationName);
    // console.log(frequency);
    // console.log(ftTime);
    // var startDay = moment(employeeStart);
    // // var now = moment();
    // worked = moment().diff(startDay, "months", true);
    // ;
    // console.log("WORKED", Math.round(worked));
    // total = worked * employeeRate;

    // var ftTimeC = moment(ftTime, "HH:mm").format("HH:mm");
    // console.log (ftTimeC);  
    // var frequencyC = parseInt(frequency);
    // console.log(frequencyC);

    ftTime = moment(ftTime, "HH:mm").format("HH:mm")
   nextArrival = moment(ftTime, "HH:mm").add(frequency, "minutes")
   nextArrival = moment(nextArrival).format("HH:mm")
   minutesAway = nextArrival  //removed minutesAway
   
   //nextArrival = 2
 

    database.ref().push({
        trainName: trainName,
        destination: destinationName,
        frequency: frequency,
        ftTime: nextArrival,
        minutesAway: minutesAway,
        // months: Math.round(worked),
        // total: total,
        // dateAdded: firebase.database.ServerValue.TIMESTAMP,
      })

})



database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().ftTime);
    console.log(childSnapshot.val().minutesAway);
    // console.log(childSnapshot.val().dateAdded);

});


database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // Change the HTML to reflect
    var newRow = $("<tr>");
    newRow.append($("<td>").text(snapshot.val().trainName));
    newRow.append($("<td>").text(snapshot.val().destination));
    newRow.append($("<td>").text(snapshot.val().frequency));
    newRow.append($("<td>").text(snapshot.val().ftTime));
    newRow.append($("<td>").text(snapshot.val().minutesAway));
    // newRow.append($("<td>").text(snapshot.val().firstTrainTime));
    // newRow.append($("<td>").text(snapshot.val().trainName));
    // newRow.append($("<td>").text(snapshot.val().trainName));
    newRow.appendTo($("tbody"));
    // $("#name-display").text(snapshot.val().name);
    // $("#role-display").text(snapshot.val().role);
    // $("#start-display").text(snapshot.val().start);
    // $("#months-display").text(snapshot.val().months);
    // $("#rate-display").text(snapshot.val().start);
    // $("#total-display").text(snapshot.val().months);
  });

  // console.log(moment().format("MMM Do YY"));
  // console.log(moment().format("DD/MM/YY hh:mm A"));

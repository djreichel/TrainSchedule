// Steps to complete:

// 1. Initialize Firebase - copy and  paste from firebase
// 2. Establish database
// 3. Create submit button for adding new train data
//      Create a form to capture input train data to the database
//      Create a text area to display input train data
// 6. Calculate the difference between current time and next arrival time
//      Then use moment.js to calculate how many minutes remain until arrival
// 7. Update the html + update the database

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyCe4QOnJwvxcYnYZpIR8bK80orRE7WeFa4",
    authDomain: "first-project-for-class.firebaseapp.com",
    databaseURL: "https://first-project-for-class.firebaseio.com",
    projectId: "first-project-for-class",
    storageBucket: "first-project-for-class.appspot.com",
    messagingSenderId: "618229293800"
  };
  firebase.initializeApp(config);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 2. establish database
var database = firebase.database();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 3. submit button for adding new train data
$("#submitButton").on("click", function(event) {
  event.preventDefault();

  // captures input train data
  var newTrainName = $("#inputTrainName").val().trim();
  var newDestination = $("#inputDestination").val().trim();
  var newFirstTrainTime = moment($("#inputFirstTrainTime").val().trim(), "HH, mm").format("X");
  var newFrequency = $("#inputFrequency").val().trim();

  // holds new train data
  var newTrain = {
    trainName: newTrainName,
    destination: newDestination,
    firstTrainTime: newFirstTrainTime,
    frequency: newFrequency
  };

  // sends new train data to the database
  database.ref().push(newTrain);

      // Logs everything to console
      console.log(newTrain.trainName);
      console.log(newTrain.destination);
      console.log(newTrain.firstTrainTime);
      console.log(newTrain.frequency);

      alert("New Train successfully added");

  // Clears all of the text-boxes
  $("#inputTrainName").val("");
  $("#inputDestination").val("");
  $("#inputFirstTrainTime").val("");
  $("#inputFrequency").val("");
});

// 3. Create Firebase event for adding data to the database
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything in a variable.
  var newTrainName = childSnapshot.val().trainName;
  var newDestination = childSnapshot.val().destination;
  var newFirstTrainTime = childSnapshot.val().firstTrainTime;
  var newFrequency = childSnapshot.val().frequency;

  // print new info
  console.log(newTrainName);
  console.log(newDestination);
  console.log(newFirstTrainTime);
  console.log(newFrequency);

  // Prettify the train times
  //var newFirstTrainTimePretty = moment.unix(newFirstTrainTime).format("MM/DD/YYYY");

  // Calculate how many minutes away until arrival
  var howLong = moment().diff(moment(newFirstTrainTime, newFrequency, "LT"), "minutes");
  console.log(howLong);

  // Calculate the difference between first train time and next arrival time
  var newArrivalTime = moment().subtract(moment (newFirstTrainTime, howLong), "minutes");
  console.log(newArrivalTime);

  // create data for the new row
  var newRow = $("<tr>").append(
    $("<td>").text(newTrainName),
    $("<td>").text(newDestination),
    $("<td>").text(newFirstTrainTime),
    $("<td>").text(newFrequency),
    $("<td>").text(newArrivalTime),
  );

  // write to the new row
  $("#train-table > tbody").append(newRow);
});
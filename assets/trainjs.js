// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCPUckuBaEwAY51cgoale3yYBiYTqqexRA",
    authDomain: "trainactivitydperez.firebaseapp.com",
    databaseURL: "https://trainactivitydperez.firebaseio.com",
    projectId: "trainactivitydperez",
    storageBucket: "",
    messagingSenderId: "98468399116"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();
$(document).ready(function(){
	// 1. Link to Firebase
    var trainInformation = firebase.trainInformation("https://trainactivitydperez.firebaseio.com");
	// 2. Button for adding Trains
	$("#addTrainBttn").on("click", function(){

		// Grabs user input and assign to variables
		var trainName = $("#trainNameInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var trainTimeInfo = moment($("#trainTimeInfo").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequencyInfo = $("#frequencyInfo").val().trim();

		// Test for variables entered
		console.log(trainName);
		console.log(destination);
		console.log(trainTimeInfo);
		console.log(frequencyInfo);

		// Creates local "temporary" object for holding train data
		// Will push this to firebase
		var newTrain = {
			name:  trainName,
			destination: destination,
			trainTime: trainTimeInfo,
			frequency: frequencyInfo,
		}

		// pushing trainInfo to Firebase
		trainInformation.push(newTrain);

		// clear text-boxes
		$("#trainNameInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequencyInfo").val("");

		// Prevents page from refreshing
		return false;
	});

	trainInformation.on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

		// assign firebase variables to snapshots.
		var firebaseName = childSnapshot.val().name;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;
		
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
		// Test for correct times and info
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		// Append train info to table on page
		$("#trainInfo > tbody").append("<tr><td>" + firebaseName +  "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

	});
});
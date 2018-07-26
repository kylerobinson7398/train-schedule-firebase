var config = {
  apiKey: 'AIzaSyAGwvEkUM7qJKhTtJfwo9cAKdCOhrD8lmc',
  authDomain: 'realestateapp-70bdf.firebaseapp.com',
  databaseURL: 'https://realestateapp-70bdf.firebaseio.com',
  projectId: 'realestateapp-70bdf',
  storageBucket: 'realestateapp-70bdf.appspot.com',
  messagingSenderId: '563256383606'
};
firebase.initializeApp(config);

var database = firebase.database();

$('#addTrainBtn').on('click', function() {
  var trainName = $('#trainNameInput')
    .val()
    .trim();
  var destination = $('#destInput')
    .val()
    .trim();
  var firstTrain = $('#firstTrainInput')
    .val()
    .trim();
  var frequency = $('#freqInput')
    .val()
    .trim();

  var newTrain = {
    name: trainName,
    dest: destination,
    first: firstTrain,
    freq: frequency
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);
  console.log(newTrain.freq);

  $('#trainNameInput').val('');
  $('#destInput').val('');
  $('#firstTrainInput').val('');
  $('#freqInput').val('');

  return false;
});

database.ref().on('child_added', function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().freq;

  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  var firstTimeConverted = moment(firstTrain, 'hh:mm').subtract(1, 'years');
  console.log(firstTimeConverted);

  var currentTime = moment();
  console.log('CURRENT TIME:' + moment(currentTime).format('HH:mm'));

  var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');
  console.log('DIFFERENCE IN TIME: ' + diffTime);

  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  var tMinutesTillTrain = frequency - tRemainder;
  console.log('MINUTES TILL TRAIN: ' + tMinutesTillTrain);

  var nextTrain = moment()
    .add(tMinutesTillTrain, 'minutes')
    .format('hh:mm');
  console.log('ARRIVAL TIME: ' + moment(nextTrain).format('hh:mm'));

  $('#trainTable > tbody').append(
    '<tr><td>' +
      trainName +
      '</td><td>' +
      destination +
      '</td><td>' +
      frequency +
      '</td><td>' +
      nextTrain +
      '</td><td>' +
      tMinutesTillTrain +
      '</td></tr>'
  );
});

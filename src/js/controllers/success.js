myApp.controller('SuccessController', ['$scope', function($scope) {
  var editor = new MediumEditor('.text-editor');

  $scope.onChange = function() {
    var text = document.getElementById("text").innerText;
    firebase.database().ref('users/' + $scope.currentUser.uid + "/text").set(text);
  };
}]);
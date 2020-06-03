myApp.controller('SuccessController', ['$scope', function($scope) {
  var editor = new MediumEditor('.editable');
  $scope.onChange = function(text) {
    firebase.database().ref('users/' + $scope.currentUser.uid + "/text").set(text);
  };
}]);
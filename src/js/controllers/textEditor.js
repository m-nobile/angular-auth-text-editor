myApp.controller('TextEditorController', ['$scope', function($scope) {
  var editor = new MediumEditor('.text-editor', { placeholder: false });

  $scope.init = function() {
    if($scope.currentUser && $scope.currentUser.text) { 
      document.getElementById("text").innerText = $scope.currentUser.text;
    }
  }

  $scope.onChange = function() {
    var text = document.getElementById("text").innerText;
    firebase.database().ref('users/' + $scope.currentUser.uid + "/text").set(text);
  };

  $scope.$on('$destroy', function () {
    editor.destroy();
  });
}]);
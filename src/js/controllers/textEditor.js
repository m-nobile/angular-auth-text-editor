myApp.controller('TextEditorController', ['$scope', function($scope) {
  var editor = new MediumEditor('.text-editor', { placeholder: false });

  $scope.init = async function() {
    if(!$scope.currentUser) { 
      var user;
      await firebase.database.ref('users/' + firebase.auth().currentUser.uid).once("value").then(function(data) {
        user=  data.val();
      });
      document.getElementById("text").innerText = user.text;
    } else {
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
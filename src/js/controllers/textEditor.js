myApp.controller('TextEditorController', ['$scope', function($scope) {
  var editor = new MediumEditor('.text-editor', { placeholder: false });

  $scope.init = function() {
    if($scope.currentUser && $scope.currentUser.text) { 
      editor.setContent($scope.currentUser.text);
    }
  }

  $scope.onChange = function() {
    var text = document.getElementById("text").innerText;
    //check for latex equation
    var startDollar = text.indexOf("$");
    if (startDollar !== -1) {
      var endDollar = text.indexOf("$", startDollar + 1);
      if (endDollar !== -1) {
        var latexExpression = text.substring(startDollar + 1, endDollar);
        var latexElement =
          '<img src="https://latex.codecogs.com/gif.latex?' +
          latexExpression + '" title="" style="">';
        text = text.replace(latexExpression, latexElement).replace(/[$]/g, "");
        editor.setContent(text);
      }
    }
    firebase.database().ref('users/' + $scope.currentUser.uid + "/text").set(text);
  };

  $scope.$on('$destroy', function () {
    editor.destroy();
  });
}]);
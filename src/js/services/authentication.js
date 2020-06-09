myApp.factory('Authentication',
  ['$rootScope', '$location',
  function($rootScope, $location) {

  var authenticationObject;
  var database = firebase.database();
  var auth = firebase.auth();
  var provider = new firebase.auth.GoogleAuthProvider();

  auth.onAuthStateChanged(async function(authUser) {
    if(authUser) {
      $rootScope.currentUser = auth.currentUser;
      await database.ref('users/' + authUser.uid).once("value").then(function(data) {
        $rootScope.currentUser.text = data.val().text;
        var element = document.getElementById("text");
        if(element) {
          element.innerText = $rootScope.currentUser.text;
        }
        $location.path('/text-editor');
        $rootScope.$apply();
      });
    } else {
      authenticationObject.logout();
    }
  });

  return authenticationObject = {
    login: function() {
      auth.signInWithPopup(provider).then(async function(result) {
        $rootScope.currentUser = result.user;
        await database.ref('users/' + result.user.uid).once("value").then(function(data) {
          var user = data.val();
          if(user){
            $rootScope.currentUser.text = user.text;
          } else {
            $rootScope.currentUser.text = "";
            database.ref('users/' + result.user.uid).set({
              date: firebase.database.ServerValue.TIMESTAMP,
              regUser: result.user.uid,
              displayName: result.user.displayName,
              email: result.user.email,
              text: ""
            });
          }
          $location.path('/text-editor');
        });
      })
    },
    logout: function() {
      auth.signOut();
      $rootScope.currentUser = "";
      $location.path('/login');
    }   
  }
}]);
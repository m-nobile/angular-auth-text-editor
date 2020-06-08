myApp.factory('Authentication',
  ['$rootScope', '$location',
  function($rootScope, $location) {

  var authenticationObject;
  var database = firebase.database();
  var auth = firebase.auth();
  var provider = new firebase.auth.GoogleAuthProvider();

  auth.onAuthStateChanged(async function(authUser) {
    if(authUser) {
      var existingUser = authenticationObject.getCurrentAuthUser();
      if(!existingUser ||  existingUser.uid != authUser.uid) {
        await database.ref('users/' + authUser.uid).set({
          date: firebase.database.ServerValue.TIMESTAMP,
          regUser: authUser.uid,
          displayName: authUser.displayName,
          email: authUser.email,
          text: "" 
        });
      }
        $rootScope.currentUser = auth.currentUser;
        $rootScope.currentUser.text = existingUser ? existingUser.text :"";
        $location.path('/text-editor');
        $rootScope.$apply();   
    } else {
      authenticationObject.logout();
    }
  });

  return authenticationObject = {
    login: function() {
      auth.signInWithRedirect(provider).catch(function(error) {
        $rootScope.message = error.message;
      });
    },
    getCurrentAuthUser: function() {
      database.ref('users/' + auth.currentUser.uid).once("value").then(function(data) {
        return data.val();
      });
    },
    logout: function() {
      auth.signOut();
      $rootScope.currentUser = "";
      $location.path('/login');
    }   
  }
}]);
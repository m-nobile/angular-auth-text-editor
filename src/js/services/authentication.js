myApp.factory('Authentication',
  ['$rootScope', '$location',
  function($rootScope, $location) {

  var database = firebase.database();
  var auth = firebase.auth();
  var myObject;
  var provider = new firebase.auth.GoogleAuthProvider();

  auth.onAuthStateChanged(function(authUser) {
    if(authUser) {
      database.ref('users/' + authUser.uid).set({
          date: firebase.database.ServerValue.TIMESTAMP,
          regUser: authUser.uid,
          displayName: authUser.displayName,
          email: authUser.email,
          text: ""
      });
      firebase.auth().updateCurrentUser(authUser); 
      $location.path('/success');
    }
    $rootScope.currentUser = firebase.auth().currentUser;
  });

  myObject = {
    login: function(user) {
      console.log(firebase.auth().currentUser);
      auth.signInWithRedirect(provider).catch(function(error) {
        $rootScope.message = error.message;
      });
    },

    logout: function() {
      return auth.signOut();
    }   
  };

  return myObject;

}]);
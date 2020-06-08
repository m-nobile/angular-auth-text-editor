var myApp = angular.module('myApp', 
  ['ngRoute', 'firebase']);

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
    $rootScope.message = error;
    if (error == 'AUTH_REQUIRED' || error == 'PERMISSON_DENIED') {
      $rootScope.message = 'Sorry, you must log in to access that page';
      $location.path('/login');
    }
  });
}]);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    }).
    when('/text-editor', {
      templateUrl: 'views/textEditor.html',
      controller: 'TextEditorController',
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);
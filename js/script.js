var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "vue/accueil.html",
        controller : accueil
    })
    .when("/connexion", {
        templateUrl : "vue/connexion.html",
        controller : connexion
    })
      .otherwise({
  		redirectTo: '/'
  	});
});

// app.controller('myCtrl', function($scope) {
//     $scope.title = "TITLE";
// });

app.factory('Page', function(){
  var title = 'default';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
});

app.controller('myCtrl', function($scope, Page) {
  $scope.Page = Page;
});

function accueil($scope, Page) {
  Page.setTitle('accueil');
}

function connexion($scope, Page) {
  Page.setTitle('connexion');
}

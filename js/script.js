var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "vue/connexion.html",
    controller : connexion
  })
  .when("/creation", {
    templateUrl : "vue/creation.html",
    controller : creation
  })
  .when("/vote", {
    templateUrl : "vue/vote.html",
    controller : vote
  })
  .when("/classement", {
    templateUrl : "vue/classement-utilisateurs.html",
    controller : classement
  })
  .when("/citations-recentes", {
    templateUrl : "vue/citations-recentes.html",
    controller : citationsRecentes
  })
  .when("/profil", {
    templateUrl : "vue/profil.html",
    controller : profil
  })
  .otherwise({
    redirectTo: '/'
  });
});

app.factory('Page', function(){
  var title = 'acceuil';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
});

app.controller('myCtrl', function($scope, Page) {
  $scope.Page = Page;
});


app.controller('Categories', function($scope, $http) {
    $http.get('https://api.chucknorris.io/jokes/categories').
        then(function(response) {
            $scope.categ = response.data;
        });
});


function connexion($scope, Page) {
  Page.setTitle('connexion');
}

function creation($scope, Page) {
  Page.setTitle('creation de compte');
}

function vote($scope, Page) {
  Page.setTitle('vote');
}

function classement($scope, Page) {
  Page.setTitle('classement');
}

function citationsRecentes($scope, Page) {
  Page.setTitle('citations récentes');
}

function profil($scope, Page) {
  Page.setTitle('profil');
}


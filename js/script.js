var app = angular.module('myApp', ['ngRoute']);
// gestion route de l'application
app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'vue/connexion.html',
    controller : connexion
  })
  .when('/creation', {
    templateUrl : 'vue/creation.html',
    controller : creation
  })
  .when('/vote', {
    templateUrl : 'vue/vote.html',
    controller : vote
  })
  .when('/classement', {
    templateUrl : 'vue/classement-utilisateurs.html',
    controller : classement
  })
  .when('/citations-recentes', {
    templateUrl : 'vue/citations-recentes.html',
    controller : citationsRecentes
  })
  .when('/profil', {
    templateUrl : 'vue/profil.html',
    controller : profil
  })
  .otherwise({
    redirectTo: '/'
  });
});

// création objet
// objet page permet de changer le nom de la page
app.factory('Page', function(){
  var title = 'acceuil';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
});
// objet Utilisateur contient les informations sur l'Utilisateur
app.factory('Utilisateur', function(){
  var leLogin='';
  var leMdp='';
  return {
    login: function() { return leLogin; },
    setLogin: function(newLogin) { leLogin = newLogin; },
    mdp: function() { return leMdp; },
    setMdp: function(newleMdp) { leMdp = newleMdp; }
  };
});

// controller général depuis index.html
app.controller('myCtrl', function($scope, $location, Page, Utilisateur) {

  $scope.Page = Page;
  $scope.Utilisateur = Utilisateur;

  // redirection de Page
  $scope.go = function(path) {
    $location.path(path);
  }
});

app.controller('Categories', function($scope, $http) {
    $http.get('https://api.chucknorris.io/jokes/categories').
        then(function(response) {
            $scope.categ = response.data;
        });
});


// controller page connexion
function connexion($scope, $location, Page, Utilisateur) {
  // nom de la page
  Page.setTitle('connexion');
  // gestion click bouton connexion
  $scope.connexion = function() {
    // récupération des champs
    Utilisateur.setLogin($scope.login);
    Utilisateur.setMdp($scope.mdp);
    // faire test si dans la base de données
    // TODO
    if($scope.login == "test"){
      $location.path("/vote");
    }
    else {
      console.log("connexion refusée");
    }
  }
}

// controller page creation
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

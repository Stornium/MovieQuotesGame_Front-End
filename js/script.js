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
  var token = null;
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; },
    token: function() { return token; },
    setToken: function(newToken) { token = newToken; }
  };
});

// controller général depuis index.html
app.controller('myCtrl', function($scope, $location, Page) {

  $scope.Page = Page;
  // redirection de Page
  $scope.go = function(path) {
    $location.path(path);
  }
});


app.controller('ClassementsUser', function($scope, $http) {
    $http.get('http://lp-miar-groupe06-cloned-stornium.c9users.io/MovieQuotesGame-1.0-SNAPSHOT/getClassement').
        then(function(response) {
            $scope.users = response.data;
        });
});

app.controller('CitationsRecentes', function($scope, $http) {
    $http.get('http://lp-miar-groupe06-cloned-stornium.c9users.io/MovieQuotesGame-1.0-SNAPSHOT/getCitations').
        then(function(response) {
            $scope.citations = response.data;
        });
});
// controller page connexion
function connexion($scope, $location, Page, $http) {
  // nom de la page
  Page.setTitle('connexion');
  // gestion click bouton connexion
  $scope.connexion = function() {
    // faire test si dans la base de données
    // TODO

    $http.get('http://lp-miar-groupe06-cloned-stornium.c9users.io/MovieQuotesGame-1.0-SNAPSHOT/connexion?login=' + $scope.login + '&mdp=' + $scope.mdp).
       then(function(response) {
          Page.setToken(response.data);
          console.log(response.data);
    });

    if(Page.token != null){
      $location.path("/vote");
    }
    else {
      console.log("connexion refusée");
    }
  }
}

// controller page creation
function creation($scope, $http, $location, Page) {
var url = 'http://lp-miar-groupe06-cloned-stornium.c9users.io/MovieQuotesGame-1.0-SNAPSHOT/newUser';

  // nom de la page
  Page.setTitle('création de compte');
  // gestion click bouton confirmer
  $scope.creation = function() {
    if($scope.pseudo == null || $scope.mdp == null) {
        alert("Champs requis (*)");
    }
    else {
        if($scope.mdp != $scope.mdpConf) {
            alert("mot de passe pas le même");
        }
        else {
            var data = JSON.stringify({"pseudo" : $scope.pseudo, "mail" : $scope.mail, "genrePrefere" : $scope.genrePrefere, "mdp" : $scope.mdp, "lienAvatar" : $scope.lienAvatar});
            $http.post(url,  data)
                        .then(function (response) {
                            console.log(response.data);
                        })
                        // redirection vers connexion
                        $location.path("/");
        }
    }
  }
}

function vote($scope, $http, Page) {
  Page.setTitle('vote');
  $http.get('http://lp-miar-groupe06-cloned-stornium.c9users.io/MovieQuotesGame-1.0-SNAPSHOT/getFilms').
      then(function(response) {
          $scope.films = response.data;
          $scope.details(response.data[0]);
      });
  $scope.details = function(film) {
      $scope.detail = film;
  }
  $http.get('http://lp-miar-groupe06-cloned-stornium.c9users.io/MovieQuotesGame-1.0-SNAPSHOT/getCitationJour').
      then(function(response) {
          $scope.citation = response.data;
      });

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

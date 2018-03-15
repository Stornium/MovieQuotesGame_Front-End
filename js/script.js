var app = angular.module('app', ['ngRoute', 'ngStorage']);

// url du back
app.constant('URL', 'http://lp-miar-groupe06-cloned-stornium.c9users.io/MovieQuotesGame-1.0-SNAPSHOT');
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


// controller général depuis index.html
app.controller('Ctrl', function($scope, Page, $localStorage) {
  $scope.Page = Page;
  $scope.storage = $localStorage.$default({
    token: null
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



app.controller('ClassementsUser', function($scope, $http, URL) {
    $http.get(URL+'/getClassement').
        then(function(response) {
            $scope.users = response.data;
        });
});

app.controller('CitationsRecentes', function($scope, $http, URL) {
    $http.get(URL+'/getCitations').
        then(function(response) {
            $scope.citations = response.data;
        });
});
// controller page connexion
function connexion($scope, $location, Page, $http, URL, $localStorage) {
  // reset localStorage
  $localStorage.$reset({
      token: null
  });
  // nom de la page
  Page.setTitle('connexion');
  // gestion click bouton connexion
  $scope.connexion = function() {
    // faire test si dans la base de données

    $http.get(URL+'/connexion?login=' + $scope.login + '&mdp=' + $scope.mdp).
       then(function(response) {
          $scope.storage.token = response.data.token;
    }).then(function(){
        if($scope.storage.token != null){
          $location.path("/vote");
        }
        else {
          $scope.refusee = true;
        }
    });
  }
}
// controller page creation
function creation($scope, $http, $location, Page, URL) {
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
            $http.post(URL+'/newUser',  data)
                        .then(function (response) {
                            console.log(response.data);
                        })
                        // redirection vers connexion
                        $location.path("/");
        }
    }
  }
}

function vote($scope, $http, Page, $window, URL, $location) {
  if($scope.storage.token == null) {
    $location.path("/");
  }
  Page.setTitle("vote");
  // récupération des films
  $http.get(URL+'/getFilms').
      then(function(response) {
          $scope.films = response.data;
          $scope.details(response.data[0]);
      });
  $scope.details = function(lefilm) {
      $scope.detail = lefilm;
  }
  // récupération de la citation
  $http.get(URL+'/getCitationJour').
      then(function(response) {
        $scope.citation = response.data;
      });

  // envoie vote

  $scope.voter = function(id){
//  $http.get(URL+'/voteFilm?token='+Page.token+'&id'+id).
//     then(function(response) {
//        console.log(response.data)
//     });
console.log(Page.getToken());
  }


}

function classement($scope, Page, $location) {
  if($scope.storage.token == null) {
    $location.path("/");
  }
  Page.setTitle('classement');
}

function citationsRecentes($scope, Page, $location) {
  if($scope.storage.token == null) {
    $location.path("/");
  }
  Page.setTitle('citations récentes');
}

function profil($scope, $http, Page, URL, $location) {
  if($scope.storage.token == null) {
    $location.path("/");
  }

  Page.setTitle('profil');
    $scope.maj = function() {
      if($scope.pseudo == null || $scope.mdp == null) {
          alert("Champs requis (*)");
      }
      else {
          if($scope.mdp != $scope.mdpConf) {
              alert("mot de passe pas non identique");
          }
          else {
              var data = JSON.stringify({"pseudo" : $scope.pseudo, "mail" : $scope.mail, "genrePrefere" : $scope.genrePrefere, "mdp" : $scope.mdp, "lienAvatar" : $scope.lienAvatar});
              $http.post(URL+'/majCompte',  data)
                          .then(function (response) {
                              console.log(response.data);
                          });
                          alert("Mise à jour réussie");
          }
      }
    }
 }

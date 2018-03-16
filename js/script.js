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
app.controller('Ctrl', function($scope, Page, $localStorage, $location) {
  $scope.Page = Page;
  $scope.storage = $localStorage.$default({
    token: null
  });
  $scope.go = function ( path ) {
    $location.path( path );
  };
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




// controller vue connexion
function connexion($scope, $location, Page, $http, URL, $localStorage) {
  // reset localStorage
  $localStorage.$reset({
      token: null
  });
  // nom de la page
  Page.setTitle('connexion');
  $scope.loader = false;

  // gestion click bouton connexion
  $scope.connexion = function() {
    // faire test si dans la base de données

    $http.get(URL+'/connexion?login=' + $scope.login + '&mdp=' + $scope.mdp).
       then(function(response) {
          $scope.loader = true;
          $scope.storage.token = response.data.token;
    }).then(function(){
        if($scope.storage.token != null){
          $location.path("/vote");
        }
        else {
          $scope.loader = false;
          $scope.refusee = true;
        }
    });
  }
}



// controller vue creation
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
                });
                // redirection vers connexion
                $location.path("/");
        }
    }
  }
}



// controller vue vote
function vote($scope, $http, Page, $window, URL, $location) {
  if($scope.storage.token == null) {
    $location.path("/");
  }
  Page.setTitle("vote");
  $scope.loader = true;
  // récupération des films
  $http.get(URL+'/getFilms').
      then(function(response) {
          $scope.films = response.data;
          $scope.details(response.data[0]);
      }).then(function(){
        $scope.loader = false;
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
  $http.get(URL+'/voteFilm?token='+$scope.storage.token+'&id='+id).
     then(function(response) {
        $scope.loader = true;
        $scope.etatVote(response.data);
     }).then(function(){
       $scope.loader = false;
     });
  };
  $scope.etatVote = function(dejaVote) {
      var dejaVote = dejaVote;
      if(dejaVote == ''){
        $scope.dejaVote = true;
      }
      if(dejaVote != '' && dejaVote != null){
        $scope.voteEffectue = true;
      }
  }
}



// controller vue classement
function classement($scope, Page, $location, URL, $http) {
  if($scope.storage.token == null) {
    $location.path("/");
  }
  Page.setTitle('classement');
  $scope.loader = true;
  $http.get(URL+'/getClassement').
    then(function(response) {
      $scope.users = response.data;
    }).then(function(){
      $scope.loader = false;
    });
}



// controller vue citations récentes
function citationsRecentes($scope, Page, $location, URL, $http) {
  if($scope.storage.token == null) {
    $location.path("/");
  }
  Page.setTitle('citations récentes');
  $scope.loader = true;
  $http.get(URL+'/getCitations').
      then(function(response) {
          $scope.citations = response.data;
      }).then(function(){
        $scope.loader = false;
      });
}




// controller vue profil
function profil($scope, $http, Page, URL, $location, $http) {
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
              var data = JSON.stringify({"pseudo" : $scope.pseudo, "mail" : $scope.mail, "genrePrefere" : $scope.genrePrefere, "mdp" : $scope.mdp, "lienAvatar" : $scope.lienAvatar,
              "token" : $scope.storage.token});
              $http.post(URL+'/majCompte',  data)
                  .then(function (response) {
                      console.log(response.data);
                  });
                  alert("Mise à jour réussie");
          }
      }
  }
 }

// js/script.js
'use strict';


/**
 * Déclaration de l'application routeApp
 */
var routeApp = angular.module('routeApp', [
    // Dépendances du "module"
    'ngRoute',
    'routeAppControllers'
]);

/**
 * Configuration du module principal : routeApp
 */
routeApp.config(['$routeProvider',
    function($routeProvider) {

        // Système de routage
        $routeProvider
        .when('/accueil', {
            templateUrl: 'vue/accueil.html',
            controller: 'accueilCtrl'
        })
        .when('/connexion/:msg?', {
            templateUrl: 'vue/connexion.html',
            controller: 'connexionCtrl'
        })
        .otherwise({
            redirectTo: '/accueil'
        });
    }
]);



/**
 * Définition des contrôleurs
 */
var routeAppControllers = angular.module('routeAppControllers', []);


// Contrôleur de la page d'accueil
routeAppControllers.controller('accueilCtrl', ['$scope',
    function($scope){
        $scope.message = "Bienvenue sur la page d'accueil";
    }
]);

// Contrôleur de la page de contact
routeAppControllers.controller('connexionCtrl', ['$scope','$routeParams',
    function($scope, $routeParams){
        $scope.message = "Veuillez vous connectez ";
        // Si aucun paramètre n'est passé, on met notre phrase initiale
        $scope.msg = $routeParams.msg || "Bonne chance pour cette nouvelle appli !";
    }
]);

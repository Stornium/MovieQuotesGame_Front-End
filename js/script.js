var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html"
    });
});
// app.controller("londonCtrl", function ($scope) {
//     $scope.msg = "I love London";
// });
// app.controller("parisCtrl", function ($scope) {
//     $scope.msg = "I love Paris";
// });

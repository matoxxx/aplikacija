'use strict';

/* Controllers */

var betAfriendControllers = angular.module('betAfriendControllers', ["firebase"]);

/* DASHBOARD CONTROLLER */ 
betAfriendControllers.controller('DashboardController', ['$scope', '$http', function($scope, $firebase, $http) {
    $http.get('json/bets.json').success(function(data) {
        $scope.bets = data;
    });

    $http.get('json/categories.json').success(function(data) {
        $scope.categories = data;
    });

    $http.get('json/bets-users.json').success(function(data) {
        $scope.betsUsers = data;
    });

    $http.get('json/users.json').success(function(data) {
        $scope.users = data;
    });

    loadTagCategories("categoriesTags");
    $(':checkbox').checkbox();
    $('.tooltip1').tooltip();

}]);

/* BROWSE BETS CONTROLLER */
betAfriendControllers.controller('BrowseBetsController', ['$scope', '$http', '$firebase', function($scope, $http, $firebase) {
    var betsSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/bets/");
    var usersSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/users/");
    $scope.bets = $firebase(betsSource);
    $scope.bets = $firebase(usersSource);
    $scope.orderProp = 'age';
}]);

/* CREATE BET CONTROLLER */
betAfriendControllers.controller('CreateBetController', ['$scope', '$http', function($scope, $firebase, $http) {
    $http.get('json/categories.json').success(function(data) {
        $scope.categories = data;
    });

    $scope.orderProp = 'age';
}]);

/* BET DETAIL CONTROLLER */
betAfriendControllers.controller('BetDetailController', ['$scope', '$firebase', '$routeParams', '$http', function($scope, $firebase, $routeParams, $http) {
    var betsSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/bets/" + $routeParams.betId);
    $scope.bet = $firebase(betsSource);
}]);

/* USER DETAIL CONTROLLER */
betAfriendControllers.controller('UserDetailController', ['$scope', '$firebase', '$routeParams', '$http', function($scope, $firebase, $routeParams, $http) {
    var usersSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/users/" + $routeParams.userId);
    $scope.user = $firebase(usersSource);
}]);

/* PROFILE CONTROLLER */
betAfriendControllers.controller('ProfileController', ['$scope', '$routeParams', '$http', function($scope, $firebase, $routeParams, $http) {
    $http.get('json/users.json').success(function(data) {
        $scope.users = data;
    });
}]);

/* MY BETS CONTROLLER */
betAfriendControllers.controller('MyBetsController', ['$scope', '$routeParams', '$http', function($scope, $firebase, $routeParams, $http) {
    $http.get('json/users.json').success(function(data) {
        $scope.users = data;
    });
}]);

/* FRIENDS LIST CONTROLLER */
betAfriendControllers.controller('FriendsListController', ['$scope', '$routeParams', '$http', function($scope, $firebase, $routeParams, $http) {
    $http.get('json/users.json').success(function(data) {
        $scope.users = data;
    });
}]);
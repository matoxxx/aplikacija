'use strict';

/* Controllers */

var betAfriendControllers = angular.module('betAfriendControllers', ["firebase", "ui.bootstrap"]);

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

/* LOGIN / REGISTER CONTROLLER */
var loginController = function ($scope, $modal) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.openLogin = function (size) {

    var modalInstance = $modal.open({
        templateUrl: 'login-form.html',
        controller: ModalInstanceCtrl,
        size: size,
        resolve: {
            items: function () {
                return $scope.items;
            }
        }
    });

    modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
    });
  };
};

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    //TODO: Login using Facebook
    //TODO: Login using Twitter
    //TODO: Login using Google Plus
    //TODO: Simple Login 
    //TODO: Switch to Registration modal
    //TODO: Switch to Login modal

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
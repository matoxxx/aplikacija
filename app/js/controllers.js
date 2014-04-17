'use strict';

/* Controllers */

var betAfriendControllers = angular.module('betAfriendControllers', []);

betAfriendControllers.controller('BetListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('json/bets.json').success(function(data) {
      $scope.bets = data;
    });

    $scope.orderProp = 'age';
  }]);

betAfriendControllers.controller('CategoriesListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('json/categories.json').success(function(data) {
      $scope.categories = data;
    });

    $scope.orderProp = 'age';
  }]);

betAfriendControllers.controller('BetDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('json/' + $routeParams.phoneId + '.json').success(function(data) {
      $scope.phone = data;
    });
  }]);

betAfriendControllers.controller('UserDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('json/' + $routeParams.phoneId + '.json').success(function(data) {
      $scope.phone = data;
    });
  }]);
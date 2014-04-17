'use strict';

/* App Module */

var betAfriendApp = angular.module('betAfriendApp', [
  'ngRoute',
  'betAfriendControllers'
]);

betAfriendApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/bets', {
            templateUrl: 'partials/bet-list.html',
            controller: 'BetListCtrl'
        }).
        when('/bet/:betId', {
            templateUrl: 'partials/user-detail.html',
            controller: 'UserDetailCtrl'
        }).
        when('/bet/:betId', {
            templateUrl: 'partials/bet-detail.html',
            controller: 'BetDetailCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);
'use strict';

/* App Module */

var betAfriendApp = angular.module('betAfriendApp', [
  'ngRoute',
  'betAfriendControllers'
]);

betAfriendApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/main-page.html',
            controller: 'BetListCtrl'
        }).
        when('/bets', {
            templateUrl: 'partials/list-view.html',
            controller: 'BetListCtrl'
        }).
        when('/create', {
            templateUrl: 'partials/create-bet.html',
            controller: 'BetListCtrl'
        }).
        when('/browse', {
            templateUrl: 'partials/browse-bets.html',
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
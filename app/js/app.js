'use strict';

/* App Module */
var betAfriendApp = angular.module('betAfriendApp', [
  'ngRoute',
  'betAfriendControllers'
]);

betAfriendApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '/partials/main-page.html',
            controller: 'DashboardController'
        }).
        when('/bets', {
            templateUrl: '/partials/browse-bets.html',
            controller: 'BrowseBetsController'
        }).
        when('/create', {
            templateUrl: '/partials/create-bet.html',
            controller: 'CreateBetController'
        }).
        when('/browse', {
            templateUrl: '/partials/browse-bets.html',
            controller: 'BrowseBetsController'
        }).
        when('/profile', {
            templateUrl: '/partials/user-profile.html',
            controller: 'ProfileController'
        }).
        when('/my-bets', {
            templateUrl: '/partials/my-bets.html',
            controller: 'BetDetailController'
        }).
        when('/user/:userId', {
            templateUrl: '/partials/user-detail.html',
            controller: 'UserDetailController'
        }).
        when('/bet/:betId', {
            templateUrl: '/partials/bet-detail.html',
            controller: 'BetDetailController'
        }).
        when('/friends', {
            templateUrl: '/partials/friends.html',
            controller: 'FriendListController'
        }).
        when('/login', {
            templateUrl: '/partials/login-form.html',
            controller: 'FriendListController'
        }).
        otherwise({
            redirectTo: '/'
        });
        $locationProvider.hashPrefix('!');
        $locationProvider.html5Mode('true');
    }]);
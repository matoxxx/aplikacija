'use strict';

/* Controllers */

var betAfriendControllers = angular.module('betAfriendControllers', ["firebase", "ui.bootstrap"]);

/* DASHBOARD CONTROLLER */ 
betAfriendControllers.controller('DashboardController', ['$scope', '$http', '$firebase', function($scope, $http, $firebase) {
    var betsSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/bets/");
    var usersSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/users/");    
    var categoriesSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/categories/");  
    $scope.bets = $firebase(betsSource);
    $scope.users = $firebase(usersSource);
    $scope.categories = $firebase(categoriesSource);
    $scope.orderProp = 'name';
}]);

/* BROWSE BETS CONTROLLER */
betAfriendControllers.controller('BrowseBetsController', ['$scope', '$http', '$firebase', function($scope, $http, $firebase) {
    var betsSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/bets/");
    var usersSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/users/");
    $scope.bets = $firebase(betsSource);
    $scope.users = $firebase(usersSource);
    $scope.orderProp = 'age';
}]);

/* CREATE BET CONTROLLER */
betAfriendControllers.controller('CreateBetController', ['$scope', '$firebase', '$http', function($scope, $firebase, $http) {
    // $http.get('json/categories.json').success(function(data) {
    //     $scope.categories = data;
    // });

    // $scope.orderProp = 'age';
}]);

/* BET DETAIL CONTROLLER */
betAfriendControllers.controller('BetDetailController', ['$scope', '$firebase', '$routeParams', '$http', '$log', function($scope, $firebase, $routeParams, $http, $log) {
    var betSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/bets/" + $routeParams.betId);
    $scope.bet = $firebase(betSource);
}]).directive('dirDisqus', function($window) {
    return {
        restrict: 'E',
        scope: {
            disqus_shortname: '@disqusShortname',
            disqus_identifier: '@disqusIdentifier',
            disqus_title: '@disqusTitle',
            disqus_url: '@disqusUrl',
            disqus_category_id: '@disqusCategoryId',
            disqus_disable_mobile: '@disqusDisableMobile',
            readyToBind: "@"
        },
        template: '<div id="disqus_thread"></div><a href="http://disqus.com" class="dsq-brlink">comments powered by<span class="logo-disqus">Disqus</span></a>',
        link: function(scope) {

            scope.$watch("readyToBind", function(isReady) {

                // If the directive has been called without the 'ready-to-bind' attribute, we
                // set the default to "true" so that Disqus will be loaded straight away.
                if ( !angular.isDefined( isReady ) ) {
                    isReady = "true";
                }
                if (scope.$eval(isReady)) {
                    // put the config variables into separate global vars so that the Disqus script can see them
                    $window.disqus_shortname = scope.disqus_shortname;
                    $window.disqus_identifier = scope.disqus_identifier;
                    $window.disqus_title = scope.disqus_title;
                    $window.disqus_url = scope.disqus_url;
                    $window.disqus_category_id = scope.disqus_category_id;
                    $window.disqus_disable_mobile = scope.disqus_disable_mobile;

                    // get the remote Disqus script and insert it into the DOM
                    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                    dsq.src = '//' + scope.disqus_shortname + '.disqus.com/embed.js';
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                }
            });
        }
    }
});

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
betAfriendControllers.controller('loginDialogController',['$scope', '$modal', function ($scope, $modal) {

  $scope.openLoginDialog = function (size) {

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

    modalInstance.result.then(function () {
        $modal.close();
    });
  };
}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

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

betAfriendControllers.controller('AuthController', ['$scope', '$rootScope', '$firebaseAuth', function($scope, $rootScope, $firebaseAuth) {
    var ref = new Firebase('https://dazzling-fire-5750.firebaseio.com/');
    $rootScope.auth = $firebaseAuth(ref);

    $scope.signIn = function () {
      $rootScope.auth.$login('password', {
            email: $scope.email,
            password: $scope.password
      }).then(function(user) {
            $rootScope.alert.class = 'success';
            $rootScope.alert.message = 'Login successfully!';
      }, function(error) {
        if (error = 'INVALID_EMAIL') {
            $rootScope.alert.class = 'danger';
            $rootScope.alert.message = 'The username and password combination you entered is invalid.';
            $scope.signUp();
        } 
        else if (error = 'INVALID_PASSWORD') {
            $rootScope.alert.class = 'danger';
            $rootScope.alert.message = 'The username and password combination you entered is invalid.';
        } 
        else {
            $rootScope.alert.class = 'danger';
            $rootScope.alert.message = 'The username and password combination you entered is invalid.';
        }
      });
    };

    $scope.signUp = function() {
      $rootScope.auth.$createUser($scope.email, $scope.password, function(error, user) {
        if (!error) {
            $rootScope.alert.class = 'success';
            $rootScope.alert.message = 'Successfully created new account!';
        } else {
            $rootScope.alert.class = 'danger';
            $rootScope.alert.message = 'The username and password combination you entered is invalid.';
        }
      });
    };

    $scope.loginTwitter = function() {
        $rootScope.auth.$login('twitter');
    };

    $scope.loginGoogle = function() {
        $rootScope.auth.$login('google');
    };

    $scope.loginFacebook = function() {
        $rootScope.auth.$login('facebook');
    };

    function bindUser(provider) {

    }
  }
]);

betAfriendControllers.controller('AlertController', [
    '$scope', '$rootScope', function($scope, $rootScope) {
        $rootScope.alert = {};
    }
]);
'use strict';

/* Controllers */

var betAfriendControllers = angular.module('betAfriendControllers', ["firebase", "ui.bootstrap"]);

/* USER-PROFILE.HTML CONTROLLER */ 
betAfriendControllers.controller('UserProfileController', ['$scope', '$rootScope', '$firebase', '$http', 'fireFactory', function($scope, $rootScope, $firebase, $http, fireFactory) { 
    $scope.categories = fireFactory.firebaseRef('categories');
    $scope.bets = fireFactory.firebaseRef('bets'); 
    $scope.bets = fireFactory.firebaseRef('users'); 

}]);
/* DASHBOARD CONTROLLER */ 
betAfriendControllers.controller('DashboardController', ['$scope', '$http', '$firebase', function($scope, $http, $firebase) {
    var betsSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/bets/");
    var usersSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/users/");    
    var categoriesSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/categories/");  
    $scope.bets = $firebase(betsSource);
    $scope.users = $firebase(usersSource);
    $scope.categories = $firebase(categoriesSource);
    $scope.orderProp = 'id';
    $scope.limitNum = 5;
    /*var newList = [];
    for (var i = 0; i < 5; i++) {
        newList[i] = {id:i, name:"janez"};
    }
    $scope.neki = newList;
    /*var catecs = $firebase(categoriesSource);
    var catList = [];
    var test = JSON.stringify(catecs);
    /*for(var i = 0; i < catecs.length; i++) {

        catList[i] = {
                      catNum:0
                     };
        //console.log(catList[i]);
    }*/
   /* var n = test.length;
    for(var i = 0; i < 10; i++) {
        catList[i] = {catNum:test[0]};
    }
    $scope.cats = catList;

    /*for(int i = 0; i < bets.length; i++) {
        for(int j = 0; j < bet[i].categories.length; j++) {
            for(int k = 0; k < catList.length; k++) {
                if (bet[i].categories[j].categoryID == catList[k].catId) {
                    catList[k].catNum++;
                }
            }
        }
    }*/
}]);

/* BROWSE BETS CONTROLLER */
betAfriendControllers.controller('BrowseBetsController', ['$scope', '$http', '$firebase', 'fireFactory', function($scope, $http, $firebase, fireFactory) {
    var betsSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/bets/");
    var usersSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/users/");    
    var categoriesSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/categories/");  
    $scope.bets = $firebase(betsSource);
    $scope.users = $firebase(usersSource);
    $scope.categories = $firebase(categoriesSource);
}]);

/* CREATE BET CONTROLLER */
betAfriendControllers.controller('CreateBetController', ['$scope', '$rootScope', '$firebase', '$http', 'fireFactory', function($scope, $rootScope, $firebase, $http, fireFactory) { 
    var betsSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/bets/");
    var usersSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/users/");    
    var categoriesSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/categories/");  
    $scope.bets = $firebase(betsSource);
    $scope.users = $firebase(usersSource);
    $scope.categories = $firebase(categoriesSource);

    $scope.rules = [];
    $scope.newBet = {name:"",
                     creationDate:"",
                     dueDate:"",
                     /*categories: {
                        Sport:false,
                        Family:false,
                        'Free time':false,
                        Gambling:false,
                        Hobys:false,
                        Fun:false,
                        'Drinking games':false
                     },*/
                     categories:[],
                     betDetails: {
                        betDescription:{
                            description:"",
                            rules:$scope.rules
                        },
                        betReward:"",
                        betStatus:"In progress"
                     },
                     pageViews:0
                 };

    //With jQuery we check which checkboxed are checked,
    //and then we change newBet.categories['value'] of true ones
    var checkCategories = function(clear) {
        var catCount = 0;
        for (var i = 0; i < 7; i++) {
            if (!clear) {
                var kat = "#checkbox"+i;
                var bool = $(kat).prop('checked');
                var value = $(kat).val();
                if (bool) {
                    //$scope.newBet.categories[value] = true;
                    $scope.newBet.categories[catCount] = value;
                    catCount++;
                }
            } else {
                var kat = "#checkbox"+i;
                var bool = $(kat).prop('checked',false);
            }

        }
    }

    //We cound the number of elements in .ruleList (<ul>) and
    //for each one we read value out of <input> and place it in array 
    //$scope.rules which we then assign to newBet.betDetails.betDescription.rules
    var addRules = function() {
        var numOfRules = $('.ruleList li').length;
        for (var i = 0; i < numOfRules; i++) {
            var rule = "#checkboxRule"+i;
            var value = $(rule).val();
            var ruleObj = {description:value, checked:false};
            $scope.rules[i] = ruleObj;
        }
    }    
 
    $scope.addBet = function() {
        checkCategories(false);
        addRules();
        betsSource.push($scope.newBet);
        var id = new Date().getTime() + Math.floor((Math.random() * 1024) + 1);
        $scope.newBet.id = id; // put id into the data
        betsSource.child(id).set($scope.newBet);

        // betsSource.push($scope.newBet);
        $scope.newBet = '';
        checkCategories(true);

        $rootScope.alert.class = 'success';
        $rootScope.alert.message = 'Successfully created bet!';
    };
 
}]);     


/* BET DETAIL CONTROLLER */
betAfriendControllers.controller('BetDetailController', ['$scope', '$firebase', '$routeParams', '$http', '$log', 'fireFactory', function($scope, $firebase, $routeParams, $http, $log, fireFactory) {
    // $scope.bet = fireFactory.firebaseRef("bets/" + $routeParams.betId);
    var categoriesSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/bets/" + $routeParams.betId);  
    $scope.bets = $firebase(categoriesSource);
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
betAfriendControllers.controller('loginDialogController',['$scope', '$rootScope','$modal', function ($scope, $rootScope, $modal) {

  $scope.openLoginDialog = function (size) {

    $rootScope.modalInstance = $modal.open({
        templateUrl: 'login-form.html',
        controller: ModalInstanceCtrl,
        size: size
    });

    $rootScope.modalInstance.result.then(function () {
        $modal.close();
    });
  };
}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance) {
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

var DatepickerDemoCtrl = function ($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
};

betAfriendControllers.controller('AuthController', ["$scope", "$firebase", "$firebaseSimpleLogin",
        function($scope, $firebase, $firebaseSimpleLogin) 
        {
            var ref = new Firebase("https://dazzling-fire-5750.firebaseio.com/");
            $scope.auth = $firebaseSimpleLogin(ref);

            var auth = new FirebaseSimpleLogin(ref, function(error, user) {
                if (error) {
                    // an error occurred while attempting login
                    console.log(error);
                } 
                else if (user) {
                    // user authenticated with Firebase

                    var currentPath = window.location.pathname.split('/').pop();

                    if (currentPath === 'sign-in.html' || currentPath === 'register.html') {
                        // create a user reference
                        var userRef = ref.child('users/' + user.uid);

                        // check wheather the user is already registered
                        userRef.on('value', function(snapshot) {
                            if(snapshot.val() === null) {
                                // the user hasn't joined yet

                                // get current date
                                var date = new Date();
                                var dd = date.getDate();
                                var mm = date.getMonth()+1; // january is 0!
                                var yyyy = date.getFullYear();

                                if(dd < 10) {
                                    dd = '0' + dd;
                                } 

                                if(mm < 10) {
                                    mm= '0' + mm;
                                } 

                                date = dd+'/'+mm+'/'+yyyy;

                                // write new user name and joined date to database
                                userRef.child('name').set(user.displayName);
                                userRef.child('joined').set(date);
                            } else {
                                // the user is already registered
                            }
                            // redirect to main page
                            window.location.href = "index.html";
                        });
                    }
                } else {
                    // user is logged out
                }
            });
        }
    ]);

betAfriendControllers.controller('AlertController', [
    '$scope', '$rootScope', function($scope, $rootScope) {
        $rootScope.alert = {};
    }
]);

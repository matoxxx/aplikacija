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
betAfriendControllers.controller('DashboardController',  ['$scope', '$firebase', '$http', 'fireFactory', function($scope, $firebase, $http, fireFactory) {
    //var betsSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/bets/");
    /*var usersSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/users/");    
    var categoriesSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/categories/");*/
    $scope.bets = $firebase(fireFactory.firebaseRef("bets/"));
    $scope.users = $firebase(fireFactory.firebaseRef("users/"));
    $scope.categories = $firebase(fireFactory.firebaseRef("categories/"));
    $scope.stats = $firebase(fireFactory.firebaseRef("stats/"));
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
    $scope.bets = $firebase(fireFactory.firebaseRef("bets/"));
    $scope.users = $firebase(fireFactory.firebaseRef("users/"));
    $scope.categories = $firebase(fireFactory.firebaseRef("categories/"));
    //console.log($scope.categories[0]);
}]);

/* CREATE BET CONTROLLER */
betAfriendControllers.controller('CreateBetController', ['$scope', '$rootScope', '$firebase', '$http', 'fireFactory', function($scope, $rootScope, $firebase, $http, fireFactory) { 
    $scope.bets = $firebase(fireFactory.firebaseRef("bets/"));
    $scope.users = $firebase(fireFactory.firebaseRef("users/"));
    $scope.categories = $firebase(fireFactory.firebaseRef("categories/"));
    $scope.stats = $firebase(fireFactory.firebaseRef("stats/"));
    var betsSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/bets/");
    var statsSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/stats/");
    //console.log("nekiii: "+$scope.categories[0]);

    $scope.rules = [];
    var timestamp = new Date().getTime();
    $scope.newBet = {name:"",
                     creationDate:timestamp,
                     startDate:"",
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
    var checkCategories = function() {
        var catCount = 0;
        for (var i = 0; i < 7; i++) {
            var kat = "#checkbox"+i;
            var bool = $(kat).prop('checked');
            var value = $(kat).val();
            if (bool) {
                //$scope.newBet.categories[value] = true;
                var catObj = {id:i,name:value};
                $scope.newBet.categories[catCount] = catObj;
                var numCats = $scope.categories[i].count;
                var categoriesSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/categories/"+i);
                //console.log("CHEEEEEEEEEEEECK " +numCats);
                numCats++;
                //console.log("CHEEEEEEEEEEEECK " +numCats);
                $scope.categories[i].count = numCats;
                categoriesSource.update({count:numCats});
                //console.log("CHEEEEEEEEEEEECK " +$scope.categories[i].count);
                catCount++;
                }

        }
    }

    $scope.addRule = function() {
        var rule = $('#betRuleAdd').val();
        var numOfRules = $('.ruleList li').length;
        var ruleId = "rule"+numOfRules;
        if (rule != "") {                                  
            $('.ruleList').append("<li id='"+ruleId+"'ng-repeat='rule in bet.betDetails.betDescription.rules'><label class='checkbox' for='checkbox"+numOfRules+"'><input type='checkbox' value='"+rule+"' id='checkboxRule"+numOfRules+"' data-toggle='checkbox'>"+rule+"<button type='button' class='btn btn-danger btn-xs delete-rule' onclick="+ "deleteRule('"+ruleId+"')"+">X</button></label></li>");
        }
        $('#betRuleAdd').val('');
        $("#betRuleAdd").focus();
    };

                        //I couldn't implement deleteRule for ng-click, so it is still in main.js
                       /* $scope.deleteRule = function(rule) {
                            alert(rule);
                            var a = '#'+rule;
                            $(a).remove();
                        }   */                        

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
        //betsSource.push($scope.newBet);
        var id = new Date().getTime() + Math.floor((Math.random() * 1024) + 1);
        $scope.newBet.id = id; // put id into the data
        betsSource.child(id).set($scope.newBet);
        var numOfBetsAll = $scope.stats.numOfBets;
        numOfBetsAll++;
        var numOfBetsObj = {numOfBets:numOfBetsAll};
        statsSource.update(numOfBetsObj);
        for (var i = 0; i < $scope.newBet.categories.length; i++) {
            var catID = $scope.newBet.categories[i].id;
            var categorySource = new Firebase("https://dazzling-fire-5750.firebaseio.com/categories/"+catID+"/bets");
            var numOfBets = $scope.categories[catID].count;
            //console.log("Numofbets: "+numOfBets + " catID: "+catID);
            var betEntry = {};
            betEntry[numOfBets] = $scope.newBet.id;
            categorySource.update(betEntry);
        };
        var url = "/#!/bet/"+id;
        window.location.href = url;

        $rootScope.alert.class = 'success';
        $rootScope.alert.message = 'Successfully created bet!';
    };
 
}]);     


/* BET DETAIL CONTROLLER */
betAfriendControllers.controller('BetDetailController', ['$scope', '$firebase', '$routeParams', '$http', '$log', 'fireFactory', function($scope, $firebase, $routeParams, $http, $log, fireFactory) {
    //var betsSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/bets/" + $routeParams.betId);
    //$scope.bet = $firebase(betsSource);
    $scope.bet = $firebase(fireFactory.firebaseRef("bets/" + $routeParams.betId));

    //We make the fields editable and we update the firebase when hitting Save
    $scope.makeEditable = function() {
        var s = $('#editBetButton').text();
        if (s === "Edit") {
            swapEditable("Save",true); 
            rulesEditable();         
        } else if (s === "Save") {
            swapEditable("Edit",false);
            
            updateBet('#editReward',"/betDetails","betReward");
            updateBet('#editName',"","name");
            updateBet('#editDescription',"/betDetails/betDescription","description");
            updateBet('#editEndTime',"","dueDate");
            //updateBet('#editReward',"/betDetails","betReward");
            //alert(purified);
            /*var newObj = {betReward:purified};
            betsSource.update(newObj);*/
        }

        //alert("dela");
        //console.log("Nakj");
    };

    $scope.addNewRule = function() {
        var numOfRules = $('.ruleList li').length;
        var ruleId = "rule"+numOfRules;
        alert("dela");
        $('.ruleList').append("<li id='"+ruleId+"'><label class='checkbox editRule'><input type='checkbox' id='checkboxRule"+numOfRules+"' data-toggle='checkbox'>Enter rule<button type='button' class='btn btn-danger btn-xs delete-rule' onclick="+ "deleteRule('"+ruleId+"')"+">X</button></label></li>");        

    };

    var rulesEditable = function() {
        var numOfRules = $('.ruleList li').length;
        for (var i = 0; i < numOfRules; i++) {
            var ruleId = "rule"+i;
            var tag = "<button type='button' class='btn btn-danger btn-xs delete-rule' onclick="+ "deleteRule('"+ruleId+"');"+">X</button>";
            var id = "#"+ruleId;
            //$(id).append(tag);

            //treba je še appendati tag!!!!!!!!!!!!!!
            alert(tag);
        }; 
    }

     var swapEditable = function(txt, bool) {
            $('#editBetButton').text(txt);
            $('#editName').attr('contenteditable',bool);
            $('#editDescription').attr('contenteditable',bool);
            $('#editEndTime').attr('contenteditable',bool);
            $('#editReward').attr('contenteditable',bool);
            $('.editRule').attr('contenteditable',bool);            
     };

     var updateBet = function(id,link,attribute) {
        var text = $(id).text();
        var arr = text.split(" ");
        var finalText = "";
        for (var i = 0; i < arr.length; i++) {
            if(arr[i] != "" && arr[i] != "\n") {
                finalText += (arr[i] + " ");
            }
        };
        var betsSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/bets/" + $routeParams.betId + link);
        var s = finalText.substring(0,finalText.length-1);
        var newObj = {};
        newObj[attribute] = s;
        betsSource.update(newObj);
     };

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

/* CATEGORY DETAIL CONTROLLER */
betAfriendControllers.controller('CategoryDetailController', ['$scope', '$firebase', '$routeParams', '$http', 'fireFactory', function($scope, $firebase, $routeParams, $http, fireFactory) {
    //var betsSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/bets/" + $routeParams.betId);
    //$scope.bet = $firebase(betsSource);
    $scope.bets = $firebase(fireFactory.firebaseRef("bets/"));
    $scope.category = $firebase(fireFactory.firebaseRef("categories/" + $routeParams.catId));
    //$scope.bets = $firebase(fireFactory.firebaseRef("bets/"));
    //console.log($scope.categories.0);
    $scope.catID = $routeParams.catId;
    $scope.arr = [];
    //console.log($scope.categories[0]);

    /*$scope.callMe = function() {
        /*for (var i = 0; i < $scope.category.count; i++) {
            console.log("$scope.category.bets[0]");
        };
        console.log($scope.categories[0]);
           console.log($scope.category.count);
    console.log($scope.category.bets[0]);
       // console.log($scope.category.bets[0]);
        //console.log("jeeeej");
    };*/
    /*for (var i = 0; i < $scope.categories[2].count; i++) {
        //$scope.arr.push($scope.bets[$scope.cat.bets[i]]);
        console.log($scope.bets[$scope.cat.bets[i]]);
    };
    console.log($scope.arr.length+" "+$scope.categories[2].count);*/


}]);

/* USER DETAIL CONTROLLER */
betAfriendControllers.controller('UserDetailController', ['$scope', '$firebase', '$routeParams', '$http', 'fireFactory', function($scope, $firebase, $routeParams, $http, firefactory) {
    //var usersSource = new Firebase("https://dazzling-fire-5750.firebaseio.com/users/" + $routeParams.userId);

    //NI SE TESTIRANO
     $scope.user = $firebase(fireFactory.firebaseRef("users/" + $routeParams.userId));
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

betAfriendControllers.controller('AuthController', ['$scope', '$firebase', '$rootScope','fireFactory', function($scope, $firebase, $rootScope, fireFactory) {
    //$scope.usersRef = fireFactory.firebaseRef('users');

    //NI SE
    $scope.usersRef = $firebase(fireFactory.firebaseRef("users/"));

    // FirebaseAuth callback
    $scope.authCallback = function(error, user) {
        if (error) {
            console.log('error: ', error.code);
            if(error.code != 'INVALID_USER')
            {
                $rootScope.isLoggedIn = false;
            }
            else
            {
                $rootScope.alert.class = 'danger';
                $rootScope.alert.message = 'Invalid credentials!';               
            }
        }
        else if (user) {
            console.log('Logged In', user);

            $rootScope.isLoggedIn = true;
            $scope.userId = user.id;

            // Set the userRef and add user child refs once
            $scope.userRef = fireFactory.firebaseRef('users').child(user.id);
            $scope.userRef.once('value', function(data) {
                // Set the userRef children if this is first login
                var timestamp = new Date();
                var dd = timestamp.getDate();
                var mm = timestamp.getMonth()+1;

                var yyyy = timestamp.getFullYear();
                if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} var timestamp = dd+'/'+mm+'/'+yyyy;

                var val = data.val();
                var info = {
                    userId: user.id,
                    name: user.username,
                    displayName: user.displayName?user.displayName:'/',
                    betsWon: 0,
                    betsLost: 0,
                    avatarIcon: user.thirdPartyUserData.profile_image_url?user.thirdPartyUserData.profile_image_url:'http://placehold.it/128/128',
                    aboutUser: user.thirdPartyUserData.description?user.thirdPartyUserData.description:'/',
                    lastLogin: timestamp,
                    creationDate: timestamp,
                    location: user.thirdPartyUserData.location?user.thirdPartyUserData.location:'/'
                };

                if (val) {
                    info = val;
                }

                $scope.userRef.set(info); // set user child data once
                $rootScope.currentUser = info;
                $rootScope.modalInstance.close();
            });
        }
    };

    $scope.login = function(provider) {
        var options = {
            'rememberMe': false
        };

        if(provider === 'password')
        {
            var options = {
                'rememberMe': false,
                'email': $scope.email,
                'password': $scope.password
            };                
        }
        var auth = new FirebaseSimpleLogin(fireFactory.firebaseRef(), $scope.authCallback);
        console.log("provider", provider);
        auth.login(provider, options);
        $rootScope.isLoggedIn = true;
    };

    $scope.logout = function() {
        $rootScope.isLoggedIn = false;
        $rootScope.currentUser = null;
        $rootScope.alert.class = 'success';
        $rootScope.alert.message = 'Successfully logged out!';
    };
}]);

betAfriendControllers.controller('AlertController', [
    '$scope', '$rootScope', function($scope, $rootScope) {
        $rootScope.alert = {};
    }
]);

angular.module('ionicApp', ['ionic','ngCordova'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'SignInCtrl'
    })
    .state('Registration', {
      url: '/Registration',
      templateUrl: 'templates/Registration.html',
      controller: 'registerController'
    })
    
     .state('changepassword', {
      url: '/changepassword',
      templateUrl: 'templates/changepassword.html',
      controller: 'changepwdCtrl'
    })
    
    .state('deleterecord', {
      url: '/deleterecord',
      templateUrl: 'templates/deleterecord.html',
      controller: 'deleteCtrl'
    })
    
    
    
    
    
    
    
    
    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'templates/forgot-password.html'
    })
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'templates/home.html',
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.Gallery', {
      url: '/Gallery',
      views: {
        'Gallery-tab': {
          templateUrl: 'templates/Gallery.html',
          controller: 'ExampleController'
        }
      }
    })
    .state("secure", {
            url: "/secure",
            templateUrl: "templates/secure.html",
            controller: "SecureController"
        })
    .state('tabs.contact', {
      url: '/contact',
      views: {
        'contact-tab': {
          templateUrl: 'templates/contact.html'
        }
      }
    });


   $urlRouterProvider.otherwise('/sign-in');

})

/*.controller('SignInCtrl', function($scope, LoginService, $ionicPopup, $state) {
  $scope.user= {};
  $scope.password = '';
  $scope.grade = function() {
    var size = $scope.password.length;
    if (size > 8) {
      $scope.strength = 'strong';
    } else if (size > 3) {
      $scope.strength = 'medium';
    } else {
      $scope.strength = 'weak';
    }
  };
  $scope.signIn = function(user) {
    LoginService.loginUser($scope.user.username,$scope.user.password).success(function(user){
      $state.go('tabs.home');
    }).error(function(user){
      var alertPopup = $ionicPopup.alert({
        title: 'Login Failed!',
        template: 'Please check your Credentials!'
 
        
       
      });
    });
 
  }
  
})*/


.controller("registerController", function ($scope, $http, $httpParamSerializerJQLike) {

    $scope.pageClass = 'register';
$scope.register = function(name, password, email) {
   console.log("inside login function");
$http({
    method: 'POST',
    url : 'https://api.mongolab.com/api/1/databases/login/collections/damasravanthi?apiKey=WoLwhte_lVDY3xwvgP1R5zgQP2mxmP_G',
    data: JSON.stringify({
                name: name,
                password: password,
                email: email
            }),
    contentType: "application/json"
}).success(function() {
    $scope.name ="";
    $scope.password ="";
    $scope.email ="";
    
    $scope.msg ="User created successfully";
        })
}
    
})
.controller('changepwdCtrl', function($scope, $ionicPlatform, $ionicLoading, $compile, $http, $window) {
 $scope.changePwd = function(email, oldpwd, newpwd ) {
        console.log("RegisterCtrl: changePword: Entered with: " + email + ", " + oldpwd + ", " + newpwd + ", " );
       
        $http({
            method: 'GET',
            url: 'https://api.mongolab.com/api/1/databases/login/collections/damasravanthi?q={"email":"'+email+'"}&f={"password":1}&fo=true&apiKey=WoLwhte_lVDY3xwvgP1R5zgQP2mxmP_G'
        })
        .success(function(data) {
            if (data.password == oldpwd) {
                $http({
                    method: 'PUT',
                    url: 'https://api.mongolab.com/api/1/databases/login/collections/damasravanthi?q={"email":"'+email+'"}&apiKey=WoLwhte_lVDY3xwvgP1R5zgQP2mxmP_G',
                    data: JSON.stringify({ "$set" : { "password": newpwd } }),
                    contentType: 'Application/json'
                })
                .success(function() {
                    $scope.displayMsg = "Password changed";
                })
                .error(function() {
                    alert('Failed to update password');
                })
                        
            } else {
                alert('Old password is invalid');
            }
        })
        .error(function() {
            alert('Failed to authenticate existing info for ' + email);
        });
        console.log("RegisterCtrl: changePword: Finished");
    }
})


.controller('SignInCtrl', function($scope, $ionicPlatform, $ionicLoading, $compile, $http, $window,$state) {
$scope.signIn = function(username, password) {
        console.log("RegisterCtrl: loginUser: Entered with: " + username + ", " + password);
        $http({
            method: 'GET',
            url : 'https://api.mongolab.com/api/1/databases/login/collections/damasravanthi?q={"name":"'+username+'"}&f={"password":1}&fo=true&apiKey=WoLwhte_lVDY3xwvgP1R5zgQP2mxmP_G'
        })
        .success(function(data) {
            if (data.password == password) {
                $state.go('tabs.home');
            } else {
                alert("Invalid password");
            }
        })
        .error(function() {
            alert('Failed to authenticate user '+username);
        });
        console.log("RegisterCtrl: loginUser: Finished");
    }
})

.controller('deleteCtrl', function($scope, $ionicPlatform, $ionicLoading, $compile, $http, $window) {    
    console.log("RegisterCtrl: Started controller");
    
    $scope.remove = function(username, pwd) {
        console.log("registerController: removeUser: Entered with: " + username + ", " + pwd);
        $http({
            method: 'GET',
            url : 'https://api.mongolab.com/api/1/databases/login/collections/damasravanthi?q={"name":"'+username+'"}&f={"password":1,"_id":1}&fo=true&apiKey=WoLwhte_lVDY3xwvgP1R5zgQP2mxmP_G'
        })
        .success(function(data) {
            console.log("registerController: removeUser: Found "+data.password+", "+data._id.$oid);
            if (data.password == pwd) {
                $http({
                    method: 'DELETE',
                    url: 'https://api.mongolab.com/api/1/databases/login/collections/damasravanthi/'+data._id.$oid+'?apiKey=WoLwhte_lVDY3xwvgP1R5zgQP2mxmP_G',
                    async: true
                })
                .success(function() {
                    $scope.displayRMsg = "User "+username+" has been removed";
                })
                .error(function() {
                    alert("Failed to remove user");
                });
                
            } else {
                alert("Invalid password");
            }
        })
        .error(function() {
            alert('Failed to find user '+username);
        });
  
        console.log("RegisterCtrl: removeUser: Finished");
    }
    
})






















.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
})
.controller('ExampleController',function($scope)
 {
$scope.images = [];
$scope.loadImages = function() {
for(var i = 0; i < 100; i++) {
$scope.images.push({id : i, src : "http://placehold.it/50x50"});
    }
  }
})
.controller("PictureCtrl", function ($scope, $cordovaCamera) {
 
                $scope.takePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
                
                $scope.choosePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
            });
/*.service('LoginService',function($q){
  return {
    loginUser: function(name,pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      if(name ==  'sravanthi' && pw == 'sravanthi') {
        deferred.resolve('welcome' + name + '!');
      } else {
        deferred.reject('Please enter correct username/password');
      }
      promise.success=function(fn){
        promise.then(fn);
        return promise;
      }
      promise.error=function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
});*/

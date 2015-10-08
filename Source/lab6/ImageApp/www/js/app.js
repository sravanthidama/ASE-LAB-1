// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ImageApp=angular.module('starter', ['ionic','ngCordova','firebase']);
var fb=new Firebase("https://luminous-heat-3155.firebaseio.com/?page=Security")

ImageApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
ImageApp.controller("FirebaseController",function($scope,$state,$firebaseAuth){
  var fbAuth= $firebaseAuth(fb);
$scope.login=function(username,password){
fbAuth.$authWithPassword({
email:username,
password:password
}).then(function(authData){
$state.go("secure");
}).catch(function(error){
console.error("ERROR:"+ error);
});
$scope.register=function(username,passwors){
fbAuth.$createUser({email:username,password:password}).then(function(userData){
return fbAuth.$authWithPassword({
email:username,
password:password
});
}).then(function(authData){
$state.go("secure");
}).catch(function(error){
console.error("ERROR"+error);
});
}
ImageApp.controller("SecureController",function($scope,$ioniHistory,$firebaseArray,$cordovaCamera){
$ionicHistory.clearHistory();
$scope.images=[];
var fbAuth =fb.getAuth();
if(fbAuth){
var userReference= fb.child("users/"+fbAuth.uid);
var syncArray=$firebaseArray(userReference.child("images"));
$scope.images= syncArray;
}else{
state.go("firebase");
}
scope.upload=function(){
var options={
quality:75,
destinationType:Camera.DestinationType.DATA_URL,
sourceType:Camera.PictureSourceType.CAMERA,
allowEdit:true,
encodingType:Camera.EncodingType.JPEG,
popoverOptions:CameraPopoverOptions,
targetWidth:500,
targetHeight:500,
saveToPhotoAlbum:false
};
$cordovaCamera.getPicture(options).then(function(imageData){
syncArray.$add({image:imageData }).then(function(){
alert("Image has been uploaded");
});
},function(error){
console.error(error);
});


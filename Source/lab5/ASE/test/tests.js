describe('contactCtrl',function(){
var $scope,$contoller
describe('when intialized',function(){
beforeEach(function(){
module('ASE')
inject(function($rootScope,_$contoller){
$scope=$rootScope.$new();
$controller=_$controller_;
});

$controller('contactCtrl',{$scope:scope});
}));
it('Login Property to true',function(){
  expect($scope.showMenu).toBe(true);
});
if('Contact property true',function(){
expect($scope.showContacts).toBe(true);
});
if('Search property true;,function(){
expect($scope.showChat).toBe(true);
});
});
};
     
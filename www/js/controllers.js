angular.module('Main.Controllers', [])
.controller('AppCtrl',['$scope', function($scope) {
  $scope.Expanded =true;
  $scope.expandList = function()
  {
    $scope.Expanded =!$scope.Expanded;
  };
  
}])

.controller('popoverController',['$state','$scope', '$ionicPopover', function( $state, $scope, $ionicPopover) {
  var activepopover;  
  $scope.popit = function($event, template) {
      $ionicPopover.fromTemplateUrl(template, { scope: $scope })
      .then(function (popover) {
        activepopover = popover;
	popover.show($event);
        var stopListening = $scope.$on('popover.hidden', function() {
          stopListening();
          popover.remove();
        });
      });
      $scope.optionClicked = function(Value)
      {
	activepopover.remove();
	$state.go('app.subcategory',{
	  maincategory:Value
	});
      };
    }
    
}])

.controller('AddTag', ['$stateParams', '$state', '$scope', function($stateParams, $state, $scope) {
  console.log($stateParams.subcategory);
}])

.controller('subcategory', ['$stateParams', '$state', '$scope', function($stateParams, $state, $scope) {
  $scope.items = ['Cement and Aggregate', 'Reinforcement (Steel)','Stones','Masonry','Chemicals and Adhesives', 'Blocks', 'Insulation', 'Plastering', 'Roofing and Flooring', 'Metals and Alloys', 'Paving'];
  $scope.MainCategory = $stateParams.maincategory;
  
  $scope.addTags = function(index)
  {
   $state.go('app.home'); 
  };
}])

.controller('Settings', ['$scope', function($scope) {
  $scope.change = function()
  {
    console.log($scope.notifications);
  };
}])

.controller('HotDeals', ['$scope', function($scope) {
  $scope.deals=[
  {"name":"15% off on new account","validtill":"November 05, 1955","img":"img/hotdeals1.jpg","details":"This is a 'Facebook' styled Card. The header is created from a Thumbnail List item,the content is from a card-body consisting of an image and paragraph text. The footer consists of tabs, icons aligned left, within the card-footer."},
  {"name":"15% off on new account","validtill":"November 05, 1955","img":"img/hotdeals2.jpg","details":"This is a 'Facebook' styled Card. The header is created from a Thumbnail List item,the content is from a card-body consisting of an image and paragraph text. The footer consists of tabs, icons aligned left, within the card-footer."},
  {"name":"15% off on new account","validtill":"November 05, 1955","img":"img/hotdeals3.jpg","details":"This is a 'Facebook' styled Card. The header is created from a Thumbnail List item,the content is from a card-body consisting of an image and paragraph text. The footer consists of tabs, icons aligned left, within the card-footer."}
  ];
}])

.controller('MyProfile', ['$scope', function($scope) {
  $scope.aboutEdit=true;
  $scope.aboutEditbutton = function()
  {
    $scope.aboutEdit = !$scope.aboutEdit;
  };
  $scope.contactEdit=true;
  $scope.contactEditbutton = function()
  {
    $scope.contactEdit = !$scope.contactEdit;
  };
}])
;
  

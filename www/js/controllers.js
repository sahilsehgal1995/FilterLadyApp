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

.controller('subcategory', ['$stateParams', '$ionicPopup', 'AuthFactory', '$state', '$scope', function($stateParams, $ionicPopup, AuthFactory, $state, $scope) {
  $scope.items = ['Cement and Aggregate', 'Reinforcement (Steel)','Stones','Masonry','Chemicals and Adhesives', 'Blocks', 'Insulation', 'Plastering', 'Roofing and Flooring', 'Metals and Alloys', 'Paving'];
  $scope.MainCategory = $stateParams.maincategory;
  
  $scope.addTags = function(index)
  {
   AuthFactory.setCategory($scope.items[index]);
      // A confirm dialog
	var confirmPopup = $ionicPopup.confirm({
	  title: '<b>Register Product</b>',
	  template: '<b>Do you want to add products in '+ $scope.items[index] + '?</b>',
	  buttons: [
	    { text: 'No, Later' ,
	      type: 'button-assertive',
	      onTap: function(e) {
		$state.go('app.home');
	      }
	    },
	    {
	      text: '<b>Yes, offcourse</b>',
	      type: 'button-balanced',
	      onTap: function(e) {
		$state.go('app.productregister');
	      }
	    }
	]
	});
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

.controller('RegisterProduct', ['$scope', '$stateParams', '$ionicPopover', '$cordovaCamera', 'Loader', '$cordovaFileTransfer', 'AuthFactory', '$state', function($scope, $stateParams, $ionicPopover, $cordovaCamera, Loader, $cordovaFileTransfer, AuthFactory, $state) {
  
  $scope.images = [];
  $scope.product={
    name : '',
    category : '',
    description : '',
    actualprice : '',
    hourrent : '',
    dayrent : '',
    weekrent : ''
  };
  // .fromTemplateUrl() method
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  // Execute action on hide popover
  
  $scope.optionClicked = function(choice){
    $scope.popover.hide();
    if(choice==1)
    {
      window.imagePicker.getPictures(
	function(results) {
	  for (var i = 0; i < results.length; i++) {
	    $scope.images.push(results[i]);
	    $scope.$apply();
	  }
	  if(!$scope.$$phase) {
					$scope.$apply();
				}
	}, function (error) {
	    alert('Error: ' + error);
	}, {
	     maximumImagesCount: 5-$scope.images.length,
	     quality: 80
	    }
      );
    }
    
    else if(choice==2)
    {

	var options = {
	destinationType: Camera.DestinationType.FILE_URI,
	sourceType: Camera.PictureSourceType.CAMERA,
	};

      $cordovaCamera.getPicture(options).then(function(imageURI) {
	$scope.images.push(imageURI);
	$scope.$apply();
      }, function(err) {
	alert(err);
	// error
      });

    }
  };
  
  $scope.removeimage = function(index)
  {
    $scope.images.splice(index,1);
    $scope.images= $scope.images.valueOf();
    $scope.$apply();
  };
  
  
  
  $scope.register = function () {
      Loader.toggleLoadingWithMessage('Product Uploaded Successfully');
  }

  $scope.priceChange = function(){
    $scope.hourrenttip = Math.round(($scope.product.dayrent/24) + ((0.5*$scope.product.dayrent)/24));
    $scope.weekrenttip = Math.round(($scope.product.dayrent*7) - ((0.5*$scope.product.dayrent)/24));
  };
}])

.controller('MicroSite', ['$scope', function($scope) {
  console.log('MicroSite');
}])

.controller('Faq',['$scope', 'FaqFactory', function($scope, FaqFactory){
  console.log('FAQ');
  $scope.category={
    category : ''
  };
  $scope.generalfaq = FaqFactory.getGeneralFaq();	
  $scope.changeSelection = function()
  {
    switch($scope.category.category)
    {
      case 'General':
      {
	$scope.generalfaq = FaqFactory.getGeneralFaq();
	break;
      }
      case 'Lender':
      {
	$scope.generalfaq = FaqFactory.getLenderFaq();
	break;
      }
      case 'Borrower':
      {
	$scope.generalfaq = FaqFactory.getBorrowerFaq();
	break;
      }
    }
  };

  /*
   * if given item is the selected item, deselect it
   * else, select the given item
   */
  $scope.toggleItem= function(item) {
    if ($scope.isItemShown(item)) {
      $scope.shownItem = null;
    } else {
      $scope.shownItem = item;
    }
  };
  $scope.isItemShown = function(item) {
    return $scope.shownItem === item;
  };
}])
;
  

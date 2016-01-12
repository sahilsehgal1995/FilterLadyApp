// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('FilterLady', ['ionic', 'ngCordova', 'Main.Controllers', 'Data.factory'])

.run(function($ionicPlatform, $cordovaDevice) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//       cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'AppCtrl'
        }
      }
    })
    .state('app.addTag', {
      url: '/addtag?subcategory',
      views: {
        'menuContent': {
          templateUrl: 'templates/addTag.html',
          controller: 'AddTag'
        }
      }
    })
    .state('app.microsite', {
      url: '/microsite',
      views: {
        'menuContent': {
          templateUrl: 'templates/microsite.html',
          controller: 'MicroSite'
        }
      }
    })
    .state('app.subcategory', {
      url: '/subcategory?maincategory',
      views: {
        'menuContent': {
          templateUrl: 'templates/subcategory.html',
          controller: 'subcategory'
        }
      }
    })
    
    .state('app.productregister', {
      url: '/productregister',
      views: {
        'menuContent': {
          templateUrl: 'templates/registerproduct.html',
          controller: 'RegisterProduct'
        }
      }
    })
    
    .state('app.myprofile', {
      url: '/myprofile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'MyProfile'
        }
      }
    })
    .state('app.hotdeals', {
      url: '/hotdeals',
      views: {
        'menuContent': {
          templateUrl: 'templates/hotdeals.html',
          controller: 'HotDeals'
        }
      }
    })
    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html',
          controller: 'Settings'
        }
      }
    })
    .state('app.faq', {
      url: '/faq',
      views: {
        'menuContent': {
          templateUrl: 'templates/faq.html',
          controller: 'Faq'
        }
      }
    })
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
}]);

/**
 * Created by taox on 15-7-30.
 */
angular
  .module('app.routing', ['ui.router'])
  .config(config);

config.$inject = ['$urlRouterProvider','$stateProvider'];

function config($urlRouterProvider,$stateProvider){
  $urlRouterProvider
    .when('', '/home')
    .when('/', '/home')
    .otherwise(function ($inject) {
      $inject.get('$state').go('404', {}, {location: false});
    });
  $stateProvider
    .state('home',{
      url:'/home',
      templateUrl:'./home/home.html'
    })
    .state('404',{
      templateUrl:'./404.html'
    })
}

  //.config(['$urlRouterProvider','$stateProvider',function ($urlRouterProvider, $stateProvider) {
  //  $urlRouterProvider
  //    .when('', '/home')
  //    .when('/', '/home')
  //    .otherwise(function ($inject) {
  //      $inject.get('$state').go('404', {}, {location: false});
  //    });
  //  $stateProvider
  //    .state('home',{
  //      url:'/home',
  //      templateUrl:'./home/home.html'
  //    })
  //    .state('404',{
  //      templateUrl:'./404.html'
  //    })
  //}]);
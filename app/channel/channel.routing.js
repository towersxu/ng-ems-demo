/**
 * Created by taox on 15-7-30.
 */
angular
  .module('channel.routing',['ui.router'])
  .config(config);

config.$inject = ['$urlRouterProvider','$stateProvider'];

function config($urlRouterProvider,$stateProvider){

  $stateProvider
    .state('channel',{
      abstract:true,
      url:'/channel',
      template:'<div ui-view></div>'
    })
    .state('channel.apply',{
      url:'/u_apply',
      templateUrl:'channel/u_apply/apply.html',
      controller:'applyController'
    })
    .state('channel.list',{
      url:'/u_list',
      templateUrl:'channel/u_list/list.html',
      controller:'ListController'
    })
    .state('channel.view',{
      url:'/u_view',
      templateUrl:'channel/u_view/view.html',
      controller:'ViewController'
    })
    .state('channel.detail',{
      url:'/detail',
      templateUrl:'channel/detail/detail.html',
      controller:'DetailController'
    })
    .state('channel.broadcaster',{
      url:'/broadcaster',
      templateUrl:'channel/broadcaster/broadcaster.html',
      controller:'BroadcasterController'
    })
}
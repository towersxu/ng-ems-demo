/**
 * Created by taox on 15-7-31.
 */
angular
  .module('app.channel')
  .controller('ListController',['$scope','ChannelUserRest',function($scope,ChannelUserRest){
    //$scope.init = function(){
    //  ChannelUserRest.u_list().then(function(data){
    //    $scope.result = data;
    //  })
    //};
    ChannelUserRest.list().then(function(data){
      $scope.result = data;
    })
  }]);
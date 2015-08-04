/**
 * Created by taox on 15-7-30.
 */
angular.module('app.channel')
  .controller('applyController',function($scope,ChannelUserRest){
    $scope.name = "ap";
    $scope.applyReason = "";
    $scope.get = function(){
      ChannelUserRest.apply({r:$scope.applyReason}).then(function(data){
        $scope.result = data;
      });
    }
  });
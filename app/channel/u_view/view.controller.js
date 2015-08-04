/**
 * Created by taox on 15-8-3.
 */
angular.module('app.channel')
  .controller('ViewController',function($scope,ChannelUserRest){
    $scope.applicationId = "3215424";
    $scope.get = function(){
      ChannelUserRest.view({a:$scope.applicationId}).then(function(data){
        $scope.result = data;
      });
    }
  });
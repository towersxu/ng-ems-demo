/**
 * Created by taox on 15-8-4.
 */
angular.module('app.channel')
  .controller('BroadcasterController', ['$scope','ChannelBroadcasterRest',function ($scope, ChannelBroadcasterRest) {
    $scope.applyObject = {};
    $scope.settingObject = {};
    $scope.nameObject = {};

    $scope.apply = function(){
      ChannelBroadcasterRest.apply($scope.applyObject).then(function(data){
         $scope.applyResult = data;
      });
    };
    $scope.setting = function(){
      ChannelBroadcasterRest.setting($scope.settingObject).then(function(data){
        $scope.settingResult = data;
      });
    };

    $scope.name = function(){
      ChannelBroadcasterRest.name($scope.nameObject).then(function(data){
        $scope.nameResult = data;
      });
    };
  }]);

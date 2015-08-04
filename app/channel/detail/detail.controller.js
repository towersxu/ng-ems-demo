/**
 * Created by taox on 15-8-3.
 */
angular.module('app.channel')
  .controller('DetailController', function ($scope, ChannelUserRest) {
    $scope.channelId = "";
    $scope.like = function () {
      ChannelUserRest.like({'c': $scope.channelId}).then(function (data) {
        $scope.likeResult = data;
      });
    };
    $scope.dislike = function () {
      ChannelUserRest.like({'c': $scope.channelId, 'k': $scope.k}).then(function (data) {
        $scope.dislikeResult = data;
      });
    };

    $scope.save = function () {
      ChannelUserRest.save({'c': $scope.channelId}).then(function (data) {
        $scope.saveResult = data;
      });
    };

    $scope.notify = function () {
      ChannelUserRest.notify({'c': $scope.channelId,'n':$scope.n,'s':$scope.s}).then(function (data) {
        $scope.notifyResult = data;
      });
    };
    $scope.promote = function () {
      ChannelUserRest.promote({'c': $scope.channelId,'d':$scope.d}).then(function (data) {
        $scope.promoteResult = data;
      });
    };
    $scope.find = function (data) {
      ChannelUserRest.find(data).then(function (data) {
        $scope.findResult = data;
      })
    };
    $scope.get = function () {
      ChannelUserRest.get({'c': $scope.channelId,'a':$scope.a}).then(function (data) {
        $scope.getResult = data;
      });
    };

  });
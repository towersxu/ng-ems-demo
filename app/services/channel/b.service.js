/**
 * Created by taox on 15-8-4.
 */
angular.module('channel.service')
  .factory('ChannelBroadcasterRest', ['ChannelRestangularFactory', function (ChannelRestangularFactory) {
    ChannelRestangularFactory.connect('b');
    return {
      apply: function (data) {
        return ChannelRestangularFactory.sendData(data, ['o', 'g', 'c', 'h', 'p'], 'a.json', 902);
      },
      setting: function (data) {
        return ChannelRestangularFactory.sendData(data, ['n', 'd', 'p', 'b', 'v', 'u'], 's.json', 902);
      },
      name: function (data) {
        return ChannelRestangularFactory.sendData(data, ['s', 'r'], 'n.json', 902);
      }
    }
  }]);
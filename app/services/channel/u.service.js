/**
 * Created by taox on 15-7-31.
 */
angular.module('channel.service')
  .factory('ChannelUserRest', ['ChannelRestangularFactory', '$q', function (ChannelRestangularFactory, $q) {
    //ChannelRestangular.all("u").customPOST({"reason":"lalal"},"a.json").then(function(){});
    ChannelRestangularFactory.connect('u');

    return {
      apply: function (data) {
        return ChannelRestangularFactory.sendData(data, ['r'], 'a.json', 902);
      },
      list: function () {
        return ChannelRestangularFactory.sendData('l.json', 903);
      },
      view: function (data) {
        return ChannelRestangularFactory.sendData(data, ['a'], 'v.json', 902);
      },
      like: function (data) {
        return ChannelRestangularFactory.sendData(data, ['c'], 'k.json', 902);
      },
      save: function (data) {
        return ChannelRestangularFactory.sendData(data, ['c'], 's.json', 902);
      },
      notify: function (data) {
        return ChannelRestangularFactory.sendData(data, ['c'], 'n.json', 902);
      },
      promote: function (data) {
        return ChannelRestangularFactory.sendData(data, ['c'], 'p.json', 902);
      },
      find: function (data) {
        return ChannelRestangularFactory.sendData(data, ['k', 's', 't'], 'f.json', 902);
      },
      get: function (data) {
        return ChannelRestangularFactory.sendData(data, ['c'], 'g.json', 902);
      }
    };
  }]);
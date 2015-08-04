/**
 * Created by taox on 15-7-30.
 */
angular.module('channel.service', ['restangular'])
  .factory('ChannelRestangular', ['Restangular', function (Restangular) {
    return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('/clientChewChew/angular/app/data/channel');
    });
  }])
  .factory('ChannelRestangularFactory', ['ChannelRestangular', function (ChannelRestangular) {
    var u;
    return {
      connect: function (namespace) {
        u = ChannelRestangular.all(namespace);
      },
      getNamespace: function () {
        return u;
      },
      sendData: function (data, params, url, errorCode) {
        if (!u) {
          return {
            then: function (callback) {
              callback({'b': 0, 'i': 903});
            }
          }
        }
        if (typeof data === 'string') {
          errorCode = params;
          url = data;
          params = [];
          data = {}
        }
        if (typeof params === 'string') {
          errorCode = url;
          url = params;
          params = [];
        }
        for (var i = 0; i < params.length; i++) {
          if (!data || !data[params[i]]) {
            return {
              then: function (callback) {
                callback({'b': 0, 'i': errorCode});
              }
            }
          }
        }
        return u.customPOST(data, url);
      }
    }
  }]);

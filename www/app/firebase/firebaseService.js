(function() {
   'use strict';

   /* Services */

   angular.module('firebase.services', [])

      // put your services here!
      // .service('serviceName', ['dependency', function(dependency) {}]);

     .factory('messageList', ['fbutil', function(fbutil) {
       return fbutil.syncArray('messages', {limitToFirst: 10, endAt: null});
     }])

     .factory('tableList', ['fbutil', function(fbutil) {
       return fbutil.syncArray('tables');

     }])
     .factory('orderList', ['fbutil', function(fbutil) {
      var getOrder  = function(tableId){
        var Id = tableId - 1;
        return fbutil.syncArray('tables/' + Id + '/order');
      }

      var orderHistory = function  (tableId) {
        var Id = tableId - 1;
        return fbutil.syncArray('tables/' + Id + '/order/OrderHistroy');
      }

         


         return {
           getOrder: getOrder,
           orderHistory:orderHistory
         }
     }]);

})();


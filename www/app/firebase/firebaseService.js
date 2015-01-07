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
      .factory('syncOrderHistory', ['fbutil', function(fbutil) {
         var syncOH = function  (tableId) {
           return fbutil.syncArray('tables/'+ tableId +'/order/orderHistory');
         }
        return {
          syncOH: syncOH
          }   
      }])

     .factory('orderList', ['fbutil', function(fbutil) {
      var getTableInfo = function  (tableId) {
         var Id = tableId;
        return fbutil.syncObject('tables/' + Id + '/tableInfo' );
      }
      var getOrder  = function(tableId){
        var Id = tableId;
        return fbutil.syncArray('tables/' + Id + '/order' );
      }

      var orderHistory = function  (tableId) {
        var Id = tableId;
        return fbutil.syncArray('tables/' + Id + '/order/orderHistory');
      }
      
      return {
         getOrder: getOrder,
         orderHistory: orderHistory,
         getTableInfo: getTableInfo
      }
    }]);

})();


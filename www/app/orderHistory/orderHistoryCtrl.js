angular.module('OrderHistoryCtrl', ['firebase.utils'])

.config(function($stateProvider) {
  $stateProvider
  .state('tab.orderHistory', {
      url: '/tables/:tid/orderHistory',
      views: {
        'tab-tables': {
          templateUrl: 'app/orderHistory/orderHistory.tpl.html',
          controller: 'orderHistoryCtrl as ohc'
        }
      }
  })
})

//ohc : orderHistoryCtrl 
.controller('orderHistoryCtrl', ['fbutil', 'FBURL', 'tableList','orderList','$stateParams', 
  function(fbutil, FBURL, tableList,orderList, $stateParams) {
  
  var ohc = this;
  var tid = $stateParams.tid;
  
  ohc.tid = tid;
  ohc.order = tableList;

  
}]);
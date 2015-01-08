angular.module('OrderHistoryCtrl', ['firebase.utils'])

.config(function($stateProvider) {
  $stateProvider
  .state('tab.orderHistory', {
      url: '/tables/:tid/orderHistory',
      views: {
        'tab-tables': {
          templateUrl: 'app/orderHistory/orderHistory.tpl.html',
          controller: 'orderHistoryCtrl as ohc'
        },
        'tab-tables-detail':{
            templateUrl: 'app/sideMenu/sideMenu.tpl.html',
            controller: 'sideMenuCtrl as smc'
        } 
      }
  })
})

//ohc : orderHistoryCtrl 
.controller('orderHistoryCtrl', ['fbutil', 'FBURL', 'tableList','orderList','$stateParams', '$ionicScrollDelegate', 
  function(fbutil, FBURL, tableList,orderList, $stateParams, $ionicScrollDelegate) {
  
  var ohc = this;
  var tid = $stateParams.tid;
  console.log($stateParams)
  ohc.tid = tid;
  ohc.order = tableList;
  

    
  ohc.up = function  () {
    var position = $ionicScrollDelegate.getScrollPosition().top - 100
    console.log($ionicScrollDelegate.getScrollView())
    $ionicScrollDelegate.scrollTo(0,position, true);

  }

  ohc.down = function  () {
    var position = $ionicScrollDelegate.getScrollPosition().top + 100
    console.log(position - 100)
    $ionicScrollDelegate.scrollTo(0,position, true);

    ohc.maxScroll = $ionicScrollDelegate.getScrollView().__maxScrollTop;
    console.log(ohc.maxScroll)
  
  }










  
}]);
angular.module('TableDetailCtrl', ['firebase.utils'])

.config(function($stateProvider) {
  $stateProvider
  .state('tab.tableDetail', {
      url: '/tables/:tid',
      views: {
        'tab-tables': {
          templateUrl: 'app/tableDetail/tableDetail.tpl.html',
          controller: 'orderCtrl as oc'
        },
        'tab-tables-detail':{
            templateUrl: 'app/sideMenu/sideMenu.tpl.html',
            controller: 'sideMenuCtrl as smc'
        } 
      }
    })

})
//oc : orderCtrl 
.controller('orderCtrl', ['fbutil', 'FBURL', 'tableList','orderList','$stateParams', 
  function(fbutil, FBURL, tableList,orderList, $stateParams) {
  
  var oc = this;
  var tid = $stateParams.tid;
  
  oc.tid = tid;
  oc.order = tableList;

  
}]);
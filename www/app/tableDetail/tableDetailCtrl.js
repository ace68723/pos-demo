angular.module('TableDetailCtrl', ['firebase.utils'])

.controller('tableDetailCtrl', ['fbutil', 'FBURL', 'tableList','orderList','$stateParams', 
  function(fbutil, FBURL, tableList,orderList, $stateParams) {
  
  var tableDetailCtrl = this;
  var tableId = $stateParams.tableId;
  tableDetailCtrl.order = orderList.getOrder(tableId);
  tableDetailCtrl.orderHistory = orderList.orderHistory(tableId);
  
  
  tableDetailCtrl.add = function(id) {
    tableDetailCtrl.order[id].quantity += 1;
    tableDetailCtrl.order.$save(id);
    
  } 
  
  tableDetailCtrl.checkOrder = function  (id) {
    tableDetailCtrl.orderHistory[id].subTotal
    console.log(tableDetailCtrl.orderHistory[id].subTotal)
  }
  

  
}])

.controller('sideMenuCtrl',['fbutil', 'FBURL', 'tableList','orderList', '$stateParams','$ionicHistory','$location', 
   function  (fbutil, FBURL, tableList, orderList, $stateParams, $ionicHistory, $location) {
  //  if (this.address =="/tab/tables/1"){
  //   this.show = true
  //   this.sidebar="true"
  // }else{
  //   this.show = false
  //   this.sidebar="true"
  // }
  var sideMenuCtrl = this;
  var tableId = $stateParams.tableId;
  
  sideMenuCtrl.tableId = $stateParams.tableId;
  console.log(sideMenuCtrl.tableId)
  sideMenuCtrl.order = orderList.getOrder(tableId);
  sideMenuCtrl.orderHistory = orderList.orderHistory(tableId);
  
  sideMenuCtrl.showOH2 = function  () {
    $location.path("/tab/tables/" + sideMenuCtrl.tableId + "/orderHistory")
    sideMenuCtrl.showOH = true;
     console.log(!sideMenuCtrl.showOH)
  }

  sideMenuCtrl.back = function() {
    $ionicHistory.goBack();
     sideMenuCtrl.showOH = false
  };
  
  sideMenuCtrl.confirm = function() {
      
      OrderHistory = {}
      OrderHistory.order = {};
      OrderHistory['date'] = {  'year': new Date().getFullYear(),
                                'month': new Date().getMonth() + 1,
                                'date': new Date().getDate(),
                                'hours': new Date().getHours() ,
                                'minutes': new Date().getMinutes() + 1,
                                'seconds': new Date().getSeconds() + 1
                            };
    //add order to order history
    OrderHistory['subTotal'] = 0;
    var k = 0;
    for(var i = 0; i<sideMenuCtrl.order.length; i++){
             if (sideMenuCtrl.order[i].quantity > 0 ){
                  OrderHistory.order[k] = sideMenuCtrl.order[i];
                  k += 1
                OrderHistory['subTotal'] += sideMenuCtrl.order[i].quantity * sideMenuCtrl.order[i].price
              }
    }
    sideMenuCtrl.total += OrderHistory['subTotal'];
    console.log(sideMenuCtrl.total)
    sideMenuCtrl.orderHistory.$add(OrderHistory);
    console.log( sideMenuCtrl.orderHistory)

    //clear order quantity
    for(var i = 0; i<sideMenuCtrl.order.length; i++){
             if (sideMenuCtrl.order[i].quantity > 0 ){
                sideMenuCtrl.order[i].quantity = 0;
                sideMenuCtrl.order.$save(i)
                
              }
    }
  }
  sideMenuCtrl.checkOrder = function  (id) {
    tableDetailCtrl.orderHistory[id].subTotal
    console.log(tableDetailCtrl.orderHistory[id].subTotal)
  }


}])
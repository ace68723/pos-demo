angular.module('SideMenuCtrl', ['firebase.utils'])

//sideMenuCtrl : smc 
.controller('sideMenuCtrl',['fbutil', 'FBURL', 'tableList','orderList', 'syncOrderHistory', '$stateParams','$ionicHistory','$location', 
   function  (fbutil, FBURL, tableList, orderList, syncOrderHistory, $stateParams, $ionicHistory, $location) {

  var smc = this;
  var tid = $stateParams.tid;
  smc.tl = tableList
  smc.tid = $stateParams.tid;
  smc.tinfo = orderList.getTableInfo(smc.tid);
  smc.aoh = syncOrderHistory.syncOH(smc.tid);
  smc.co = orderList.getOrder(smc.tid);
  smc.orderHistory = orderList.orderHistory(tid);
  smc.showOH2 = function  () {
    $location.path("/tab/tables/" + smc.tid + "/orderHistory")
    smc.showOH = true;
     console.log(!smc.showOH)
  }

  smc.back = function() {
    $ionicHistory.goBack();
     smc.showOH = false
  };
  
  smc.confirm = function() {
      smc.order = smc.tl[smc.tid].order;
      

      OrderHistory = []
      OrderHistory.order = {};
      OrderHistory['subTotal'] = 0;
      OrderHistory['date'] = {  'year': new Date().getFullYear(),
                                'month': new Date().getMonth() + 1,
                                'date': new Date().getDate(),
                                'hours': new Date().getHours() ,
                                'minutes': new Date().getMinutes() + 1,
                                'seconds': new Date().getSeconds() + 1
                            };
   
    

    OrderHistory.order = _(smc.order).filter("quantity").value();
    smc.st = _.forEach(OrderHistory.order, function  (order) {
              OrderHistory['subTotal'] += order.quantity * order.price;
            })
    smc.aoh.$add(OrderHistory);
    
    var i = 0;
    smc.co = _.forEach(smc.co, 
                            function(order){ 
                                  if(order.quantity > 0){ 
                                    
                                    order.quantity=0
                                     smc.co.$save(i)
                                    i +=1
                                  }else{
                                    i +=1
                                    return
                                  }
                            });
      smc.tinfo.status = 0
       smc.tinfo.$save();
     $location.path("/tab/tables/" + smc.tid + "/orderHistory")
  }    


}]);
angular.module('TablesCtrl', ['firebase.utils'])

.controller('tablesCtrl', ['fbutil', 'FBURL', 'tableList', 'orderList', '$location','$ionicPopup', '$timeout',
  function(fbutil, FBURL, tableList, orderList, $location,$ionicPopup, $timeout) {
  

  var tableCtrl = this;

  tableCtrl.syncedValue = fbutil.syncObject('syncedValue');
  tableCtrl.FBURL = FBURL;

  tableCtrl.tables = tableList;
  tableCtrl.toTable = function (tid) {
    
    tableCtrl.tinfo = orderList.getTableInfo(tid)
    
    if(tableCtrl.tables[tid].tableInfo.status == 1){
      $location.path("/tab/tables/" + tid + "/orderHistory")  
    }else if(tableCtrl.tables[tid].tableInfo.status == 2){
      $location.path("/tab/tables/" + tid )  
    }else if(tableCtrl.tables[tid].tableInfo.status == 0){
        
        var confirmPopup = $ionicPopup.confirm({
          title: 'Open This Table',
          template: 'Are you sure you want to open this table?'
        });
        confirmPopup.then(function(res) {
          if(res) {
            
            tableCtrl.tinfo.status = 1
            tableCtrl.tinfo.$save();

          } else {
            console.log('You are not sure');
          }
        })
    }else{
      return
    }
  }
   

}])

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

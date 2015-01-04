angular.module('TablesCtrl', ['firebase.utils'])

.controller('tablesCtrl', ['fbutil', 'FBURL', 'tableList','orderList', function(fbutil, FBURL, tableList,orderList) {
  var tableCtrl = this;

  tableCtrl.syncedValue = fbutil.syncObject('syncedValue');
  tableCtrl.FBURL = FBURL;

  tableCtrl.tables = tableList;
  // console.log(tableCtrl.tables)
   

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

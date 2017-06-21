angular.module('messageService', [])

.factory('Message', function($http){
	
	var messageFactory = {};

	messageFactory.send = function(messageData){
		return $http.post('api/sendMessage', messageData);
	};

	messageFactory.all = function(){
		return $http.get('api/messages');
	}

	return messageFactory;
})
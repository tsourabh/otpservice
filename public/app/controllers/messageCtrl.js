angular.module('messageCtrl', ['messageService'])

.controller('messageController', function(Message){
	var vm = this;
	vm.processing = true;

	Message.all()
		.success(function(data){
			vm.messages = data;
		});

})

.controller('messageCreateController', function(Message, $location, $window){

	var vm = this;
	vm.messageData = {
		reciever:"",
		message :""
	}
	
	vm.sendMessage = function(){
		console.log("sending OTP Message...");

		vm.message = "";

		Message.send(vm.messageData)
			.success(function(res){
				vm.messageData = {};
				vm.message = res.data.message;

				console.log(vm.message);
			});
		$location.path('/thankyou');
	}
});
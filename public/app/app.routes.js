angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

	$routeProvider
		.when('/',{
			templateUrl: 'app/views/pages/home.html'
		})

		.when('/contacts',{
			templateUrl: 'app/views/pages/contacts.html'
		})
		.when('/send',{
			templateUrl: 'app/views/pages/sendMessage.html',
			controller:"messageCreateController",
			controllerAs:"sendMessage"
		})
		.when('/messages',{
			templateUrl: 'app/views/pages/messages.html',
			controller: "messageController",
			controllerAs: "allMessages"
		})
		.when('/thankyou',{
			templateUrl: 'app/views/pages/thankyou.html'
		})
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
});
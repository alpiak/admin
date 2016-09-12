angular.module('table', [])
	.controller('table', function($scope) {
		$scope.items = [
			{
				index: "1",
				name: "Ravi Kumar",
				location: "India",
				date: "23/12/2012",
				type: "Paid",
				status: "Active"
			}, {
				index: "2",
				name: "Parneethi Chopra",
				location: "USA",
				date: "13/02/2012",
				type: "Free",
				status: "Banned"
			}, {
				index: "3",
				name: "Ravi Kumar",
				location: "India",
				date: "23/12/2012",
				type: "Paid",
				status: "Active"
			}
		]
	})
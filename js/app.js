angular.module('app.list', [])
	.factory('typeMap', function () {
		return [
	    {
	      typeName: "uneditable"
	    }, {
	      typeName: "text",
	      regExp: /^(?:[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*|(?:[A-Za-z]+ )+[A-Za-z]+)$/
	    }, {
	      typeName: "select",
	      values: ["India", "USA", "China", "UK"]
	    }, {
	      typeName: "datetime"
	    }, {
	      typeName: "select",
	      values: ["Paid", "Free"]
	    }, {
	      typeName: "select",
	      values: ["Active", "Banned"]
	    }, {
	      typeName: "uneditable"
	    }
	  ];
	})
	.directive('listForm', function () {
		return {
			scope: true,
			controller: function ($element, $scope, typeMap) {
				$($element).find('.submit').click(function () {
					var isLegal = true;

					$($element).find('form').first().children('.form-group').each(function (index) {
						var value = $(this).find('input').val();

						// check if the form values are legal
						if (typeMap[index + 1] && typeMap[index + 1].regExp) {
							if (!typeMap[index + 1].regExp.test(value)) {
								isLegal = false;
								$(this).addClass('has-error');
							}
						}
					});
					if (isLegal === true) {
						$scope.$apply(function () {
							$scope.active.activeItem =
							$.extend({},$scope.active.activeCurrent);
							$scope.items[$scope.active.activeCurrent.index - 1] =
							$.extend({},$scope.active.activeCurrent);
						});
						$($element).modal('hide');
					}
				});

				// Remove the error stype when an input element be focused.
				$($element).find('input').focus(function () {
					$(this).parents('.has-error').first().removeClass('has-error');
				});
			}
		}
	})
	.directive('openListForm', function () {
		return {
			controller: function ($element) {
				$($element).click(function () {
					$('#list-form').appendTo('body').modal();
      			});
			}
		}
	})
	.controller('ListController', function($scope) {
		$scope.active = {};
		$scope.active.activeItem = {};
		$scope.active.activeCurrent = {}; // bound to list form
		$scope.items = [
			{
				index: 1,
				name: "Ravi Kumar",
				location: "India",
				date: "23/12/2012",
				type: "Paid",
				status: "Active"
			}, {
				index: 2,
				name: "Parneethi Chopra",
				location: "USA",
				date: "13/02/2012",
				type: "Free",
				status: "Banned"
			}, {
				index: 3,
				name: "Ravi Kumar",
				location: "India",
				date: "23/12/2012",
				type: "Paid",
				status: "Active"
			}, {
				index: 4,
				name: "Ravi Kumar",
				location: "India",
				date: "23/12/2012",
				type: "Paid",
				status: "Active"
			}, {
				index: 5,
				name: "Parneethi Chopra",
				location: "USA",
				date: "13/02/2012",
				type: "Free",
				status: "Banned"
			}, {
				index: 6,
				name: "Ravi Kumar",
				location: "India",
				date: "23/12/2012",
				type: "Paid",
				status: "Active"
			}
		];
	})
	.controller('TableController', function($scope) {
		$scope.setActive = function(item) {
			$scope.active.activeItem = item;
			$scope.active.activeCurrent = $.extend({}, $scope.active.activeItem);
		}
	})
	.controller('FormController', function ($scope, typeMap) {
		$scope.typeMap = typeMap;
	});
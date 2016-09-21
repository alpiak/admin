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
							$scope.items[$scope.active.activeItem.$index] =
							$.extend(true, {}, $scope.active.activeItem);
						});
						$($element).modal('hide');
						noty({text: '<strong>修改成功</strong>',layout:'topRight',type:'success',closeWith:['click','button'],timeout:5000});
					}
				});

				// Remove the error stype when an input element be focused.
				$($element).find('input').focus(function () {
					$(this).parents('.has-error').first().removeClass('has-error');
				});
			}
		}
	})
	.directive('deleteModal', function () {
		return {
			scope: true,
			controller: function ($element, $scope) {
				$($element).find('.submit').click(function () {
					$scope.$apply(function () {
						$scope.items.splice($scope.active.activeItem.$index, 1);
					});
					$($element).modal('hide');
					noty({text: '<strong>删除成功</strong>',layout:'topRight',type:'alert',closeWith:['click','button'],timeout:5000});
				})
			}
		}
	})
	.controller('ListController', function($scope, typeMap) {
		$scope.typeMap = typeMap;
		$scope.active = {};
		$scope.active.activeItem = {}; // bound to list form
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
				type: "Paid",
				status: "Active",
				date: "23/12/2012"
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
			}, {
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
				type: "Paid",
				status: "Active",
				date: "23/12/2012"
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
			},{
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
				type: "Paid",
				status: "Active",
				date: "23/12/2012"
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
			}, {
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
				type: "Paid",
				status: "Active",
				date: "23/12/2012"
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
		$scope.setActive = function (item, $index) {
			var that = $scope.active.activeItem = $.extend(true, {}, item);

			that.$index = $index;
		};
	});
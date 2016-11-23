	var cart = angular.module('cart', ['ngRoute']);

	// configuring routes
	cart.config(function($routeProvider) {
		$routeProvider

			// route for the product page
			.when('/', {
				templateUrl : 'products.html',
				controller  : 'mainController'
			})

			// route for the cart page
			.when('/cart', {
				templateUrl : 'cart.html',
				controller  : 'cartController'
			})

			.otherwise({ redirectTo: '/' });
	});

	cart.service('productService', function() {
	  var productList = [];

	  var addProduct = function(newObj) {
	      productList.push(newObj);
	  };

	  var getProducts = function(){
	      return productList;
	  };

	  return {
	    addProduct: addProduct,
	    getProducts: getProducts
	  };

	});

	cart.controller('mainController', ['$scope', '$rootScope', 'productService', function($scope,$rootScope,productService) {
		 var sum = 0.0;
		 $scope.products = null;
		 $scope.products = productService.getProducts();
		 for (var i = 0; i < $scope.products.length; i++) {
				sum += Number($scope.products[i][0]['Price']);
			}
		 $scope.total = sum;
		 console.log($scope.products);
	}]);

	cart.controller('cartController', ['$scope', '$http', '$rootScope','productService', function($scope,$http,$rootScope,productService) {
		$scope.items = null;
	    $http.get('product.json')
	        .success(function(data) {
	            $scope.items=data;
	        })
	        .error(function(data,status,error,config){
	            $scope.items = [{heading:"Error",description:"Could not load json   data"}];
	        });

	    $scope.addToCart = function(item){	
	    	console.log(item);
	    	var products = [];
	    	products.push({
				Picture:item.productPicture, 
        		Name: item.productName,
        		Price: Number(item.productPrice.replace(/[^0-9\.]+/g,""))
   		 	});
        	productService.addProduct(products);
		};
	}]);


angular.module('admin',['ngRoute','ngSanitize'])
.config(function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl : '/views/login.html',
            controller : 'LoginCtrl'
        })
        .when('/dashboard', {
            templateUrl : '/views/dashboard.html',
            controller : 'DashboardCtrl'
        })
        .when('/dashboard/post/:id', {
            templateUrl : '/views/post.html',
            controller : 'PostCtrl'
        })
        .otherwise({
        	redirectTo: '/login'
        })
})
.controller('DashboardCtrl',function($scope,$http,$rootScope){
	$scope.title="Post";
	$scope.post = function(){
		$http.post('/post',$scope.post_detail)
		.success(function(response){
            $scope.render();
		});
	}
	$scope.render = function(){
		$http.get('/post')
		.success(function(response){
			$scope.renderPost(response);
		});
	}
	$scope.renderPost = function(response){
		$scope.posts = response;
	}
	$scope.remove_post = function(id){
		$http.delete('/post/'+id)
		.success(function(response){
			$scope.render();
		});
	}
	$scope.render();

	$scope.converter = new Markdown.Converter();
    $scope.convert = function(markdown) {
        return $scope.converter.makeHtml(markdown);
    }
})
.controller('LoginCtrl', function($scope,$http,$location){
	$scope.login = function(user){
		$http.post('/login',user)
		.success(function(response){
			$location.path('/dashboard');
		});
	}
})
.controller('PostCtrl',function($scope,$http,$routeParams,$location){
	$http.get('/postSingle/'+$routeParams.id)
	.success(function(response){
		$scope.renderPostSingleDetails = response;
	})
	$scope.updatePost = function(id){
		console.log($scope.renderPostSingleDetails);
		$http.put('/postSingle/'+id,$scope.renderPostSingleDetails).
		success(function(response) {
			console.log(response);
			$location.path('/dashboard');
		});
	}
})
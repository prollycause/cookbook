angular
    .module('jamesCookBook', [])
    .controller("mainController", ["$scope", "$http", function ($scope, $http ) {
        $scope.formData = {};
        $('#output').hide();
        
        $http.get('/api/recipe')
            .success(function(data) {
                $scope.recipes = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
        });

        $scope.createRecipe = function() {
            $http.post('/api/recipe', $scope.formData)
                .success(function(data) {
                    $scope.formData = {};
                    $scope.recipes = data;
                    
                })
                .error(function(data) {
                    console.log('Error: ' + data);

                    
            });
        };

        $scope.deleteRecipe = function(id) {
            $scope.sure = confirm('this will delete every recipe');
            if ($scope.sure)
            $http.delete('/api/recipe/')
                .success(function(data) {
                    $scope.recipes = data;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            window.location = "http://james.ragstand.com:9001";   
        };
}]);
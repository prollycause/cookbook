// public/core.js
var jamesCookBook = angular.module('jamesCookBook', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.writer = $('#author').val();
    // when landing on the page, get all recipes and show them
    $http.get('/api/recipe')
        .success(function(data) {
            $scope.recipes = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createRecipe = function() {
        console.log($scope.formData.author);
        console.log($scope.formData.name);
        $http.post('/api/recipe', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so user is ready to enter another
                $scope.recipes = data;
                for (var key in data) {
                console.log(data[key].author);

            }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });


    };

    // delete a recipe after checking it
    $scope.deleteRecipe = function(id) {
        var sure = confirm('this will delete every recipe');
        if (sure)
        $http.delete('/api/recipe/')
            .success(function(data) {
                $scope.recipes = data;

                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
            window.location = "http://james.ragstand.com:9001";
    };

}
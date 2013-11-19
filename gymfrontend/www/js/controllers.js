/**
 *
 * Created by zapix on 19.11.13.
 */

gymApp = angular.module('gymApp', []);

gymApp.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
    $scope.muscleGroups = [];
    $scope.exerciseList = [];

    $http.get('http://192.168.0.33:8000/api/v1/muscles/').success(function(data){
        $scope.muscleGroups = data;
    });

    $http.get('http://192.168.0.33:8000/api/v1/exercises/').success(function(data){
        $scope.exerciseList = data;
    });

    $scope.selectGroup = {}
    $scope.selectGroup.muscle_group_pk = 3

}]);

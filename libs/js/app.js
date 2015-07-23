var mapApp = angular.module('mapApp', []);


mapApp.factory('mapDetails', function() {
    return {mapName: ""};
});

mapApp.controller('mapController', function($scope, mapDetails){
    $scope.map = mapDetails;
});

mapApp.controller('mapController2', function($scope, mapDetails){
    $scope.map = mapDetails;
});
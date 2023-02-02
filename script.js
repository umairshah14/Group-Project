var app = angular.module("tableApp", []);

app.controller('MainController', ['$scope', 'table', function($scope, table) {
  table.success(function(data) {
    $scope.teams = data;
  })
}])

app.factory('table', ['$http', function($http) {
  return $http.get("https://api-football-v1.p.rapidapi.com/v3/leagues?id=39", {
      headers: {
        'X-Auth-Token': "ee72100a50msh3fca84f30c93d32p1f3594jsnb62dd6320bed"
      }
    })
    .success(function(data) {
      return data;
    }).error(function(err) {
      return err;
    })
}]);
var ebayss = angular.module('ebayss',['ui.bootstrap', 'ngMap']);

ebayss.controller('mainController', ['$scope','Datasource','$http',function($scope, Datasource, $http) {
    $scope.submitSearch = function() {
      $('.item').css('visibility','visible');
      Datasource.findItems(function(data) {
        $scope.currentItems = data.findItemsByKeywordsResponse[0].searchResult[0].item;
        $scope.zipcodeList = [];
        $scope.latLongList = [];
        $scope.currentItems.forEach(function(element, idx){
          if (element.postalCode !== undefined) {
            $scope.zipcodeList.push(element.postalCode[0]);
          }
          if ($scope.currentItems.length - 1 === idx) {
            codeAddress(plotPoints)
          }
        })
      
      
        function plotPoints(latLongArray){
          console.log(latLongArray)
          $scope.latLongList = latLongArray;
          var bounds = new google.maps.LatLngBounds();
          $scope.latLongList.forEach(function(l,idx){
            locLatLng = new google.maps.LatLng(l[0],l[1]);
            bounds.extend(locLatLng)
            if ($scope.latLongList.length - 1 === idx)
              $scope.map.fitBounds(bounds)
          })
        }
      
        function codeAddress(cb) {
          var geocoder = new google.maps.Geocoder()
          $scope.zipcodeList.forEach(function(zip){
            geocoder.geocode({'address': zip}, function(results, status){
              if (status == google.maps.GeocoderStatus.OK) {
                $scope.latLongList.push([results[0].geometry.location['k'], results[0].geometry.location['B']]);
                if ($scope.zipcodeList.length === $scope.latLongList.length) {
                  // console.log($scope.latLongList);
                  cb($scope.latLongList);
                }
              } else {
                console.log("Geocode failed " + status)
              }
            })
          })
        }

      }, this.item, $http); 
      

      Datasource.completedItems(function(data){
        $scope.soldItems = data.findCompletedItemsResponse[0].searchResult[0].item;
      }, this.item, $http);

    }

    $scope.runAutoComplete = function(val) {
      url = "http://suggestqueries.google.com/complete/search?callback=JSON_CALLBACK&client=firefox&q=" + val
      return $http.jsonp(url).then(function(response){
        return response.data[1];
      });
    }
}]);



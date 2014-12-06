'use strict';

(function(lodash, google) {

  var _ = lodash;

  if (google === 'undefined') {return;} // google maps is not found

  // Maps controller
  // Used to display google map
  function MyMapsCtrl($scope, singleRunData, getDataById, lastSummaryRes, getActivitySumLatestFiveRes, createGmap) {
    var run = singleRunData;
    var mapData = [];
    $scope.gMap = null;
    var summaries = getActivitySumLatestFiveRes;


    // ----- Create new map ----- //
    // function createGmap(activityData, summaryMarkerItems)
    mapData[0] = createGmap(run[0].features[0].geometry.coordinates, lastSummaryRes[0].markerItems);
    $scope.gMap = mapData[0];

    var recreateGmap = function recreateGmap(event, info) {
      if(typeof mapData[info.listOrder] === 'undefined') {
        getDataById.get(info.activityId).$promise.then(function(newData){
          mapData[info.listOrder] = createGmap(newData[0].features[0].geometry.coordinates, summaries[info.listOrder].markerItems);
          $scope.gMap = mapData[info.listOrder];
        });
      }
      else {
        $scope.gMap = mapData[info.listOrder];
        $scope.$apply();
      }
    };

    // on a broadcasted event from the summary directive
    // we change the map to the selected activity
    $scope.$on('summarySelected', recreateGmap);


  }

  angular.module('runs').controller('MyMapsCtrl', ['$scope', 'singleRunData', 'getDataById', 'lastSummaryRes', 'getActivitySumLatestFiveRes', 'createGmap', MyMapsCtrl]);

}(window._, window.google));
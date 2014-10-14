"use strict";

ebayss.factory('Datasource',
  function(){
    return {
      geoCoder: function() {

      },
      findItems: function(_onSuccess, _input, _http) {
      	var url = "http://svcs.ebay.com/services/search/FindingService/v1?" +
                  "SECURITY-APPNAME=TonyLeun-bb0e-45ef-98f1-4de9d00decbc&" +
                  "OPERATION-NAME=findItemsByKeywords&" +
                  "SERVICE-VERSION=1.0.0&" +
                  "RESPONSE-DATA-FORMAT=JSON&" +
                  "callback=JSON_CALLBACK&" +
                  "REST-PAYLOAD&" +
                  "paginationInput.entriesPerPage=10&" +
                  "keywords=" + _input;
  		  var response = _http.jsonp(url);
        response.success(function(data){
          _onSuccess(data);
        });
      },
      completedItems: function(_onSuccess, _input, _http) {
        var url = "http://svcs.ebay.com/services/search/FindingService/v1?" +
                  "OPERATION-NAME=findCompletedItems&" +
                  "SERVICE-VERSION=1.7.0&" +
                  "SECURITY-APPNAME=TonyLeun-bb0e-45ef-98f1-4de9d00decbc&" +
                  "RESPONSE-DATA-FORMAT=JSON&" +
                  "REST-PAYLOAD&" +
                  "keywords=" + _input + "&" +
                  "itemFilter(0).name=SoldItemsOnly&" +
                  "itemFilter(0).value=true&" +
                  // "sortOrder=StartTimeNewest&" +
                  "sortOrder=BestMatch&" +
                  "paginationInput.entriesPerPage=10&" +
                  "callback=JSON_CALLBACK";
        var response = _http.jsonp(url);
        response.success(function(data){
          _onSuccess(data)
        });
      }
    }
  }
)


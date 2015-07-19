ngdashbaord.service('SharedDateScopes', function($rootScope, $http, $q) {
	var data_json = [];
	return {
		getWidgetNumeric: function (dateRanges) {
			var dataRange = 2;
			if(typeof dateRanges !=="undefined") {
				var dataRange = dateRanges;
			}
			var defer = $q.defer();
			$http.get('json/numeric.json').success(function (datas) {
				defer.resolve(datas);
			 });
			return defer.promise;
		},
		getWidgetMixed: function(dateRanges,stages) {
			var dataRange = 2;
			if(typeof dateRanges !=="undefined") {
				var dataRange = dateRanges;
			}
			var defer = $q.defer();
			$http.get('json/mix.json').success(function (datas) {
				defer.resolve(datas);
			});
			var nanobar = new Nanobar( options );
			nanobar.go(10); // size bar 10%
			nanobar.go(100);
			return defer.promise;
		}
	};
});
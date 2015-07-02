var root = angular.module("Symanto.Http");
root.service("HttpService", function ($http, $q, LoadingIndicatorService, MessageService) {

    var runningRequests = 0;

    // Count the number of running sources
    // Start the loading indicator only at the first one
    var started = function() {
        if (runningRequests == 0)
            LoadingIndicatorService.showLoadingIndicator();

        runningRequests++;
    };

    // When a source is finished, it should be removed from the running sources
    // Hide the loading indicator, if it was the last one.
    var finished = function() {
        runningRequests--;

        if (runningRequests == 0)
            LoadingIndicatorService.hideLoadingIndicator();
    };

    var showErrorMessage = function (errorMessage) {
        console.log("An HTTP error occurred: '" + errorMessage + "'");
        //MessageService.error("<strong>" + errorMessage + "</strong><br><small style='padding-left: 18px'>Please try again or ask your system administrator for help.</small>");
    };

    // GET
    var get = function(path, error, errorMessage) {

        started();
        var deferred = $q.defer();

        $http.get(path).then(
            function(success) {
                deferred.resolve(success.data);
                finished();
            },
            function (error) {
                showErrorMessage(errorMessage);
                deferred.reject({ error: -1 });
                finished();
            }
        );

        return deferred.promise;
    };

    // POST
    var post = function(path, body, error, errorMessage) {

        started();
        var deferred = $q.defer();

        $http.post(path, body).then(
            function(success) {
                deferred.resolve(success.data);
                finished();
            },
            function (error) {
                showErrorMessage(errorMessage);
                deferred.reject({ error: -1 });
                finished();
            }
        );

        return deferred.promise;
    };

    // PUT
    var put = function(path, body, error, errorMessage) {

        started();
        var deferred = $q.defer();

        $http.put(path, body).then(
            function(success) {
                deferred.resolve(success.data);
                finished();
            },
            function (error) {
                showErrorMessage(errorMessage);
                deferred.reject({ error: -1 });
                finished();
            }
        );

        return deferred.promise;
    };

    // DELETE
    var del = function(path, error, errorMessage) {

        started();
        var deferred = $q.defer();

        $http.delete(path).then(
            function(success) {
                deferred.resolve(success.data);
                finished();
            },
            function (error) {
                showErrorMessage(errorMessage);
                deferred.reject({ error: -1 });
                finished();
            }
        );

        return deferred.promise;
    };

    return {
        "get": get,
        "post": post,
        "put": put,
        "delete": del
    }
});
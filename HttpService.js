angular.module("Symanto.Http", ["ui.router"]);

var http = angular.module("Symanto.Http");

http.value('httpServiceOptions', {
    loadingIndicatorService: undefined,
    messageService: undefined
});

http.service("HttpService", function ($http, $q, httpServiceOptions) {

    var cache = [];

    var started = function() {
        if (httpServiceOptions.loadingIndicatorService != undefined) {
            httpServiceOptions.loadingIndicatorService.startOperation();
        }
    };

    var finished = function() {
        if (httpServiceOptions.loadingIndicatorService != undefined) {
            httpServiceOptions.loadingIndicatorService.finishOperation();
        }
    };

    var showErrorMessage = function (errorMessage) {
        console.log("An HTTP error occurred: '" + errorMessage + "'");
        if (httpServiceOptions.messageService != undefined) {
            httpServiceOptions.messageService.error("<strong>" + errorMessage + "</strong><br><small style='padding-left: 18px'>Please try again or ask your system administrator for help.</small>");
        }
    };

    // GET
    var get = function(path, error, errorMessage, shouldCache) {

        started();
        var deferred = $q.defer();
        var cacheExists = false;

        // Check if cache exists
        if (shouldCache) {
            for (var i = 0; i < cache.length; i++) {
                if (cache[i].path == path) {
                    // Cache found
                    deferred.resolve(cache[i].result.data);
                    finished();
                    cacheExists = true;
                }
            }
        }

        if (!cacheExists) {
            // Cache does not exit.
            $http.get(path).then(
                function (success) {

                    // Cache it
                    if (shouldCache) {
                        cache.push({
                            path: path,
                            result: success
                        });
                    }

                    deferred.resolve(success.data);
                    finished();
                },
                function (error) {
                    showErrorMessage(errorMessage);
                    deferred.reject({error: -1});
                    finished();
                }
            );
        }

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
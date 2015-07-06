# Symanto Angular Http Service
## Installation
###Bower
The easiest way to install the HttpService is by including the bower package to your solution
```
bower install symanto-angular-httpservice --save
```

## Configuration
The HttpService comes fully configured and runnable out of the box. Beside that it beautifully integrates with other Symanto Angular modules like the [LoadingIndicatorService][1] and the [MessageService][2]

To add these services load them into your project and inject them into your root module. Here you can configure the HttpService by setting the parameters inside the run method.
```
angular.module("Application.Root", [
    "Symanto.HttpService",
    "Symanto.LoadingIndicatorService",
    "Symanto.MessageService"
]).run(function(httpServiceOptions, LoadingIndicatorService, MessageService) {

	// Add the Symanto Loading Indicator Service to the Http Service
    httpServiceOptions.loadingIndicatorService = LoadingIndicatorService;

	// Add the Symanto Message Service to the Http Serive
    httpServiceOptions.messageService = MessageService;
});
```

## Usage
To use the HttpService in antother service or controller, you have to inject it. Afterwards you can call the common HTTP methods like GET, POST, UPDATE and DELETE from it. These methods always return a promise that will be resolved as soon as the HTTP requests finished. That means, that you can set the result of the HttpService method to a variable that will automatically changes its value as soon as the asynchronus HTTP request has finished its work.

```
angular.module("Test").controller("TestController", function (HttpService) {
    HttpService.get(
        "https://test/api/testcall", // Request Url
        "getTestError",              // Name of the error
        "Failed to load test data!", // Error message
        false                        // Caching
    ).then(
        function(success) {
            console.log("Everything went fine!");
        },
        function (error) {
            console.log("An error occurred!");
        }
    );
});
```

  [1]: https://github.com/Symanto/Angular-LoadingIndicatorService
  [2]: http://www.google.de

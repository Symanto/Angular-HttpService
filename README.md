# Symanto Angular Http Service
## Installation
###Bower
The easiest way to install the HttpService is by including the bower package to your solution
```shell
bower install symanto-angular-httpservice --save
```

## Configuration
The HttpService comes fully configured and runnable out of the box. Beside that it beautifully integrates with other Symanto Angular modules like the [LoadingIndicatorService][1] and the [MessageService][2]

To add these services load them into your project and inject them into your root module. Here you can configure the HttpService by setting the parameters inside the run method.
```javascript
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
#### In a controller or service
To use the HttpService in antother service or controller, you have to inject it. Afterwards you can call the common HTTP methods like GET, POST, UPDATE and DELETE from it. These methods always return a promise that will be resolved as soon as the HTTP requests finished. That means, that you can set the result of the HttpService method to a variable that will automatically changes its value as soon as the asynchronus HTTP request has finished its work.

```javascript
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

### In a state
You can also use the HttpService to resolve variables inside of states. The corresponding controller will be loaded as soon as the HTTP request has finished and can inject the result.
```javascript
$stateProvider.state('teststate', {
    url: "/test",
    controller: "TestController"
    resolve: {
        test: function(HttpService) {
            return HttpService.get("https://test/api", "errorname", "errormessage", false);
        }
    }
})
```


## Methods
### Get
#### Example
```javascript
HttpService.get("path", "errorName", "errorMessage", cache);
```
#### Parameters
| Parameter    | Type    | Description                                                |
|--------------|---------|------------------------------------------------------------|
| path         | string  | url to the resource you want to get                        |
| error        | string  | name of the error that could happen                        |
| errorMessage | string  | error message that should be displayed in case of an error |
| shouldCache  | boolean | indicator whether the result should be cached              |

### Put / Post
#### Examples
```javascript
HttpService.put("path", object, "errorName", "errorMessage");
HttpService.post("path", object, "errorName", "errorMessage");
```
#### Parameters
| Parameter    | Type   | Description                                                |
|--------------|--------|------------------------------------------------------------|
| path         | string | url to the resource you want to get                        |
| body         | object | object that you want to send to the api                    |
| error        | string | name of the error that could happen                        |
| errorMessage | string | error message that should be displayed in case of an error |

### Delete
#### Example
```javascript
HttpService.delete("path", "errorName", "errorMessage");
```
#### Parameters
| Parameter    | Type   | Description                                                |
|--------------|--------|------------------------------------------------------------|
| path         | string | url to the resource you want to get                        |
| error        | string | name of the error that could happen                        |
| errorMessage | string | error message that should be displayed in case of an error |


  [1]: https://github.com/Symanto/Angular-LoadingIndicatorService
  [2]: http://www.google.de

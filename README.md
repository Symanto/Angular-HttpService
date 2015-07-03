# Angular-HttpService
## Installation
To be added...

## Configuration
The HttpService comes fully configured and runnable out of the box. Beside that it beautifully integrates with other Symanto modules like the [Angular LoadingIndicatorService][1] and the [Angular MessageService][2]

To add these services load them into your projec and inject them into your root module. Here you can configure the HttpService by setting the parameters inside the run method.
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

  [1]: http://www.google.de
  [2]: http://www.google.de

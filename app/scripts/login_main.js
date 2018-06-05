(function(window) {
  "use strict";
  var LOG_IN_FORM_SELECTOR = "[data-log-in=\"form\"]";
  // change to server URL
  var SERVER_URL = "http://localhost:2403/users";
  var App = window.App;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var remoteDS = new RemoteDataStore(SERVER_URL);

  var logInFormHandler = new FormHandler(LOG_IN_FORM_SELECTOR);

  logInFormHandler.addSubmitHandler(function(data) {
    remoteDS.login(data, function(){});
  });
})(window);

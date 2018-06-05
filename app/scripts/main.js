(function(window) {
  "use strict";
  var SIGN_UP_FORM_SELECTOR = "[data-sign-up=\"form\"]";
  var LOG_IN_FORM_SELECTOR = "[data-log-in=\"form\"]";
  var SERVER_URL = "http://localhost:2403/user-accounts";
  var App = window.App;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var remoteDS = new RemoteDataStore(SERVER_URL);

  var signUpFormHandler = new FormHandler(SIGN_UP_FORM_SELECTOR);
  var logInFormHandler = new FormHandler(LOG_IN_FORM_SELECTOR);

  signUpFormHandler.addSubmitHandler(function(data) {
    remoteDS.add(data);
  });

  logInFormHandler.addSubmitHandler(function(data) {
    remoteDS.get();
  });

  signUpFormHandler.addInputHandler(remoteDS);
})(window);

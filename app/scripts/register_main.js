(function(window) {
"use strict";
var REGISTER_FORM_SELECTOR = "[data-register=\"form\"]";

var App = window.App || {};
var RemoteDataStore = App.RemoteDataStore;
var FormHandler = App.FormHandler;
var remoteDS = new RemoteDataStore("http://localhost:2403/user-accounts");

var registerFormHandler = new FormHandler(REGISTER_FORM_SELECTOR);

registerFormHandler.addSubmitHandler(function(data) {
  remoteDS.addUser(data, function(d) {
    console.log("after add user", d);
    window.location = "/profile/" + d.userName;
  });
});

registerFormHandler.addInputHandler("email", function(data) {
  console.log("InputHandler:", data);
  var value = data.value;
  var message = "";
  var updateErrMsg = function () {
    console.log(message);
    $("#emailErr").text(message);
    // data.setCustomValidity(message);
  };
  console.log("val", value);
  var isValid = validateEmail(value);

  if (isValid) {
    remoteDS.userExists({username: value}, function (exists, res,) {
      if (exists) {
        message = "That email is taken! Please pick another one.";
      } else {
        message = "";
      }
      updateErrMsg();
    });
  } else {
    message = value.length == 0 ?
      "Email is required!" :
      value + " is not a valid email. (e.g. email@example.com)"
      updateErrMsg();
  }
});

registerFormHandler.addInputHandler("userName", function(data) {
  console.log("InputHandler:", data);
  var value = data.value;
  var message = "";
  var updateErrMsg = function () {
    console.log(message);
    $("#userNameErr").text(message);
    // data.setCustomValidity(message);
  };
  console.log("val", value);
  var isValid = validateUserName(value);

  if (isValid) {
    remoteDS.userExists({displayname: value}, function (exists, res,) {
      if (exists) {
        message = "That username is taken! Please pick another one.";
      } else {
        message = "";
      }
      updateErrMsg();
    });
  } else {
    message = value.length == 0 ?
      "Username is required!" :
      value + " is not a valid username. (Use one letters, underscores and numbers)"
      updateErrMsg();
  }
});

})(window);

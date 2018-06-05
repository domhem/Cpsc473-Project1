(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function(fn, redirect) {
    console.log("Setting submit handler for form");
    this.$formElement.on("submit", function(event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item) {
        data[item.name] = item.value;
        console.log(item.name + " is " + item.value);
      });
      console.log(data);
      fn(data);

      if(redirect) {
        window.location = redirect;
      } else {
        this.reset();
        this.elements[0].focus();
      }
    });
  };

  FormHandler.prototype.addInputHandler = function(attr, fn) {
    console.log("Setting input handler for " + attr);
    this.$formElement.on("blur", "[name=\"" + attr + "\"]", function(event) {
      // console.log("IH", event.target);
      fn(event.target);

      // var val = event.target.value;
      // var message = "";
      // if (fn(val)) {
      //   console.log("passed");
      //   event.target.setCustomValidity("");
      // } else {
      //   console.log("failed");
      //
      //   message = val ? val + " is not a valid " + name + "! " + hint : name + " is required!";
      //   $("#" + attr + "Err").text(message);
      //   event.target.setCustomValidity(message);
      // }
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;

})(window);

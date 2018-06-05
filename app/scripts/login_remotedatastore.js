(function (window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;
  // change to server URL
  var LOGIN_URL = "http://localhost:2403/users/login";

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.query = function (d, cb) {
    $.ajax(this.serverUrl, {
      type: "GET",
      data: d
    }).done(function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.login = function (d, cb) {
    $.ajax(LOGIN_URL, {
      type: "Post",
      data: d
    }).done(function(serverResponse) {
      console.log(serverResponse);
      var a = {
        id: serverResponse.uid
      };
      console.log(a);

      // $.ajax({
      //   type: "GET",
      //   url: "http://localhost:2403/users/me",
      //   xhrFields: {
      //     withCredentials: true
      //   },
      //   crossDomain: true,
      //   headers: {
      //     Cookies: a
      //   }
      // }).done(function(res) {
      //   console.log("response", res);
      // });



      $.ajax("http://localhost:2403/users", {
        type: "GET",
        data: a
      }).done(function(serverResponse) {
        console.log("get me", serverResponse);
        window.location = "/profile/" + serverResponse.displayname;
        cb(serverResponse);
      });


      cb(serverResponse);
    });
};

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;

})(window);

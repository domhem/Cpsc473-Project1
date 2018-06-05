(function(window) {
  "use strict";
  var PROFILE_FORM_SELECTOR = "[data-profile=\"form\"]";
  var SM_FORM_SELECTOR = "[data-social-media=\"form\"]";

  var App = window.App || {};
  var Profile = App.Profile;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var remoteDS = new RemoteDataStore("http://localhost:2403/user-accounts");


  var user = window.location.href.match(/\/profile\/([^#]+).*/);
  console.log("User name from URL:", user);
  var uid;

  remoteDS.query({userName:user[1]}, function (data) {
    uid = data[0].id;

    var myProfile = new Profile(remoteDS, uid);
    window.myProfile = myProfile;
    var profileHandler = new FormHandler(PROFILE_FORM_SELECTOR);
    var smHandler = new FormHandler(SM_FORM_SELECTOR);

    profileHandler.addSubmitHandler(function (data) {
      myProfile.editProfile.call(myProfile, data);
      closeEditMenu();
      closeOptionMenu();
    });

    smHandler.addSubmitHandler(function (data) {
      myProfile.editSM.call(myProfile, data);
    });

    $("[data-profile-pic=\"btn\"]").on("click", function(event){
      console.log("Pic button clicked");
      // console.log(event);
      // console.log("edit file", editFile());
      myProfile.editFile();
    });

    // TODO change to toggle if auth
    $(".logo").on("click", function (event) {
      $("#noAuthNav").toggle();
      $("#authNav").toggle();
    })

    getUserData();
    setMenu(); //TODO remove

  });

  function getUserData() {
    console.log(uid);
    remoteDS.get(uid, function (data) {

      myProfile.editProfile.call(myProfile, data);
      myProfile.editSM.call(myProfile, data.socialNetworks);
      myProfile.setPic(data.profileImgUrl);
      console.log("getUserData returned:", data);
    });
  }

  // TODO remove
  function setMenu() {
    if (true) {
      $("#noAuthNav").hide();
    }
  }

})(window);

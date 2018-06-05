//function replaces the preview image in the menu sidebar with the uploaded image
function previewFile() {
  //get the preview image location by ID
  var preview = document.getElementById("preview");
  var file = document.querySelector("input[type=file]").files[0];
  console.log(file);
  var reader = new FileReader();
  //if image was uploaded, replace the preview image with the uploaded image
  reader.onloadend = function() {
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file); //reads the data as a URL
  } else {
    preview.src = "images/upload_empty.png";
  }
}
previewFile(); //calls the function named previewFile()

//function replaces the current profile image with the new uploaded image
function editFile() {
  var preview = document.getElementById("preview");
  var profilePic = document.getElementById("profilePic");
  //the profile image will not change if no image was uploaded
  //the url below is the address of the default preview image
  if (preview.src != "http://localhost:3000/images/upload_empty.png") {
    //console.log(preview.src);
    profilePic.src = preview.src;
    // console.log("jquery", $("#preview").attr("src"));
    // console.log("source", profilePic.src);
    return profilePic.src;
  } else {
    return null;
  }
}

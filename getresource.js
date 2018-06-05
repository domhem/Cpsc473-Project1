var path = require("path");
var fs = require("fs");
var mime = require("mime");

var DIR = __dirname;
var SCRIPT = "app/scripts";
var STYLE = "app/stylesheets";
var HTML = "app";
var IMG = "app/images";

pages = {
  "/" : "index.html",
  "/login" : "login.html",
  "/logout" : "logout.html",
  "/profile": "profile.html",
  "/register" : "register.html",
  "/tos" : "terms.html",
  "404" : "404.html"
};

var getPage = function(url) {
  console.log(url);
  var rgx = /^\/(([^/]+)(\/(.+))?)?$/; // /^\/$|^(\/(.+)(\/(.*))?)/; ///^\/(.+)\/(.*)$/;
  var vars = url.split("/");
  console.log(vars);
  var found = url.match(rgx);
  console.log(found);

  // var page = found[2];
  // var subpage = found[4];

  var page = vars[1];
  var subpage = vars[2];


  var fileName;
  var fileDir;
  var data = {};

  switch (page) {
    case "":
      console.log("Serving homepage");
      fileName = pages["/"];
      fileDir = HTML;
      break;

    case "stylesheets":
      fileName = subpage;
      fileDir = STYLE;
      console.log("Serving a style: " + fileName);
      break;

    case "scripts":
      fileName = subpage;
      fileDir = SCRIPT;
      console.log("Serving a script: " + fileName);
      break;

    case "images":
      fileName = subpage;
      fileDir = IMG;
      console.log("serving an image: " + fileName);
      break;

    case "profile":
      switch (subpage) {
        case "stylesheets":
          fileName = vars[3];
          fileDir = STYLE;
          break;
        case "scripts":
          fileName = vars[3];
          fileDir = SCRIPT;
          break;
        case "images":
          fileName = vars[3];
          fileDir = IMG;
          break;
        default:
          fileName = pages["/" + found[2]];
          fileDir = HTML;

      }
      // console.log("subpage", subpage);
      // fileName = pages["/" + found[2]];
      // fileDir = HTML;
      // // getProfileData();
      // console.log("serving profile page: " + fileName);
      break;

    default:
      fileName = pages[url];
      fileDir = HTML;

      if(!fileName) {
        console.log("Serving 404 page");
        fileName = pages["404"];
      }
      console.log("Serving a page");

  }
  var filePath = path.resolve(DIR, fileDir, fileName);
  var fileData = getFile(filePath);

  data.type = mime.getType(fileName);
  data.html = fileData;

  return data;
}


var getHTMLfor = function(url) {
  getPage(url);
  // return;
  console.log("looking for html for " + url);
  var isScriptUrl = url.match(/^\/scripts\/(.*)$/);
  var isStyleURL = url.match(/^\/stylesheets\/(.*)$/);
  var isImgUrl = url.match(/^\/img\/(.*)$/);

  var fileName;
  var filePath;
  var fileType;

  var data = {};

  if(isScriptUrl) {
    // console.log(isScriptUrl);
    fileName = isScriptUrl[1];
    fileType = "text/javascript";
    filePath = path.resolve(__dirname, "scripts", fileName);
  } else if (isStyleURL) {
    // console.log(isStyleURL);
    fileName = isStyleURL[1];
    fileType = "text/css";
    filePath = path.resolve(__dirname, "app/stylesheets", fileName);
  } else if (isImgUrl) {
    fileName = isImgUrl[1];
    fileType = "image/png";
    filePath = path.resolve(__dirname, "img", fileName);
  } else {
    fileName = pages[url];


    if(fileName) {
      // console.log("found it! " + fileName);
      fileType = "text/html";
      filePath = path.resolve(__dirname, "app", fileName);
    } else {
      fileType = "text/html";
      filePath = path.resolve(__dirname, "app", pages["404"]);
    }
  }

  // console.log("file path " + filePath);

  var html = getFile(filePath);
  // console.log("@Getfile html: " + html);
  data.type = fileType;
  data.html = html;
  // console.log(data);
  return data;
};

var getFile = function(filePath) {
  var data;
  try {
    data = fs.readFileSync(filePath);
    // console.log("data" + data);
    return data;
  } catch (err) {
    console.log("Error reading file, sending 404");
    console.log(err);
    return "<h1>404 - Page Not Found (Error GF)<h1>";
  }

};

module.exports = getPage;

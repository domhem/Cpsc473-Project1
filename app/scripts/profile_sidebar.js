function openOptionMenu() {
  document.getElementById("main").style.marginRight = "30%";
  document.getElementById("optionMenu").style.width = "30%";
  document.getElementById("optionMenu").style.display = "block";
  document.getElementById("nav").style.display = "none";
}

function closeOptionMenu() {
  document.getElementById("main").style.marginRight = "0%";
  document.getElementById("optionMenu").style.display = "none";
  document.getElementById("nav").style.display = "inline-block";
}

function openNoAuthMenu() {
  document.getElementById("main").style.marginRight = "30%";
  document.getElementById("noAuthMenu").style.width = "30%";
  document.getElementById("noAuthMenu").style.display = "block";
  document.getElementById("nav2").style.display = "none";
}

function closeNoAuthMenu() {
  document.getElementById("main").style.marginRight = "0%";
  document.getElementById("noAuthMenu").style.display = "none";
  document.getElementById("nav2").style.display = "inline-block";
}

//welcome page sidebars
function openWelcomeMenu() {
  document.getElementById("main").style.marginRight = "";
  document.getElementById("welcomeMenu").style.width = "30%";
  document.getElementById("welcomeMenu").style.display = "block";
  document.getElementById("nav").style.display = "none";
}
function closeWelcomeMenu() {
  document.getElementById("main").style.marginRight = "0%";
  document.getElementById("welcomeMenu").style.display = "none";
  document.getElementById("nav").style.display = "inline-block";
}


function openEditMenu() {
  document.getElementById("main").style.marginRight = "30%";
  document.getElementById("editMenu").style.width = "30%";
  document.getElementById("editMenu").style.display = "block";
  document.getElementById("nav").style.display = "none";
}

function closeEditMenu() {
  document.getElementById("editMenu").style.display = "none";
}

function openSMMenu() {
  document.getElementById("main").style.marginRight = "30%";
  document.getElementById("smMenu").style.width = "30%";
  document.getElementById("smMenu").style.display = "block";
  document.getElementById("nav").style.display = "none";
}

function closeSMMenu() {
  document.getElementById("smMenu").style.display = "none";
}

function openPicMenu() {
  document.getElementById("main").style.marginRight = "30%";
  document.getElementById("picMenu").style.width = "30%";
  document.getElementById("picMenu").style.display = "block";
  document.getElementById("nav").style.display = "none";
}

function closePicMenu() {
  document.getElementById("picMenu").style.display = "none";
}

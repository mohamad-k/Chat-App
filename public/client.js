var socket = io.connect("https://stormy-tor-56618.herokuapp.com/");


var clock;

var message = document.getElementById("message");
userName = document.getElementById("userName");
btn = document.getElementById("send");
output = document.getElementById("output");
typing = document.getElementById("typing");
form.addEventListener("submit", e => {
  var time = new Date();
  var h = time.getHours();
  var m = time.getMinutes();

  clock = h + ":" + m;
  e.preventDefault();
  socket.emit("chat", { name: userName.value, message: message.value });
  function emptyMessage() {
    message.value = "";
  }
  userName.style.visibility = "hidden";
  emptyMessage();
  let wrong = document.getElementById("wrong");
});
socket.on("chat", data => {
  typing.innerHTML = "";

  output.innerHTML +=
    "<div><p><b>" +
    data.name +
    "</b> : " +
    data.message +
    "   </p><p><sub style='color:grey'>" +
    clock +
    "</sub></p></div>";
});
message.addEventListener("keydown", data => {
  socket.emit("typing", userName.value);
});
socket.on("typing", data => {
  typing.innerHTML = "<p>" + data + " typing...";
});
socket.on("userCount", data => {
  online.innerHTML = "<h4>" + data.users + " user/s Online</h4>";
});

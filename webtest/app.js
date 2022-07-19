// ทำการเชื่อม Websocket Server ตาม url ที่กำหนด
var connection = new WebSocket('ws://192.168.103.28:4000');
var defaultUsername = "Anonymous #" + Math.floor((Math.random() * 999) + 1).toString();
var username = "";

connection.onopen = function () {
  // จะทำงานเมื่อเชื่อมต่อสำเร็จ
  console.log("WebSocket Connected");
  var input = document.getElementById("myText");
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter" && input.value != "") {
      username = document.getElementById("username").value;
      // Prevent empty name
      if (!username || username == "" ) {
        username = defaultUsername;
        username.innerHTML = defaultUsername;
      }
      let txtData = JSON.stringify({
        username: username,
        txt: input.value
      });
      // Send message to server
      connection.send(txtData);
      // Clear text
      input.value = "";
    }
  });
};

connection.onerror = function (error) {
  console.error('WebSocket Error ' + error);
  alert(error);
  window.location.reload();
};

connection.onmessage = function (e) {
  let msgData = JSON.parse(e.data);
  if (msgData.username == username) {
    // Message owner
    AddMessage(true, msgData);
    return;
  }
  // Other message
  AddMessage(false, msgData);
  return;
};

function AddMessage(pFlag, msg) {
  let css = "lf";
  if (pFlag) {
    // Sending message
    css = "rg";
  }
  // Username
  let h6 = document.createElement("h6");
  let h6Msg = document.createTextNode(msg.username);
  h6.className = css;
  h6.appendChild(h6Msg);
  document.getElementById("chatDiv").appendChild(h6);
  // Message
  let h5 = document.createElement("h5");
  let h5Msg = document.createTextNode(msg.txt);
  h5.className = css;
  h5.appendChild(h5Msg);
  document.getElementById("chatDiv").appendChild(h5);
  h5.scrollIntoView();
}
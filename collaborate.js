

const addBtn = document.getElementById("addCollabBtn");
const collabInput = document.getElementById("collabInput");
const collabList = document.getElementById("collabList");

addBtn.addEventListener("click", function(){

let name = collabInput.value.trim();

if(name === ""){
alert("Enter collaborator name");
return;
}

let li = document.createElement("li");
li.textContent = name;

let removeBtn = document.createElement("button");
removeBtn.textContent = "Remove";
removeBtn.className = "removeBtn";

removeBtn.onclick = function(){
li.remove();
};

li.appendChild(removeBtn);
collabList.appendChild(li);

collabInput.value = "";

});




const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatBox = document.getElementById("chatBox");

sendBtn.addEventListener("click", function(){

let message = messageInput.value.trim();

if(message === ""){
alert("Type a message");
return;
}

let msg = document.createElement("div");
msg.className = "message";
msg.textContent = "User: " + message;

chatBox.appendChild(msg);

chatBox.scrollTop = chatBox.scrollHeight;

messageInput.value = "";

});
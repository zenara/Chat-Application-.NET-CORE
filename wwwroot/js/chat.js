"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var d = new Date();
    var encodedMsg = user + " : " + msg + "  ------   " + d;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    var dbtn = document.createElement("button");
    dbtn.id="delete";
    var t = document.createTextNode("Delete");
    dbtn.appendChild(t);
    document.getElementById("messagesList").appendChild(li);
    li.appendChild(dbtn);

});




connection.start().catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});



//$(document).on("click",".delete", function() {
    //var confirmation = confirm('Are you sure you want to delete this action plan/s?');
    //if (confirmation == true) {
  //    $(this).closest("#messegesList").remove();
   // }
 // });
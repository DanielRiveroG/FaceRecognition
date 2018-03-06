const database = require('./database');

var msgLeft = document.getElementById("msgLeft");

function putMessage(sender, message, senderimg, res){
  database.getMessages({to : res}).then(data =>{
    if(data.length != 0){
        var i = 0;
        auxiliar(sender, message, senderimg, data, i);
    }else{
      sender.innerHTML = "You have no messages";
      message.innerHTML = "";
      senderimg.classList.add('hide');
      msgLeft.innerHTML = "";
    }
  });
}

function auxiliar(sender, message, senderimg, data, i) {
  var element = data[i];
  sender.innerHTML = "Message from: " + element.from;
  message.innerHTML = element.message;
  senderimg.src = "recognition/known_people/" + element.from + ".jpg";
  senderimg.classList.remove('hide');
  msgLeft.classList.remove('hide');
  msgLeft.innerHTML = (i+1) + " of " + data.length;
  database.deleteMessage(element._id);
  setTimeout(function () {
    if (++i < data.length) {
      auxiliar(sender, message, senderimg, data, i);
    }
  }, 4000);
}

module.exports.putMessage = putMessage;

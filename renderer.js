const zerorpc = require("zerorpc");
const database = require('./database');
const messages = require('./messages')
let client = new zerorpc.Client({
  timeout: 360,
  heartbeatInterval: 360000
});
var gap = 10000;
var timervar;
let circle = document.getElementById('container-ios9');
let image = document.getElementById('image');
let info = document.getElementById('info');
let carousel = document.getElementById('msgpanel');
let msgLeft = document.getElementById('msgLeft');
//image.classList.remove('hide');
let found = false;
let connectionError = false;

//database.getUser({name: "Lars", surname: "Bornecke"}).then(res => {console.log(res)});

/*+++++++++++++++++++++++++++++++++++*/
const connect = () => {
  client.connect("tcp://127.0.0.1:4243")

  client.invoke("echo", "server ready", (error, res) => {
    if(error || res !== 'server ready') {
      console.error(error)
    } else {
      console.log("server is ready")
    }
  })
  let greeting = document.getElementById('greeting');
  let previousUser = "NoOne";

  console.log(image);
  circle.addEventListener('click', () => {
    client.invoke("find", (error, res) => {
      if(error) {
        console.error(error);
        connectionError = true;
      } else {
        res = res + '';
        let split = res.split(" ");
        if(previousUser===(split[0]+" "+split[1])){
          console.log("same user");
          found = true;
        } else {
          previousUser = (split[0]+" "+split[1]);
          if(res==="NoOne"){
            console.log("No hay nadie");
            greeting.textContent = "Welcome to SmartVilla";
            image.classList.add('hide');
            circle.classList.remove('hide');
            info.classList.add('hide');
            carousel.classList.add('hide');
            msgLeft.classList.add('hide');
            found = true;
            clearInterval(timervar);
            timer(250);
          } else if(res==="Unknown"){
            greeting.textContent = "Sorry, I can't recognize you";
            image.classList.add('hide');
            circle.classList.remove('hide');
            info.classList.add('hide');
            carousel.classList.add('hide');
            msgLeft.classList.add('hide');
            found = true;
            clearInterval(timervar);
            timer(5000);
          }else {

            console.log(res);
            let split = res.split(" ");
            database.getUser({name: split[0], surname: split[1]}).then(data => {
              (data.last_visit == 0)? greeting.textContent = "Welcome to you first visit to Smart Villa, " + res : greeting.textContent = "Welcome again, " + split[0]+" "+split[1];
              database.updateUser({name: data.name, surname: data.surname}, { $set: {last_visit: (new Date()).getTime()}});
              image.src="/home/daniel/Dropbox/Aplicaciones/SmartVilla/"+split[0]+" "+split[1]+".jpg";
              circle.classList.add('hide');
              info.classList.remove('hide');
              image.classList.remove('hide');
              carousel.classList.remove('hide');
              found = true;
              messages.putMessage(res);
              clearInterval(timervar);
              timer(10000);
            });
          }
        }

      }
    })
  })
}
timer(1000);
const checkPerson = () => {
  circle.dispatchEvent(new Event('click'));
  console.log('button pressed');
}

circle.dispatchEvent(new Event('click'));

function timer(gap){
  timervar = setInterval( () => {
    //console.log("interval");
    connectionError? (found=true) : null;
    found? checkPerson() : null;
    found = false;
  }, gap);
}

checkPerson();
found = true;
connect();

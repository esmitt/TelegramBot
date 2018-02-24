var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const axios = require('axios')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

//This is the route the API will call
app.post('/new-message', function(req, res) {
  const {message} = req.body
  //Each message contains "text" and a "chat" object, which has an "id" which is the chat id
  if (!message)
    return res.end();

  var strMsg = message.text.toLowerCase().trim();  // remove spaces at begin and end, also lowercase
  
  if (strMsg.indexOf('hola') >= 0 || strMsg.indexOf('hello') >= 0)
  {
    // Respond by hitting the telegram bot API and responding to the approprite chat_id
    // "https://api.telegram.org/bot<your_api_token>/sendMessage"
  axios.post('https://api.telegram.org/bot541274016:AAE_0V1biPLCuf-jBDTY9Br7B3Xc81bOo1g/sendMessage', {
    chat_id: message.chat.id,
    text: strMsg + ' back my friend :-)'
  })
    .then(response => {
      // We get here if the message was successfully posted
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...and here if it was not
      console.log('Error :', err)
      res.end('Error :' + err)
    })
  }

});

// Finally, start our server
app.listen(6666, function() {
  console.log('Telegram app working well! (6666)!');
});
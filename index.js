var express = require('express');
var path = require('path');

var mailjet = require('node-mailjet')
    .connect('', '')

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.post('/feedback', function(req, res) {

    var request = mailjet
        .post("send")
        .request({
            "FromEmail": "cepblubojlk@gmail.com",
            "FromName": "Mr.Smith",
            "Subject": "Your email flight plan!",
            "Text-part": `привет ${req.body.email}`,

            "Recipients": [{
                "Email": "igorpi87@yandex.ru"
            }, {
                "Email": "ser.alexeev@gmail.com"
            }]
        });

    request.then(function(response, body) {
        res.send(`письмо успешно отправлено ${response} ${body}`);
    }).catch(function(err, response) {
        res.send(`Ошибка ${err}`);

    });
})

app.listen(3000);
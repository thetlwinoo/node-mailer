let express = require("express"),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

let app = express();

app.use(express.static('src'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/sendemail', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            // should be replaced with real sender's account
            user: 'app.shawservices@gmail.com',
            pass: 'Fuc94L!f'
        }
    });
    console.log('req body',req.body)
    let mailOptions = {
        // should be replaced with real recipient's account
        to: req.body.toAddress,
        subject: req.body.subject,
        text: req.body.message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    // res.writeHead(301, { Location: 'index.html' });
    res.end();
});

let server = app.listen(4000, function () {
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});
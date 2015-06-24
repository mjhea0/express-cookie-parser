/*
  CookieParser parses request cookies, signed or unsigned
  http://expressjs.com/api.html#cookieParser
  http://expressjs.com/api.html#res.cookie
  http://expressjs.com/api.html#req.cookies
*/

var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get('/', function(req, res){
  if (req.cookies.remember) {
    res.send('<br>Cookie is set! We remember you, <strong>' + req.cookies.remember +
      '</strong>. Want us to <a href="/forget">forget</a>?');
  } else {
    res.send('<br><form method="post">' +
      '<input type="text" name="firstName" placeholder="Enter your first name" required><br>' +
      '<input type="submit" value="Submit">' +
      '</form>');
  }
});

app.post('/', function(req, res){
  var oneMinute = 60 * 1000;
  if (req.body.firstName) {
    // res.cookie(key, value, options)
    res.cookie('remember', req.body.firstName, { maxAge: oneMinute });
  }
  res.redirect('/');
});

app.get('/forget', function(req, res){
  res.clearCookie('remember');
  res.redirect('/');
});


app.listen(1337);
console.log('Express started on port ' + 1337);

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  })
  next()
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.get('/', (req, res) => {
  res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to my website',
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
})

app.get('/portfolio', (req, res) => {
  res.render('portfolio.hbs', {
    pageTitle: 'My dummy portfolio',
    welcomeMessage: 'Welcome!',
  });
})

app.listen(port, () => {
  console.log(`Warpgate locked on ${port}`);
});
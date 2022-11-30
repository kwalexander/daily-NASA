const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require("express-handlebars");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// import sessions library
const routes = require('./controllers/index.js');
const sequelize = require('./config/connection');


const app = express();


//middleware for front end
app.use(express.static(path.join(__dirname, 'public')));

app.get('/homepage', (req, res) => {
 res.render('event');
});

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

// session middleware
const sess = {
    secret: 'secretMessage',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({db:sequelize})
};

app.use(session(sess));

//turn on routes last
app.use(routes);

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

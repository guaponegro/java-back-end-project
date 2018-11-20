const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const cors           = require('cors');
const session        = require('express-session');
// const requireLogin = require('./middleware/requireLogin')

require('./db/db');
app.use(session({
    secret: 'It is Narleen, not Charleen',
    resave: false,
    saveUninitialized: false
  }))

  //middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 
  }
  app.use(cors(corsOptions));

  //controllers
const authCon = require('./controllers/authcontroller');
const usersCon = require('./controllers/userscontroller');

app.use('/users', usersCon); //if users doesn't work
app.use('/auth', authCon);

app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
});
const express = require("express");
const session = require('express-session');
const passport = require('passport');

require('dotenv').config();
const { googleOauthRouter } = require("./routes/googleOauth");


// const pushNotificationController = require("./controllers/notification");

const app = express();

// Middleware setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.set("trust proxy", true);



// Routes
app.get("/", (req, res) => {
    res.send(`
          <h1>Welcome to the ReachInbox.</h1>
          <p>Your AI assistant for managing mails.</p>
    `);
});
app.use("/", googleOauthRouter);


// // Set up push notification channel and subscribe to Pub/Sub topic on server start
// pushNotificationController.createPushNotificationChannel();
// pushNotificationController.subscribeToPubSubTopic();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

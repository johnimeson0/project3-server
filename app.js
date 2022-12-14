// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const {isAuthenticated} = require('./middleware/jwt.middleware')
// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const carRoutes = require("./routes/car.routes")
app.use("/cars", 
// isAuthenticated, 
carRoutes)

const postRoutes = require("./routes/post.routes")
app.use("/forum",
//  isAuthenticated, 
 postRoutes)

const eventRoutes = require ("./routes/event.routes")
app.use("/events", 
// isAuthenticated, 
eventRoutes)

const interactionRoutes = require ("./routes/interaction.routes")
app.use("/interaction",
 isAuthenticated,
interactionRoutes
)

const profileRoutes = require ("./routes/profile.routes")
app.use("/profiles",
isAuthenticated,
profileRoutes)
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

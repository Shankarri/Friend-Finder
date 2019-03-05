// external path package 
var path = require("path");

module.exports = function(app) {
  
  // Redirecting the survey url to the Survey Html Page
    app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};

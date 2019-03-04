
// Taking data from friend Array
var friendArray = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendArray);
  });

  app.post("/api/friends", function(req, res) {  
    var closestMatch = checkForMatch(friendArray,req.body);
    friendArray.push(req.body);
    console.log("closestMatch",closestMatch);
    res.json(closestMatch);
  });

  let checkForMatch = function (friendArray,newFriend){
    
    var closestMatch = friendArray[0].name;
    var leastDiff = 0;
    for (var index in friendArray)
    {
     var totalDiff = 0;
     var eachFriendScores = friendArray[index].scores;
      // console.log("eachFriendScores" , friendArray[index]);
      for (var score in eachFriendScores)
      { 
        //var diff = ;
        totalDiff += Math.abs(eachFriendScores[score] - newFriend.scores[score]);
      }

      console.log("eachFriendScores[score]", eachFriendScores);
      console.log("newFriend.scores[score]", newFriend.scores);
      console.log("\n eachDiff : ",totalDiff);
      if(leastDiff == 0 || (totalDiff < leastDiff))
      {
        leastDiff= totalDiff; 
        closestMatch = friendArray[index];
      }
      console.log("\n leastDiff: ",leastDiff);
    }
    return closestMatch;
  }
};

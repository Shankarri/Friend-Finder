
// Taking initial data from friend Array
var friendArray = require("../data/friends");

module.exports = function(app) {

// When requsting get for friends url, display the Friends Array Json Data  
  app.get("/api/friends", function(req, res) {
    res.json(friendArray);
  });

  // ------------------------------------------------------------------------//
  // When requsting friends url, display the Friends Array Json Data 
  app.post("/api/friends", function(req, res) {  
    // Search for closest match for the newly received user
    var closestMatch = checkForMatch(friendArray,req.body);

    // After finding the match add that user also in the friends list
    friendArray.push(req.body);
    console.log("closestMatch",closestMatch);
    
    // REspond back with the closest match Json obj.
    res.json(closestMatch);
  });
  // ------------------------------------------------------------------------//

  // ------------------------------------------------------------------------//
  // 
  let checkForMatch = function (friendArray,newFriend){
    
    // Initially take the first friend as the closet match
    var closestMatch = friendArray[0].name;
    var leastDiff = 0;

    // Loop through the friend Array and calculate the score
    for (var index in friendArray)
    {
     var eachdiff = 0;
     var eachFriendScores = friendArray[index].scores;
      
      // After taking each friend loop through the scores and find difference
      for (var score in eachFriendScores)
      { 
        eachdiff += Math.abs(eachFriendScores[score] - newFriend.scores[score]);
      }

      // Console log the each friend score and their difference 
        console.log("eachFriendScores[score]", eachFriendScores);
        console.log("\n eachDiff : ",eachdiff);

      // Check if the currently selected friend has the leastdifference
      if(leastDiff == 0 || (eachdiff < leastDiff))
      {
        // If different, change the closest match to that
        leastDiff= eachdiff; 
        closestMatch = friendArray[index];
      }
    }
    // after finding the closest match, return the obj to html page to display in page
    return closestMatch;
  }
  // ------------------------------------------------------------------------//

};


const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=39",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "f7b94b1a54msh3c3038557e37090p1526ecjsna94e501ae6dc",
		"X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
	}
};

// FIRST API CALL TO GENERATE TABLE AS WELL AS FILL IN MODAL INFO
$.ajax(settings).done(function (response) {    
    var table = $(".table");

    // CREATING THE HEADERS FOR EACH OF THE COLUMNS
    var teamPosTitle = $("<td>")
    var teamBadgeTitle = $("<td>");
    var teamNameTitle = $("<td>");
    var teamPointsTitle = $("<td>");
    var totalPlayedTitle = $("<td>");
    var gamesWonTitle = $("<td>");
    var gamesDrawnTitle = $("<td>");
    var gamesLostTitle = $("<td>");
    var lastFiveTitle = $("<td>");
    var teamInfoTitle = $("<td>");

    // FILLING IN THE TEXT FOR EACH OF THE HEADERS
    teamPosTitle.text("Pos");
    teamBadgeTitle.text("Club");
    teamNameTitle.text("Name");
    teamPointsTitle.text("Points");
    totalPlayedTitle.text("Total Played");
    gamesWonTitle.text("Won");
    gamesDrawnTitle.text("Lost");
    gamesLostTitle.text("Drawn");
    lastFiveTitle.text("Last Five");
    teamInfoTitle.text("Team Info");

     // APPENDING THE HEADERS TO EACH OF THE COLUMNS
    table.append(teamPosTitle, teamBadgeTitle, teamNameTitle, teamPointsTitle, totalPlayedTitle, gamesWonTitle, gamesLostTitle, gamesDrawnTitle, lastFiveTitle)

    // LOOP THROUGH ALL THE TEAMS
    for (var i = 0; i < response.response[0].league.standings[0].length; i++) {
  
    var tr = [];
    var teamPosition = $("<td>");
    var teamName = $("<td>");
    var teamPoints = $("<td>");
    var totalMatchesPlayed = $("<td>");
    var gamesWon = $("<td>");
    var gamesDrawn = $("<td>");
    var gamesLost = $("<td>");
    var teamImgTD = $("<td>");
    var lastFive = $("<td>");
    var teamInfo = $("<button>");

    // ATTACH INFO FOR ALL THE TEAMS IN TABLE FORMAT 

      tr[i] = $("<tr>")
      teamPosition.text(response.response[0].league.standings[0][i].rank);
      tr[i].append(teamPosition)
      var teamIconLink = response.response[0].league.standings[0][i].team.logo
      var teamImg = $("<img>")
      teamImg.attr("src", teamIconLink);
      teamImg.addClass("smallIcon")
      teamImgTD.append(teamImg)
      tr[i].append(teamImgTD);
      teamName.text(response.response[0].league.standings[0][i].team.name);
      tr[i].append(teamName)
      teamPoints.text(response.response[0].league.standings[0][i].points)
      tr[i].append(teamPoints)
      totalMatchesPlayed.text(response.response[0].league.standings[0][i].all.played);
      tr[i].append(totalMatchesPlayed)
      gamesWon.text(response.response[0].league.standings[0][i].all.win)
      tr[i].append(gamesWon)
      gamesDrawn.text(response.response[0].league.standings[0][i].all.draw)
      tr[i].append(gamesDrawn)
      gamesLost.text(response.response[0].league.standings[0][i].all.lose)
      tr[i].append(gamesLost)
      lastFive.text(response.response[0].league.standings[0][i].form)
      tr[i].append(lastFive)
      teamInfo.text("Info")
          .attr("data-id",response.response[0].league.standings[0][i].team.id)
          .addClass("info").attr("data-toggle", "modal").attr("data-target","#teamInfoModal");
      tr[i].append(teamInfo);

      table.append(tr[i]);

      // HIGHLIGHTS TEAMS BEING PROMOTED OR RELEGATED IN ACCORDING COLORS
      if (response.response[0].league.standings[0][i].description === "Relegation - Championship"){
        tr[i].addClass("relegation")
      }else if (response.response[0].league.standings[0][i].description === "Promotion - Champions League (Group Stage)"){
        tr[i].addClass("promotion")
      }

    }

    // SECOND CALL FROM SAME API TO GET TEAM INFO FOR MODAL
    $(".info").on("click", function(e) {
      var element = e.target.getAttribute("data-id");
      const request = {
        "async": true,
        "crossDomain": true,
        "url": "https://api-football-v1.p.rapidapi.com/v3/teams?id=" + element,
        "method": "GET",
        "headers": {
          "X-RapidAPI-Key": "f7b94b1a54msh3c3038557e37090p1526ecjsna94e501ae6dc",
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
        }
      };
    
      $.ajax(request).done(function(resp) {
        $("#teamNameModal").text(resp.response[0].team.name);
        $("#teamLogoModal").attr("src",resp.response[0].team.logo).addClass("largeIcon");
        $("#stadNameModal").text("Stadium Name: " + resp.response[0].venue.name);
        $("#teamCityModal").text("Stadium City: " +resp.response[0].venue.city);
        $("#teamCodeModal").text("Team Code: " +resp.response[0].team.code);
      })
    })

    // HIDES THE FAV TEAM DIV IF NO TEAM IS SELECTED
    if(localStorage.getItem("favTeam") !== null) {
      $("#favCard").attr("style","display: block;");
      $(".card-title").text("Favourite Team:  " + localStorage.getItem("favTeam"));
    }

});

// TAKING IN USER'S FAV TEAM CHOICE AND SAVING / RETRIEVING FORM LOCAL STORAGE
$(".submit-btn").on("click", function() {
  var theTeam = $(".fave-team").val().trim().toUpperCase();
  localStorage.setItem("favTeam", theTeam);
  if(localStorage.getItem("favTeam") !== null) {
    $("#favCard").attr("style","display: block;");
    $(".card-title").text("Favourite Team:  " + localStorage.getItem("favTeam"));
  }
  $(".fave-team").val("");
})

// 2ND API CALL TO GENERATE FOOTBALL GIFS TO THE PAGE

var giphyURL = "https://api.giphy.com/v1/gifs/search?&q=premierleague&api_key=2kOmKpYTiUlrDGZjUdtf3NJ6MfIg8snc";
var gifsDiv = $(".gifs")

$.ajax({
  url: giphyURL,
  method: "GET",
}).then(function(response) {  
  // select  6 gifs to display
  for (let i = 12; i <= 18; i++) {
    var giphURL = response.data[i].images.fixed_height.url
    var displayedGif = $("<img/>")
    displayedGif.attr("src", giphURL)
    $(".gifs").append(displayedGif)
  }
});


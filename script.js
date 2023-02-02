
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

$.ajax(settings).done(function (response) {
	console.log(response);
    
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

    // APPENDING THE HEADERS TO EACH OF THE COLUMNS
    teamPosTitle.text("Pos");
    teamBadgeTitle.text("Club");
    teamNameTitle.text("Name");
    teamPointsTitle.text("Points");
    totalPlayedTitle.text("Total Played");
    gamesWonTitle.text("Won");
    gamesDrawnTitle.text("Drawn");
    gamesLostTitle.text("Lost");
    lastFiveTitle.text("Last Five");
    teamInfoTitle.text("Team Info");

    table.append(teamPosTitle, teamBadgeTitle, teamNameTitle, teamPointsTitle, totalPlayedTitle, gamesWonTitle, gamesLostTitle, gamesDrawnTitle, lastFiveTitle)
    for (var i = 0; i < response.response[0].league.standings[0].length; i++) {
    // console.log(response.response[0].league.standings[0][i].rank);
  
    var tr = [];
    var teamPosition = $("<td>");
    var teamName = $("<td>");
    var teamPoints = $("<td>");
    var totalMatchesPlayed = $("<td>");
    var gamesWon = $("<td>");
    var gamesDrawn = $("<td>");
    var gamesLost = $("<td>");
    var lastFive = $("<td>");
    var teamInfo = $("<button>");

      tr[i] = $("<tr>")
      teamPosition.text(response.response[0].league.standings[0][i].rank);
      tr[i].append(teamPosition)
      var teamIconLink = response.response[0].league.standings[0][i].team.logo
      var teamImg = $("<img>")
      teamImg.attr("src", teamIconLink);
      teamImg.addClass("smallIcon")
      tr[i].append(teamImg);
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
      teamInfo.text("Info").attr("data-id",response.response[0].league.standings[0][i].team.id).addClass("info");
      tr[i].append(teamInfo);

      table.append(tr[i]);
    }

    $(".info").on("click", function(e) {
      console.log("Here");
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
        console.log(resp);
      })
    })

});


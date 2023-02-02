// queryURL = "https://app.sportdataapi.com/api/v1/soccer/standings?apikey=d2340580-a272-11ed-aa66-8567d5b358d3&season_id=237"


// $.ajax({
//     url : queryURL,
//     method : "GET"
// }).then(function (response) {
//   console.log(response.data.standings);
//   var tablearea = $(".tablearea");
//   var table = $("<table>");

//   var tr = [];
//   var teamPosition = $("<td>");
//   var teamName = $("<td>");
//   var teamLogo = $("<td>");
//   var teamPoints = $("<td>");
//   var totalMatchesPlayed = $("<td>");

//   for (var i = 0; i < response.length; i++) {
//     tr[i] = $("<tr>");
//     tr[i].append(teamPosition).text(response[i].Position);
//     tr[i].append(teamName).text(response[i].Name);
//     var teamIconLink = response[i].SquadLogo;
//     var teamImg = $("<img>").attr("src", teamIconLink);
//     tr[i].append(teamImg);
//     tr[i].append(teamPoints).text(response[i].Points);
//     tr[i].append(totalMatchesPlayed).text(response[i].Played);

//     table.append(tr[i]);
//   }

//   tablearea.append(table);
// });


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
    var teamPosTitle = $("<th>");
    var teamBadgeTitle = $("<th>");
    var teamNameTitle = $("<th>");
    var teamPointsTitle = $("<th>");
    var totalPlayedTitle = $("<th>");

    // APPENDING THE HEADERS TO EACH OF THE COLUMNS
    teamPosTitle.text("Position")
    teamBadgeTitle.text("Badge")
    teamNameTitle.text("Name")
    teamPointsTitle.text("Points")
    totalPlayedTitle.text("Total Played")
    table.append(teamPosTitle, teamBadgeTitle, teamNameTitle, teamPointsTitle, totalPlayedTitle)
    for (var i = 0; i < response.response[0].league.standings[0].length; i++) {
    // console.log(response.response[0].league.standings[0][i].rank);
  
    var tr = [];
    var teamPosition = $("<td>");
    var teamName = $("<td>");
    var teamPoints = $("<td>");
    var totalMatchesPlayed = $("<td>");

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
  
      table.append(tr[i]);
    }

});

$("#search-team-btn").click(function() {
    var searchTerm = $("#search-team").val();
  

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://football-api.p.rapidapi.com/v2/teams/search/" + searchTerm,
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "f7b94b1a54msh3c3038557e37090p1526ecjsna94e501ae6dc",
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
       
            var result = "";
            for (var i = 0; i < data.api.teams.length; i++) {
              result += data.api.teams[i].team_name + ": " + data.api.teams[i].venue_name + "<br>";
            }
            $("#results").html(result);
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Request failed: " + textStatus + " " + errorThrown);
          });
        
});
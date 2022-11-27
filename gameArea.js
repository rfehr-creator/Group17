function addLikedGamesToGameDiv() {
    var games = getLikedGames();
    var div = document.getElementById('gameDiv');
    var sort = document.getElementById('gameAreaSort');
    div.innerHTML = "";

    if (sort.options[sort.selectedIndex].value === "sortLowestPrice") {
        games.sort(function (a, b) {
            return a.price - b.price;
        });
    } else if (sort.options[sort.selectedIndex].value === "sortHighestPrice") {
        games.sort(function (a, b) {
            return b.price - a.price;
        });
    } else {
        games.sort(function (a, b) {
            return a.name - b.name;
        });
    }

    if (games.length > 0) {
        document.getElementById('gameDivHint').innerHTML = "";
    }


    for (var i = 0; i < games.length; i++) {
        var dollar = "$";
        // Check if game is free
        if (games[i].price === 0.00) {
            // Remove $ from price
            dollar = "Free";
        }else{
            dollar = "$"+games[i].price;
        }

        div.innerHTML = div.innerHTML +
            "<div id='" + games[i].id + "'>" + 
                "<div class='likedGameContainer'>" +
                    "<img class='gameImage' src='" + games[i].displayPicture + "'" + "onclick='displayGameDetails(" + games[i].id + ")'>" +
                    "<div class='gameDetailsMiddle'>" + 
                        "<div class='gameDetailsText' onclick='displayGameDetails(" + games[i].id + ")'>Click for details</div>" +
                    "</div>" +
                "</div>" +
                "<text class='likedGamesText'>" + dollar + "</text><br>" +
            "</div>";
    }
}
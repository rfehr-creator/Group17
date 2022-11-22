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


    for (var i = 0; i < games.length; i++) {
        var dollar = "$";
        // Check if game is free
        if (games[i].price === "Free To Play") {
            // Remove $ from price
            dollar = "";
        }
        div.innerHTML = div.innerHTML + "<div id='" + games[i].id + "'><img style='display: block' class=gameImage src='" + games[i].displayPicture + "'" + "onclick='displayGameDetails(" + games[i].id + ")'>" +
            "<span style=' padding: 0px display: block; margin: 10% 30%;  color: white; font-size: 20px; opacity: 1'>" + dollar + games[i].price + "</span>" + "</div>";

    }
}
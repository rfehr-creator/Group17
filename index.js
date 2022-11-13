// initial page load
function onPageLoad() {
    hideElements();
    document.getElementById('imageContainer').style.display = "grid";
    document.getElementById('imageButtons').style.display = "flex";
    document.getElementById('gameArea').style.display = "block";
    var data = defaultGames();
    storeGames(data);
    displayRandomGame();
    addLikedGamesToGameDiv();
    updateHeart();
}

// game details page
function displayGameDetails(gameId) {
    hideElements();
    var game = getGame(gameId);
    document.getElementById('gameDetailsPage').style.display = "block";
    document.getElementById('gameDetailsPage').data = gameId;
    document.getElementById('gameDetailsTitle').innerHTML = game.name;
    document.getElementById('gameDetailsTitle2').innerHTML = game.name;
    document.getElementById('gameDetailsMainImage').src = game.displayPicture;
}

function clearTable(name) {
    var table = document.getElementById(name);
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
}
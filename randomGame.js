// liked current random game
function LikedRandomGame() {
    var randGame = loadRandomGame();
    var games = loadGames();
    
    // mark random game as liked
    for (let index = 0; index < games.length; index++) {
        const element = games[index];
        if (element.id === randGame.id) {
            element.liked = true;
        }
    }
    
    storeGames(games);
    updateHeart();

    // update liked games list
    addLikedGamesToGameDiv();

    // show new random game
    displayRandomGame();
}

// liked current random game
function DislikedRandomGame() {
    var randGame = loadRandomGame();
    var games = loadGames();

    // mark random game as liked
    for (let index = 0; index < games.length; index++) {
        const element = games[index];
        if (element.id === randGame.id) {
            element.disliked = true;
        }
    }

    storeGames(games);

    // update liked games list
    addLikedGamesToGameDiv();

    // show new random game
    displayRandomGame();
}

// display random game in center
function displayRandomGame() {
    var games = getRandomGame();
    if (games.length > 0) {

        var gamePicture = document.getElementById('gamePicture');
        var rand = Math.floor(Math.random() * games.length)
        gamePicture.src = games[rand].displayPicture;
    
        // store current random game for later access
        storeRandomGame(games[rand]);
    }
    else{
        storeRandomGame("");
        var gamePicture = document.getElementById('gamePicture');
        gamePicture.src = "";
    }

}
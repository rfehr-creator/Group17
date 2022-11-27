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

// return random games that are not disliked or liked
function getRandomGame() {
    const nonLikedGames = [];
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        if (games[index].liked === false && games[index].disliked === false) {
            nonLikedGames.push(games[index]);
        }
    }

    return nonLikedGames;
}
// display random game in center
function displayRandomGame() {
    var games = getRandomGame();
    if (games.length > 0) {

        var gamePicture = document.getElementById('gamePicture');
        var rand = Math.floor(Math.random() * games.length);
        gamePicture.src = games[rand].displayPicture;

        // store current random game for later access
        storeRandomGame(games[rand]);
    }
    else {
        storeRandomGame("");
        var gamePicture = document.getElementById('gamePicture');
        gamePicture.src = "";
    }
}

// add game rating
function addGameRating(game, isLiked){
    var addRating = 0;
    if(isLiked){
        addRating = 1;
    } else{
        addRating = -1;
    }
    
    
    var ratings = loadRatings();
    for (let i = 0; i < game.tags.length; i++) {
        const tag = game.tags[i];
        var found = false;

        for (let j = 0; j < ratings.length; j++) {
            const rating = ratings[j];
            
            if(tag.equals(rating.tag)){
                rating.rating = rating.rating + addRating;
                found = true;
            }
        }

        if(found === false){
            ratings.push({"tag": tag, "rating": addRating})
        }
    }

    storeRatings(ratings);
}

// load and store game ratings
function storeRatings(data) {
    localStorage.setItem('ratings', JSON.stringify(data));
}

function loadRatings() {
    return JSON.parse(localStorage.getItem('ratings'));
}

// liked current random game
function LikedRandomGame() {
    var randGame = loadRandomGame();
    var games = loadGames();

    // add rating for currently liked game 
    addGameRating(randGame, true);

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

    // add rating for currently disliked game 
    addGameRating(randGame, false);

    // mark random game as liked
    for (let index = 0; index < games.length; index++) {
        const element = games[index];
        if (element.id === randGame.id) {
            element.disliked = true;
            element.liked = false;
        }
    }

    storeGames(games);

    // update liked games list
    addLikedGamesToGameDiv();

    // show new random game
    displayRandomGame();
    updateTrashCan();
}
// store the random game currently displayed
function storeRandomGame(data) {
    localStorage.setItem('randomGame', JSON.stringify(data));
}

function loadRandomGame() {
    return JSON.parse(localStorage.getItem('randomGame'));
}
// return random games that are not disliked or liked
function getNonlikedNondislikedGames() {
    const nonLikedGames = [];
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        if (games[index].liked === false && games[index].disliked === false) {
            nonLikedGames.push(games[index]);
        }
    }

    return nonLikedGames;
}

// display recommended game in center
function displayRandomGame() {
    hideRecommendedPicture(false);

    var games = getNonlikedNondislikedGames();
    if (games.length > 0) {
        var gamePicture = document.getElementById('gamePicture');
        var recommended = getMostRecommendedGame();
        gamePicture.src = recommended.displayPicture;

        // store current random game for later access
        storeRandomGame(recommended);

    }
    else {
        hideRecommendedPicture(true);
    }
}

function hideRecommendedPicture(hide) {
    if (hide) {
        // hide game picture
        var gamePicture = document.getElementById('gamePicture');
        gamePicture.style = "opacity: 0";

        // make sure onclick doesn't work
        var imageContainer = document.getElementById('imageContainer');
        imageContainer.onclick = "";

        // show no more games div
        var text = document.getElementById('noMoreGamesDiv');
        text.style = "opacity: 1";
        text.alt = "No more games."
    } else {
        // hide no more games div message
        var text = document.getElementById('noMoreGamesDiv');
        text.style = "opacity: 0";

        // show game picture
        var gamePicture = document.getElementById('gamePicture');
        gamePicture.style = "opacity: 1";

        // make sure onclick works
        var imageContainer = document.getElementById('imageContainer');
        imageContainer.setAttribute('onclick','clickedRandomGame()');
    }
}

// most recommended game based on likes and dislikes
function getMostRecommendedGame() {
    // get available games to choose from
    var availableGames = getNonlikedNondislikedGames();

    if (availableGames.length > 0) {

        for (let i = 0; i < availableGames.length; i++) {
            const game = availableGames[i];
            var rating = getGameRating(game);
            game["rating"] = rating;
        }

        // sort games by rating in descending order
        availableGames.sort(function (a, b) {
            return b.rating - a.rating;
        });

        // pick top game, since it has highest rating
        return availableGames[0];
    }
    alert(availableGames)
    return 0;

}

function getGameRating(game) {
    var ratings = loadRatings();
    var gameRating = 0;
    if (ratings != null && ratings.length > 0) {
        if (ratings.length > 0) {

            // ratings in descending order
            ratings.sort(function (a, b) {
                return b.rating - a.rating;
            });

            for (let i = 0; i < game.tags.length; i++) {
                const tag = game.tags[i];

                // iterate over tags
                for (let j = 0; j < ratings.length; j++) {
                    const rating = ratings[j];
                    if (rating.tag === tag) {
                        gameRating = gameRating + rating.rating;
                    }
                }
            }

        }
    }
    return gameRating;
}

// add game rating
function addGameRating(game, isLiked) {
    var addRating = 0;
    if (isLiked) {
        addRating = 1;
    } else {
        addRating = -1;
    }

    var ratings = loadRatings();

    for (let i = 0; i < game.tags.length; i++) {
        const tag = game.tags[i];
        var found = false;

        if (ratings != null && ratings.length > 0) {
            // iterate over the rating list
            for (let j = 0; found == false && j < ratings.length; j++) {
                const rating = ratings[j];

                // if tag is same as rating tag then change tag
                if (tag === rating.tag) {
                    rating.rating = rating.rating + addRating;
                    found = true;
                }
            }

            // if tag is not found in rating list, add new tag with rating
            if (found == false) {
                ratings.push({ "tag": tag, "rating": addRating })
            }


        } else {
            // if ratings list is empty or null
            ratings = [{ "tag": tag, "rating": addRating }];
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

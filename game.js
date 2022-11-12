
function addGameToCart() {
    var gameId = document.getElementById('gameDetailsPage').data;
    
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        const game = games[index];
        if (game.id === gameId) {
            game.inCart = true;
        }
    }
    storeGames(games);
    
    updateCartBadge();
}

function addGameToLikedList(){
    var gameId = document.getElementById('gameDetailsPage').data;
    
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        const game = games[index];
        if (game.id === gameId) {
            game.liked = true;
        }
    }
    storeGames(games);
}

function updateCartBadge(){
    document.getElementById('cartBadge').innerHTML = getGamesInCart().length;
}

// return all liked games only
function getLikedGames() {
    const likedGames = [];
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        if (games[index].liked === true) {
            likedGames.push(games[index]);
        }
    }

    return likedGames;
}

function getGame(gameId) {
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        const game = games[index];
        if (game.id === gameId) {
            return game;
        }
    }
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

// return all disliked games only
function getDislikedGames() {
    const dislikedGames = [];
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        if (games[index].disliked === true) {
            dislikedGames.push(games[index]);
        }
    }

    return dislikedGames;
}

// return all games in cart
function getGamesInCart(){
    const gamesInCart = [];
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        if (games[index].inCart === true) {
            gamesInCart.push(games[index]);
        }
    }

    return gamesInCart;
}

// loads games stored in local storage, local storage is used to keep track of modified games
function loadGames() {
    return JSON.parse(localStorage.getItem('games'));
}

function storeGames(data) {
    localStorage.setItem('games', JSON.stringify(data));
}

// store the random game currently displayed
function storeRandomGame(data) {
    localStorage.setItem('randomGame', JSON.stringify(data));
}

function loadRandomGame() {
    return JSON.parse(localStorage.getItem('randomGame'));
}

// default game list with default values when website is loaded
function defaultGames() {
    return [
        {
            "id": 1,
            "name": "Call of Duty: Black Ops III",
            "description": "Call of Duty®: Black Ops III Zombies Chronicles Edition includes the full base game plus the Zombies Chronicles content expansion.",
            "price": 59.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/311210/header.jpg?t=1646763462",
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["FPS", "Action", "Shooter", "Multiplayer", "Zombies"],
        },
        {
            "id": 2,
            "name": "Call of Duty®: Modern Warfare® II",
            "description": "Existing Modern Warfare® II Digital Standard Edition owners can upgrade to the Vault Edition as part of a limited time offer. Welcome to the new era of Call of Duty®. Call of Duty®: Modern Warfare® II drops players into an unprecedented global conflict that features the return of the iconic Operators of Task Force 141. From small-scale, high-stakes infiltration tactical ops to highly classified missions, players will deploy alongside friends in a truly immersive experience. Infinity Ward brings fans state-of-the-art gameplay, with all-new gun handling, advanced AI system, a new Gunsmith and a suite of other gameplay and graphical innovations that elevate the franchise to new heights. Modern Warfare® II launches with a globe-trotting single-player campaign, immersive Multiplayer combat and a narrative-driven, co-op Special Ops experience.",
            "price": 69.99,
            "displayPicture": "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg?t=1668017465",
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["FPS", "Action", "Shooter", "Multiplayer", "Military"],
        }
    ]
}
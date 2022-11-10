// display liked games
function displayLikedGames() {
    var games = loadGames();
    var div = document.getElementById('gameDiv');
    div.innerHTML = "";

    for (var i = 0; i < games.length; i++) {
        // only show liked games
        if (games[i].liked === true) {
            div.innerHTML = div.innerHTML + "<img class=gameImage src=" + games[i].pictureLinks + ">";
        }
    }
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

// return all non-liked games only
function getNonlikedGames() {
    const nonLikedGames = [];
    var games = loadGames();
    for (let index = 0; index < games.length; index++) {
        if (games[index].liked === false) {
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

function ClickedLikedList() {
    document.getElementById('searchResults').style.display = "block";
    document.getElementById('gameDiv').style.display = "none";
    document.getElementById('imageContainer').style.display = "none";
    document.getElementById('imageButtons').style.display = "none";

    var likedGames = getLikedGames();

    // clear search results table
    clearSearchResultsTable();
    var table = document.getElementById('searchResultTable');
    
    // create header row
    var headRow = table.insertRow(0);
    headRow.insertCell(0).outerHTML = "<th>Name</th>"
    headRow.insertCell(1).outerHTML = "<th>Description</th>"
    headRow.insertCell(2).outerHTML = "<th>Price</th>"

    for (let index = 0; index < likedGames.length; index++) {
        var game = likedGames[index];
    
        var row = table.insertRow(1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = game.name;
        cell2.innerHTML = game.description;
        cell3.innerHTML = game.price;
    }
}

// liked current random game
function clickedLikeGame() {
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

    // update liked games list
    displayLikedGames();

    // show new random game
    displayRandomGame();
}

// display random game in center
function displayRandomGame() {
    var games = getNonlikedGames();
    var gamePicture = document.getElementById('gamePicture');
    gamePicture.src = games[0].pictureLinks;

    // store current random game for later access
    storeRandomGame(games[0]);
}

// initial page load
function onPageLoad() {
    document.getElementById('searchResults').style.display = "none";
    var data = [
        {
            "id": 1,
            "name": "Call of Duty: Black Ops III",
            "description": "Call of Duty®: Black Ops III Zombies Chronicles Edition includes the full base game plus the Zombies Chronicles content expansion.",
            "price": 59.99,
            "pictureLinks": "https://cdn.cloudflare.steamstatic.com/steam/apps/311210/header.jpg?t=1646763462",
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["FPS","Action","Shooter","Multiplayer","Zombies"],
        },
        {
            "id": 2,
            "name": "Call of Duty®: Modern Warfare® II",
            "description": "Existing Modern Warfare® II Digital Standard Edition owners can upgrade to the Vault Edition as part of a limited time offer. Welcome to the new era of Call of Duty®. Call of Duty®: Modern Warfare® II drops players into an unprecedented global conflict that features the return of the iconic Operators of Task Force 141. From small-scale, high-stakes infiltration tactical ops to highly classified missions, players will deploy alongside friends in a truly immersive experience. Infinity Ward brings fans state-of-the-art gameplay, with all-new gun handling, advanced AI system, a new Gunsmith and a suite of other gameplay and graphical innovations that elevate the franchise to new heights. Modern Warfare® II launches with a globe-trotting single-player campaign, immersive Multiplayer combat and a narrative-driven, co-op Special Ops experience.",
            "price": 69.99,
            "pictureLinks": "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg?t=1668017465",
            "liked": false,
            "disliked": false,
            "inCart": false,
            "tags": ["FPS","Action","Shooter","Multiplayer","Military"],
        }
    ]
    storeGames(data);
    displayRandomGame();
    displayLikedGames();
}

// elements that should be displayed and hidden for home screen
function home() {
    document.getElementById('imageContainer').style.display = "grid";
    document.getElementById('gameDiv').style.display = "block";
    document.getElementById('imageButtons').style.display = "flex";
    document.getElementById('searchResults').style.display = "none";
}

function searchGames() {
    document.getElementById('searchResults').style.display = "block";
    document.getElementById('gameDiv').style.display = "none";
    document.getElementById('imageContainer').style.display = "none";
    document.getElementById('imageButtons').style.display = "none";

    var games = loadGames();
    var keyword = document.getElementById('searchBox').value.toLowerCase();
    
    // clear search results table
    clearSearchResultsTable();
    var table = document.getElementById('searchResultTable');
    
    // add heading
    var headRow = table.insertRow(0);
    headRow.insertCell(0).outerHTML = "<th>Name</th>"
    headRow.insertCell(1).outerHTML = "<th>Description</th>"
    headRow.insertCell(2).outerHTML = "<th>Price</th>"


    for (let index = 0; index < games.length; index++) {
        var game = games[index];
        if (game.name.toLowerCase().includes(keyword) || game.name.toLowerCase().includes(keyword)) {
            var row = table.insertRow(1);

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            cell1.innerHTML = game.name;
            cell2.innerHTML = game.description;
            cell3.innerHTML = game.price;
        }
    }
}

function clearSearchResultsTable() {
    var table = document.getElementById('searchResultTable');
    while(table.rows.length > 0){
        table.deleteRow(0);
    }
}

function loadGames() {
    return JSON.parse(localStorage.getItem('games'));
}

function storeGames(data) {
    localStorage.setItem('games', JSON.stringify(data));
}

function storeRandomGame(data) {
    localStorage.setItem('randomGame', JSON.stringify(data));
}

function loadRandomGame() {
    return JSON.parse(localStorage.getItem('randomGame'));
}
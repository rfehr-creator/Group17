// display liked games in gameDiv
function addLikedGamesToGameDiv() {
    var games = loadGames();
    var div = document.getElementById('gameDiv');
    div.innerHTML = "";

    for (var i = 0; i < games.length; i++) {
        // only show liked games
        if (games[i].liked === true) {
            div.innerHTML = div.innerHTML + "<div id='" + games[i].id + "'><img class=gameImage src='" + games[i].displayPicture + "'" + "onclick='displayGameDetails(" + games[i].id + ")'" + "onmouseenter='"+ "mouseOver("+ games[i].id + ")'"+ "onmouseleave='"+ "mouseLeave("+ games[i].id + ")'>"+"<div id='overlay" + games[i].id + "' style='margin: 0px; padding: 0px display: inline; position: relative; bottom: 150px; left: 75px; color: aqua; font-size: 20px; opacity: 0'>Text</div>"+"</div>";
        }
    }
}

function mouseOver(gameId){
    var imageDiv = document.getElementById("overlay"+gameId);
    imageDiv.style.opacity = 1;
}

function mouseLeave(gameId){
    var imageDiv = document.getElementById("overlay"+gameId);
    imageDiv.style.opacity = 0;
}
function updateHeart(){
    var heartImg = document.getElementById('likedListImg');
    if(getLikedGames().length > 0)
    {
        heartImg.src = "https://cdn-icons-png.flaticon.com/128/833/833472.png"
    }
    else
    {
        heartImg.src = "https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
    }
}

function DisplayLikedList() {
    hideElements();
    document.getElementById('searchResults').style.display = "block";

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
function DisplayCartItems() {
    hideElements();
    document.getElementById('searchResults').style.display = "block";

    var cartItems = getGamesInCart();

    // clear search results table
    clearSearchResultsTable();
    var table = document.getElementById('searchResultTable');

    // create header row
    var headRow = table.insertRow(0);
    headRow.insertCell(0).outerHTML = "<th>Name</th>"
    headRow.insertCell(1).outerHTML = "<th>Description</th>"
    headRow.insertCell(2).outerHTML = "<th>Price</th>"

    for (let index = 0; index < cartItems.length; index++) {
        var game = cartItems[index];

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

// elements that should be displayed and hidden for home screen
function home() {
    hideElements();
    document.getElementById('imageContainer').style.display = "grid";
    document.getElementById('imageButtons').style.display = "flex";
    document.getElementById('gameArea').style.display = "block";
}


// hide all elements on main page body
function hideElements() {
    document.getElementById('imageContainer').style.display = "none";
    document.getElementById('imageButtons').style.display = "none";
    document.getElementById('searchResults').style.display = "none";
    document.getElementById('gameArea').style.display = "none";
    document.getElementById('gameDetailsPage').style.display = "none";
}

function searchGames() {
    hideElements();
    document.getElementById('searchResults').style.display = "block";

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
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
}


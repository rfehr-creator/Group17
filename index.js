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

function clickedTrashButton(){
    displayTrashedGames();
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

function clickedRandomGame(){
    var id = loadRandomGame()
    displayGameDetails(id.id);
}

function clearTable(name) {
    var table = document.getElementById(name);
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
}

// hide all elements divs on main page
function hideElements() {
    document.getElementById('imageContainer').style.display = "none";
    document.getElementById('imageButtons').style.display = "none";
    document.getElementById('searchResults').style.display = "none";
    document.getElementById('cartItems').style.display = "none";
    document.getElementById('LikedListItems').style.display = "none";
    document.getElementById('gameArea').style.display = "none";
    document.getElementById('gameDetailsPage').style.display = "none";
    document.getElementById('DislikedListItems').style.display = "none";
    document.getElementById('TrashedListDiv').style.display = "none";
}

function displayTrashedGames() {
    hideElements();
    document.getElementById('TrashedListDiv').style.display = "block";

    var games = loadGames();
    var keyword = document.getElementById('searchBox').value.toLowerCase();

    var searchResults = [];
    for (let index = 0; index < games.length; index++) {
        var game = games[index];
        if (game.name.toLowerCase().includes(keyword) || game.description.toLowerCase().includes(keyword) || game.price == keyword) {
            searchResults.push(game);
        }
    }

    if (searchResults.length > 0) {
        searchResults = sortResults(searchResults, "trashSort");
    }


    // clear search results table
    clearTable("trashResultTable");

    var table = document.getElementById('trashResultTable');

    // add heading
    var headRow = table.insertRow(0);
    headRow.insertCell(0).outerHTML = "<th>Name</th>";
    headRow.insertCell(1).outerHTML = "<th>Description</th>";
    headRow.insertCell(2).outerHTML = "<th>Price</th>";

    // add search results to table
    for (let index = 0; index < searchResults.length; index++) {
        const game = searchResults[index];

        // add new row to end of table
        var row = table.insertRow(table.rows.length);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = game.name;
        cell2.innerHTML = game.description;
        cell3.innerHTML = game.price;
    }
}
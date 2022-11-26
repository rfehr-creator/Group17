// initial page load
function onPageLoad() {
    hideElements();
    document.getElementById('mainDisplayTable').style.display = "table";
    document.getElementById('gameArea').style.display = "block";
    var data = defaultGames();
    storeGames(data);
    displayRandomGame();
    addLikedGamesToGameDiv();
    updateHeart();

    // add event listener for search box
    var search = document.getElementById("searchBox");
    search.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            searchGames();
        }
    });
    updateBackButton()
    localStorage.setItem('history', null);
    addHistory("home", "");
}

// game details page
function displayGameDetails(gameId, back) {
    if (back == null || back == false) addHistory("gameDetailsPage", gameId);
    hideElements();
    var game = getGame(gameId);
    document.getElementById('gameDetailsPage').style.display = "block";
    document.getElementById('gameDetailsPage').data = gameId;
    document.getElementById('gameDetailsTitle').innerHTML = game.name;
    document.getElementById('gameDetailsTitle2').innerHTML = game.name;
    document.getElementById('gameDetailsMainImage').src = game.displayPicture;
}

function clickedRandomGame() {
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
    document.getElementById('mainDisplayTable').style.display = "none";
    document.getElementById('searchResults').style.display = "none";
    document.getElementById('cartItems').style.display = "none";
    document.getElementById('LikedListItems').style.display = "none";
    document.getElementById('gameArea').style.display = "none";
    document.getElementById('gameDetailsPage').style.display = "none";
    document.getElementById('DislikedListItems').style.display = "none";
}

function backButtonClick() {

    var history = getHistory();
    if (history.length > 1) {
        popHistory();
    }

    history = getHistory();
    var hist = history[history.length - 1];

    switch (hist.page) {
        case "searchPage":
            document.getElementById('searchBox').value = hist.id;
            searchGames(true);
            break;
        
        case "home":
            document.getElementById('searchBox').value = "";
            home(true);
            break;

        case "gameDetailsPage":
            document.getElementById('searchBox').value = "";
            displayGameDetails(hist.id, true);
            break;

        case "likedListPage":
            document.getElementById('searchBox').value = "";
            DisplayLikedList(true);
            break;

        case "dislikedListPage":
            document.getElementById('searchBox').value = "";
            DisplayDislikedList(true);
            break;

        case "cartPage":
            document.getElementById('searchBox').value = "";
            DisplayCartItems(true);
            break;

        default:
            break;
    }
}

function addHistory(page, id) {
    var history = getHistory();

    if (history === null || history.length < 1) {
        history = [{ "page": page, "id": id }];
    } else if (history[history.length - 1].page !== page) {
        history.push({ "page": page, "id": id })
    } else if(history[history.length - 1].id !== id){
        history.push({ "page": page, "id": id })
    }

    localStorage.setItem('history', JSON.stringify(history));
    updateBackButton();
}

function getHistory() {
    return JSON.parse(localStorage.getItem('history'));
}

function popHistory() {
    var history = getHistory();
    history.pop();
    localStorage.setItem('history', JSON.stringify(history));
    updateBackButton();
}

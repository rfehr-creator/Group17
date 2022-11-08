// function loadGames() {
//     fetch('GameDB.json')
//         .then(function (response) {
//             // The JSON data will arrive here
//             return response.json();
//         })
//         .then(function (data) {
//             localStorage.setItem('games', JSON.stringify(data));
//             likeGames();
//             addGamesToDiv(data);
//         })
//         .catch(function (err) {
//             // If an error occured, you will catch it here
//         });
// }

function addGamesToDiv() {
    var games = loadGames();
    var div = document.getElementById('gameDiv');
    for (var i = 0; i < 20; i++) {
        div.innerHTML = div.innerHTML + "<img class=gameImage src=" + games[0].pictureLinks + ">";
    }
}

function likeGames() {
    var games = loadGames();
    var gamePicture = document.getElementById('gamePicture');
    gamePicture.src = games[0].pictureLinks;
}

function onPageLoad() {
    document.getElementById('searchResults').style.display = "none";
    var data = [
        {
            "name": "Call of Duty: Black Ops III",
            "description": "Call of Duty®: Black Ops III Zombies Chronicles Edition includes the full base game plus the Zombies Chronicles content expansion.",
            "price": 59.99,
            "pictureLinks": "https://cdn.cloudflare.steamstatic.com/steam/apps/311210/header.jpg?t=1646763462",
            "liked": false,
            "inCart": false,
            "tags": [],
        }
    ]
    storeGames(data);
    likeGames();
    addGamesToDiv();
}

function home(){
    document.getElementById('layoutGrid').style.display = "grid";
    document.getElementById('searchResults').style.display = "none";
}
function searchGames() {
    document.getElementById('searchResults').style.display = "block";
    var games = loadGames();
    var keyword = document.getElementById('searchBox').value.toLowerCase();

    for (let index = 0; index < games.length; index++) {
        var game = games[index];
        if (game.name.toLowerCase().includes(keyword)) {
            var table = document.getElementById('searchResultTable');
            var row = table.insertRow(1);

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            
            cell1.innerHTML = game.name;
            cell2.innerHTML = game.description;
            cell3.innerHTML = game.price;


            // alert(game.name);
        }
    }

    document.getElementById('layoutGrid').style.display = "none";
}

function loadGames() {
    return JSON.parse(localStorage.getItem('games'));
}

function storeGames(data) {
    localStorage.setItem('games', JSON.stringify(data));
}
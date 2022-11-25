function DisplayLikedList(back) {
    document.getElementById('searchBox').value = "";
    if(back == null || back == false) addHistory("likedListPage","");
    hideElements();
    document.getElementById('LikedListItems').style.display = "block";

    var cartItems = getLikedGames();


    if (cartItems.length > 0) {
        sortResults(cartItems, "LikedSort");
    }


    var container = document.getElementById('likedListItemsContainer')
    container.innerHTML = "";

    for (let index = 0; index < cartItems.length; index++) {
        var game = cartItems[index];
        addGameLikedList(game,container)
    }
}

function addGameLikedList(game,element){
    element.innerHTML = element.innerHTML +""
}

function DisplayDislikedList(back) {
    if(back == null || back == false) addHistory("dislikedListPage","");
    hideElements();
    document.getElementById('DislikedListItems').style.display = "block";

    var cartItems = getDislikedGames();

    // clear search results table
    clearTable("DislikedResultTable");
    var table = document.getElementById('DislikedResultTable');

    // create header row
    var headRow = table.insertRow(0);
    headRow.insertCell(0).outerHTML = "<th>Name</th>";
    headRow.insertCell(1).outerHTML = "<th>Description</th>";
    headRow.insertCell(2).outerHTML = "<th>Price</th>";


    if (cartItems.length > 0) {
        sortResults(cartItems, "DislikedSort");
    }

    for (let index = 0; index < cartItems.length; index++) {
        var game = cartItems[index];

        var row = table.insertRow(table.rows.length);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = game.name;
        cell2.innerHTML = game.description;
        cell3.innerHTML = game.price;
    }
}